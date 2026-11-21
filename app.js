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
      none:"Ninguna frase encontrada.",audioSoon:"🎧 Audio disponible pronto",noPlay:"No se pudo reproducir",noLoad:"No se pudo cargar el contenido.",home:"Inicio",lang:"Idioma",allGuides:"Todas las guías",next:"Página siguiente",pick:"Elige la categoría que quieres estudiar",tuto:"Ver el tutorial",gTitle:"Francés para viajar",gKicker:"Guía de supervivencia",prog:"Tu progreso",pSeen:"Páginas visitadas",pHeard:"Frases escuchadas",pPract:"Frases practicadas",starsL:"estrellas",progHow:"mitad escucha, mitad práctica",cont:"Continúa donde lo dejaste",startAt:"Empieza por aquí",choose:"Elige una categoría",nPh:"frases",swipe:"Desliza",practice:"Practicar",again:"Repetir",lvl:"Nivel",allDone:"¡Completado!",pageWon:"Página completada",pageAgain:"Toca para practicar otra vez",pageNext:"Sigue con el nivel",practicePage:"Practicar esta página",practiceSub:"¡Escuchaste todo! Ayuda a Evo a saltar los muros",more:"Más categorías",found:"frases encontradas",hintB:"Toca la imagen",hint:" para ver cómo se pronuncia la frase.",ok:"Entendido",seePr:"Ver la pronunciación"},
  en:{guide:"FRENCH",guide2:"Survival guide",from:"EN",start:"Start",dep:"DEPARTURE",now:"Now",dest:"DESTINATION",me:"The French me",first:"FIRST CLASS",
      search:"Search a phrase in English or French",searchL:"Search a phrase",resume:"Pick up where you left off",toc:"Table of contents",tap:"Tap a topic",
      paris:"Paris Guide",parisSub:"What to see in Paris? Monuments, museums, walks…",bonusT:"Bonus",bonusS:"Extra content",extra:"Extra content",
      nGuide:"Guide",nBonus:"Bonus",nParis:"Paris",soon:"This part is coming in the next version.",up:"Back to top ↑",
      pHead:"What to see in Paris?",pSub:"Discover your next visits in Paris",city:"Understanding the city",mapT:"Map of the districts",mapAlt:"Map of the Paris districts",
      move:"Getting around",safety:"Safety",hours:"Opening hours",credits:"Photo credits",src:"Source",lic:"License",
      paid:"Paid",free:"Free",metro:"Nearest metro",go:"Directions",crnote:"Tap a photo to see its author and license",
      none:"No phrase found.",audioSoon:"🎧 Audio coming soon",noPlay:"Couldn't play the audio",noLoad:"Couldn't load the content.",home:"Home",lang:"Language",allGuides:"All guides",next:"Next page",pick:"Choose the category you want to study",tuto:"See the tutorial",gTitle:"French for travelers",gKicker:"Survival guide",prog:"Your progress",pSeen:"Pages visited",pHeard:"Phrases listened to",pPract:"Phrases practiced",starsL:"stars",progHow:"half listening, half practice",cont:"Pick up where you left off",startAt:"Start here",choose:"Choose a category",nPh:"phrases",swipe:"Swipe",practice:"Practice",again:"Play again",lvl:"Level",allDone:"Completed!",pageWon:"Page completed",pageAgain:"Tap to practice again",pageNext:"Continue with level",practicePage:"Practice this page",practiceSub:"You listened to everything! Help Evo jump the walls",more:"More categories",found:"phrases found",hintB:"Tap the picture",hint:" to see how the phrase is pronounced.",ok:"Got it",seePr:"See the pronunciation"}
};
const t = k => TXT[LANG][k];
const homeTitle = (e, i) => LANG === "en" ? (i < 0 ? [t("bonusT"), t("bonusS")] : HOME_EN[i]) : [e[0], e[1]];
const rowLabel = l => LANG === "en" ? (ROW_EN[l] || l) : l;
const TILE_ES = {Visitas:"Exploración"};
const tileLabel = g => LANG === "en" ? (TILE_EN[g] || g) : (TILE_ES[g] || g);

const ICON = {
  home:'<svg viewBox="0 0 24 24"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3z"/></svg>',
  bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>',
  play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',
  stop:'<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  mix:'<svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  spk:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
};

let C, UI, player;

/* ---------- Vente (Hotmart) ----------
   CHECKOUT : le lien de paiement Hotmart du guide (pay.hotmart.com/…). Vide = bouton « Muy pronto ».
   L'acheteur se connecte ensuite avec le même e-mail : le serveur (worker.js) lui envoie alors tout le contenu. */
const CHECKOUT = "";
const LK = {
  es:{title:"Desbloquea la guía completa",page:n => `Esta página tiene <b>${n} frases</b> con audio y pronunciación.`,
      all:n => `Con la guía completa: <b>${n} frases</b> en las 8 categorías, el Bonus y la Guía de Paris.`,
      buy:"Comprar la guía",soon:"La compra estará disponible muy pronto.",have:"¿Ya la compraste?",login:"Inicia sesión con el correo de tu compra",
      orFree:"o crea tu cuenta gratis",same:e => `Paga con el mismo correo (<b>${e}</b>): tu cuenta se desbloquea sola.`,
      done:"Ya compré",check:"Verificando…",notYet:"Todavía no vemos tu compra. Puede tardar unos minutos. Si pagaste con otro correo, inicia sesión con ese correo.",
      unlocked:"¡Guía desbloqueada! Buen viaje 🇫🇷",verT:"Confirma tu correo",verS:e => `Te enviamos un enlace a <b>${e}</b>. Ábrelo y luego toca « Ya confirmé ».`,
      verDone:"Ya confirmé",verAgain:"Reenviar el correo",verSent:"Correo enviado. Revisa también la carpeta de spam.",verNo:"Tu correo aún no está confirmado.",
      paris:n => `La Guía de Paris tiene <b>${n} lugares</b> con fotos, metro y mapa.`,signupSent:"Te enviamos un correo para confirmar tu dirección."},
  en:{title:"Unlock the full guide",page:n => `This page has <b>${n} phrases</b> with audio and pronunciation.`,
      all:n => `With the full guide: <b>${n} phrases</b> in all 8 categories, plus the Bonus and the Paris Guide.`,
      buy:"Buy the guide",soon:"Purchase will be available very soon.",have:"Already bought it?",login:"Log in with the email you used to pay",
      orFree:"or create your free account",same:e => `Pay with the same email (<b>${e}</b>): your account unlocks automatically.`,
      done:"I bought it",check:"Checking…",notYet:"We don't see your purchase yet. It can take a few minutes. If you paid with another email, log in with that one.",
      unlocked:"Guide unlocked! Bon voyage 🇫🇷",verT:"Confirm your email",verS:e => `We sent a link to <b>${e}</b>. Open it, then tap “I confirmed”.`,
      verDone:"I confirmed",verAgain:"Resend the email",verSent:"Email sent. Check your spam folder too.",verNo:"Your email isn't confirmed yet.",
      paris:n => `The Paris Guide has <b>${n} places</b> with photos, metro and map.`,signupSent:"We sent you an email to confirm your address."}
};
const lk = k => LK[LANG][k];
const LOCK = '<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const isPro = () => !!(C && C._acc && C._acc.pro);
const viewsOf = tab => tab.subs || [tab];
const tabLocked = tab => viewsOf(tab).every(v => v.locked);
// nombre de phrases cachées (pages verrouillées) : dans une section, ou dans tout le guide
function lockedN(si){
  let n = 0;
  [...GRID, "Bonus"].forEach((name, i) => { if(si != null && i !== si) return; sec(name)?.tabs.forEach(tb => viewsOf(tb).forEach(v => { if(v.locked) n += v.n || 0; })); });
  return n;
}
const totalN = si => (C ? [...index().values()].filter(x => si == null || x.si === si).length : 0) + (C ? lockedN(si) : 0);
// le panneau « Desbloquea la guía completa » (pages verrouillées, Guía de Paris)
function lockPanel(intro, labels){
  const A = window.EvoAuth, u = A && A.user, acc = (C && C._acc) || {};
  const mail = u && u.email ? esc(u.email) : "";
  const buy = `<button class="bigbtn lbuy" data-buy>${LOCK}${lk("buy")}</button>`;
  let foot;
  if(!u) foot = `<p class="lhave">${lk("have")} <button data-lgo="entrar">${lk("login")}</button></p>
      ${AUTH_ON ? `<p class="lfree"><button data-lgo="cuenta">${lk("orFree")}</button></p>` : ""}`;
  else if(acc.user && !acc.verified && !(u.emailVerified)) foot = `<div class="lver"><b>${lk("verT")}</b><p>${lk("verS")(mail)}</p>
      <div class="lrow"><button class="lbtn on" data-lverified>${lk("verDone")}</button><button class="lbtn" data-lresend>${lk("verAgain")}</button></div></div>`;
  else foot = `<p class="lsame">${lk("same")(mail)}</p><button class="lbtn wide" data-lcheck>${lk("done")}</button>`;
  return `<section class="lockp"><span class="lico">${LOCK}</span><h2>${lk("title")}</h2>
    <p>${intro}</p>
    ${labels && labels.length ? `<div class="lchips">${labels.map(x => `<span>${esc(x)}</span>`).join("")}</div>` : ""}
    <p class="lall">${lk("all")(totalN())}</p>
    ${buy}${foot}</section>`;
}
// le serveur renvoie le contenu complet ou gratuit selon le compte : on le recharge quand le compte change
let lastAcc = "";
function reloadContent(force){
  delete contents[LANG];
  return loadContent(LANG).then(c => {
    const key = JSON.stringify(c._acc || {}), changed = key !== lastAcc;
    lastAcc = key;
    if(!changed && !force) return c;
    const was = isPro(); C = c;
    Object.keys(bundles).forEach(k => delete bundles[k]);
    const y = scrollY; route(); scrollTo(0, y);
    if(!was && isPro()) toast(lk("unlocked"));
    return c;
  }).catch(() => {});
}
async function checkPurchase(btn){
  if(btn){ btn.disabled = true; btn.textContent = lk("check"); }
  try{ await window.EvoAuth?.refresh(); }catch(e){}
  const c = await reloadContent(true);
  if(c && !(c._acc && c._acc.pro)) toast(c._acc && c._acc.user && !c._acc.verified ? lk("verNo") : lk("notYet"));
}
const app = document.getElementById("app");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const slug = n => n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ /g,"-").toLowerCase();
const mi = (name, cls="mi") => `<i class="${cls}" style="-webkit-mask-image:url('img/ui/${slug(name)}.png');mask-image:url('img/ui/${slug(name)}.png')"></i>`;
const sec = name => C.sections.find(s => s.name === name);
function toast(m){ const t=document.getElementById("toast"); t.textContent=m; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),1800); }

/* ---------- Comptes : accueil, création de compte, connexion ----------
   Actif seulement sur le site publié (Netlify / domaine Evoala), où Firebase est autorisé. */
const AUTH_ON = /netlify\.app$|pages\.dev$|workers\.dev$|web\.app$|evoala|^localhost$|^127\./.test(location.hostname);
if(AUTH_ON){ const s = document.createElement("script"); s.type = "module"; s.src = "auth.js"; document.head.appendChild(s); }
const onboarded = { get(){ try{ return localStorage.getItem("evoala-onb") === "1"; }catch(e){ return true; } },
                    set(){ try{ localStorage.setItem("evoala-onb", "1"); }catch(e){} } };
const ACC = {
  es:{wTitle:"Aprende francés", wHi:"alcanzando objetivos", wEnd:"concretos", course:"Curso de francés",wSub:"Viajar, empezar desde cero o aprobar el DELF: cada guía te lleva a una meta clara, con audio y pronunciación.",
      start:"Empezar", have:"¿Ya tienes una cuenta?", login:"Iniciar sesión", goal:"Objetivo cumplido", goalSub:"Pedir en un café",
      upT:"Guarda tu progreso", upS:"Crea tu cuenta gratis y retoma tus guías en cualquier dispositivo.", inT:"Bienvenido de nuevo", inS:"Inicia sesión para retomar tus guías donde las dejaste.",
      later:"Ahora no", back:"Volver", google:"Continuar con Google", or:"o con tu correo", email:"Correo electrónico", emailPh:"tu@correo.com", pass:"Contraseña", passPh:"8 caracteres como mínimo",
      show:"Mostrar la contraseña", create:"Crear mi cuenta", enter:"Entrar", noAcc:"¿No tienes cuenta?", createLink:"Crear una cuenta", forgot:"¿Olvidaste tu contraseña?",
      legal:"Al continuar, aceptas las Condiciones de uso y la Política de privacidad de Evoala.", wait:"Un momento…", welcome:"¡Listo! Tu progreso se guarda en tu cuenta.",
      resetSent:"Te enviamos un correo para cambiar tu contraseña.", needEmail:"Escribe tu correo arriba y vuelve a tocar aquí.", account:"Mi cuenta", signout:"Cerrar sesión", signedOut:"Sesión cerrada.", signedAs:"Conectado como",
      err:{"auth/invalid-email":"Ese correo no parece válido.","auth/missing-password":"Escribe una contraseña.","auth/weak-password":"La contraseña debe tener al menos 8 caracteres.","auth/email-already-in-use":"Ya existe una cuenta con ese correo. Toca « Iniciar sesión ».","auth/invalid-credential":"Correo o contraseña incorrectos.","auth/wrong-password":"Correo o contraseña incorrectos.","auth/user-not-found":"No encontramos una cuenta con ese correo.","auth/too-many-requests":"Demasiados intentos. Espera unos minutos.","auth/network-request-failed":"Sin conexión. Revisa tu internet.","auth/popup-closed-by-user":"Se cerró la ventana de Google.","auth/unauthorized-domain":"Este sitio todavía no está autorizado en Firebase.","auth/operation-not-allowed":"Este método de conexión todavía no está activado.","off":"Las cuentas no están disponibles por el momento.","x":"Algo salió mal. Inténtalo de nuevo."}},
  en:{wTitle:"Learn French", wHi:"by reaching", wEnd:"concrete goals", course:"French course",wSub:"Travel, start from scratch or pass the DELF: each guide takes you to a clear goal, with audio and pronunciation.",
      start:"Get started", have:"Already have an account?", login:"Log in", goal:"Goal reached", goalSub:"Ordering at a café",
      upT:"Save your progress", upS:"Create your free account and pick up your guides on any device.", inT:"Welcome back", inS:"Log in to pick up your guides where you left off.",
      later:"Not now", back:"Back", google:"Continue with Google", or:"or with your email", email:"Email", emailPh:"you@email.com", pass:"Password", passPh:"At least 8 characters",
      show:"Show password", create:"Create my account", enter:"Log in", noAcc:"Don't have an account?", createLink:"Create one", forgot:"Forgot your password?",
      legal:"By continuing, you accept Evoala's Terms of use and Privacy policy.", wait:"One moment…", welcome:"Done! Your progress is saved to your account.",
      resetSent:"We sent you an email to reset your password.", needEmail:"Type your email above, then tap here again.", account:"My account", signout:"Log out", signedOut:"Logged out.", signedAs:"Signed in as",
      err:{"auth/invalid-email":"That email doesn't look valid.","auth/missing-password":"Type a password.","auth/weak-password":"Your password needs at least 8 characters.","auth/email-already-in-use":"An account already exists with that email. Tap “Log in”.","auth/invalid-credential":"Wrong email or password.","auth/wrong-password":"Wrong email or password.","auth/user-not-found":"No account found with that email.","auth/too-many-requests":"Too many attempts. Please wait a few minutes.","auth/network-request-failed":"No connection. Check your internet.","auth/popup-closed-by-user":"The Google window was closed.","auth/unauthorized-domain":"This site isn't authorized in Firebase yet.","auth/operation-not-allowed":"This sign-in method isn't enabled yet.","off":"Accounts aren't available right now.","x":"Something went wrong. Please try again."}}
};
const a = k => ACC[LANG][k];
const MINIFLAG = '<span class="miniflag" aria-hidden="true"><i></i><i></i><i></i></span>';
const authErr = e => a("err")[e && e.code] || a("err")[e === "off" ? "off" : "x"];
const langToggle = cls => `<div class="lang ${cls}" role="group" aria-label="${t("lang")}"><button class="${LANG==='es'?'on':''}" data-lang="es" aria-pressed="${LANG==='es'}">ES</button><button class="${LANG==='en'?'on':''}" data-lang="en" aria-pressed="${LANG==='en'}">EN</button></div>`;

function welcome(){
  const tile = (img, cls) => `<span class="wtile ${cls}"><img src="img/hub/${img}.webp" alt=""></span>`;
  app.innerHTML = `
  <section class="wtop">
    <div class="wbar"><span class="wlogo"><img src="img/ui/logo.webp" alt="evoala"></span>${langToggle("wl")}</div>
    <div class="wart" aria-hidden="true">${tile("a1","t1")}${tile("voyage","t2")}${tile("delfb1","t3")}${tile("delfa2","t4")}${tile("drapeau","t5")}
      <span class="wgoal"><i><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></i><span><b>${a("goal")}</b>${a("goalSub")}</span></span></div>
  </section>
  <section class="wtext">
    <span class="fpill">${MINIFLAG}${a("course")}</span>
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
  const done = () => { onboarded.set(); toast(up && !(window.EvoAuth.user && window.EvoAuth.user.emailVerified) ? lk("signupSent") : a("welcome"));
    let back = ""; try{ back = sessionStorage.getItem("evoala-after") || ""; sessionStorage.removeItem("evoala-after"); }catch(e){}
    location.hash = back; if(!back) route(); };
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
      ['seen','heard','practiced'].forEach(f => { if(d && Array.isArray(d[f])){ const k = 'evoala-' + f, m = [...new Set([...seen.get(k), ...d[f]])]; try{ localStorage.setItem(k, JSON.stringify(m)); }catch(e){} if(m.length > d[f].length) syncProgress(); } else if(seen.get('evoala-' + f).length) syncProgress(); });
      if(d && d.levels && typeof d.levels === 'object'){ d.stars = d.levels; const B = bestStars(); let more = false; for(const [k, v] of Object.entries(d.stars)) if(!(B[k] >= v)) B[k] = v; for(const k in B) if(!(d.stars[k] >= B[k])) more = true; try{ localStorage.setItem('evoala-levels', JSON.stringify(B)); }catch(e){} if(more) syncProgress(); }
      else if(Object.keys(bestStars()).length) syncProgress();
      HEARDC = null;
      if(location.hash === '#guia') route();
      if(d && Array.isArray(d.lists)){ lists.put(d.lists, false); refreshHearts(); if(/^#lista/.test(location.hash)) route(); }
      else if(lists.all().length) window.EvoAuth.save({ lists: lists.all() });
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
      cta:"Empezar a aprender",cta2:"Seguir aprendiendo",heardOf:"frases escuchadas",heardS:"escuchadas",practS:"practicadas",others:"Otras guías",othersSub:"Cada una con su objetivo",level:"Nivel",soon:"Muy pronto",more:"Más guías en camino",
      notify:"Avísame cuando salga una guía",notifyToast:"Muy pronto podrás dejar tu correo aquí.",how:"¿Cómo aprendes?",
      steps:[["Elige tu objetivo","Viajar, empezar desde cero o preparar el DELF."],["Escucha y repite","Cada frase tiene su audio y su pronunciación escrita."],["Úsalo en la vida real","En tu teléfono, cuando lo necesites, incluso en Francia."]],
      guides:[["Francés A1","desde cero","Descubrir el francés y dar tus primeros pasos"],["DELF A1","examen oficial","Hablar de ti, tu casa y tus gustos, y obtener tu primer diploma"],
        ["DELF A2","examen oficial","Desenvolverte en la vida diaria: pedir, comprar, preguntar"],["DELF B1","examen oficial","Estudiar y conversar con autonomía"],["DELF B2","examen oficial","Debatir y defender tus ideas en francés"]]},
  en:{t1:"A guide for",t2:"every goal",sub:"Each guide takes you toward a concrete goal. Start with the one that helps you most today.",
      subWide:" Travel, start from scratch or pass the DELF: you decide.",badge:"Trial version",kicker:"Survival guide",title:"French for traveling",
      mission:"Mission:",goal:"understand and make yourself understood in France during your trip.",chips:["757 useful phrases","Audio and pronunciation","Paris Guide","All levels"],
      cta:"Start learning",cta2:"Keep learning",heardOf:"phrases listened to",heardS:"listened",practS:"practiced",others:"Other guides",othersSub:"Each with its own goal",level:"Level",soon:"Coming soon",more:"More guides on the way",
      notify:"Let me know when a new guide is out",notifyToast:"Soon you'll be able to leave your email here.",how:"How do you learn?",
      steps:[["Choose your goal","Travel, start from scratch or prepare for the DELF."],["Listen and repeat","Each phrase has its audio and its written pronunciation."],["Use it in real life","On your phone, whenever you need it, even in France."]],
      guides:[["French A1","from scratch","Discover French and take your first steps"],["DELF A1","official exam","Talk about yourself, your home and your tastes, and earn your first diploma"],
        ["DELF A2","official exam","Get by in daily life: ordering, buying, asking"],["DELF B1","official exam","Study and hold conversations with confidence"],["DELF B2","official exam","Debate and defend your ideas in French"]]}
};
const HUB_LOOK = [["a1","A1","#0F7C72","#E3F4F1"],["delfa1","A1","#C2410C","#FDEBDD"],["delfa2","A2","#BE185D","#FCE4EF"],["delfb1","B1","#1D4ED8","#E2EAFD"],["delfb2","B2","#6D28D9","#EDE7FC"]];
function hub(){
  // après une première utilisation : barre de progression (phrases écoutées) au lieu des étiquettes
  const started = seen.get("evoala-heard").length > 0 || seen.get("evoala-seen").length > 0 || seen.get("evoala-practiced").length > 0;
  const PG = C ? progress([...index().values()], totalN()) : { nh: 0, np: 0, tot: 757, raw: 0, pct: 0 };
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
          <div><span class="fbadge">${H.badge}</span><small>${MINIFLAG}${H.kicker}</small><b>${H.title}</b></div></div>
        <div class="fbody"><p><strong>${H.mission}</strong> ${H.goal}</p>
          ${started ? `<div class="fprog"><div class="fpl"><b>${PG.pct}%</b><span>${PG.nh} ${H.heardS} · ${PG.np} ${H.practS}</span>${doneOf() ? doneChip(doneOf(), "fp") : ""}</div><div class="gtrack ph"><i style="width:${PG.raw ? Math.max(2, PG.raw) : 0}%"></i></div></div>`
            : `<div class="fchips">${H.chips.map(c => `<span>${c}</span>`).join("")}</div>`}
          <button class="fcta" data-go="guia">${started ? H.cta2 : H.cta} ${arrow}</button></div>
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
  const h = store.get(), m = h && h.match(/^s(\d+)t(\d+)(?:p\d+)?$/); if(!m) return null;
  const si = +m[1], s = si === 8 ? "Bonus" : GRID[si], tab = sec(s)?.tabs[+m[2]]; if(!tab) return null;
  const entry = [...HOME, BONUS].find(e => e[2] === s); if(!entry) return null;
  const row = entry[3].find(r => r[1] === tab.name);
  return { hash: h, title: entry[0], cat: si === 8 ? t("nBonus") : tileLabel(GRID[si]), label: row ? rowLabel(row[0]) : (tab.label || tab.name) };
}
/* Hub du guide : progression + grandes catégories */
const seen = {
  get(k){ try{ const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : []; }catch(e){ return []; } },
  add(k, v){ const a = this.get(k); if(a.includes(v)) return; a.push(v); try{ localStorage.setItem(k, JSON.stringify(a)); }catch(e){} syncProgress(); }
};
// progression : moitié écoute, moitié pratique (le jeu, quelle que soit la note)
function progress(entries, all){
  const h = new Set(seen.get("evoala-heard")), pr = new Set(seen.get("evoala-practiced")), n = all || entries.length, tot = n || 1;
  const nh = entries.filter(x => h.has(x.p.fr)).length, np = entries.filter(x => pr.has(x.p.fr)).length;
  const raw = (nh + np) / (2 * tot) * 100;
  return { nh, np, tot: n, raw, pct: raw > 0 ? Math.max(1, Math.round(raw)) : 0 };
}
let syncT;
function syncProgress(){ clearTimeout(syncT); syncT = setTimeout(() => window.EvoAuth?.save({ seen: seen.get("evoala-seen"), heard: seen.get("evoala-heard"), practiced: seen.get("evoala-practiced"), levels: levelsDone() }), 3000); }
let HEARDC = null;                                           // phrases déjà écoutées (cache)
const heardHas = k => (HEARDC ??= new Set(seen.get("evoala-heard"))).has(k);
const markHeard = key => { if(!key) return; seen.add("evoala-heard", key); HEARDC = null; };
function allPages(){
  const out = [];
  [...GRID, "Bonus"].forEach((name, si) => sec(name)?.tabs.forEach((tb, ti) => (tb.subs || [tb]).forEach((v, u) => { if(hasPh(v)) out.push(pageHash(si, ti, tb.subs ? u : 0)); })));
  return out;
}
function home(){
  const last = lastInfo(), pages = allPages(), seenP = new Set(seen.get("evoala-seen")), heard = new Set(seen.get("evoala-heard"));
  const idx = [...index().values()];
  const nSeen = pages.filter(h => seenP.has(h)).length, nHeard = idx.filter(x => heard.has(x.p.fr)).length;
  const perCat = si => { const own = idx.filter(x => x.si === si), g = progress(own, totalN(si)); return [g.pct, g.tot, g.raw]; };
  const PG = progress(idx, totalN());
  const secLocked = si => (secOf(si)?.tabs || []).every(tabLocked);
  const bar = (icon, label, n, tot, cls) => `<div class="gbar ${cls}"><div class="gbl">${icon}<span>${label}</span><em><b>${n}</b> / ${tot}</em></div><div class="gtrack"><i style="width:${n ? Math.max(3, n * 100 / tot) : 0}%"></i></div></div>`;
  const arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const tile = (e, i) => { const [tt, ts] = homeTitle(e, i), [n, tot] = perCat(i);
    return `<button class="gtile${secLocked(i) ? " locked" : ""}" data-go="s${i}t0">${secLocked(i) ? `<span class="tlock">${LOCK}</span>` : ""}${doneOf(i) ? doneChip(doneOf(i), "tile") : ""}<span class="gico">${mi("t-" + GRID[i])}</span><b>${esc(tt)}</b><small>${esc(ts)}</small>
      ${n ? `<span class="gmini"><i style="width:${perCat(i)[2]}%"></i></span><em>${n}% · ${tot} ${t("nPh")}</em>` : `<em>${tot} ${t("nPh")}</em>`}</button>`; };
  const [bn, btot] = perCat(8);
  app.innerHTML = `${topbar("ghub")}
  <div class="gtitle"><small>${MINIFLAG}${t("gKicker")}</small><b>${t("gTitle")}</b></div>
  <section class="gprog"><div class="gpt gptot"><span>${t("prog")}<small>${t("progHow")}</small></span>${doneOf() ? doneChip(doneOf(), "big") : ""}<b>${PG.pct}%</b></div>
    <div class="gtrack big"><i style="width:${PG.raw ? Math.max(2, PG.raw) : 0}%"></i></div>
    ${bar(ICON.spk, t("pHeard"), PG.nh, PG.tot, "ph")}
    ${bar('<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>', t("pPract"), PG.np, PG.tot, "pp")}
    <button class="gcont" data-go="${last ? last.hash : "s0t0"}"><span><small>${last ? t("cont") : t("startAt")}</small><b>${esc(last ? `${last.cat} › ${last.label}` : tileLabel(GRID[0]))}</b></span>${arrow}</button>
  </section>
  <div class="gch">${t("choose")}</div>
  <div class="gtiles">${HOME.map((e, i) => tile(e, i)).join("")}</div>
  <button class="gwide bonus" data-go="s8t0"><span class="gico">${mi("t-bonus")}</span><span class="gw"><b>${t("bonusT")}${doneOf(8) ? " " + doneChip(doneOf(8), "in") : ""}</b><small>${t("bonusS")} · ${bn ? `${bn}% · ` : ""}${btot} ${t("nPh")}</small></span>${secLocked(8) ? `<span class="wlock">${LOCK}</span>` : ""}<svg class="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
  <button class="gwide" data-go="p1"><span class="gico pimg"><img src="${UI['h:Guía de Paris']}" alt=""></span><span class="gw"><b>${t("paris")}</b><small>${t("parisSub")}</small></span>${C.parisN && !C.paris.length ? `<span class="wlock">${LOCK}</span>` : ""}<svg class="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
  <div class="gend"></div>`;
}

/* ---------- Barre du haut ---------- */
function topbar(where){
  const toHub = where === "ghub";
  return `<div class="top"><button class="home" data-go="${toHub ? "" : "guia"}"${toHub ? " data-home" : ""} aria-label="${toHub ? t("allGuides") : t("home")}">${ICON.home}</button>
    <img class="logo" src="img/ui/logo.webp" alt="evoala"><span class="tsp"></span>${where === "guide" || where === "ghub" ? `<button class="tutob" data-tuto aria-label="${t("tuto")}">${ICON.bulb}</button>` : ""}${langToggle("hl sm")}</div>`;
}
// barre du bas : Guía / Paris / Bonus, sur toutes les pages
function navbar(where){
  const eiffel = '<svg class="nico" viewBox="0 0 24 24"><path d="M12 2v3M10.5 5h3l1 6h-5zM9.5 11h5l3.5 10h-3.8a2.2 2.2 0 0 0-4.4 0H6z"/><path d="M8 15h8"/></svg>';
  const it = (go, icon, label, on) => `<button class="${on?'on':''}" data-go="${go}">${icon}<span>${label}</span></button>`;
  const hrt = `<i class="nico nheart">${ICON.heart}</i>`;
  return `<nav class="nav">${it("guia", mi("p-Guía"), t("nGuide"), where==="guide"||where==="home")}${it("listas", hrt, l("nav"), where==="listas")}${it("p1", eiffel, t("nParis"), where==="paris")}</nav>`;
}

/* ---------- Pages de phrases ---------- */
function rowHTML(p, crumb){
  const bulb = "", al = ` role="button" aria-label="${t("seePr")}"`;   // plus d'ampoule : le tutoriel apprend à toucher l'image
  const ic = p.num ? `<div class="ic num${p.num.length>2?' long':''}"${al}>${esc(p.num)}${bulb}</div>` : p.icon ? `<div class="ic" style="background-image:url('${p.icon[0]}');--i:${p.icon[1]}"${al}>${bulb}</div>` : `<div class="ic"${al}>${bulb}</div>`;
  const au = p.audio ? `${p.audio[0]}#${p.audio[1]}` : "";
  return `<div class="row${p.who==='staff'?' staff':''}${heardHas(p.fr)?' heard':''}" data-audio="${esc(au)}" data-key="${esc(p.fr)}">
    ${ic}<div class="ph">${crumb ? `<button class="crumb" data-go="${crumb[1]}">${esc(crumb[0])}</button>` : ""}<div class="fr">${esc(p.fr)}</div>
    <div class="es" data-es="${esc(p.es)}" data-pr="${esc(p.pr)}">${esc(p.es)}</div></div>
    <div class="spk">${ICON.spk}</div>
    <button class="heart${SAVED.has(p.fr)?' on':''}" aria-label="${l("save")}">${ICON.heart}</button></div>`;
}
function tipHTML(t){
  if(t.table) return `<div class="dato"><b>💡 ${esc(t.title)}:</b><table class="dtab"><tr>${t.table.head.map(h=>`<th>${h?`<span>${esc(h)}</span>`:""}</th>`).join("")}</tr>
    ${t.table.rows.map(r=>`<tr><td>${esc(r[0])}</td>${r.slice(1).map(c=>`<td><b>${esc(c[0])}<em>${esc(c[1])}</em></b><small>${esc(c[2])}</small></td>`).join("")}</tr>`).join("")}</table></div>`;
  return `<div class="dato"><b>💡 ${esc(t.title)}:${t.sub?` <span class="dsub">${esc(t.sub)}</span>`:""}</b>${esc(t.text)}</div>`;
}
// bandeau « Toca la imagen » : affiché tant qu'on n'a pas touché « Entendido »
const hintSeen = () => { try{ return localStorage.getItem("evoala-hint") === "1"; }catch(e){ return false; } };
function hintHTML(view){
  return "";   // remplacé par le tutoriel
  const p = view.groups.flatMap(g => g.phrases).find(x => x.icon);
  if(hintSeen() || !p) return "";
  return `<div class="hint"><div class="ic" style="background-image:url('${p.icon[0]}');--i:${p.icon[1]}"><i class="bulb">${ICON.bulb}</i></div>
    <p><b>${t("hintB")}</b>${t("hint")}</p><button data-hint>${t("ok")}</button></div>`;
}
const secOf = si => si === 8 ? sec("Bonus") : sec(GRID[si]);
const hasPh = v => !!v.locked || v.groups.some(g => g.phrases.length);
const pageHash = (si, ti, sub) => `s${si}t${ti}${sub ? "p" + sub : ""}`;
// page suivante dans l'ordre du guide : sous-page, puis onglet, puis catégorie (on saute les pages vides)
function nextPage(si, ti, sub){
  let s = si, tb = ti, u = sub + 1;
  while(s <= 8){
    const tab = secOf(s).tabs[tb];
    if(!tab){ s++; tb = 0; u = 0; continue; }
    const vs = tab.subs || [tab];
    for(; u < vs.length; u++) if(hasPh(vs[u])){
      const tname = tab.label || tab.name;
      const name = s !== si ? `${s === 8 ? t("nBonus") : tileLabel(GRID[s])} · ${tname}` : tb !== ti ? tname : vs[u].name;
      return { hash: pageHash(s, tb, u), name };
    }
    tb++; u = 0;
  }
  return null;
}
// rangée de catégories qui défile (Guía et Paris) : fixée en haut, flèches ‹ › quand il y en a d'autres hors de l'écran
function catsBar(list, on, hash, isGuide){
  // cadenas sur les catégories entièrement fermées (guide : toutes les pages verrouillées ; Paris : les lieux)
  const shut = i => isGuide ? (secOf(i)?.tabs || []).every(tabLocked) : i > 0 && !!C.parisN && !C.paris.length;
  return `<div class="catwrap atstart"><div class="cats">${list.map((g,i)=>`<button class="cat${i===on?' on':''}${shut(i)?' shut':''}" data-go="${hash(i)}"${isGuide?' data-cat':''}>${mi("t-"+g)}<span>${tileLabel(g)}</span>${shut(i) ? LOCK : ""}</button>`).join("")}</div>
    <button class="more l" data-scroll="-1" aria-label="${t("more")}"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    <button class="more r" data-scroll="1" aria-label="${t("more")}"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div>`;
}
function initCats(){
  const wrap = app.querySelector(".catwrap"); if(!wrap) return;
  const cats = wrap.querySelector(".cats"), on = cats.querySelector(".on");
  if(on){ const a = cats.getBoundingClientRect(), b = on.getBoundingClientRect(); cats.style.scrollBehavior = "auto"; cats.scrollLeft += (b.left - a.left) - (a.width - b.width) / 2; cats.style.scrollBehavior = ""; }
  // la flèche n'apparaît qu'à l'ouverture de la page ; dès qu'on fait défiler, elle disparaît
  const atEnd = cats.scrollLeft + cats.clientWidth > cats.scrollWidth - 6;
  wrap.classList.toggle("atend", atEnd);
  wrap.classList.toggle("atstart", !atEnd || cats.scrollLeft < 6);
  const hide = () => wrap.classList.add("used");
  ["touchstart","wheel","pointerdown"].forEach(ev => cats.addEventListener(ev, hide, {passive:true, once:true}));
  wrap.querySelectorAll("[data-scroll]").forEach(b => b.onclick = () => { cats.scrollBy({left: b.dataset.scroll * cats.clientWidth * 0.7, behavior:"smooth"}); hide(); });
}
const catPicked = () => { try{ return localStorage.getItem("evoala-cat") === "1"; }catch(e){ return true; } };
function phrases(si, ti, sub=0){
  const s = secOf(si);
  const tab = s.tabs[ti]; if(!tab) return home();
  if(tab.subs && !tab.subs[sub]) sub = 0;
  const view = tab.subs ? tab.subs[sub] : tab;
  const nx = nextPage(si, ti, sub);
  if(hasPh(view) && !view.locked) seen.add("evoala-seen", pageHash(si, ti, tab.subs ? sub : 0));
  PVIEW = { view, title: view.name || tab.label || tab.name, back: pageHash(si, ti, tab.subs ? sub : 0) };
  app.innerHTML = `${topbar("guide").replace('class="top"','class="top flow"')}
    <label class="search psearch"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="q" placeholder="${t("search")}" autocomplete="off" aria-label="${t("searchL")}"></label>
    ${`${catPicked() ? "" : `<p class="cathint"><span>${t("pick")}</span></p>`}
      ${catsBar([...GRID, "Bonus"], si, i => `s${i}t0`, true)}`}
    <div id="results"></div>
    <div id="menu">
    <div class="ptabs">${s.tabs.map((tb,i)=>`<button class="tab${i===ti?' on':''}" data-go="s${si}t${i}">${tabLocked(tb) ? LOCK : ""}${esc(tb.label || tb.name)}</button>`).join("")}</div>
    ${tab.subs?`<div class="psubs">${tab.subs.map((x,i)=>`<button class="${i===sub?'on':''}" data-go="${pageHash(si,ti,i)}">${x.locked ? LOCK : ""}${esc(x.name)}</button>`).join("")}</div>`:""}
    ${view.intro?`<p class="intro">${esc(view.intro)}</p>`:""}
    ${hintHTML(view)}
    ${view.locked ? lockPanel(lk("page")(view.n), view.groups.map(g => g.label).filter(Boolean)) : !hasPh(view) ? `<div class="empty">${t("soon")}</div>` : ""}
    ${view.groups.map((g, gi) => g.phrases.length ? `<div class="card${g.cols===2?' cols2':''}" data-g="${gi}">${g.label?`<div class="label">${esc(g.label)}</div>`:""}${g.phrases.map(p => rowHTML(p)).join("")}<div class="pslot"></div></div>` : "").join("")}
    ${(view.tips||[]).map(tipHTML).join("")}
    <div class="ppage"></div>
    ${nx ? `<button class="nextsub" data-go="${nx.hash}">${t("next")}: <b>${esc(nx.name)}</b> →</button>` : ""}
    <button class="up" data-up>${t("up")}</button>
    </div>`;
  document.getElementById("q").addEventListener("input", e => search(e.target.value));
  refreshPractice(false);
}

/* ---------- Guía de Paris ---------- */
function parisHead(ci){
  return `${topbar("paris").replace('class="top"','class="top flow"')}
    <div class="ptitle"><b>${t("pHead")}</b><small>${t("pSub")}</small></div>
    ${catsBar(PARIS_CATS, ci, i => `p${i}`)}`;
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
  if(C.parisN && !C.paris.length){
    app.innerHTML = `${parisHead(ci)}${lockPanel(lk("paris")(Object.values(C.parisN).reduce((a, b) => a + b, 0)), PARIS_CATS.slice(1).map(tileLabel))}`;
    return;
  }
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
  app.querySelectorAll("[data-pp]").forEach(b => b.onclick = () => { paris(ci, +b.dataset.pp); initCats(); scrollTo(0,0); });
}

/* ---------- Recherche ---------- */
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
function search(q){
  q = norm(q.trim());
  const res = document.getElementById("results"), menu = document.getElementById("menu");
  if(!q){ res.innerHTML = ""; menu.style.display = ""; return; }
  menu.style.display = "none";
  const hits = [...index().values()].filter(x => norm(x.p.fr).includes(q) || norm(x.p.es).includes(q));
  res.innerHTML = hits.length ? `<p class="intro">${hits.length} ${t("found")}</p><div class="card">${hits.slice(0,60).map(x => rowHTML(x.p, x.crumb)).join("")}</div>` : `<div class="empty">${t("none")}</div>`;
}
// toutes les phrases du guide : clé (texte français) -> phrase + d'où elle vient
let IDX = null, IDXC = null;
function index(){
  if(IDXC === C) return IDX;
  IDX = new Map(); IDXC = C;
  [...GRID, "Bonus"].forEach((name, si) => { const s = sec(name); if(!s) return;
    const cat = si === 8 ? t("nBonus") : tileLabel(name);
    s.tabs.forEach((tb, ti) => (tb.subs || [tb]).forEach((v, u) => v.groups.forEach(g => g.phrases.forEach(p => {
      if(!IDX.has(p.fr)) IDX.set(p.fr, { p, si, crumb: [`${cat} › ${tb.label || tb.name}`, pageHash(si, ti, tb.subs ? u : 0)] });
    }))));
  });
  return IDX;
}

/* ---------- Mis listas : le cœur à côté de chaque phrase ----------
   Les listes sont gardées sur le téléphone (localStorage) et dans le compte (Firestore) quand on est connecté. */
const LT = {
  es:{save:"Guardar en una lista",saved:"Guardada en",change:"Cambiar",pick:"Elige una o varias listas",newL:"Crear una lista nueva",done:"Listo",
      newT:"Nueva lista",name:"Nombre de la lista",ideas:"Ideas",color:"Color",create:"Crear y guardar",createEmpty:"Crear la lista",phr:"frases",phr1:"frase",
      nav:"Mis listas",mine:"Mis listas",mineSub:"Tus frases guardadas, para repasar cuando quieras",listen:"Escuchar",all:"Escuchar todo",stop:"Detener",mix:"Mezclar",
      tip:"Toca el corazón de cualquier frase para guardarla.",emptyT:"Aún no tienes listas",emptyS:"Toca el corazón al lado de una frase para guardarla aquí y repasarla cuando quieras.",
      toGuide:"Ir a la guía",fav:"Mis favoritos",removed:"Quitada de la lista",remove:"Quitar",undo:"Deshacer",rename:"Cambiar el nombre",del:"Borrar la lista",
      delQ:"¿Borrar esta lista? Las frases siguen en la guía.",emptyL:"Esta lista está vacía. Toca el corazón de una frase en la guía para añadirla.",opts:"Opciones de la lista",back:"Mis listas",
      ideasL:["Mi viaje a París","Para repasar","En el restaurante","Emergencias"]},
  en:{save:"Save to a list",saved:"Saved to",change:"Change",pick:"Choose one or more lists",newL:"Create a new list",done:"Done",
      newT:"New list",name:"List name",ideas:"Ideas",color:"Color",create:"Create and save",createEmpty:"Create the list",phr:"phrases",phr1:"phrase",
      nav:"My lists",mine:"My lists",mineSub:"Your saved phrases, to review whenever you like",listen:"Listen",all:"Listen to all",stop:"Stop",mix:"Shuffle",
      tip:"Tap the heart on any phrase to save it.",emptyT:"No lists yet",emptyS:"Tap the heart next to a phrase to save it here and review it whenever you like.",
      toGuide:"Go to the guide",fav:"My favorites",removed:"Removed from the list",remove:"Remove",undo:"Undo",rename:"Rename",del:"Delete the list",
      delQ:"Delete this list? The phrases stay in the guide.",emptyL:"This list is empty. Tap the heart on a phrase in the guide to add it.",opts:"List options",back:"My lists",
      ideasL:["My trip to Paris","To review","At the restaurant","Emergencies"]}
};
const l = k => LT[LANG][k];
const LCOLORS = ["#D6336C","#6C4FE0","#E07A00","#1F8A70","#2E6FD8"];
let SAVED = new Set();
const lists = {
  all(){ let v; try{ v = JSON.parse(localStorage.getItem("evoala-lists")); }catch(e){}
    if(!Array.isArray(v)) v = [];
    if(!v.some(x => x.id === "fav")) v.unshift({ id: "fav", name: "", color: LCOLORS[0], items: [] });  // « Mis favoritos » existe toujours
    // ancienne version : un « Mis favoritos » créé au premier cœur -> fusionné dans la liste par défaut
    const fav = v.find(x => x.id === "fav"), old = v.filter(x => x.id !== "fav" && /^(mis favoritos|my favorites)$/i.test((x.name || "").trim()));
    if(old.length){ old.forEach(o => o.items.forEach(k => fav.items.includes(k) || fav.items.push(k))); v = v.filter(x => !old.includes(x)); try{ localStorage.setItem("evoala-lists", JSON.stringify(v)); }catch(e){} }
    return v; },
  put(v, sync = true){
    try{ localStorage.setItem("evoala-lists", JSON.stringify(v)); }catch(e){}
    SAVED = new Set(v.flatMap(x => x.items));
    if(sync) window.EvoAuth?.save({ lists: v });
  }
};
SAVED = new Set(lists.all().flatMap(x => x.items));
const lname = x => x.name || l("fav");
const nPhr = n => `${n} ${n === 1 ? l("phr1") : l("phr")}`;
const lsq = (color, big) => `<span class="lsq${big?' big':''}" style="background:${color}">${ICON.heart}</span>`;
function icHTML(p, cls = "ic"){
  return p.num ? `<div class="${cls} num">${esc(p.num)}</div>` : p.icon ? `<div class="${cls}" style="background-image:url('${p.icon[0]}');--i:${p.icon[1]}"></div>` : `<div class="${cls}"></div>`;
}
function refreshHearts(){ document.querySelectorAll(".row[data-key]").forEach(r => r.querySelector(".heart")?.classList.toggle("on", SAVED.has(r.dataset.key))); }

// petite barre en bas avec une action (Cambiar, Deshacer)
function snack(html, action, fn){
  let el = document.getElementById("snack");
  if(!el){ el = document.createElement("div"); el.id = "snack"; el.className = "snack"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.innerHTML = `<i>${ICON.heart}</i><span>${html}</span>${action ? `<button>${action}</button>` : ""}`;
  if(action) el.querySelector("button").onclick = () => { el.classList.remove("show"); fn(); };
  el.classList.add("show"); clearTimeout(el._h); el._h = setTimeout(() => el.classList.remove("show"), 4500);
}

function heartClick(key){
  const L = lists.all();
  if(app.dataset.list){                                   // dans une liste ouverte : on retire la phrase
    const x = L.find(v => v.id === app.dataset.list); if(!x) return;
    const at = x.items.indexOf(key); if(at < 0) return;
    x.items.splice(at, 1); lists.put(L); listPage(x.id);
    snack(l("removed"), l("undo"), () => { const L2 = lists.all(), y = L2.find(v => v.id === x.id); if(!y) return; y.items.splice(at, 0, key); lists.put(L2); listPage(y.id); });
    return;
  }
  openSheet(key);
}

/* Panneau qui monte du bas : choisir une liste, ou en créer une */
let SHEET = { key: null, view: "pick", color: LCOLORS[1], name: "" };
function closeSheet(){ document.getElementById("sheet")?.classList.remove("open"); }
function openSheet(key, view = "pick"){
  SHEET = { key, view, color: LCOLORS[lists.all().length % LCOLORS.length], name: "" };  // le rose est celui de Mis favoritos
  let el = document.getElementById("sheet");
  if(!el){
    el = document.createElement("div"); el.id = "sheet"; el.className = "sheet"; document.body.appendChild(el);
    el.addEventListener("click", sheetClick);
    el.addEventListener("input", e => { if(e.target.id === "lname") SHEET.name = e.target.value; });
    el.addEventListener("keydown", e => { if(e.key === "Escape") closeSheet(); if(e.key === "Enter" && e.target.id === "lname") createList(); });
  }
  renderSheet(); requestAnimationFrame(() => el.classList.add("open"));
  if(view === "new") setTimeout(() => document.getElementById("lname")?.focus(), 250);
}
function renderSheet(){
  const el = document.getElementById("sheet"), key = SHEET.key, it = key && index().get(key);
  const head = it ? `<div class="shph">${icHTML(it.p)}<div><b>${esc(it.p.fr)}</b><small>${esc(it.p.es)}</small></div></div>` : "";
  let body;
  if(SHEET.view === "pick"){
    body = `${head}<h3>${l("save")}</h3><p class="shsub">${l("pick")}</p>
      <div class="lrows">${lists.all().map(x => `<button class="lrow" data-tog="${x.id}" aria-pressed="${x.items.includes(key)}">${lsq(x.color)}<span class="lnm"><b>${esc(lname(x))}</b><small>${nPhr(x.items.length)}</small></span><span class="chk${x.items.includes(key)?' on':''}">${ICON.check}</span></button>`).join("")}
      <button class="lrow lnew" data-new><span class="lsq dash">+</span><span class="lnm"><b>${l("newL")}</b></span></button></div>
      <button class="shbtn" data-close>${l("done")}</button>`;
  } else {
    body = `<div class="shtop">${key ? `<button class="shback" data-pick aria-label="${l("back")}"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>` : ""}<h3>${l("newT")}</h3></div>
      <label class="shlab" for="lname">${l("name")}</label><input id="lname" class="shin" maxlength="40" value="${esc(SHEET.name)}" placeholder="${esc(l("ideasL")[0])}" autocomplete="off">
      <p class="shsub">${l("ideas")}</p><div class="ideas">${l("ideasL").map(n => `<button data-idea="${esc(n)}" class="${n===SHEET.name?'on':''}">${esc(n)}</button>`).join("")}</div>
      <p class="shsub">${l("color")}</p><div class="dots">${LCOLORS.map(c => `<button data-col="${c}" class="${c===SHEET.color?'on':''}" style="--c:${c}" aria-label="${l("color")} ${c}"></button>`).join("")}</div>
      <button class="shbtn" data-create>${key ? `${l("create")} «${esc(it ? it.p.fr : "")}»` : l("createEmpty")}</button>`;
  }
  el.innerHTML = `<div class="shov" data-close></div><div class="shp" role="dialog" aria-modal="true" aria-label="${l("save")}"><i class="grab"></i>${body}</div>`;
}
function sheetClick(e){
  const b = e.target.closest("button, .shov"); if(!b) return;
  if(b.hasAttribute("data-close")){ closeSheet(); return; }
  if(b.hasAttribute("data-new")){ SHEET.view = "new"; renderSheet(); setTimeout(() => document.getElementById("lname")?.focus(), 50); return; }
  if(b.hasAttribute("data-pick")){ SHEET.view = "pick"; renderSheet(); return; }
  if(b.dataset.idea){ SHEET.name = b.dataset.idea; renderSheet(); return; }
  if(b.dataset.col){ SHEET.color = b.dataset.col; const v = document.getElementById("lname")?.value; if(v != null) SHEET.name = v; renderSheet(); return; }
  if(b.hasAttribute("data-create")){ createList(); return; }
  if(b.dataset.tog){
    const L = lists.all(), x = L.find(v => v.id === b.dataset.tog); if(!x) return;
    const i = x.items.indexOf(SHEET.key); i < 0 ? x.items.push(SHEET.key) : x.items.splice(i, 1);
    lists.put(L); renderSheet(); refreshHearts();
  }
}
function createList(){
  const name = (document.getElementById("lname")?.value || SHEET.name).trim() || l("ideasL")[0];
  const L = lists.all(), x = { id: Date.now().toString(36), name, color: SHEET.color, items: SHEET.key ? [SHEET.key] : [] };
  L.push(x); lists.put(L); closeSheet(); refreshHearts();
  if(SHEET.key) snack(`${l("saved")} <b>${esc(name)}</b>`);
  if(location.hash === "#listas") myLists();
}

/* Pages « Mis listas » */
function thumbs(x){
  return x.items.slice(0, 4).map(k => index().get(k)).filter(Boolean).map(v => icHTML(v.p, "ic th")).join("");
}
function myLists(){
  const L = lists.all();
  app.innerHTML = `${topbar("listas")}
    <div class="ltitle"><b>${l("mine")}</b><small>${l("mineSub")}</small></div>
    ${L.length ? `<div class="lcards">${L.map(x => `<div class="lcard">
        <a class="lchead" href="#lista-${x.id}">${lsq(x.color)}<span class="lnm"><b>${esc(lname(x))}</b><small>${nPhr(x.items.length)}</small></span><svg class="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></a>
        ${x.items.length ? `<div class="lcfoot"><span class="thumbs">${thumbs(x)}</span><button class="lplay" data-playlist="${x.id}">${ICON.play}${l("listen")}</button></div>` : ""}
      </div>`).join("")}
      <button class="lnewbig" data-newlist><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>${l("newL")}</button>
      <p class="ltip">${ICON.heart}${l("tip")}</p></div>`
    : `<div class="lempty"><span>${ICON.heart}</span><b>${l("emptyT")}</b><p>${l("emptyS")}</p><button class="shbtn" data-go="s0t0">${l("toGuide")}</button></div>`}`;
}
let PENDING = null;
function listPage(id){
  const x = lists.all().find(v => v.id === id);
  if(!x){ location.hash = "listas"; return; }
  app.dataset.list = id;
  const items = x.items.map(k => index().get(k)).filter(Boolean);
  app.innerHTML = `<div class="lbar"><button class="round" data-go="listas" aria-label="${l("back")}"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span></span>
      <div class="lopts"><button class="round" data-lopts aria-label="${l("opts")}" aria-expanded="false"><svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
      <div class="lpop" hidden><button data-lren>${l("rename")}</button>${x.id === "fav" ? "" : `<button data-ldel class="danger">${l("del")}</button>`}</div></div></div>
    <div class="lhead">${lsq(x.color, true)}<div><b>${esc(lname(x))}</b><small>${nPhr(items.length)}</small></div></div>
    ${items.length ? `<div class="lacts"><button class="qall" data-qall>${ICON.play}<span>${l("all")}</span></button><button class="qmix" data-qmix>${ICON.mix}<span>${l("mix")}</span></button></div>
      <div class="card">${items.map(v => `<div class="swipe"><button class="sdel" data-sdel="${esc(v.p.fr)}" tabindex="-1">${ICON.trash}${l("remove")}</button>${rowHTML(v.p, v.crumb)}</div>`).join("")}</div>` : `<div class="empty">${l("emptyL")}</div>`}`;
  if(PENDING === id){ PENDING = null; setTimeout(() => playQueue(false), 300); }
}
function renameList(id){
  const L = lists.all(), x = L.find(v => v.id === id); if(!x) return;
  const n = prompt(l("rename"), lname(x)); if(n == null || !n.trim()) return;
  x.name = n.trim().slice(0, 40); lists.put(L); listPage(id);
}
function deleteList(id){
  if(id === "fav" || !confirm(l("delQ"))) return;
  lists.put(lists.all().filter(v => v.id !== id)); location.hash = "listas";
}

/* Écouter toute une liste, à la suite (ou mélangée) */
let QPLAY = 0;
function stopQueue(){
  QPLAY = 0; if(player) player.pause();
  document.querySelectorAll(".row.playing").forEach(r => r.classList.remove("playing"));
  const b = app.querySelector("[data-qall]"); if(b) b.innerHTML = `${ICON.play}<span>${l("all")}</span>`;
}
async function playQueue(mix){
  if(QPLAY) stopQueue();
  const tok = QPLAY = Date.now();
  let rows = [...app.querySelectorAll(".row[data-audio^='snd']")];
  if(mix) rows = rows.map(r => [Math.random(), r]).sort((a, b) => a[0] - b[0]).map(v => v[1]);
  const b = app.querySelector("[data-qall]"); if(b) b.innerHTML = `${ICON.stop}<span>${l("stop")}</span>`;
  for(const r of rows){
    if(QPLAY !== tok) return;
    const [file, id] = r.dataset.audio.split("#");
    r.classList.add("playing"); r.scrollIntoView({ block: "center", behavior: "smooth" });
    try{ const u = await audioUrl(file, id); markHeard(r.dataset.key); await playUrl(u); }catch(e){}
    r.classList.remove("playing");
    if(QPLAY !== tok) return;
    await new Promise(ok => setTimeout(ok, 700));
  }
  if(QPLAY === tok) stopQueue();
}

/* Glisser une phrase vers la gauche dans une liste fait apparaître « Quitar » (comme Apple Music) */
const SWIPE = { row: null, x: 0, y: 0, base: 0, dx: 0, dir: null, justDragged: false };
const SW = 96;
function swipeTo(row, x){ row.style.transform = x ? `translateX(${x}px)` : ""; row.classList.toggle("open", x < 0); }
app.addEventListener("pointerdown", e => {
  const row = e.target.closest(".swipe .row"); if(!row || e.target.closest(".heart, .spk, .ic")) return;
  app.querySelectorAll(".swipe .row.open").forEach(r => r !== row && swipeTo(r, 0));
  Object.assign(SWIPE, { row, x: e.clientX, y: e.clientY, base: row.classList.contains("open") ? -SW : 0, dx: 0, dir: null, id: e.pointerId });
});
app.addEventListener("pointermove", e => {
  const S = SWIPE; if(!S.row || e.pointerId !== S.id) return;
  const dx = e.clientX - S.x, dy = e.clientY - S.y;
  if(!S.dir){ if(Math.abs(dx) < 8 && Math.abs(dy) < 8) return; S.dir = Math.abs(dx) > Math.abs(dy) ? "h" : "v"; if(S.dir === "h"){ S.row.classList.add("drag"); try{ S.row.setPointerCapture(e.pointerId); }catch(_){} } }
  if(S.dir !== "h"){ S.row = null; return; }
  S.dx = dx; const x = Math.max(-SW * 1.3, Math.min(0, S.base + dx));
  S.row.style.transform = `translateX(${x}px)`;
});
const swipeEnd = e => {
  const S = SWIPE; if(!S.row || e.pointerId !== S.id) return;
  const row = S.row; S.row = null; row.classList.remove("drag");
  if(S.dir === "h"){ swipeTo(row, S.base + S.dx < -SW / 2 ? -SW : 0); S.justDragged = true; setTimeout(() => S.justDragged = false, 350); }
};
app.addEventListener("pointerup", swipeEnd);
app.addEventListener("pointercancel", swipeEnd);

/* ---------- Practicar : le jeu « Evo cruza París » se débloque quand on a tout écouté ----------
   - une section (carte) entièrement écoutée -> bouton « Practicar » sur la carte : 5 phrases au hasard
   - toute la page écoutée -> bouton « Practicar esta página » en haut : 10 phrases au hasard */
let PVIEW = null;
const withAudio = ps => ps.filter(p => p.audio && p.audio[0]);
const allHeard = ps => { const h = new Set(seen.get("evoala-heard")); const a = withAudio(ps); return a.length > 0 && a.every(p => h.has(p.fr)); };
// niveaux faits au jeu (0 à 3), par carte et par page : vert = fait, violet = à faire
const levelsDone = () => { try{ return JSON.parse(localStorage.getItem("evoala-levels") || "{}") || {}; }catch(e){ return {}; } };
const bestStars = levelsDone;   // (ancien nom, gardé pour la synchro)
const doneOf = si => Object.entries(levelsDone()).reduce((a, [k, v]) => { const m = k.match(/^s(\d+)t/); return a + (m && (si == null || +m[1] === si) && v >= 3 ? 1 : 0); }, 0);
const doneChip = (n, cls = "") => `<span class="schip ${cls}">✓ ${n}</span>`;
function lvCircles(done, light){
  let h = ""; for(let n = 1; n <= 3; n++){ h += `<span class="lc ${n <= done ? "d" : n === done + 1 ? "n" : "t"}${light ? " w" : ""}">${n}</span>`; if(n < 3) h += `<i class="${n <= done ? "d" : ""}"></i>`; }
  return `<span class="lcs">${h}</span>`;
}
function refreshPractice(animate){
  if(!PVIEW || app.dataset.list) return;
  const v = PVIEW.view, L = levelsDone();
  app.querySelectorAll(".card[data-g]").forEach(c => {
    const g = v.groups[+c.dataset.g], slot = c.querySelector(".pslot"); if(!g || !slot || slot.firstChild || !allHeard(g.phrases)) return;
    const n = L[PVIEW.back + "|" + c.dataset.g] || 0;
    slot.innerHTML = `<div class="pdone${animate ? " pop" : ""}">${lvCircles(n)}${n >= 3 ? `<b>${t("allDone")}</b><button class="pbtn ghost" data-practice="${c.dataset.g}">${t("again")}</button>`
      : `<span style="flex:1"></span><button class="pbtn" data-practice="${c.dataset.g}">${PICON}${n ? `${t("lvl")} ${n + 1}` : t("practice")}</button>`}</div>`;
  });
  const top = app.querySelector(".ppage");
  if(top && !top.firstChild && allHeard(v.groups.flatMap(g => g.phrases))){
    const n = L[PVIEW.back + "|page"] || 0, all = n >= 3;
    top.innerHTML = `<button class="pbig${all ? " won" : ""}${animate ? " pop" : ""}" data-practice="page"><img src="img/ui/${all ? "evo-happy" : "evo"}.png" alt=""><span><b>${all ? t("pageWon") : t("practicePage")}</b>${lvCircles(n, !all)}<small>${all ? t("pageAgain") : n ? `${t("pageNext")} ${n + 1}` : t("practiceSub")}</small></span>${PICON}</button>`;
  }
}
const PICON = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
function startPractice(which){
  if(!PVIEW) return;
  const v = PVIEW.view, page = which === "page";
  let pool = page ? v.groups.flatMap(g => g.phrases) : (v.groups[+which] || {}).phrases || [];
  pool = withAudio(pool);
  const own = pool.filter(p => p.who !== "staff");              // on fait dire de préférence les phrases du voyageur
  if(own.length >= Math.min(page ? 10 : 5, pool.length)) pool = own;
  const n = Math.min(page ? 10 : 5, pool.length);
  const pick = pool.map(p => [Math.random(), p]).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1])
                   .sort((a, b) => a.fr.length - b.fr.length);   // des plus courtes aux plus longues
  const title = page ? PVIEW.title : (v.groups[+which].label || PVIEW.title);
  try{ sessionStorage.setItem("evoala-game", JSON.stringify({ title, back: PVIEW.back, coach: window.EvoAuth && window.EvoAuth.user ? "user" : "guest", key: PVIEW.back + "|" + (page ? "page" : which), lang: LANG, items: pick.map(p => ({ fr: p.fr, es: p.es, pr: p.pr || "", audio: p.audio })) })); }catch(e){}
  location.href = "juego.html";
}

/* ---------- Clics ---------- */
app.addEventListener("click", e => {
  const lb = e.target.closest("[data-lang]");
  if(lb){ setLang(lb.dataset.lang); return; }
  const go = e.target.closest("[data-go]");
  if(go?.hasAttribute("data-cat")){ try{ localStorage.setItem("evoala-cat","1"); }catch(_){} }
  if(go){ if(go.dataset.go || go.classList.contains("home") || go.hasAttribute("data-home")){ location.hash = go.dataset.go; if(!go.dataset.go) route(); } return; }
  if(e.target.closest("[data-buy]")){
    if(!CHECKOUT){ toast(lk("soon")); return; }
    const u = window.EvoAuth && window.EvoAuth.user;
    location.href = CHECKOUT + (u && u.email ? (CHECKOUT.includes("?") ? "&" : "?") + "email=" + encodeURIComponent(u.email) : "");
    return;
  }
  const lg = e.target.closest("[data-lgo]");
  if(lg){ try{ sessionStorage.setItem("evoala-after", location.hash.slice(1)); }catch(e2){} location.hash = lg.dataset.lgo; return; }
  const lc = e.target.closest("[data-lcheck],[data-lverified]");
  if(lc){ checkPurchase(lc); return; }
  if(e.target.closest("[data-lresend]")){ window.EvoAuth?.verify().then(() => toast(lk("verSent"))).catch(() => toast(t("noLoad"))); return; }
  if(e.target.closest("[data-start]")){ onboarded.set(); location.hash = "cuenta"; return; }
  if(e.target.closest("[data-later]")){ onboarded.set(); location.hash = ""; route(); return; }
  if(e.target.closest("[data-aback]")){ if(history.length > 1) history.back(); else { location.hash = ""; } return; }
  const am = e.target.closest("[data-amenu]");
  if(am){ const pop = am.parentElement.querySelector(".apop"); pop.hidden = !pop.hidden; am.setAttribute("aria-expanded", String(!pop.hidden)); return; }
  if(e.target.closest("[data-signout]")){ window.EvoAuth.signOut().then(() => { toast(a("signedOut")); route(); }); return; }
  if(e.target.closest("[data-notify]")){ toast(HUB[LANG].notifyToast); return; }
  if(e.target.closest("[data-hint]")){ try{ localStorage.setItem("evoala-hint","1"); }catch(_){} app.querySelector(".hint")?.remove(); return; }
  if(e.target.closest("[data-up]")){ scrollTo({top:0,behavior:"smooth"}); return; }
  if(SWIPE.justDragged){ SWIPE.justDragged = false; return; }
  const sd = e.target.closest("[data-sdel]");
  if(sd){ heartClick(sd.dataset.sdel); return; }
  const openRow = app.querySelector(".swipe .row.open");
  if(openRow){ swipeTo(openRow, 0); return; }               // un toucher ailleurs referme le bouton « Quitar »
  if(e.target.closest("[data-tuto]")){ if(location.hash === "#guia") tour("guia", true); else openTuto(); return; }
  const pr = e.target.closest("[data-practice]");
  if(pr){ startPractice(pr.dataset.practice); return; }
  const hb = e.target.closest(".heart");
  if(hb){ heartClick(hb.closest(".row").dataset.key); return; }
  const pl = e.target.closest("[data-playlist]");
  if(pl){ PENDING = pl.dataset.playlist; location.hash = "lista-" + PENDING; return; }
  if(e.target.closest("[data-newlist]")){ openSheet(null, "new"); return; }
  if(e.target.closest("[data-qall]")){ QPLAY ? stopQueue() : playQueue(false); return; }
  if(e.target.closest("[data-qmix]")){ playQueue(true); return; }
  const lo = e.target.closest("[data-lopts]");
  if(lo){ const pop = app.querySelector(".lpop"); pop.hidden = !pop.hidden; lo.setAttribute("aria-expanded", String(!pop.hidden)); return; }
  if(e.target.closest("[data-lren]")){ renameList(app.dataset.list); return; }
  if(e.target.closest("[data-ldel]")){ deleteList(app.dataset.list); return; }
  const row = e.target.closest(".row"); if(!row) return;
  if(e.target.closest(".ic")){                       // l'illustration = prononciation
    const es = row.querySelector(".es");
    const on = !es.classList.contains("showpr");
    es.classList.toggle("showpr", on);
    row.classList.toggle("pron", on);
    es.innerHTML = esc(es.dataset.es) + (on && es.dataset.pr ? `<span class="pr pr-under">${esc(es.dataset.pr)}</span>` : "");   // la prononciation s'ajoute sous la traduction
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
async function audioUrl(file, id){
  if(!urls[id]){
    const b = await bundle(file);
    const bin = Uint8Array.from(atob(b[id]), c => c.charCodeAt(0));
    urls[id] = URL.createObjectURL(new Blob([bin], {type:"audio/mpeg"}));
  }
  return urls[id];
}
function playUrl(u){
  return new Promise((ok, ko) => { if(player) player.pause(); player = new Audio(u); player.onended = ok; player.onerror = ko; player.play().catch(ko); });
}
async function playRow(row){
  if(QPLAY) stopQueue();
  const [file, id] = row.dataset.audio.split("#");
  document.querySelectorAll(".row.playing").forEach(r => r.classList.remove("playing"));
  row.classList.add("playing");
  try{ const u = await audioUrl(file, id); markHeard(row.dataset.key); await playUrl(u); }catch(e){ toast(t("noPlay")); }
  row.classList.remove("playing");
  if(row.dataset.key && heardHas(row.dataset.key)){ document.querySelectorAll(`.row[data-key="${CSS.escape(row.dataset.key)}"]`).forEach(r => r.classList.add("heard")); refreshPractice(true); }   // « Practicar » n'apparaît qu'après la fin du son
}
// précharge l'audio de la page affichée
function preload(){ const r = app.querySelector(".row[data-audio^='snd']"); if(r) bundle(r.dataset.audio.split("#")[0]); }

/* ---------- Visites guidées : le hub (choisir sa guide) et le sommaire du guide (les thèmes) ----------
   Elles s'ouvrent une seule fois, à la première arrivée sur la page (comme le tutoriel du jeu).
   La visite du sommaire se relance avec l'ampoule en haut de la page. */
const TOURS = {
  hub: {
    es:[{ t:"¡Hola! Soy Evo 👋", p:"Te muestro cómo funciona Evoala en unos segundos." },
        { sel:".feat", t:"Tu guía", p:"Esta es la Guía de supervivencia: frases para viajar a Francia, con audio y pronunciación. Toca el botón violeta para abrirla." },
        { sel:".ggrid", t:"Otras guías (disponibles pronto)", p:"Cada guía tiene su misión: empezar desde cero, preparar el examen oficial del DELF…" },
        { sel:".hubright .hl", t:"Idioma", p:"Aquí cambias el idioma de la aplicación: español o inglés." },
        { sel:".hubright .achip", t:"Tu cuenta", p:"Crea tu cuenta gratis para guardar tu progreso y seguirlo en otro teléfono." }],
    en:[{ t:"Hi! I'm Evo 👋", p:"Let me show you how Evoala works in a few seconds." },
        { sel:".feat", t:"Your guide", p:"This is the Survival Guide: phrases for travelling in France, with audio and pronunciation. Tap the purple button to open it." },
        { sel:".ggrid", t:"Other guides (coming soon)", p:"Each guide has its own mission: starting from zero, preparing for the official DELF exam…" },
        { sel:".hubright .hl", t:"Language", p:"Change the app language here: Spanish or English." },
        { sel:".hubright .achip", t:"Your account", p:"Create a free account to save your progress and continue on another phone." }] },
  guia: {
    es:[{ sel:".gprog", t:"Tu progreso", p:"Aquí ves cuántas frases escuchaste y practicaste. El botón de abajo te lleva directo a donde te quedaste." },
        { sel:".gtiles", t:"Los temas", p:"Cada tarjeta es una situación del viaje: compras, transporte, comida, alojamiento… Toca una para ver sus frases." },
        { sel:".nav", t:"Siempre a mano", p:"Abajo vuelves a la guía, a tus listas de frases favoritas o a la Guía de Paris." }],
    en:[{ sel:".gprog", t:"Your progress", p:"See how many phrases you've heard and practised. The button below takes you straight back to where you left off." },
        { sel:".gtiles", t:"The topics", p:"Each card is a travel situation: shopping, transport, food, accommodation… Tap one to see its phrases." },
        { sel:".nav", t:"Always at hand", p:"At the bottom: back to the guide, your favourite phrase lists, or the Paris Guide." }] }
};
const TOUR_UI = { es:{ next:"Siguiente", done:"¡Entendido!", skip:"Saltar" }, en:{ next:"Next", done:"Got it!", skip:"Skip" } };
let tourOn = false;
function tour(name, force){
  const key = "evoala-tour-" + name;
  if(tourOn) return;
  if(!force){ try{ if(localStorage.getItem(key)) return; }catch(e){ return; } }
  const steps = (TOURS[name][LANG] || TOURS[name].es).filter(st => !st.sel || document.querySelector(st.sel));
  if(!steps.length) return;
  tourOn = true;
  const U = TOUR_UI[LANG] || TOUR_UI.es;
  const blk = document.createElement("div"), spot = document.createElement("div"), bub = document.createElement("div");
  blk.className = "tr-blk"; spot.className = "tr-spot none"; bub.className = "tr-bub";
  document.body.append(blk, spot, bub);
  let i = 0;
  const end = () => { try{ localStorage.setItem(key, "1"); }catch(e){} [blk, spot, bub].forEach(el => el.remove()); tourOn = false; removeEventListener("resize", place); };
  function place(){
    const st = steps[i], el = st.sel && document.querySelector(st.sel);
    if(!el){ spot.className = "tr-spot none"; bub.style.top = ""; bub.classList.add("mid"); return; }
    const r = el.getBoundingClientRect(), pad = 8;
    spot.className = "tr-spot";
    Object.assign(spot.style, { top: r.top - pad + "px", left: r.left - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
    bub.classList.remove("mid");
    const bh = bub.offsetHeight, below = r.bottom + pad + 14;
    bub.style.top = (below + bh < innerHeight - 10 ? below : Math.max(10, r.top - pad - 14 - bh)) + "px";
  }
  function show(){
    const st = steps[i], el = st.sel && document.querySelector(st.sel), last = i === steps.length - 1;
    bub.innerHTML = `<img src="img/ui/evo.png" alt=""><div class="bt"><b>${st.t}</b><p>${st.p}</p>
      <div class="bf"><span class="cnt">${i + 1} / ${steps.length}</span>${last ? "" : `<button class="sk" data-trskip>${U.skip}</button>`}<button class="nx" data-trnext>${last ? U.done : U.next}</button></div></div>`;
    if(el){
      const r = el.getBoundingClientRect(), fixed = getComputedStyle(el).position === "fixed" || el.closest(".nav,.top");
      if(!fixed && (r.top < 70 || r.bottom > innerHeight - 200)) scrollBy({ top: r.top - Math.max(80, (innerHeight - r.height) / 2 - 90), behavior: "instant" });
    }
    requestAnimationFrame(place);
  }
  bub.addEventListener("click", e => {
    if(e.target.closest("[data-trskip]")) return end();
    if(e.target.closest("[data-trnext]")){ if(i === steps.length - 1) return end(); i++; show(); }
  });
  addEventListener("resize", place);
  show();
}

/* ---------- Tutoriel : à la première utilisation, et à chaque visite pour qui n'a pas de compte (« Ahora no ») ---------- */
/* ---------- Tutoriel de la page, sur la vraie page Esenciales › Indispensables (Bonjour, Bonsoir, Salut) ----------
   À la première utilisation, et à chaque visite pour qui n'a pas de compte (« Ahora no »).
   Il fait vraiment écouter les 3 phrases : le bouton « Practicar » se débloque et reste sur la page. */
const PT_TXT = {
  es:{ introT:"Así funciona la guía", intro:"Te enseño a usarla en 30 segundos, con las tres primeras frases.", again:"¡Hola de nuevo! Crea tu cuenta gratis para guardar tu progreso y tus listas, y no volver a ver este tutorial.",
       start:"Empezar", skip:"Saltar", seeT:"Ver tutorial", acc:"Crear cuenta", next:"Siguiente",
       catsT:"Las categorías", cats:"Aquí eliges lo que quieres aprender: saludos, compras, transporte… Desliza para ver más.",
       tabsT:"Los temas", tabs:"Cada categoría tiene varios temas. Toca uno para cambiar de página.",
       spk:"Este icono te permite escuchar la pronunciación.", tapIcon:"Toca el icono",
       goodT:"¡Muy bien!", good:"El círculo verde alrededor del altavoz te recuerda que ya escuchaste esta frase.",
       img:"Tocar la imagen te muestra cómo se lee la frase.", tapImg:"Toca la imagen",
       sayT:"Así se dice", say:pr => `«${pr}»: la sílaba en mayúsculas es la que se marca más. Toca otra vez la imagen para ocultarla.`,
       heart:"Crea tus listas de frases favoritas.",
       turn:() => "Para desbloquear una sorpresa.", turnLab:"Escucha las dos frases",
       prT:"¡Escuchaste todo! 🎉", pr:"Se desbloqueó «Practicar»: un juego para decir las frases en francés. Se queda aquí, y te lo explico cuando lo abras.",
       navT:"Tu menú", nav:"Abajo tienes la guía, tus listas y la Guía de París.",
       listsT:"Mis listas", lists:"Aquí encuentras las frases que guardaste con el corazón.",
       parisT:"La Guía de París 🗼", paris:"¿Vas a París? Aquí tienes los lugares que no te puedes perder, con consejos prácticos.",
       endT:"¡Listo para viajar! 🇫🇷", end:"Ahora explora la guía a tu ritmo. ¡Bon voyage!", go:"¡Vamos!" },
  en:{ introT:"How the guide works", intro:"Let me show you how to use it in 30 seconds, with the first three phrases.", again:"Welcome back! Create a free account to save your progress and lists, and skip this tutorial next time.",
       start:"Start", skip:"Skip", seeT:"See tutorial", acc:"Create account", next:"Next",
       catsT:"Categories", cats:"Choose what you want to learn here: greetings, shopping, transport… Swipe to see more.",
       tabsT:"Topics", tabs:"Each category has several topics. Tap one to change page.",
       spk:"This icon lets you hear the pronunciation.", tapIcon:"Tap the icon",
       goodT:"Well done!", good:"The green ring around the speaker reminds you that you've already heard this phrase.",
       img:"Tapping the picture shows you how to read the phrase.", tapImg:"Tap the picture",
       sayT:"How to say it", say:pr => `“${pr}”: the syllable in capitals is the stressed one. Tap the picture again to hide it.`,
       heart:"Create your lists of favourite phrases.",
       turn:() => "To unlock a surprise.", turnLab:"Listen to both phrases",
       prT:"You heard everything! 🎉", pr:"“Practise” is unlocked: a game to say the phrases in French. It stays here, and I'll explain it when you open it.",
       navT:"Your menu", nav:"At the bottom: the guide, your lists and the Paris Guide.",
       listsT:"My lists", lists:"Find the phrases you saved with the heart here.",
       parisT:"The Paris Guide 🗼", paris:"Going to Paris? Here are the places you can't miss, with practical tips.",
       endT:"Ready to travel! 🇫🇷", end:"Now explore the guide at your own pace. Bon voyage!", go:"Let's go!" }
};
let ptOn = false, ptPending = false, ptBack = "";
const ptRow = i => document.querySelectorAll('.card[data-g="0"] .row')[i];
function ptRect(el){ return el ? el.getBoundingClientRect() : null; }
async function ptListen(row){ if(!row) return; if(!row.classList.contains("heard")) await playRow(row); else playRow(row); }
function openTuto(){
  try{ sessionStorage.setItem("evoala-tuto-s", "1"); }catch(e){}
  ptBack = location.hash.slice(1) || "guia";
  if(location.hash !== "#s0t0"){ ptPending = true; location.hash = "s0t0"; }
  else setTimeout(pageTuto, 300);
}
function pageTuto(){
  if(ptOn || !ptRow(2)) return;
  ptOn = true;
  const T = PT_TXT[LANG] || PT_TXT.es, guest = !(window.EvoAuth && window.EvoAuth.user);
  let again = false; try{ const n = +(localStorage.getItem("evoala-tuto-count") || 0) + 1; localStorage.setItem("evoala-tuto-count", String(n)); again = guest && n >= 2; }catch(e){}
  const f = (i, q) => () => ptRow(i)?.querySelector(q);
  const S = [
    { title: T.introT, text: again ? T.again : T.intro, next: T.start, skip: true, account: again },
    { el: () => document.querySelector(".catwrap"), title: T.catsT, text: T.cats },
    { el: () => document.querySelector(".ptabs"), title: T.tabsT, text: T.tabs },
    { el: f(0, ".spk"), round: true, text: T.spk, wait: T.tapIcon, act: () => ptListen(ptRow(0)) },
    { el: () => ptRow(0), title: T.goodT, text: T.good },
    { el: f(0, ".ic"), text: T.img, wait: T.tapImg, act: () => { const es = ptRow(0).querySelector(".es"); if(!es.classList.contains("showpr")) ptRow(0).querySelector(".ic").click(); } },
    { el: () => ptRow(0), title: T.sayT, text: T.say(ptRow(0).querySelector(".es").dataset.pr || "") },
    { el: f(0, ".heart"), round: true, text: T.heart, wait: T.tapIcon, act: () => ptRow(0).querySelector(".heart").classList.add("on") },
    { el: () => document.querySelector('.card[data-g="0"]'), text: T.turn(ptRow(1).dataset.key, ptRow(2).dataset.key), wait: T.turnLab, hand: f(1, ".spk"), labAt: () => ptRow(2), box: () => [ptRow(1).querySelector(".spk"), ptRow(2).querySelector(".spk")],
      hit: t => t.closest('.card[data-g="0"] .row') && [ptRow(1), ptRow(2)].includes(t.closest(".row")),
      act: async t => { await ptListen(t.closest(".row")); return [0, 1, 2].every(i => ptRow(i).classList.contains("heard")); } },
    { el: () => document.querySelector('.card[data-g="0"] .pslot'), title: T.prT, text: T.pr, before: () => refreshPractice(true) },
    { el: () => document.querySelector(".nav"), title: T.navT, text: T.nav },
    { el: () => document.querySelector('.nav [data-go="listas"]'), round: true, title: T.listsT, text: T.lists },
    { el: () => document.querySelector('.nav [data-go="p1"]'), round: true, title: T.parisT, text: T.paris },
    { title: T.endT, text: T.end, next: T.go, end: true }
  ];
  const blk = document.createElement("div"), spot = document.createElement("div"), bub = document.createElement("div"), hand = document.createElement("div"), lab = document.createElement("div"), box = document.createElement("div");
  blk.className = "tr-blk"; spot.className = "tr-spot none"; bub.className = "tr-bub"; hand.id = "tr-hand"; lab.id = "tr-lab"; box.id = "tr-box";
  hand.innerHTML = `<svg viewBox="-4 -8 52 66"><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path class="ray" d="M18 -6V-1M8.5 -2l3 3.5M27.5 -2l-3 3.5M3 8h5M28 8h5"/></g><path d="M14 31V10a4 4 0 0 1 8 0v15v-1.5a4 4 0 0 1 8 0V27v-1a4 4 0 0 1 8 0v3.5a3.5 3.5 0 0 1 7 0V42c0 8-6 14-14 14h-6c-5 0-8-2.5-11-6.5L5.2 40.6a3.6 3.6 0 0 1 5.4-4.8L14 39.5Z" fill="#fff" stroke="#2E2550" stroke-width="2.6" stroke-linejoin="round"/><path d="M22 25v5M30 26.5v4M38 28.5v3.5" stroke="#2E2550" stroke-width="2.2" stroke-linecap="round"/></svg>`;
  document.body.append(blk, spot, bub, box, hand, lab);
  let k = 0, busy = false;
  const count = () => k >= 1 && k < S.length - 1 ? `${k} / ${S.length - 2}` : "";
  function finish(goBack){
    try{ localStorage.setItem("evoala-tuto", "1"); }catch(e){}
    [blk, spot, bub, box, hand, lab].forEach(el => el.remove()); document.body.classList.remove("pt-tap"); ptOn = false;
    removeEventListener("resize", place); removeEventListener("scroll", place);
    // on reste sur la page : le bouton « Practicar » débloqué y est visible
  }
  function place(){
    const s = S[k], el = s.el && s.el(), r = ptRect(el);
    document.body.classList.toggle("pt-tap", !!s.act);
    if(!r){ spot.className = "tr-spot none"; bub.classList.add("mid"); bub.style.top = ""; return; }
    const pad = s.round ? 8 : 6, w = r.width + pad * 2, h = r.height + pad * 2;
    spot.className = "tr-spot" + (s.act ? " tap" : "");
    Object.assign(spot.style, { top: r.top - pad + "px", left: r.left - pad + "px", width: w + "px", height: h + "px", borderRadius: (s.round ? Math.max(w, h) / 2 : 18) + "px" });
    bub.classList.remove("mid");
    box.style.display = s.box ? "block" : "none";               // contour violet autour des zones à toucher
    if(s.box){ const rs = s.box().map(ptRect).filter(Boolean), p2 = 7;
      const l = Math.min(...rs.map(q => q.left)), t2 = Math.min(...rs.map(q => q.top)), rr = Math.max(...rs.map(q => q.right)), b2 = Math.max(...rs.map(q => q.bottom));
      Object.assign(box.style, { left: l - p2 + "px", top: t2 - p2 + "px", width: rr - l + p2 * 2 + "px", height: b2 - t2 + p2 * 2 + "px" }); }
    if(s.act){                                                    // main qui tape + étiquette, juste sous la zone à toucher
      const hr = ptRect(s.hand ? s.hand() : el), cx = hr.left + hr.width / 2, tip = hr.bottom - 8;
      hand.style.left = (cx - 13) + "px"; hand.style.top = (tip - 8) + "px";
      const ra = s.labAt && ptRect(s.labAt()), lw = lab.offsetWidth, ly = ra ? ra.bottom + 30 : tip + 10;
      let lx = ra ? ra.left + ra.width / 2 - lw / 2 : cx > innerWidth / 2 ? cx - 22 - lw : cx + 26;
      lab.style.left = Math.max(8, Math.min(innerWidth - lw - 8, lx)) + "px"; lab.style.top = ly + "px";
    }
    const bh = bub.offsetHeight || 140, below = r.bottom + pad + 14 + (s.act && !s.hand ? 48 : s.labAt ? 58 : 0);
    bub.style.top = (below + bh < innerHeight - 10 ? below : Math.max(10, r.top - pad - 14 - bh)) + "px";
  }
  function show(){
    const s = S[k]; if(s.before) s.before();
    const el = s.el && s.el();
    if(el && !el.closest(".nav")) el.scrollIntoView({ block: "center", behavior: "smooth" });
    bub.classList.toggle("mini", !!s.act);
    lab.textContent = s.wait || "";
    bub.innerHTML = `<img src="img/ui/evo.png" alt=""><div class="bt">${s.act ? "" : `<b>${s.title}</b>`}<p>${s.text}</p>
      <div class="bf"><span class="cnt">${count()}</span>${s.skip && !s.account ? `<button class="sk" data-ptskip>${T.skip}</button>` : ""}${s.account ? `<button class="sk acc" data-ptnext>${T.seeT}</button><button class="nx" data-ptacc>${T.acc}</button>`
        : s.act ? "" : `<button class="nx" data-ptnext>${s.next || T.next}</button>`}</div></div>`;
    place(); setTimeout(place, el ? 420 : 0);
  }
  bub.addEventListener("click", e => {
    if(e.target.closest("[data-ptskip]")) return finish(true);
    if(e.target.closest("[data-ptacc]")){ finish(false); location.hash = "cuenta"; return; }
    if(e.target.closest("[data-ptnext]")){ if(S[k].end) return finish(true); k++; show(); }
  });
  blk.addEventListener("click", async e => {                      // on ne laisse passer que le toucher sur la zone demandée
    const s = S[k]; if(!s.act || busy) return;
    const r = ptRect(s.el()); if(!r || e.clientX < r.left - 10 || e.clientX > r.right + 10 || e.clientY < r.top - 10 || e.clientY > r.bottom + 10) return;
    blk.style.pointerEvents = "none"; const t = document.elementFromPoint(e.clientX, e.clientY); blk.style.pointerEvents = "";
    if(s.hit && !(t && s.hit(t))) return;
    busy = true; const done = await s.act(t); busy = false;
    if(done !== false){ k++; show(); }
  });
  addEventListener("resize", place); addEventListener("scroll", place, { passive: true });
  show();
}
function maybeTuto(h, tries = 0){
  if(!/^s\d/.test(h)) return;                                  // on voit d'abord le hub et ses thèmes ; le tuto s'ouvre au premier thème choisi
  let doneS = false, done = false; try{ doneS = !!sessionStorage.getItem("evoala-tuto-s"); done = !!localStorage.getItem("evoala-tuto"); }catch(e){}
  if(doneS) return;                                              // déjà vu pendant cette visite
  if(AUTH_ON && !window.EvoAuth && tries < 12){ setTimeout(() => maybeTuto(location.hash.slice(1), tries + 1), 250); return; }
  const A = window.EvoAuth;
  if(A && !A.disabled && !A.ready && tries < 24){ setTimeout(() => maybeTuto(location.hash.slice(1), tries + 1), 250); return; }
  const loggedIn = !!(A && A.user);
  if(loggedIn && done) return;                                   // avec un compte : une seule fois
  openTuto(); return location.hash !== "#" + h;
}
function route(){
  const h = location.hash.slice(1);
  if(maybeTuto(h)) return;
  delete app.dataset.list; PVIEW = null; if(QPLAY) stopQueue(); closeSheet();
  let m;
  let where = "home";
  if((m = h.match(/^s(\d+)t(\d+)(?:p(\d+))?$/))){ phrases(+m[1], +m[2], +(m[3] || 0)); where = "guide"; store.set(h); }
  else if(h === "listas"){ myLists(); where = "listas"; }
  else if((m = h.match(/^lista-([\w-]+)$/))){ listPage(m[1]); where = "listas"; }
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
  initCats(); scrollTo(0,0); preload();
  if(ptPending && h === "s0t0"){ ptPending = false; setTimeout(pageTuto, 500); }
  if(where === "hub" && document.querySelector(".feat")) setTimeout(() => tour("hub"), 500);
  else if(h === "guia") setTimeout(() => tour("guia"), 500);
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
    lastAcc = JSON.stringify(c._acc || {});
    if(AUTH_ON){ const hook = () => { if(!window.EvoAuth) return setTimeout(hook, 150); window.EvoAuth.onChange(u => { onAuth(u); reloadContent(); }); window.EvoAuth.onToken(() => reloadContent()); }; hook(); } })
  .catch(() => app.innerHTML = `<div class="empty">${t("noLoad")}</div>`);
