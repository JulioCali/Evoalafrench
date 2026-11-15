/* Evoala · petit serveur Cloudflare
   - /api/stt : reçoit un enregistrement audio et renvoie le texte entendu (Whisper, Workers AI)
   - tout le reste : les fichiers de l'appli, tels quels */
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
function b64(buf){
  const u = new Uint8Array(buf); let s = "";
  for(let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
  return btoa(s);
}
export default {
  async fetch(req, env){
    const url = new URL(req.url);
    if(url.pathname === "/api/stt"){
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
    return env.ASSETS.fetch(req);
  }
};
