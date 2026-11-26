// Liste des activités du laboratoire, partagée par l'accueil et la grille UX.
// Pour en ajouter une : un fichier dans act/ et une ligne ici.
// statut : "proto" (prototype), "test" (en test), "ok" (prête pour l'appli)
// etape : l'une des 5 étapes de la méthode (decouverte, comprehension, memorisation, pratique, utilisation)

// Les 5 étapes de la méthode Evoala, qui organisent le labo
const ETAPES = [
  { id: "decouverte",    lettre: "D", nom: "Découverte",    em: "🥚", couleur: "#3E9BD6", fond: "#E4F2FB",
    desc: "Un nouveau mot est entendu ou lu pour la première fois. La découverte doit être naturelle et agréable." },
  { id: "comprehension", lettre: "C", nom: "Compréhension", em: "💡", couleur: "#D9659B", fond: "#FBE6F0",
    desc: "L'apprenant comprend le mot en le reliant à sa langue (traduction) ou à une situation de la vie réelle." },
  { id: "memorisation",  lettre: "M", nom: "Mémorisation",  em: "🧠", couleur: "#7B66D9", fond: "#ECE8FC",
    desc: "L'apprenant garde le mot en mémoire, pour l'utiliser sans avoir à l'étudier de nouveau." },
  { id: "pratique",      lettre: "P", nom: "Pratique",      em: "🛠️", couleur: "#E0962A", fond: "#FDF0DB",
    desc: "L'apprenant répète avec les dynamiques pour garder le contenu en mémoire et l'utiliser au bon moment." },
  { id: "utilisation",   lettre: "U", nom: "Utilisation",   em: "🗣️", couleur: "#4FA65A", fond: "#E5F4E6",
    desc: "L'apprenant se sert de ce qu'il a appris dans de vrais contextes, selon ses besoins." }
];

const ACTS = [
  { href: "act/memory.html", etape: "comprehension", em: "🃏", title: "Memory", desc: "Encuentra las parejas francés / español, con audio al voltear.", status: "proto" },
  { href: "act/escucha.html", etape: "memorisation", em: "🎧", title: "Escucha y elige", desc: "Oyes la frase en francés y eliges la traducción correcta.", status: "proto" },
  { href: "act/asocia.html", etape: "memorisation", em: "🔗", title: "Asocia las palabras", desc: "Une cada palabra en francés con su traducción: cada pareja toma un color.", status: "proto" },
  { href: "act/audios.html", etape: "memorisation", em: "🔉", title: "¿Cuál es el audio?", desc: "Una frase en español y 3 audios en francés: elige el que corresponde.", status: "proto" },
  { href: "act/repite.html", etape: "decouverte", em: "🎙️", title: "Escucha y repite", desc: "Una palabra con su imagen y su traducción: la escuchas y la repites en voz alta.", status: "proto" },
  { href: "act/escribe.html", etape: "pratique", em: "✍️", title: "Memoriza y escribe", desc: "Mira la palabra unos segundos, desaparece y la escribes con letras (o la frase con palabras).", status: "proto" },
  { href: "act/imagen.html", etape: "comprehension", em: "🖼️", title: "Elige la buena imagen", desc: "Escuchas una frase en francés y eliges, entre 4 imágenes, la que corresponde.", status: "proto" },
  { href: "act/oyes.html", etape: "comprehension", em: "👂", title: "¿Qué oyes?", desc: "Escuchas una frase sin verla y eliges, entre 2 frases escritas, la que oíste.", status: "proto" }
];
