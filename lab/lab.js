/* Laboratorio Evoala : outils communs aux activités
   - Lab.load()          : charge le contenu du guide (mêmes phrases et audios que l'appli)
   - Lab.themes()        : liste des thèmes (section › onglet › sous-page) pour choisir les phrases
   - Lab.phrases(key, n) : phrases d'un thème (ou de tout le guide), mélangées
   - Lab.play(p)         : joue l'audio d'une phrase
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
  async function play(p){ const u = await audioUrl(p); if(!u) return false; player.src = u; try{ await player.play(); return true; }catch(e){ return false; } }
  const icon = (p, s = 56) => p.icon ? `<div class="ic" style="--s:${s}px;background-image:url('/${p.icon[0]}');--i:${p.icon[1]}"></div>` : "";
  function toast(m){ let t = document.querySelector(".toast"); if(!t){ t = document.createElement("div"); t.className = "toast"; document.body.append(t); }
    t.textContent = m; t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 1800); }
  // menu de choix du thème, commun à toutes les activités
  function themeSelect(el, onChange){
    el.innerHTML = `<option value="">Todo el guía</option>` + themes().map(t => `<option value="${t.key}">${t.label} (${t.n})</option>`).join("");
    el.onchange = () => onChange(el.value);
  }
  return { load, themes, phrases, play, icon, shuffle, toast, themeSelect };
})();
