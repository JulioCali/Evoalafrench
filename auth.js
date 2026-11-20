/* ===== Evoala · Comptes (Firebase) =====
   Création de compte, connexion (e-mail ou Google), mot de passe oublié,
   et sauvegarde de la langue et de la dernière page dans Firestore (users/{uid}).
   Le jeton de connexion est copié dans le cookie evo_t : le serveur (worker.js) s'en sert
   pour savoir si la personne a acheté le guide, et lui envoyer le contenu complet.
   Si Firebase ne se charge pas, l'appli continue de marcher sans compte. */

const V = "10.12.2";
const firebaseConfig = {
  apiKey: "AIzaSyDrMAnwyRVjnfHx-N0OeHkua_ZIX69kp5U",
  authDomain: "evoalafrench-db460.firebaseapp.com",
  projectId: "evoalafrench-db460",
  storageBucket: "evoalafrench-db460.firebasestorage.app",
  messagingSenderId: "170591419173",
  appId: "1:170591419173:web:5ea8bce0257b58425f78cc"
};

const listeners = [], tokenListeners = [];
function setCookie(tok){
  const sec = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = tok ? `evo_t=${encodeURIComponent(tok)}; Path=/; Max-Age=3500; SameSite=Lax${sec}` : `evo_t=; Path=/; Max-Age=0; SameSite=Lax${sec}`;
}
let A, F, auth, db, user = null, ready = false;

const EvoAuth = {
  get user(){ return user; },
  get ready(){ return ready; },
  onChange(cb){ listeners.push(cb); if(ready) cb(user); },
  onToken(cb){ tokenListeners.push(cb); },
  async google(){
    const p = new A.GoogleAuthProvider();
    p.setCustomParameters({ prompt: "select_account" });
    try{ return await A.signInWithPopup(auth, p); }
    catch(e){
      if(e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment") return A.signInWithRedirect(auth, p);
      throw e;
    }
  },
  async signUp(email, pass){
    const r = await A.createUserWithEmailAndPassword(auth, email, pass);
    try{ await A.sendEmailVerification(r.user); }catch(e){ console.warn("[evoala] verify", e.code || e); }
    return r;
  },
  // renvoie l'e-mail de vérification
  verify(){ return user ? A.sendEmailVerification(user) : Promise.resolve(); },
  // relit le compte (après un clic dans l'e-mail de vérification ou un achat) et renouvelle le jeton
  async refresh(){
    if(!user) return null;
    try{ await user.reload(); user = auth.currentUser; }catch(e){}
    const tok = await user.getIdToken(true); setCookie(tok);
    return user;
  },
  signIn(email, pass){ return A.signInWithEmailAndPassword(auth, email, pass); },
  reset(email){ return A.sendPasswordResetEmail(auth, email); },
  signOut(){ return A.signOut(auth); },
  async save(data){
    if(!user || !db) return;
    try{ await F.setDoc(F.doc(db, "users", user.uid), { ...data, updatedAt: F.serverTimestamp() }, { merge: true }); }catch(e){ console.warn("[evoala] save", e.code || e); }
  },
  async load(){
    if(!user || !db) return null;
    try{ const s = await F.getDoc(F.doc(db, "users", user.uid)); return s.exists() ? s.data() : null; }catch(e){ console.warn("[evoala] load", e.code || e); return null; }
  }
};
window.EvoAuth = EvoAuth;

(async () => {
  try{
    const [appM, authM, fsM] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
    A = authM; F = fsM;
    const app = appM.initializeApp(firebaseConfig);
    auth = A.getAuth(app);
    auth.useDeviceLanguage();
    db = F.getFirestore(app);
    A.getRedirectResult(auth).catch(() => {});
    // jeton renouvelé (toutes les heures, à la connexion, à la déconnexion) -> cookie à jour
    A.onIdTokenChanged(auth, async u => {
      try{ setCookie(u ? await u.getIdToken() : null); }catch(e){}
      if(ready) tokenListeners.forEach(cb => { try{ cb(u); }catch(e){} });
    });
    A.onAuthStateChanged(auth, async u => {
      try{ setCookie(u ? await u.getIdToken() : null); }catch(e){}
      user = u; ready = true;
      listeners.forEach(cb => { try{ cb(u); }catch(e){ console.error(e); } });
    });
  }catch(e){
    console.warn("[evoala] Firebase indisponible", e);
    ready = true; window.EvoAuth.disabled = true;
    listeners.forEach(cb => cb(null));
  }
})();
