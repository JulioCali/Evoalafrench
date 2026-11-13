/* ===== Evoala · Guía de supervivencia — logique =====
   Le contenu (phrases, prononciations, lieux) est dans content.json.
   Ce fichier ne contient que l'affichage. */

const HOME = [ // le sommaire, comme la page 1 du PDF : [titre, sous-titre, section du PDF, [ligne -> onglet]]
  ["Esenciales","Palabras que salvan y que se usan mucho","Esenciales",[["Las indispensables","Indispensables"],["Las parisinas","Parisinas"],["Las salvavidas","Salvavidas"]]],
  ["Compras","Compra lo que necesitas durante tu viaje","Compras",[["La ropa","Ropa"],["Los recuerdos","Recuerdos"],["Los productos culturales","Cultura"]]],
  ["Viajes","Muévete por Francia sin complicaciones","Transporte",[["En el avión","En el avión"],["En el taxi","En el taxi"],["En el tren","En el tren"]]],
  ["Exploración","Encuentra tu camino","Visitas",[["El camino en la calle","El camino"],["El camino en metro","En el metro"],["Las salidas","Salidas"]]],
  ["Comida","Pide lo que quieras comer","Comida",[["En el restaurante","El restaurante"],["En el café","El café"],["En la panadería","La panadería"],["En el mercado","El mercado"]]],
  ["Alojamiento","Maneja tu llegada, Mejora tu estadía","Hospedaje",[["En el hotel","En el hotel"],["En el Airbnb","En el Airbnb"]],"two"],
  ["Imprevistos","Nunca sabemos","Imprevistos",[["Emergencias","Emergencias"],["En la farmacia","En la farmacia"],["Con el doctor","Con el doctor"]]],
  ["Opiniones","Comparte, comenta, conecta.","Opiniones",[["La comida","Comida"],["El clima","Clima"],["Los lugares","Lugares"],["Los precios","Precios"]],"two"],
];
const BONUS = ["Bonus","Contenido adicional","Bonus",[["Los colores","Colores"],["Los números","Números"],["La ciudad","La ciudad"]]];
const GRID = ["Esenciales","Compras","Transporte","Visitas","Comida","Hospedaje","Imprevistos","Opiniones"];
const PARIS_CATS = ["Sobre París","Iconos","Sagrados","Museos","Castillos","Parques","Paseos","Diversión"];
const PER_PAGE = 10;

/* ---------- Langue : es (espagnol) / en (anglais) ----------
   Le contenu anglais est dans content-en.json (même structure que content.json). */
let LANG = (() => { try{ return localStorage.getItem("evoala-lang") === "en" ? "en" : "es"; }catch(e){ return "es"; } })();
const HOME_EN = [
  ["Essentials","Words that save you and get used a lot"],
  ["Shopping","Buy what you need during your trip"],
  ["Travel","Get around France with no hassle"],
  ["Exploring","Find your way"],
  ["Food","Order whatever you want to eat"],
  ["Lodging","Handle your arrival, enjoy your stay"],
  ["Unexpected","You never know"],
  ["Opinions","Share, comment, connect."],
];
const ROW_EN = {"Las indispensables":"The must-knows","Las parisinas":"Parisian phrases","Las salvavidas":"Lifesavers",
  "La ropa":"Clothes","Los recuerdos":"Souvenirs","Los productos culturales":"Culture & tech",
  "En el avión":"On the plane","En el taxi":"In the taxi","En el tren":"On the train",
  "El camino en la calle":"Directions in the street","El camino en metro":"Getting around by metro","Las salidas":"Going out",
  "En el restaurante":"At the restaurant","En el café":"At the café","En la panadería":"At the bakery","En el mercado":"At the market",
  "En el hotel":"At the hotel","En el Airbnb":"At the Airbnb","Emergencias":"Emergencies","En la farmacia":"At the pharmacy","Con el doctor":"At the doctor's",
  "La comida":"Food","El clima":"Weather","Los lugares":"Places","Los precios":"Prices",
  "Los colores":"Colors","Los números":"Numbers","La ciudad":"The city"};
const TILE_EN = {Esenciales:"Essentials",Compras:"Shopping",Transporte:"Transport",Visitas:"Exploring",Comida:"Food",Hospedaje:"Lodging",Imprevistos:"Unexpected",Opiniones:"Opinions",
  "Sobre París":"About Paris",Iconos:"Icons",Sagrados:"Sacred",Museos:"Museums",Castillos:"Castles",Parques:"Parks",Paseos:"Walks",Diversión:"Fun"};
const TXT = {
  es:{guide:"GUÍA DE",guide2:"Supervivencia",from:"ES",start:"Empezar",dep:"SALIDA",now:"Ahora",dest:"DESTINO",me:"Mi yo francés",first:"PRIMERA CLASE",
      search:"Buscar una frase en español o francés",searchL:"Buscar una frase",resume:"Continuar donde lo dejaste",toc:"Tabla de contenidos",tap:"Toca un tema",
      paris:"Guía de Paris",parisSub:"¿Qué ver en Paris? Monumentos, museos, paseos…",bonusT:"Bonus",bonusS:"Contenido adicional",extra:"Contenido adicional",
      nGuide:"Guía",nBonus:"Bonus",nParis:"Paris",soon:"Esta parte llegará en la próxima versión.",up:"Volver arriba ↑",
      pHead:"¿Qué ver en Paris ?",pSub:"Descubre aquí tus próximas visitas en Paris",city:"Entender la ciudad",mapT:"Mapa de los distritos",mapAlt:"Mapa de los distritos de París",
      move:"Moverse",safety:"Seguridad",hours:"Horarios y cierres",credits:"Créditos de las fotos",src:"Fuente",lic:"Licencia",
      paid:"De pago",free:"Gratis",metro:"Metro cercano",go:"Cómo llegar",crnote:"Toca una foto para ver su autor y su licencia",
      none:"Ninguna frase encontrada.",audioSoon:"🎧 Audio disponible pronto",noPlay:"No se pudo reproducir",noLoad:"No se pudo cargar el contenido.",home:"Inicio",lang:"Idioma",allGuides:"Todas las guías",next:"Página siguiente",hintB:"Toca la imagen",hint:" para ver cómo se pronuncia la frase.",ok:"Entendido",seePr:"Ver la pronunciación"},
  en:{guide:"FRENCH",guide2:"Survival guide",from:"EN",start:"Start",dep:"DEPARTURE",now:"Now",dest:"DESTINATION",me:"The French me",first:"FIRST CLASS",
      search:"Search a phrase in English or French",searchL:"Search a phrase",resume:"Pick up where you left off",toc:"Table of contents",tap:"Tap a topic",
      paris:"Paris Guide",parisSub:"What to see in Paris? Monuments, museums, walks…",bonusT:"Bonus",bonusS:"Extra content",extra:"Extra content",
      nGuide:"Guide",nBonus:"Bonus",nParis:"Paris",soon:"This part is coming in the next version.",up:"Back to top ↑",
      pHead:"What to see in Paris?",pSub:"Discover your next visits in Paris",city:"Understanding the city",mapT:"Map of the districts",mapAlt:"Map of the Paris districts",
      move:"Getting around",safety:"Safety",hours:"Opening hours",credits:"Photo credits",src:"Source",lic:"License",
      paid:"Paid",free:"Free",metro:"Nearest metro",go:"Directions",crnote:"Tap a photo to see its author and license",
      none:"No phrase found.",audioSoon:"🎧 Audio coming soon",noPlay:"Couldn't play the audio",noLoad:"Couldn't load the content.",home:"Home",lang:"Language",allGuides:"All guides",next:"Next page",hintB:"Tap the picture",hint:" to see how the phrase is pronounced.",ok:"Got it",seePr:"See the pronunciation"}
};
const t = k => TXT[LANG][k];
const homeTitle = (e, i) => LANG === "en" ? (i < 0 ? [t("bonusT"), t("bonusS")] : HOME_EN[i]) : [e[0], e[1]];
const rowLabel = l => LANG === "en" ? (ROW_EN[l] || l) : l;
const TILE_ES = {Visitas:"Exploración"};
const tileLabel = g => LANG === "en" ? (TILE_EN[g] || g) : (TILE_ES[g] || g);

const ICON = {
  home:'<svg viewBox="0 0 24 24"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3z"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  spk:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
};

let C, UI, player;
const app = document.getElementById("app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const slug = n => n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ /g,"-").toLowerCase();
const mi = (name, cls="mi") => `<i class="${cls}" style="-webkit-mask-image:url('img/ui/${slug(name)}.png');mask-image:url('img/ui/${slug(name)}.png')"></i>`;
const sec = name => C.sections.find(s => s.name === name);
function toast(m){ const t=document.getElementById("toast"); t.textContent=m; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),1800); }

/* ---------- Comptes : accueil, création de compte, connexion ----------
   Actif seulement sur le site publié (Netlify / domaine Evoala), où Firebase est autorisé. */
const AUTH_ON = /netlify\.app$|evoala|^localhost$|^127\./.test(location.hostname);
if(AUTH_ON){ const s = document.createElement("script"); s.type = "module"; s.src = "auth.js"; document.head.appendChild(s); }
const onboarded = { get(){ try{ return localStorage.getItem("evoala-onb") === "1"; }catch(e){ return true; } },
                    set(){ try{ localStorage.setItem("evoala-onb", "1"); }catch(e){} } };
const ACC = {
  es:{wTitle:"Aprende francés", wHi:"alcanzando objetivos", wEnd:"concretos", wSub:"Viajar, empezar desde cero o aprobar el DELF: cada guía te lleva a una meta clara, con audio y pronunciación.",
      start:"Empezar", have:"¿Ya tienes una cuenta?", login:"Iniciar sesión", goal:"Objetivo cumplido", goalSub:"Pedir en un café",
      upT:"Guarda tu progreso", upS:"Crea tu cuenta gratis y retoma tus guías en cualquier dispositivo.", inT:"Bienvenido de nuevo", inS:"Inicia sesión para retomar tus guías donde las dejaste.",
      later:"Ahora no", back:"Volver", google:"Continuar con Google", or:"o con tu correo", email:"Correo electrónico", emailPh:"tu@correo.com", pass:"Contraseña", passPh:"8 caracteres como mínimo",
      show:"Mostrar la contraseña", create:"Crear mi cuenta", enter:"Entrar", noAcc:"¿No tienes cuenta?", createLink:"Crear una cuenta", forgot:"¿Olvidaste tu contraseña?",
      legal:"Al continuar, aceptas las Condiciones de uso y la Política de privacidad de Evoala.", wait:"Un momento…", welcome:"¡Listo! Tu progreso se guarda en tu cuenta.",
      resetSent:"Te enviamos un correo para cambiar tu contraseña.", needEmail:"Escribe tu correo arriba y vuelve a tocar aquí.", account:"Mi cuenta", signout:"Cerrar sesión", signedOut:"Sesión cerrada.", signedAs:"Conectado como",
      err:{"auth/invalid-email":"Ese correo no parece válido.","auth/missing-password":"Escribe una contraseña.","auth/weak-password":"La contraseña debe tener al menos 8 caracteres.","auth/email-already-in-use":"Ya existe una cuenta con ese correo. Toca « Iniciar sesión ».","auth/invalid-credential":"Correo o contraseña incorrectos.","auth/wrong-password":"Correo o contraseña incorrectos.","auth/user-not-found":"No encontramos una cuenta con ese correo.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet.","auth/popup-closed-by-user":"Se cerró la ventana de Google.","auth/unauthorized-domain":"Este sitio todavía no está autorizado en Firebase.","auth/operation-not-allowed":"Este método de conexión todavía no está activado.","off":"Las cuentas no están disponibles por el momento.","x":"Algo salió mal. Inténtalo de nuevo."}},
  en:{wTitle:"Learn French", wHi:"by reaching", wEnd:"concrete goals", wSub:"Travel, start from scratch or pass the DELF: each guide takes you to a clear goal, with audio and pronunciation.",
      start:"Get started", have:"Already have an account?", login:"Log in", goal:"Goal reached", goalSub:"Ordering at a café",
      upT:"Save your progress", upS:"Create your free account and pick up your guides on any device.", inT:"Welcome back", inS:"Log in to pick up your guides where you left off.",
      later:"Not now", back:"Back", google:"Continue with Google", or:"or with your email", email:"Email", emailPh:"you@email.com", pass:"Password", passPh:"At least 8 characters",
      show:"Show password", create:"Create my account", enter:"Log in", noAcc:"Don't have an account?", createLink:"Create one", forgot:"Forgot your password?",
      legal:"By continuing, you accept Evoala's Terms of use and Privacy policy.", wait:"One moment…", welcome:"Done! Your progress is saved to your account.",
      resetSent:"We sent you an email to reset your password.", needEmail:"Type your email above, then tap here again.", account:"My account", signout:"Log out", signedOut:"Logged out.", signedAs:"Signed in as",
      err:{"auth/invalid-email":"That email doesn't look valid.","auth/missing-password":"Type a password.","auth/weak-password":"Your password needs at least 8 characters.","auth/email-already-in-use":"An account already exists with that email. Tap “Log in”.","auth/invalid-credential":"Wrong email or password.","auth/wrong-password":"Wrong email or password.","auth/user-not-found":"No account found with that email.","auth/too-many-requests":"Too many attempts. Please wait a few minutes.","auth/network-request-failed":"No connection. Check your internet.","auth/popup-closed-by-user":"The Google window was closed.","auth/unauthorized-domain":"This site isn't authorized in Firebase yet.","auth/operation-not-allowed":"This sign-in method isn't enabled yet.","off":"Accounts aren't available right now.","x":"Something went wrong. Please try again."}}
};
const a = k => ACC[LANG][k];
const authErr = e => a("err")[e && e.code] || a("err")[e === "off" ? "off" : "x"];
const langToggle = cls => `<div class="lang ${cls}" role="group" aria-label="${t("lang")}"><button class="${LANG==='es'?'on':''}" data-lang="es" aria-pressed="${LANG==='es'}">ES</button><button class="${LANG==='en'?'on':''}" data-lang="en" aria-pressed="${LANG==='en'}">EN</button></div>`;

function welcome(){
  const tile = (img, cls) => `<span class="wtile ${cls}"><img src="img/hub/${img}.webp" alt=""></span>`;
  app.innerHTML = `
  <section class="wtop">
    <div class="wbar"><span class="wlogo"><img src="img/ui/logo.webp" alt="evoala"></span>${langToggle("wl")}</div>
    <div class="wart" aria-hidden="true">${tile("a1","t1")}${tile("voyage","t2")}${tile("delfb1","t3")}${tile("delfa2","t4")}
      <span class="wgoal"><i><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></i><span><b>${a("goal")}</b>${a("goalSub")}</span></span></div>
  </section>
  <section class="wtext">
    <h1>${a("wTitle")}<br><span>${a("wHi")}</span> ${a("wEnd")}</h1>
    <p>${a("wSub")}</p>
    <div class="wact"><button class="bigbtn" data-start>${a("start")} <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      <div class="wlink">${a("have")} <button data-go="entrar">${a("login")}</button></div></div>
  </section>`;
}
function account(mode){
  const up = mode === "up";
  app.innerHTML = `
  <div class="abar"><button class="aback" data-aback aria-label="${a("back")}"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button class="alater" data-later>${a("later")}</button></div>
  <form class="aform" novalidate>
    <div class="ahead"><span><img src="img/hub/voyage.webp" alt=""></span><div><h1>${a(up ? "upT" : "inT")}</h1><p>${a(up ? "upS" : "inS")}</p></div></div>
    <button type="button" class="social" data-google><i class="gmark" aria-hidden="true">G</i><span>${a("google")}</span></button>
    <div class="aor"><span></span>${a("or")}<span></span></div>
    <label>${a("email")}<span class="afield"><input type="email" name="email" autocomplete="email" placeholder="${a("emailPh")}" required></span></label>
    <label>${a("pass")}<span class="afield"><input type="password" name="pass" autocomplete="${up ? "new-password" : "current-password"}" placeholder="${a("passPh")}" minlength="8" required>
      <button type="button" class="eye" data-eye aria-label="${a("show")}"><svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></span></label>
    ${up ? "" : `<button type="button" class="forgot" data-forgot>${a("forgot")}</button>`}
    <p class="aerr" role="alert"></p>
    <button type="submit" class="bigbtn">${a(up ? "create" : "enter")}</button>
    <div class="wlink">${up ? `${a("have")} <button type="button" data-go="entrar">${a("login")}</button>` : `${a("noAcc")} <button type="button" data-go="cuenta">${a("createLink")}</button>`}</div>
    <p class="alegal">${a("legal")}</p>
  </form>`;
  const form = app.querySelector(".aform"), err = app.querySelector(".aerr"), btn = form.querySelector('[type="submit"]');
  const busy = (on, b = btn) => { b.disabled = on; b.classList.toggle("busy", on); };
  const done = () => { onboarded.set(); toast(a("welcome")); location.hash = ""; route(); };
  const fail = e => { err.textContent = authErr(e); };
  const authOk = () => window.EvoAuth && !window.EvoAuth.disabled;
  form.onsubmit = async ev => {
    ev.preventDefault(); err.textContent = "";
    if(!authOk()) return fail("off");
    const email = form.email.value.trim(), pass = form.pass.value;
    if(up && pass.length < 8) return fail({ code: "auth/weak-password" });
    busy(true);
    try{ await (up ? window.EvoAuth.signUp(email, pass) : window.EvoAuth.signIn(email, pass)); done(); }
    catch(e){ fail(e); } finally{ busy(false); }
  };
  form.querySelector("[data-google]").onclick = async ev => {
    err.textContent = ""; if(!authOk()) return fail("off");
    const b = ev.currentTarget; busy(true, b);
    try{ const r = await window.EvoAuth.google(); if(r) done(); } catch(e){ fail(e); } finally{ busy(false, b); }
  };
  form.querySelector("[data-eye]").onclick = () => { const i = form.pass; i.type = i.type === "password" ? "text" : "password"; };
  const fg = form.querySelector("[data-forgot]");
  if(fg) fg.onclick = async () => {
    err.textContent = ""; if(!authOk()) return fail("off");
    const email = form.email.value.trim(); if(!email) return (err.textContent = a("needEmail"));
    try{ await window.EvoAuth.reset(email); toast(a("resetSent")); } catch(e){ fail(e); }
  };
}
// bouton « compte » discret dans le hub
function accountChip(){
  if(!AUTH_ON) return "";
  const u = window.EvoAuth && window.EvoAuth.user;
  if(!u) return `<button class="achip" data-go="entrar">${a("login")}</button>`;
  const ini = esc(((u.displayName || u.email || "?").trim()[0] || "?").toUpperCase());
  return `<div class="amenu"><button class="avatar" data-amenu aria-label="${a("account")}" aria-expanded="false">${ini}</button>
    <div class="apop" hidden><small>${a("signedAs")}</small><b>${esc(u.email || u.displayName || "")}</b><button data-signout>${a("signout")}</button></div></div>`;
}
// quand on se connecte : on récupère la langue et la dernière page du compte
let lastUid = null;
function onAuth(u){
  const uid = u ? u.uid : null;
  if(uid && uid !== lastUid){
    window.EvoAuth.load().then(d => {
      if(d && d.last){ try{ localStorage.setItem("evoala-last", d.last); }catch(e){} }
      if(d && d.lang && d.lang !== LANG) setLang(d.lang, true);
      else if(!location.hash) route();
      if(!d) window.EvoAuth.save({ lang: LANG, last: store.get() || null });
    });
  }
  lastUid = uid;
  const h = location.hash.slice(1);
  if(!h || h === "cuenta" || h === "entrar") route();
}

/* ---------- Hub : page d'accueil avec toutes les guías ---------- */
const HUB = {
  es:{t1:"Una guía para",t2:"cada objetivo",sub:"Cada guía te acompaña hacia una meta concreta. Empieza por la que más te sirve hoy.",
      subWide:" Viajar, empezar desde cero o aprobar el DELF: tú decides.",badge:"Versión de prueba",kicker:"Guía de supervivencia",title:"Francés para viajar",
      mission:"Misión:",goal:"entender y hacerte entender en Francia durante tu viaje.",chips:["757 frases útiles","Audio y pronunciación","Guía de Paris","Todos los niveles"],
      cta:"Empezar a aprender",others:"Otras guías",othersSub:"Cada una con su objetivo",level:"Nivel",soon:"Muy pronto",more:"Más guías en camino",
      notify:"Avísame cuando salga una guía",notifyToast:"Muy pronto podrás dejar tu correo aquí.",how:"¿Cómo aprendes?",
      steps:[["Elige tu objetivo","Viajar, empezar desde cero o preparar el DELF."],["Escucha y repite","Cada frase tiene su audio y su pronunciación escrita."],["Úsalo en la vida real","En tu teléfono, cuando lo necesites, incluso en Francia."]],
      guides:[["Francés A1","desde cero","Descubrir el francés y dar tus primeros pasos"],["DELF A1","examen oficial","Hablar de ti, tu casa y tus gustos, y obtener tu primer diploma"],
        ["DELF A2","examen oficial","Desenvolverte en la vida diaria: pedir, comprar, preguntar"],["DELF B1","examen oficial","Estudiar y conversar con autonomía"],["DELF B2","examen oficial","Debatir y defender tus ideas en francés"]]},
  en:{t1:"A guide for",t2:"every goal",sub:"Each guide takes you toward a concrete goal. Start with the one that helps you most today.",
      subWide:" Travel, start from scratch or pass the DELF: you decide.",badge:"Trial version",kicker:"Survival guide",title:"French for traveling",
      mission:"Mission:",goal:"understand and make yourself understood in France during your trip.",chips:["757 useful phrases","Audio and pronunciation","Paris Guide","All levels"],
      cta:"Start learning",others:"Other guides",othersSub:"Each with its own goal",level:"Level",soon:"Coming soon",more:"More guides on the way",
      notify:"Let me know when a new guide is out",notifyToast:"Soon you'll be able to leave your email here.",how:"How do you learn?",
      steps:[["Choose your goal","Travel, start from scratch or prepare for the DELF."],["Listen and repeat","Each phrase has its audio and its written pronunciation."],["Use it in real life","On your phone, whenever you need it, even in France."]],
      guides:[["French A1","from scratch","Discover French and take your first steps"],["DELF A1","official exam","Talk about yourself, your home and your tastes, and earn your first diploma"],
        ["DELF A2","official exam","Get by in daily life: ordering, buying, asking"],["DELF B1","official exam","Study and hold conversations with confidence"],["DELF B2","official exam","Debate and defend your ideas in French"]]}
};
const HUB_LOOK = [["a1","A1","#0F7C72","#E3F4F1"],["delfa1","A1","#C2410C","#FDEBDD"],["delfa2","A2","#BE185D","#FCE4EF"],["delfb1","B1","#1D4ED8","#E2EAFD"],["delfb2","B2","#6D28D9","#EDE7FC"]];
function hub(){
  const H = HUB[LANG], arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const card = (g, i) => { const [img, lvl, fg, bg] = HUB_LOOK[i];
    return `<div class="gcard" style="--fg:${fg};--bg:${bg}"><div class="gcover"><img src="img/hub/${img}.webp" alt=""><span>${H.level} ${lvl}</span></div>
      <div class="gbody"><b>${esc(g[0])} <small>· ${esc(g[1])}</small></b><p><strong>${H.mission}</strong> ${esc(g[2])}</p><em>${H.soon}</em></div></div>`; };
  app.innerHTML = `
  <header class="hubtop"><img src="img/ui/logo.webp" alt="evoala">
    <div class="hubright">${accountChip()}${langToggle("hl")}</div></header>
  <main class="hubmain">
    <div class="hero"><div><h1>${H.t1}<br><span>${H.t2}</span></h1><p>${H.sub}<span class="wideonly">${H.subWide}</span></p></div>
      <section class="feat">
        <div class="fhead"><span class="fimg"><img src="img/hub/voyage.webp" alt=""></span>
          <div><span class="fbadge">${H.badge}</span><small>${H.kicker}</small><b>${H.title}</b></div></div>
        <div class="fbody"><p><strong>${H.mission}</strong> ${H.goal}</p>
          <div class="fchips">${H.chips.map(c => `<span>${c}</span>`).join("")}</div>
          <button class="fcta" data-go="guia">${H.cta} ${arrow}</button></div>
      </section></div>
    <div class="ghead"><b>${H.others}</b><span>${H.othersSub}</span></div>
    <div class="ggrid">${H.guides.map(card).join("")}<div class="gmore"><span>+</span>${H.more}</div></div>
    <div class="hubfoot">
      <section class="how"><b>${H.how}</b>${H.steps.map((s, i) => `<div><span>${i+1}</span><p><strong>${s[0]}</strong><br>${s[1]}</p></div>`).join("")}</section>
      <button class="notify" data-notify><svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>${H.notify}</button>
    </div>
  </main>`;
}

/* ---------- Accueil ---------- */
// sous-catégorie -> bouton violet clair qui ouvre directement le bon onglet
function chip([label, tab], s){
  const i = sec(s).tabs.findIndex(t => t.name === tab);
  const soon = i < 0 || !(sec(s).tabs[i].subs || [sec(s).tabs[i]]).some(v => v.groups.some(g => g.phrases.length));
  return `<button class="chip${soon?' soon':''}" data-go="${soon?'':`s${GRID.indexOf(s) >= 0 ? GRID.indexOf(s) : 8}t${i}`}">${esc(rowLabel(label))}</button>`;
}
function scard(e, i){
  const [title, , s, rows] = e, [tt, ts] = homeTitle(e, i);
  return `<div class="scard"><div class="shead"><img src="${UI['h:'+title]}" alt=""><div><b>${esc(tt)}</b><i>${esc(ts)}</i></div></div>
    <div class="chips">${rows.map(r => chip(r, s)).join("")}</div></div>`;
}
// dernière page de phrases ouverte (gardée sur le téléphone)
const store = { get(){ try{ return localStorage.getItem("evoala-last"); }catch(e){ return null; } },
                set(v){ try{ localStorage.setItem("evoala-last", v); }catch(e){} window.EvoAuth?.save({ last: v }); } };
function lastInfo(){
  const h = store.get(), m = h && h.match(/^s(\d+)t(\d+)$/); if(!m) return null;
  const si = +m[1], s = si === 8 ? "Bonus" : GRID[si], tab = sec(s)?.tabs[+m[2]]; if(!tab) return null;
  const entry = [...HOME, BONUS].find(e => e[2] === s); if(!entry) return null;
  const row = entry[3].find(r => r[1] === tab.name);
  return { hash: h, title: entry[0], label: row ? rowLabel(row[0]) : (tab.label || tab.name) };
}
function home(){
  const last = lastInfo();
  app.innerHTML = `
  <button class="tohub" data-go="" data-home>‹ ${t("allGuides")}</button>
  <div class="ticket">
    <div class="tk-top"><img class="logo" src="img/ui/logo.webp" alt="evoala">
      <div class="lang" role="group" aria-label="${t("lang")}"><button class="${LANG==='es'?'on':''}" data-lang="es" aria-pressed="${LANG==='es'}">ES</button><button class="${LANG==='en'?'on':''}" data-lang="en" aria-pressed="${LANG==='en'}">EN</button></div></div>
    <div class="route"><div class="t1"><small>${t("guide")}</small>${t("guide2")}</div>
      <div class="esfr">${t("from")} <b><svg viewBox="0 0 24 24"><path d="M2 12h20M14 5l7 7-7 7"/></svg></b> FR</div></div>
    <button class="start" data-go="s0t0">${t("start")} <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    <div class="stub"><div>${t("dep")}<b>${t("now")}</b></div><div>${t("dest")}<b>${t("me")}</b></div><span class="first">${t("first")}</span></div>
  </div>
  <label class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="q" placeholder="${t("search")}" autocomplete="off" aria-label="${t("searchL")}"></label>
  <div id="results"></div>
  <div id="menu">
    ${last ? `<button class="resume" data-go="${last.hash}"><img src="${UI['h:'+last.title]||''}" alt="">
      <span><small>${t("resume")}</small><b>${esc(last.label)}</b></span><i><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></i></button>` : ""}
    <div class="tochead"><b>${t("toc")}</b><small>${t("tap")}</small></div>
    <div class="toc">${HOME.map((e,i) => scard(e,i)).join("")}</div>
    <div class="extras">
      ${scard(BONUS,-1).replace('class="scard"','class="scard bonus"')}
      <button class="pcard" data-go="p1"><img src="${UI['h:Guía de Paris']}" alt=""><span><b>${t("paris")}</b><small>${t("parisSub")}</small></span><em>›</em></button>
    </div>
  </div>`;
  document.getElementById("q").addEventListener("input", e => search(e.target.value));
}

/* ---------- Barre du haut ---------- */
function topbar(where){
  return `<div class="top"><button class="home" data-go="guia" aria-label="${t("home")}">${ICON.home}</button>
    <img class="logo" src="img/ui/logo.webp" alt="evoala"></div>`;
}
// barre du bas : Guía / Paris / Bonus, sur toutes les pages
function navbar(where){
  const eiffel = '<svg class="nico" viewBox="0 0 24 24"><path d="M12 2v3M10.5 5h3l1 6h-5zM9.5 11h5l3.5 10h-3.8a2.2 2.2 0 0 0-4.4 0H6z"/><path d="M8 15h8"/></svg>';
  const it = (go, icon, label, on) => `<button class="${on?'on':''}" data-go="${go}">${icon ? mi(icon) : eiffel}<span>${label}</span></button>`;
  return `<nav class="nav">${it("guia", "p-Guía", t("nGuide"), where==="guide"||where==="home")}${it("s8t0", "p-Bonus", t("nBonus"), where==="bonus")}${it("p1", "", t("nParis"), where==="paris")}</nav>`;
}

/* ---------- Pages de phrases ---------- */
function rowHTML(p){
  const bulb = `<i class="bulb">${ICON.bulb}</i>`, al = ` role="button" aria-label="${t("seePr")}"`;
  const ic = p.num ? `<div class="ic num${p.num.length>2?' long':''}"${al}>${esc(p.num)}${bulb}</div>` : p.icon ? `<div class="ic" style="background-image:url('${p.icon[0]}');--i:${p.icon[1]}"${al}>${bulb}</div>` : `<div class="ic"${al}>${bulb}</div>`;
  const au = p.audio ? `${p.audio[0]}#${p.audio[1]}` : "";
  return `<div class="row${p.who==='staff'?' staff':''}" data-audio="${esc(au)}">
    ${ic}<div class="ph"><div class="fr">${esc(p.fr)}</div>
    <div class="es" data-es="${esc(p.es)}" data-pr="${esc(p.pr)}">${esc(p.es)}</div></div>
    <div class="spk">${ICON.spk}</div></div>`;
}
function tipHTML(t){
  if(t.table) return `<div class="dato"><b>💡 ${esc(t.title)}:</b><table class="dtab"><tr>${t.table.head.map(h=>`<th>${h?`<span>${esc(h)}</span>`:""}</th>`).join("")}</tr>
    ${t.table.rows.map(r=>`<tr><td>${esc(r[0])}</td>${r.slice(1).map(c=>`<td><b>${esc(c[0])}<em>${esc(c[1])}</em></b><small>${esc(c[2])}</small></td>`).join("")}</tr>`).join("")}</table></div>`;
  return `<div class="dato"><b>💡 ${esc(t.title)}:${t.sub?` <span class="dsub">${esc(t.sub)}</span>`:""}</b>${esc(t.text)}</div>`;
}
// bandeau « Toca la imagen » : affiché tant qu'on n'a pas touché « Entendido »
const hintSeen = () => { try{ return localStorage.getItem("evoala-hint") === "1"; }catch(e){ return false; } };
function hintHTML(view){
  const p = view.groups.flatMap(g => g.phrases).find(x => x.icon);
  if(hintSeen() || !p) return "";
  return `<div class="hint"><div class="ic" style="background-image:url('${p.icon[0]}');--i:${p.icon[1]}"><i class="bulb">${ICON.bulb}</i></div>
    <p><b>${t("hintB")}</b>${t("hint")}</p><button data-hint>${t("ok")}</button></div>`;
}
function phrases(si, ti, sub=0){
  const s = si === 8 ? sec("Bonus") : sec(GRID[si]);
  const tab = s.tabs[ti]; if(!tab) return home();
  const view = tab.subs ? tab.subs[sub] : tab;
  app.innerHTML = `${topbar(si===8?"bonus":"guide")}
    ${si===8 ? `<div class="phead"><b>${t("extra")}</b></div>` :
      `<div class="tiles">${GRID.map((g,i)=>`<button class="tile${i===si?' on':''}" data-go="s${i}t0">${mi("t-"+g)}${tileLabel(g)}</button>`).join("")}</div>`}
    <div class="tabs">${s.tabs.map((tb,i)=>`<button class="tab${i===ti?' on':''}" data-go="s${si}t${i}">${esc(tb.label || tb.name)}</button>`).join("")}</div>
    ${tab.subs?`<div class="subs">${tab.subs.map((x,i)=>`<button class="${i===sub?'on':''}" data-sub="${i}">${esc(x.name)}</button>`).join("")}</div>`:""}
    ${view.intro?`<p class="intro">${esc(view.intro)}</p>`:""}
    ${hintHTML(view)}
    ${!view.groups.some(g=>g.phrases.length) ? `<div class="empty">${t("soon")}</div>` : ""}
    ${view.groups.filter(g=>g.phrases.length).map(g=>`<div class="card${g.cols===2?' cols2':''}">${g.label?`<div class="label">${esc(g.label)}</div>`:""}${g.phrases.map(rowHTML).join("")}</div>`).join("")}
    ${(view.tips||[]).map(tipHTML).join("")}
    ${tab.subs && sub < tab.subs.length - 1 ? `<button class="nextsub" data-sub="${sub+1}">${t("next")}: <b>${esc(tab.subs[sub+1].name)}</b> →</button>` : ""}
    <button class="up" data-up>${t("up")}</button>`;
  app.querySelectorAll("[data-sub]").forEach(b => b.onclick = () => { phrases(si, ti, +b.dataset.sub); scrollTo(0,0); preload(); });
}

/* ---------- Guía de Paris ---------- */
function parisHead(ci){
  return `${topbar("paris")}
    <div class="phead"><b>${t("pHead")}</b><small>${t("pSub")}</small></div>
    <div class="tiles">${PARIS_CATS.map((c,i)=>`<button class="tile${i===ci?' on':''}" data-go="p${i}">${mi("t-"+c)}${tileLabel(c)}</button>`).join("")}</div>`;
}
function sobre(){
  const S = C.sobre;
  app.innerHTML = `${parisHead(0)}
    <div class="card sob"><div class="label">${t("city")}</div>
      <div class="sgrid">${S.cards.map(c=>`<div class="sbox"><div class="snum"><b>${esc(c.num)}</b> ${esc(c.title)}</div>${esc(c.text)}${c.strong?` <strong>${esc(c.strong)}</strong>`:""}</div>`).join("")}</div>
      <div class="label" style="margin-top:14px">${t("mapT")}</div>
      <img class="map" src="${S.map}" alt="${t("mapAlt")}"></div>
    <div class="card sob"><div class="label">${t("move")}</div>
      ${S.transport.map(t=>`<div class="trow"><span class="tname">${esc(t[0])}</span><div><b>${esc(t[1])}</b>${t[2]?`<small>${esc(t[2])}</small>`:""}</div></div>`).join("")}</div>
    <div class="card sob"><div class="label">${t("safety")}</div>
      <p class="secp"><b>${esc(S.security.title)}</b><br>${esc(S.security.text)}</p>
      <div class="chips2">${S.security.chips.map(c=>`<span>${esc(c)}</span>`).join("")}</div></div>
    <div class="card sob"><div class="label">${t("hours")}</div>
      ${S.hours.map(h=>`<div class="hrow"><img src="${h[0]}" alt=""><div><b>${esc(h[1])}</b>${esc(h[2])}</div></div>`).join("")}</div>
    <button class="up" data-up>${t("up")}</button>`;
}
function credits(){
  const cats = [...new Set(C.credits.map(c=>c.cat))];
  app.innerHTML = `${parisHead(-1)}
    <div class="card sob"><div class="label">${t("credits")}</div>
    ${cats.map(cat=>`<div class="ccat">${esc(cat)}</div>${C.credits.filter(c=>c.cat===cat).map(c=>`<div class="crow"><b>${esc(c.name)}</b><small>${esc(c.author)}</small>
      <span>${c.src?`<a href="${esc(c.src)}" target="_blank" rel="noopener">${t("src")}</a>`:""}${c.lic?`<a href="${esc(c.lic)}" target="_blank" rel="noopener">${t("lic")}</a>`:""}</span></div>`).join("")}`).join("")}
    </div><button class="up" data-up>${t("up")}</button>`;
}
function paris(ci, page=0){
  if(ci === 0) return sobre();
  const cat = PARIS_CATS[ci];
  const all = C.paris.filter(p => p.cat === cat);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const list = all.slice(page*PER_PAGE, (page+1)*PER_PAGE);
  app.innerHTML = `${parisHead(ci)}
    ${pages>1?`<div class="pager">${Array.from({length:pages},(_,i)=>`<button class="${i===page?'on':''}" data-pp="${i}">${i+1}</button>`).join("")}</div>`:""}
    <div class="legend"><span><i class="fee paid" style="width:18px;height:18px;font-size:10px">€</i>${t("paid")}</span>
      <span><i class="fee free" style="width:18px;height:18px;font-size:10px">✓</i>${t("free")}</span>
      <span><i class="mlogo">M</i>${t("metro")}</span></div>
    ${list.length ? list.map(p=>`<div class="place">
      <div class="ptop">${p.photo?(p.credit?.src?`<a class="phwrap" href="${esc(p.credit.src)}" target="_blank" rel="noopener">`:`<span class="phwrap">`)+`<img class="photo" loading="lazy" src="${p.photo}" alt="${esc(p.name)}">${p.credit?`<i class="cr">©</i>`:""}`+(p.credit?.src?`</a>`:`</span>`):`<div class="photo"></div>`}
        <div class="pinfo"><div class="pname">${esc(p.name)}</div>
          ${p.station?`<div class="metro"><i class="mlogo">M</i>${esc(p.station)} ${p.lines.map(l=>`<span class="line" style="background:${l.c}">${esc(l.n)}</span>`).join("")}</div>`:""}
          <div class="pdesc">${esc(p.desc)}</div>
          <div class="pact">${p.maps?`<a class="go" href="${esc(p.maps)}" target="_blank" rel="noopener">📍 ${t("go")}</a>`:""}
            <span class="fee ${p.paid?'paid':'free'}">${p.paid?'€':'✓'}</span></div></div></div>
      </div>`).join("")
      : `<div class="empty">${t("soon")}</div>`}
    <p class="crnote">${t("crnote")} · <button data-go="creditos">${t("credits")}</button></p>
    <button class="up" data-up>${t("up")}</button>`;
  app.querySelectorAll("[data-pp]").forEach(b => b.onclick = () => { paris(ci, +b.dataset.pp); scrollTo(0,0); });
}

/* ---------- Recherche ---------- */
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
function search(q){
  q = norm(q.trim());
  const res = document.getElementById("results"), menu = document.getElementById("menu");
  if(!q){ res.innerHTML = ""; menu.style.display = ""; return; }
  menu.style.display = "none";
  const hits = [];
  C.sections.forEach(s => s.tabs.flatMap(t => t.subs || [t]).forEach(t => t.groups.forEach(g => g.phrases.forEach(p => {
    if(norm(p.fr).includes(q) || norm(p.es).includes(q)) hits.push(p);
  }))));
  res.innerHTML = hits.length ? `<div class="card">${hits.slice(0,60).map(rowHTML).join("")}</div>` : `<div class="empty">${t("none")}</div>`;
}

/* ---------- Clics ---------- */
app.addEventListener("click", e => {
  const lb = e.target.closest("[data-lang]");
  if(lb){ setLang(lb.dataset.lang); return; }
  const go = e.target.closest("[data-go]");
  if(go){ if(go.dataset.go || go.classList.contains("home") || go.hasAttribute("data-home")){ location.hash = go.dataset.go; if(!go.dataset.go) route(); } return; }
  if(e.target.closest("[data-start]")){ onboarded.set(); location.hash = "cuenta"; return; }
  if(e.target.closest("[data-later]")){ onboarded.set(); location.hash = ""; route(); return; }
  if(e.target.closest("[data-aback]")){ if(history.length > 1) history.back(); else { location.hash = ""; } return; }
  const am = e.target.closest("[data-amenu]");
  if(am){ const pop = am.parentElement.querySelector(".apop"); pop.hidden = !pop.hidden; am.setAttribute("aria-expanded", String(!pop.hidden)); return; }
  if(e.target.closest("[data-signout]")){ window.EvoAuth.signOut().then(() => { toast(a("signedOut")); route(); }); return; }
  if(e.target.closest("[data-notify]")){ toast(HUB[LANG].notifyToast); return; }
  if(e.target.closest("[data-hint]")){ try{ localStorage.setItem("evoala-hint","1"); }catch(_){} app.querySelector(".hint")?.remove(); return; }
  if(e.target.closest("[data-up]")){ scrollTo({top:0,behavior:"smooth"}); return; }
  const row = e.target.closest(".row"); if(!row) return;
  if(e.target.closest(".ic")){                       // l'illustration = prononciation
    const es = row.querySelector(".es");
    const on = !es.classList.contains("showpr");
    es.classList.toggle("showpr", on);
    row.classList.toggle("pron", on);
    es.innerHTML = on ? `<span class="pr">${esc(es.dataset.pr)}</span>` : esc(es.dataset.es);
    return;
  }
  if(!row.dataset.audio){ toast(t("audioSoon")); return; }  // le reste de la ligne = audio
  playRow(row);
});

/* Audio : un fichier par page du PDF (snd/pNN.json), chargé au premier clic puis gardé en mémoire */
const bundles = {}, urls = {};
function bundle(file){
  return bundles[file] ??= fetch(file).then(r => r.json());
}
async function playRow(row){
  const [file, id] = row.dataset.audio.split("#");
  if(player) player.pause();
  document.querySelectorAll(".row.playing").forEach(r => r.classList.remove("playing"));
  row.classList.add("playing");
  try{
    if(!urls[id]){
      const b = await bundle(file);
      const bin = Uint8Array.from(atob(b[id]), c => c.charCodeAt(0));
      urls[id] = URL.createObjectURL(new Blob([bin], {type:"audio/mpeg"}));
    }
    player = new Audio(urls[id]);
    player.onended = () => row.classList.remove("playing");
    await player.play();
  }catch(e){ row.classList.remove("playing"); toast(t("noPlay")); }
}
// précharge l'audio de la page affichée
function preload(){ const r = app.querySelector(".row[data-audio^='snd']"); if(r) bundle(r.dataset.audio.split("#")[0]); }

function route(){
  const h = location.hash.slice(1);
  let m;
  let where = "home";
  if((m = h.match(/^s(\d+)t(\d+)$/))){ phrases(+m[1], +m[2]); where = +m[1] === 8 ? "bonus" : "guide"; store.set(h); }
  else if((m = h.match(/^p(\d+)$/))){ paris(+m[1]); where = "paris"; }
  else if(h === "creditos"){ credits(); where = "paris"; }
  else if(h === "guia") home();
  else if(AUTH_ON && (h === "cuenta" || h === "entrar")){ if(window.EvoAuth && window.EvoAuth.user){ location.hash = ""; return; } account(h === "cuenta" ? "up" : "in"); where = "hub"; }
  else if(AUTH_ON && !onboarded.get() && !(window.EvoAuth && window.EvoAuth.user)){ welcome(); where = "onb"; }
  else { hub(); where = "hub"; }
  app.classList.toggle("wide", where === "home" || where === "hub");
  app.classList.toggle("hubmode", where === "hub" || where === "onb");
  app.classList.toggle("onbmode", where === "onb");
  let nav = document.getElementById("navbar");
  if(!nav){ nav = document.createElement("div"); nav.id = "navbar"; document.body.appendChild(nav);
    nav.addEventListener("click", e => { const b = e.target.closest("[data-go]"); if(!b) return; location.hash = b.dataset.go; if(!b.dataset.go) route(); }); }
  nav.innerHTML = where === "hub" || where === "onb" ? "" : navbar(where);
  scrollTo(0,0); preload();
}
addEventListener("hashchange", route);
const contents = {};
const loadContent = l => contents[l] ??= fetch(l === "en" ? "content-en.json" : "content.json").then(r => r.json());
function setLang(l, fromAccount){
  if(l === LANG) return;
  LANG = l; try{ localStorage.setItem("evoala-lang", l); }catch(e){}
  if(!fromAccount) window.EvoAuth?.save({ lang: l });
  document.documentElement.lang = l;
  loadContent(l).then(c => { C = c; const y = scrollY; route(); scrollTo(0, y); })
    .catch(() => toast(t("noLoad")));
}
document.documentElement.lang = LANG;
Promise.all([loadContent(LANG), fetch("ui.json").then(r=>r.json())])
  .then(([c,u]) => { C = c; UI = u; route();
    if(AUTH_ON){ const hook = () => window.EvoAuth ? window.EvoAuth.onChange(onAuth) : setTimeout(hook, 150); hook(); } })
  .catch(() => app.innerHTML = `<div class="empty">${t("noLoad")}</div>`);
