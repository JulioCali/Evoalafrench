/* Evoala · petit serveur Cloudflare
   - /api/stt      : reçoit un enregistrement audio et renvoie le texte entendu (Whisper, Workers AI)
   - /api/hotmart  : Hotmart prévient ici d'un achat ou d'un remboursement -> on donne ou retire l'accès
   - /content*.json et /snd/pNN.json : contenu complet seulement pour les acheteurs ;
     les autres reçoivent la version gratuite (pages FREE + "Sobre París"), avec des cadenas
   - tout le reste : les fichiers de l'appli, tels quels

   Qui est acheteur ? Un document Firestore entitlements/{e-mail} avec survie = true.
   Il est écrit par /api/hotmart (ou à la main dans la console Firebase).

   Secrets à mettre dans Cloudflare (Worker > Settings > Variables and Secrets) :
   - HOTMART_HOTTOK      : le « hottok » affiché dans Hotmart > Herramientas > Webhook
   - FIREBASE_SA         : la clé de service Firebase (le fichier JSON en entier)
   - HOTMART_PRODUCT_ID  : (facultatif) l'ID du produit Hotmart, pour ignorer les autres produits */

const PROJECT = "evoalafrench-db460";
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
// pages gratuites : section / onglet / sous-page, comme les adresses de l'appli (#s0t0, #s4t0p0…)
const FREE = new Set(["s0t0", "s2t1", "s4t0p0", "s6t0"]);
const FREE_SND = new Set(["p2", "p10", "p15", "p24"]);
const GRANT = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const REVOKE = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK"]);

const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });
function b64(buf){
  const u = new Uint8Array(buf); let s = "";
  for(let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(s);
}
const b64url = s => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64url = s => atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));

/* ---------- Qui fait la demande ? ----------
   Le jeton Firebase arrive par le cookie evo_t (posé par auth.js) ou l'en-tête Authorization.
   On ne le vérifie pas nous-mêmes : on le présente à Firestore, qui le refuse s'il est faux ou expiré,
   et dont les règles ne laissent lire que le document de son propre e-mail (vérifié). */
function tokenOf(req){
  const h = req.headers.get("authorization") || "";
  if(h.startsWith("Bearer ")) return h.slice(7).trim();
  const m = (req.headers.get("cookie") || "").match(/(?:^|;\s*)evo_t=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
function claims(tok){
  try{ return JSON.parse(new TextDecoder().decode(Uint8Array.from(unb64url(tok.split(".")[1]), c => c.charCodeAt(0)))); }catch(e){ return null; }
}
const seenTok = new Map();                                    // jeton -> { acc, until } (quelques minutes, pour ne pas interroger Firestore à chaque audio)
async function access(req){
  const tok = tokenOf(req), none = { user: false, verified: false, pro: false };
  if(!tok) return none;
  const c = claims(tok);
  if(!c || !c.email || !c.exp || c.exp * 1000 < Date.now()) return none;
  const hit = seenTok.get(tok);
  if(hit && hit.until > Date.now()) return hit.acc;
  let acc;
  if(!c.email_verified) acc = { user: true, verified: false, pro: false };
  else{
    const r = await fetch(`${FS}/entitlements/${encodeURIComponent(c.email.toLowerCase())}`, { headers: { authorization: `Bearer ${tok}` } });
    if(r.status === 200){ const d = await r.json(); acc = { user: true, verified: true, pro: d.fields?.survie?.booleanValue === true }; }
    else if(r.status === 404) acc = { user: true, verified: true, pro: false };
    else return none;                                          // jeton refusé par Firestore
  }
  if(seenTok.size > 500) seenTok.clear();
  seenTok.set(tok, { acc, until: Date.now() + 3 * 60 * 1000 });
  return acc;
}

/* ---------- Version gratuite du contenu ---------- */
function lockView(v){
  const n = v.groups.reduce((a, g) => a + g.phrases.length, 0);
  return { name: v.name, intro: v.intro, locked: true, n, groups: v.groups.map(g => ({ label: g.label, phrases: [] })), tips: [] };
}
function freeContent(C){
  C.sections.forEach((s, si) => s.tabs.forEach((tab, ti) => {
    if(tab.subs){ tab.subs = tab.subs.map((v, u) => FREE.has(`s${si}t${ti}`) || FREE.has(`s${si}t${ti}p${u}`) ? v : lockView(v)); tab.tips = []; }
    else if(!FREE.has(`s${si}t${ti}`)) Object.assign(tab, lockView(tab), { label: tab.label, name: tab.name });
  }));
  const counts = {}; (C.paris || []).forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
  C.paris = []; C.parisN = counts;
  return C;
}

/* ---------- Écrire dans Firestore avec la clé de service ---------- */
let gTok = null;
async function googleToken(env){
  if(gTok && gTok.until > Date.now()) return gTok.v;
  const sa = JSON.parse(env.FIREBASE_SA), now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64url(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const der = Uint8Array.from(atob(sa.private_key.replace(/-----[^-]+-----|\s/g, "")), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${head}.${body}`)));
  const jwt = `${head}.${body}.${b64url(String.fromCharCode(...sig))}`;
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${jwt}` });
  const d = await r.json(); if(!r.ok) throw new Error("google token: " + JSON.stringify(d));
  gTok = { v: d.access_token, until: Date.now() + 50 * 60 * 1000 };
  return gTok.v;
}
async function setEntitlement(env, email, f){
  const fields = {
    survie: { booleanValue: f.survie }, status: { stringValue: f.status }, transaction: { stringValue: f.transaction || "" },
    product: { stringValue: f.product || "" }, name: { stringValue: f.name || "" }, updatedAt: { timestampValue: new Date().toISOString() }
  };
  const mask = Object.keys(fields).map(k => "updateMask.fieldPaths=" + k).join("&");
  const r = await fetch(`${FS}/entitlements/${encodeURIComponent(email)}?${mask}`, {
    method: "PATCH", headers: { authorization: `Bearer ${await googleToken(env)}`, "content-type": "application/json" }, body: JSON.stringify({ fields }) });
  if(!r.ok) throw new Error("firestore " + r.status + " " + await r.text());
}

/* ---------- Hotmart ---------- */
async function hotmart(req, env){
  if(req.method !== "POST") return json({ error: "method" }, 405);
  let body; try{ body = await req.json(); }catch(e){ return json({ error: "json" }, 400); }
  const hottok = req.headers.get("x-hotmart-hottok") || body.hottok;
  if(!env.HOTMART_HOTTOK || hottok !== env.HOTMART_HOTTOK) return json({ error: "hottok" }, 401);
  const ev = body.event || "", d = body.data || {};
  const email = String(d.buyer?.email || body.email || "").trim().toLowerCase();
  const product = String(d.product?.id ?? body.prod ?? "");
  if(env.HOTMART_PRODUCT_ID && product !== String(env.HOTMART_PRODUCT_ID)) return json({ ok: true, ignored: "product" });
  if(!email) return json({ ok: true, ignored: "no email" });
  if(!GRANT.has(ev) && !REVOKE.has(ev)) return json({ ok: true, ignored: ev });
  try{
    await setEntitlement(env, email, { survie: GRANT.has(ev), status: ev, transaction: d.purchase?.transaction || body.transaction, product, name: d.buyer?.name });
  }catch(e){ return json({ error: "store", detail: String(e.message || e) }, 500); }   // Hotmart réessaiera
  return json({ ok: true, email, access: GRANT.has(ev) });
}

/* ---------- Routage ---------- */
// chemin « propre » : décodé, sans doubles barres ni « .. », en minuscules (pour qu'aucune variante n'échappe au contrôle)
function cleanPath(p){
  try{ p = decodeURIComponent(p); }catch(e){}
  const out = [];
  for(const seg of p.split("/")){ if(!seg || seg === ".") continue; if(seg === "..") out.pop(); else out.push(seg); }
  return "/" + out.join("/").toLowerCase();
}
async function stt(req, env){
  if(req.method !== "POST") return json({ error: "method" }, 405);
  const buf = await req.arrayBuffer();
  if(!buf.byteLength) return json({ error: "empty" }, 400);
  if(buf.byteLength > 3_000_000) return json({ error: "too_big" }, 413);   // ~1 min max : une phrase suffit
  try{
    const r = await env.AI.run("@cf/openai/whisper-large-v3-turbo", { audio: b64(buf), language: "fr", task: "transcribe" });
    return json({ text: (r && r.text || "").trim(), model: "turbo" });
  }catch(e){
    try{
      const r = await env.AI.run("@cf/openai/whisper", { audio: [...new Uint8Array(buf)] });
      return json({ text: (r && r.text || "").trim(), model: "base" });
    }catch(e2){ return json({ error: "stt", detail: String(e2 && e2.message || e2) }, 502); }
  }
}
const asset = (req, env, path) => env.ASSETS.fetch(new Request(new URL(path, req.url), { headers: req.headers }));

export default {
  async fetch(req, env){
    const url = new URL(req.url), path = cleanPath(url.pathname);
    if(path === "/api/stt") return stt(req, env);
    if(path === "/api/hotmart") return hotmart(req, env);

    if(path === "/content.json" || path === "/content-en.json"){
      const acc = await access(req);
      const r = await asset(req, env, path);
      if(!r.ok) return r;
      const C = await r.json();
      const out = acc.pro ? C : freeContent(C);
      out._acc = acc;
      return json(out, 200, { "cache-control": "private, no-store" });
    }
    let m;
    if((m = path.match(/^\/snd\/(p\d+)\.json$/))){
      if(!FREE_SND.has(m[1]) && !(await access(req)).pro) return json({ error: "locked" }, 403);
      const r = await asset(req, env, path);
      const h = new Headers(r.headers); h.set("cache-control", "private, max-age=86400");
      return new Response(r.body, { status: r.status, headers: h });
    }
    // tout autre fichier JSON du contenu (copie, ancien nom…) : jamais servi tel quel
    if(/^\/(content|snd\/p\d)/.test(path) && path.endsWith(".json")) return json({ error: "not found" }, 404);
    return env.ASSETS.fetch(req);
  }
};
