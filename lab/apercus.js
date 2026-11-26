// Aperçus des activités : un mini schéma de l'écran de chaque activité, dessiné en SVG (pas d'image à maintenir).
// Apercu(nom) renvoie le SVG ; le nom vient du champ « apercu » de chaque activité dans acts.js.
const Apercu = (() => {
  const V = "#6C4FE0", L = "#EDE9FF", M = "#C4BAF4", G = "#D9D6E3", W = "#fff", OK = "#3DBE7E", OKF = "#E6F6EE", R = "#E5484D", RF = "#FDECEF", T = "#B9B4C9";
  const r = (x, y, w, h, f, rx = 4, s = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${s}/>`;
  const c = (x, y, rr, f) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="${f}"/>`;
  const ligne = (x, y, w, f = T, h = 4) => r(x, y, w, h, f, h / 2);
  const carte = (x, y, w, h, f = W, b = "#E6E2F0") => r(x, y, w, h, f, 6, `stroke="${b}" stroke-width="1.2"`);
  // petit haut-parleur
  const hp = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 -3h3l4-3.5v13L-2 3h-3z" fill="${V}"/><path d="M4.5 -3.5a5 5 0 0 1 0 7" stroke="${V}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
  // petite image (paysage stylisé)
  const img = (x, y, w, h) => r(x, y, w, h, "#FFF4E2", 5) + c(x + w * .3, y + h * .35, Math.min(w, h) * .12, "#F5B946") + `<path d="M${x + w * .1} ${y + h * .85}L${x + w * .45} ${y + h * .45}L${x + w * .65} ${y + h * .65}L${x + w * .75} ${y + h * .55}L${x + w * .9} ${y + h * .85}Z" fill="#9C8FE0"/>`;
  const S = {
    memory: () => {
      let s = "";
      [[0, 0, 1], [1, 0, 0], [2, 0, 2], [0, 1, 0], [1, 1, 1], [2, 1, 0]].forEach(([i, j, t]) => {
        const x = 14 + i * 32, y = 12 + j * 34;
        s += t === 0 ? r(x, y, 28, 30, V, 5) + c(x + 14, y + 15, 4, M) : carte(x, y, 28, 30, t === 1 ? OKF : W, t === 1 ? OK : "#E6E2F0") + ligne(x + 6, y + 13, 16, t === 1 ? OK : T);
      });
      return s;
    },
    escucha: () => c(60, 18, 11, M) + hp(60, 18) + [0, 1, 2, 3].map(i => carte(18, 36 + i * 12.5, 84, 10, i === 1 ? OKF : W, i === 1 ? OK : "#E6E2F0") + ligne(26, 39 + i * 12.5, i % 2 ? 40 : 52, i === 1 ? OK : T)).join(""),
    asocia: () => {
      const col = ["#F5B946", "#3E9BD6", "#D9659B"];
      let s = "";
      [0, 1, 2, 3].forEach(i => {
        const y = 12 + i * 17, f = i < 3 ? col[i] : null;
        s += carte(14, y, 38, 13, f ? f + "33" : W, f || "#E6E2F0") + ligne(21, y + 4.5, 22, f || T);
        const j = [2, 0, 3, 1][i], yy = 12 + j * 17, ff = j < 3 ? col[j] : null;
        s += carte(68, yy, 38, 13, ff ? ff + "33" : W, ff || "#E6E2F0") + ligne(75, yy + 4.5, 20, ff || T);
      });
      return s;
    },
    audios: () => img(46, 8, 28, 22) + ligne(36, 35, 48, "#3B3550", 5) + [0, 1, 2].map(i => { const x = 30 + i * 30; return c(x, 58, 9, M) + hp(x, 58, .8) + c(x, 77, 4.5, i === 1 ? V : W) + `<circle cx="${x}" cy="77" r="4.5" fill="none" stroke="${i === 1 ? V : G}" stroke-width="1.4"/>`; }).join(""),
    repite: () => r(42, 6, 36, 9, L, 4.5) + hp(48, 10.5, .55) + img(44, 19, 32, 26) + ligne(34, 50, 52, "#3B3550", 5) + ligne(44, 58, 32) + c(60, 75, 10, R) + `<rect x="57.5" y="69" width="5" height="8" rx="2.5" fill="${W}"/><path d="M55 74.5a5 5 0 0 0 10 0M60 79.5v2.5" stroke="${W}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    escribe: () => img(46, 6, 28, 22) + ligne(42, 32, 36) + r(12, 40, 96, 16, "#EFEDF5", 5) + r(16, 43, 16, 10, W, 3) + ["g", "i", "r"].map((t, i) => `<text x="${40 + i * 8}" y="52" font-size="10" font-weight="700" fill="#3B3550" font-family="sans-serif">${t}</text>`).join("") + r(66, 43, 1.5, 10, V, 1) + r(94, 43, 11, 10, W, 3) + [0, 1, 2, 3, 4].map(i => carte(17 + i * 18, 64, 14, 15) + (i === 1 ? "" : ligne(21 + i * 18, 70, 6, "#3B3550", 3))).join(""),
    imagen: () => c(20, 14, 7, M) + hp(20, 14, .6) + ligne(32, 12, 48, "#3B3550", 5) + [[0, 0], [1, 0], [0, 1], [1, 1]].map(([i, j]) => { const x = 14 + i * 48, y = 26 + j * 31, ok = i === 0 && j === 0; return carte(x, y, 44, 28, ok ? OKF : W, ok ? OK : "#E6E2F0") + img(x + 15, y + 4, 14, 11) + ligne(x + 10, y + 19, 24, ok ? OK : T); }).join(""),
    oyes: () => c(60, 24, 15, M) + hp(60, 24, 1.3) + [0, 1].map(i => carte(16, 48 + i * 18, 88, 14, i === 0 ? OKF : W, i === 0 ? OK : "#E6E2F0") + ligne(36, 53 + i * 18, 48, i === 0 ? OK : "#3B3550")).join(""),
    oyesTrad: () => c(60, 20, 13, M) + hp(60, 20, 1.15) + [0, 1].map(i => carte(16, 40 + i * 22, 88, 19, i === 0 ? OKF : W, i === 0 ? OK : "#E6E2F0") + ligne(36, 44 + i * 22, 48, i === 0 ? OK : "#3B3550") + ligne(42, 52 + i * 22, 36, T, 3)).join("")
  };
  return nom => S[nom] ? `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${S[nom]()}</svg>` : "";
})();
