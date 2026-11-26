/* Laboratorio Evoala : outils communs aux activités
   - Lab.load()          : charge le contenu du guide (mêmes phrases et audios que l'appli)
   - Lab.themes()        : liste des thèmes (section › onglet › sous-page) pour choisir les phrases
   - Lab.phrases(key, n) : phrases d'un thème (ou de tout le guide), mélangées
   - Lab.voisins(p, n)   : n autres phrases du même thème que p (pour des choix proches, pas devinables)
   - Lab.play(p)         : joue l'audio d'une phrase
   - Lab.unlocked()      : true une fois l'audio débloqué par un premier toucher (iPhone)
   - Lab.webAudio()      : joue les audios avec Web Audio au lieu du lecteur <audio> (activités avec micro, voir plus bas)
   - Lab.stop()          : coupe l'audio en cours
   - Lab.playToEnd(p)    : joue l'audio et attend qu'il soit fini (false s'il n'a pas pu être joué)
   - Lab.icon(p, size)   : HTML de l'illustration d'une phrase */
const Lab = (() => {
  let C = null;
  const bundles = {}, urls = {};
  const shuffle = a => { a = [...a]; for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  async function load(){ if(!C) C = await fetch("/content.json").then(r => r.json()); return C; }
  function views(){
    const out = [];
    C.sections.forEach((s, si) => s.tabs.forEach((t, ti) => (t.subs || [t]).forEach((v, u) => {
      const ph = v.groups.flatMap(g => g.phrases).filter(p => p.fr);
      if(ph.length) out.push({ key: `s${si}t${ti}p${u}`, label: `${s.name} › ${t.label || t.name}${t.subs ? " › " + v.name : ""}`, ph });
    })));
    return out;
  }
  const themes = () => views().map(v => ({ key: v.key, label: v.label, n: v.ph.length }));
  function phrases(key, n){
    const all = key ? (views().find(v => v.key === key)?.ph || []) : views().flatMap(v => v.ph);
    const uniq = [...new Map(all.map(p => [p.fr, p])).values()];
    return shuffle(uniq).slice(0, n || uniq.length);
  }
  function voisins(p, n, filtre = () => true){
    const v = views().find(v => v.ph.some(x => x.fr === p.fr));
    const pris = new Set([p.fr]), out = [];
    const ajoute = arr => shuffle(arr).forEach(x => { if(out.length < n && !pris.has(x.fr) && filtre(x)){ pris.add(x.fr); out.push(x); } });
    if(v) ajoute(v.ph);
    if(out.length < n) ajoute(views().flatMap(v => v.ph));    // thème trop petit : on complète avec le reste du guide
    return out;
  }
  async function audioUrl(p){
    if(!p.audio) return null;
    const [file, id] = p.audio;
    if(!urls[id]){
      const b = await (bundles[file] ??= fetch("/" + file).then(r => r.json()));
      if(!b[id]) return null;
      urls[id] = URL.createObjectURL(new Blob([Uint8Array.from(atob(b[id]), c => c.charCodeAt(0))], { type: "audio/mpeg" }));
    }
    return urls[id];
  }
  const player = new Audio();
  // iPhone : l'audio automatique est bloqué tant que l'utilisateur n'a pas touché l'écran.
  // Au premier toucher, on joue un son muet très court sur le lecteur partagé : il est ensuite autorisé à jouer seul.
  let unlocked = false;
  const SILENT = (() => { const n = 400, b = new DataView(new ArrayBuffer(44 + n)), w = (o, t) => [...t].forEach((c, i) => b.setUint8(o + i, c.charCodeAt(0)));
    w(0, "RIFF"); b.setUint32(4, 36 + n, true); w(8, "WAVEfmt "); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 1, true);
    b.setUint32(24, 8000, true); b.setUint32(28, 8000, true); b.setUint16(32, 1, true); b.setUint16(34, 8, true); w(36, "data"); b.setUint32(40, n, true);
    for(let i = 0; i < n; i++) b.setUint8(44 + i, 128);
    return URL.createObjectURL(new Blob([b], { type: "audio/wav" })); })();
  function unlock(){
    if(WA || unlocked) return;   // en mode Web Audio, on ne touche pas au lecteur <audio> unlocked = true;
    if(player.src && !player.paused) return;          // un audio joue déjà : le lecteur est autorisé
    player.src = SILENT;
    player.play().then(() => { if(player.src === SILENT) player.pause(); }).catch(() => { unlocked = false; });
  }
  ["touchend", "click", "keydown"].forEach(ev => document.addEventListener(ev, unlock, true));
  // Mode Web Audio (activités avec micro) : sur iPhone, rejouer un son avec le lecteur <audio> après une reconnaissance
  // vocale rend le micro sourd jusqu'au rechargement de la page. Web Audio ne touche pas au micro.
  let WA = false, ctx = null, src = null; const bufs = {};
  function webAudio(){ WA = true; }
  function ctxOk(){ if(!ctx){ const C = window.AudioContext || window.webkitAudioContext; if(C) ctx = new C(); } return ctx; }
  function unlockWA(){ const c = ctxOk(); if(!c) return; if(c.state !== "running") c.resume().catch(() => {});
    try{ const b = c.createBuffer(1, 1, 22050), s0 = c.createBufferSource(); s0.buffer = b; s0.connect(c.destination); s0.start(0); }catch(e){} }
  ["touchend", "click"].forEach(ev => document.addEventListener(ev, () => { if(WA) unlockWA(); }, true));
  async function buffer(u){
    return bufs[u] ??= fetch(u).then(r => r.arrayBuffer()).then(a => new Promise((ok, ko) => ctx.decodeAudioData(a, ok, ko)));
  }
  function stopWA(){ if(src){ const s0 = src; src = null; try{ s0.onended?.(); s0.onended = null; s0.stop(); }catch(e){} } }
  async function playWA(p, attendre){
    const u = await audioUrl(p); if(!u || !ctxOk()) return false;
    try{
      if(ctx.state !== "running") await ctx.resume();
      const b = await buffer(u); stopWA();
      const s0 = ctx.createBufferSource(); s0.buffer = b; s0.connect(ctx.destination);
      const fin = new Promise(r => { s0.onended = () => { if(src === s0) src = null; r(); }; });
      src = s0; s0.start(0);
      if(attendre) await fin;
      return true;
    }catch(e){ return false; }
  }
  async function play(p){
    if(WA) return playWA(p, false);
    const u = await audioUrl(p); if(!u) return false; player.src = u; try{ await player.play(); return true; }catch(e){ return false; }
  }
  async function playToEnd(p){
    if(WA) return playWA(p, true);
    if(!(await play(p))) return false;
    await new Promise(r => { const fin = () => { player.removeEventListener("ended", fin); player.removeEventListener("pause", fin); r(); };
      player.addEventListener("ended", fin); player.addEventListener("pause", fin); });
    return true;
  }
  const isUnlocked = () => WA ? !!ctx && ctx.state === "running" : unlocked;
  const stop = () => { stopWA(); try{ player.pause(); }catch(e){} };
  const icon = (p, s = 56) => p.icon ? `<div class="ic" style="--s:${s}px;background-image:url('/${p.icon[0]}');--i:${p.icon[1]}"></div>` : "";
  function toast(m){ let t = document.querySelector(".toast"); if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.append(t); }
    t.textContent = m; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 1800); }
  // menu de choix du thème, commun à toutes les activités
  function themeSelect(el, onChange){
    el.innerHTML = `<option value="">Todo el guía</option>` + themes().map(t => `<option value="${t.key}">${t.label} (${t.n})</option>`).join("");
    el.onchange = () => onChange(el.value);
  }
  // icône haut-parleur, la même que dans le guide
  const SPK = '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';
  return { load, themes, phrases, voisins, play, stop, webAudio, unlocked: isUnlocked, playToEnd, icon, shuffle, toast, themeSelect, SPK };
})();
