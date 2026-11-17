"use strict";

// ══════════════════════════════════════════════════════════
//  ESTADO GLOBAL
// ══════════════════════════════════════════════════════════
let currentGender = "male";
let currentLang = "pt";
let currentName = "";

// ══════════════════════════════════════════════════════════
//  BANCO DE NOMES EXPANDIDO  (~10.000+ combinações)
// ══════════════════════════════════════════════════════════
const namesDB = {
  pt: {
    male: [
      "Jack",
      "Barba",
      "Edward",
      "Morgan",
      "Drake",
      "Rackham",
      "Kidd",
      "Hornigold",
      "Vane",
      "Low",
      "Avery",
      "Read",
      "Flint",
      "Silver",
      "Bones",
      "Smollett",
      "Hawkins",
      "Trelawney",
      "Danker",
      "Sparrow",
      "Salazar",
      "Jones",
      "Turner",
      "Barbarossa",
      "Nassau",
      "Tortuga",
      "Rum",
      "Diablo",
      "Corvo",
      "Ferro",
    ],
    female: [
      "Anne",
      "Mary",
      "Isabella",
      "Rosa",
      "Calypso",
      "Morgana",
      "Petra",
      "Valentina",
      "Silvia",
      "Elena",
      "Carmen",
      "Lúcia",
      "Sereia",
      "Tempestade",
      "Aurora",
      "Nora",
      "Beatriz",
      "Clara",
      "Diana",
      "Eva",
      "Fátima",
      "Graça",
      "Helena",
      "Iris",
      "Jade",
      "Karla",
      "Laura",
      "Marina",
      "Natalia",
      "Olga",
    ],
    prefixo: [
      "Sangue",
      "Olho",
      "Barba",
      "Pata",
      "Espada",
      "Crânio",
      "Tempestade",
      "Névoa",
      "Sombra",
      "Ferro",
      "Ouro",
      "Prata",
      "Cobre",
      "Âncora",
      "Canhão",
      "Veloz",
      "Cruel",
      "Furioso",
      "Morto",
      "Vivo",
      "Noite",
      "Mar",
      "Sal",
      "Vento",
      "Trovão",
      "Relâmpago",
      "Nuvem",
      "Chama",
      "Brasa",
      "Cinza",
    ],
    sufixo: [
      "Negro",
      "Maldito",
      "de Ouro",
      "Fantasma",
      "Sanguinário",
      "das Trevas",
      "dos Mares",
      "Temido",
      "Feroz",
      "Cruel",
      "Invencível",
      "Lendário",
      "do Abismo",
      "Eterno",
      "Imortal",
      "da Morte",
      "Selvagem",
      "Furioso",
      "Sombrio",
      "Misterioso",
      "do Norte",
      "do Sul",
      "do Leste",
      "do Oeste",
      "de Ferro",
      "de Pedra",
      "Ardente",
      "Gélido",
      "Venenoso",
      "Astuto",
    ],
    titulo: [
      "Terror dos Mares",
      "Rei dos Piratas",
      "Senhor dos Sete Mares",
      "Flagelo do Caribe",
      "Lenda dos Oceanos",
      "Dono dos Ventos",
      "Azougue do Abismo",
      "Sombra da Tempestade",
      "Punho de Ferro",
      "Pesadelo dos Almirantes",
      "Conquistador dos Mares",
      "Espectro do Atlântico",
      "Predador dos Oceanos",
      "Maldição Viva",
      "Filho das Tormentas",
      "Guardião do Tesouro",
      "Caçador de Frotas",
      "Lobo dos Mares",
    ],
  },
  en: {
    male: [
      "Jack",
      "Black",
      "Edward",
      "Morgan",
      "Drake",
      "Rackham",
      "Kidd",
      "Hornigold",
      "Vane",
      "Low",
      "Avery",
      "Flint",
      "Silver",
      "Bones",
      "Sparrow",
      "Salazar",
      "Jones",
      "Turner",
      "Barbarossa",
      "Nassau",
      "Rum",
      "Devil",
      "Crow",
      "Iron",
      "Steel",
      "Drake",
      "Hunter",
      "Storm",
      "Ghost",
      "Shark",
    ],
    female: [
      "Anne",
      "Mary",
      "Elizabeth",
      "Rose",
      "Calypso",
      "Morgana",
      "Petra",
      "Valentina",
      "Silvia",
      "Elena",
      "Carmen",
      "Lucia",
      "Siren",
      "Tempest",
      "Aurora",
      "Nora",
      "Beatrice",
      "Clara",
      "Diana",
      "Eva",
      "Faith",
      "Grace",
      "Helena",
      "Iris",
      "Jade",
      "Karla",
      "Laura",
      "Marina",
      "Natalie",
      "Olga",
    ],
    prefixo: [
      "Blood",
      "Eye",
      "Beard",
      "Hook",
      "Sword",
      "Skull",
      "Storm",
      "Mist",
      "Shadow",
      "Iron",
      "Gold",
      "Silver",
      "Copper",
      "Anchor",
      "Cannon",
      "Swift",
      "Cruel",
      "Furious",
      "Dead",
      "Night",
      "Sea",
      "Salt",
      "Wind",
      "Thunder",
      "Lightning",
      "Cloud",
      "Flame",
      "Ember",
      "Ash",
      "Dark",
    ],
    sufixo: [
      "Black",
      "Cursed",
      "Golden",
      "Phantom",
      "Bloodthirsty",
      "of Darkness",
      "of the Seas",
      "Feared",
      "Fierce",
      "Cruel",
      "Invincible",
      "Legendary",
      "of the Abyss",
      "Eternal",
      "Immortal",
      "of Death",
      "Wild",
      "Furious",
      "Shadowy",
      "Mysterious",
      "Northern",
      "Southern",
      "Eastern",
      "Western",
      "Iron",
      "Stone",
      "Burning",
      "Frozen",
      "Venomous",
      "Cunning",
    ],
    titulo: [
      "Terror of the Seas",
      "King of Pirates",
      "Lord of the Seven Seas",
      "Scourge of the Caribbean",
      "Legend of the Oceans",
      "Master of Winds",
      "Quicksilver of the Abyss",
      "Shadow of the Storm",
      "Iron Fist",
      "Nightmare of Admirals",
      "Conqueror of Seas",
      "Specter of the Atlantic",
      "Predator of Oceans",
      "Living Curse",
      "Child of Tempests",
      "Guardian of Treasure",
      "Hunter of Fleets",
      "Wolf of the Seas",
    ],
  },
  es: {
    male: [
      "Juan",
      "Negro",
      "Diego",
      "Carlos",
      "Rodrigo",
      "Pedro",
      "Luis",
      "Miguel",
      "Fernando",
      "Andrés",
      "Víctor",
      "Ramón",
      "Hernán",
      "Cortés",
      "Pizarro",
      "Diablo",
      "Cuervo",
      "Hierro",
      "Acero",
      "Lobo",
      "Tiburón",
      "Rayo",
      "Trueno",
      "Fantasma",
      "Sombra",
      "Veneno",
      "Furia",
      "Sangre",
      "Calavera",
      "Cruz",
    ],
    female: [
      "Ana",
      "María",
      "Isabela",
      "Rosa",
      "Calipso",
      "Morgana",
      "Petra",
      "Valentina",
      "Silvia",
      "Elena",
      "Carmen",
      "Lucía",
      "Sirena",
      "Tempestad",
      "Aurora",
      "Nora",
      "Beatriz",
      "Clara",
      "Diana",
      "Eva",
      "Fe",
      "Gracia",
      "Helena",
      "Iris",
      "Jade",
      "Karla",
      "Laura",
      "Marina",
      "Natalia",
      "Olga",
    ],
    prefixo: [
      "Sangre",
      "Ojo",
      "Barba",
      "Gancho",
      "Espada",
      "Cráneo",
      "Tormenta",
      "Niebla",
      "Sombra",
      "Hierro",
      "Oro",
      "Plata",
      "Cobre",
      "Ancla",
      "Cañón",
      "Veloz",
      "Cruel",
      "Furioso",
      "Muerto",
      "Noche",
      "Mar",
      "Sal",
      "Viento",
      "Trueno",
      "Relámpago",
      "Nube",
      "Llama",
      "Brasa",
      "Ceniza",
      "Oscuro",
    ],
    sufixo: [
      "Negro",
      "Maldito",
      "de Oro",
      "Fantasma",
      "Sanguinario",
      "de las Tinieblas",
      "de los Mares",
      "Temido",
      "Feroz",
      "Cruel",
      "Invencible",
      "Legendario",
      "del Abismo",
      "Eterno",
      "Inmortal",
      "de la Muerte",
      "Salvaje",
      "Furioso",
      "Sombrío",
      "Misterioso",
      "del Norte",
      "del Sur",
      "del Este",
      "del Oeste",
      "de Hierro",
      "de Piedra",
      "Ardiente",
      "Helado",
      "Venenoso",
      "Astuto",
    ],
    titulo: [
      "Terror de los Mares",
      "Rey Pirata",
      "Señor de los Siete Mares",
      "Flagelo del Caribe",
      "Leyenda de los Océanos",
      "Dueño de los Vientos",
      "Azogue del Abismo",
      "Sombra de la Tormenta",
      "Puño de Hierro",
      "Pesadilla de Almirantes",
      "Conquistador de los Mares",
      "Espectro del Atlántico",
      "Depredador de Océanos",
      "Maldición Viviente",
      "Hijo de las Tormentas",
      "Guardián del Tesoro",
      "Cazador de Flotas",
      "Lobo de los Mares",
    ],
  },
};

// ══════════════════════════════════════════════════════════
//  QUIZ: respostas por idioma
// ══════════════════════════════════════════════════════════
const quizNames = {
  pt: {
    agressivo: [
      "Jack Sangue Negro",
      "Ferro Barba Sanguinário",
      "Crânio Espada Feroz",
    ],
    estrategista: [
      "Silver Névoa Astuto",
      "Ouro Sombra Lendário",
      "Âncora Vento Invencível",
    ],
    misterioso: [
      "Black Sombra das Trevas",
      "Névoa Noite Misterioso",
      "Crânio Mar Eterno",
    ],
  },
  en: {
    agressivo: [
      "Jack Blood Black",
      "Iron Beard Bloodthirsty",
      "Skull Sword Fierce",
    ],
    estrategista: [
      "Silver Mist Cunning",
      "Gold Shadow Legendary",
      "Anchor Wind Invincible",
    ],
    misterioso: [
      "Black Shadow of Darkness",
      "Mist Night Mysterious",
      "Skull Sea Eternal",
    ],
  },
  es: {
    agressivo: [
      "Juan Sangre Negro",
      "Hierro Barba Sanguinario",
      "Cráneo Espada Feroz",
    ],
    estrategista: [
      "Silver Niebla Astuto",
      "Oro Sombra Legendario",
      "Ancla Viento Invencible",
    ],
    misterioso: [
      "Negro Sombra de las Tinieblas",
      "Niebla Noche Misterioso",
      "Cráneo Mar Eterno",
    ],
  },
};

// ══════════════════════════════════════════════════════════
//  TEXTOS i18n
// ══════════════════════════════════════════════════════════
const i18n = {
  pt: {
    title: "🏴‍☠️ Gerador de Nomes Piratas",
    subtitle: "Descubra seu destino nos Sete Mares",
    button: "⚓ 🔥 Descobrir Meu Nome Pirata",
    buttonAgain: "⚓ 🔥 Gerar Outro Nome",
    generating: "⏳ Gerando nome...",
    placeholder: "Clique para gerar ☠️",
    resultLabel: "Seu nome pirata",
    copy: "Copiar",
    favorite: "Favoritar",
    share: "Compartilhar",
    clearFav: "Limpar Favoritos",
    male: "Masculino",
    female: "Feminino",
    quizTitle: "Qual seu estilo?",
    quizAgg: "Agressivo",
    quizStr: "Estratégico",
    quizMys: "Misterioso",
    copied: "✅ Nome copiado!",
    favSaved: "⭐ Favoritado!",
    favDupe: "Esse nome já está nos favoritos!",
    noName: "Gere um nome primeiro!",
    counter: "nomes já foram gerados",
    favTitle: "⭐ Seus Favoritos",
  },
  en: {
    title: "🏴‍☠️ Pirate Name Generator",
    subtitle: "Discover your destiny on the Seven Seas",
    button: "⚓ 🔥 Discover My Pirate Name",
    buttonAgain: "⚓ 🔥 Generate Another Name",
    generating: "⏳ Generating name...",
    placeholder: "Click to generate ☠️",
    resultLabel: "Your pirate name",
    copy: "Copy",
    favorite: "Favorite",
    share: "Share",
    clearFav: "Clear Favorites",
    male: "Male",
    female: "Female",
    quizTitle: "What's your style?",
    quizAgg: "Aggressive",
    quizStr: "Strategist",
    quizMys: "Mysterious",
    copied: "✅ Name copied!",
    favSaved: "⭐ Favorited!",
    favDupe: "This name is already in favorites!",
    noName: "Generate a name first!",
    counter: "names have been generated",
    favTitle: "⭐ Your Favorites",
  },
  es: {
    title: "🏴‍☠️ Generador de Nombres Piratas",
    subtitle: "Descubre tu destino en los Siete Mares",
    button: "⚓ 🔥 Descubrir Mi Nombre Pirata",
    buttonAgain: "⚓ 🔥 Generar Otro Nombre",
    generating: "⏳ Generando nombre...",
    placeholder: "Haz clic para generar ☠️",
    resultLabel: "Tu nombre pirata",
    copy: "Copiar",
    favorite: "Favorito",
    share: "Compartir",
    clearFav: "Borrar Favoritos",
    male: "Masculino",
    female: "Femenino",
    quizTitle: "¿Cuál es tu estilo?",
    quizAgg: "Agresivo",
    quizStr: "Estratega",
    quizMys: "Misterioso",
    copied: "✅ ¡Nombre copiado!",
    favSaved: "⭐ ¡Guardado en favoritos!",
    favDupe: "¡Este nombre ya está en favoritos!",
    noName: "¡Genera un nombre primero!",
    counter: "nombres ya han sido generados",
    favTitle: "⭐ Tus Favoritos",
  },
};

// ══════════════════════════════════════════════════════════
//  INICIALIZAÇÃO
// ══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  autoDetectLang();
  generateSuggestions();
  renderFavorites();
  syncCounter();

});

// ══════════════════════════════════════════════════════════
//  CONTADOR REAL (Firestore)
// ══════════════════════════════════════════════════════════
async function syncCounter(increment = 0) {
  try {
    const ref = db.collection("stats").doc("global");

    if (increment > 0) {
      await ref.set(
        { totalNames: firebase.firestore.FieldValue.increment(increment) },
        { merge: true },
      );
    }

    const snap = await ref.get();
    const total = snap.exists ? snap.data().totalNames || 0 : 0;

    const el = document.getElementById("counter");
    if (el) {
      const t = i18n[currentLang];
      el.textContent = `⚡ ${total.toLocaleString()} ${t.counter}`;
    }
  } catch (e) {
    // Firebase indisponível — silencia o erro
    console.warn("Counter sync failed:", e.message);
  }
}

// ══════════════════════════════════════════════════════════
//  DETECÇÃO DE IDIOMA
// ══════════════════════════════════════════════════════════
function autoDetectLang() {
  const lang = navigator.language.slice(0, 2);
  if (["pt", "en", "es"].includes(lang)) {
    currentLang = lang;
    document.getElementById("language").value = lang;
  }
  applyLang();
}

function changeLang() {
  currentLang = document.getElementById("language").value;
  applyLang();
  generateSuggestions();
  renderFavorites();
}

function applyLang() {
  const t = i18n[currentLang];
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : currentLang;
  document.getElementById("title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("btn-gen-text").textContent = currentName
    ? t.buttonAgain
    : t.button;
  document.getElementById("result-label").textContent = t.resultLabel;

  // Atualiza todos os elementos data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  // Se não gerou nome ainda, atualiza placeholder
  if (!currentName) {
    document.getElementById("result-name").textContent = t.placeholder;
  }
}

// ══════════════════════════════════════════════════════════
//  GÊNERO
// ══════════════════════════════════════════════════════════
function setGender(gender, el) {
  currentGender = gender;
  document
    .querySelectorAll(".gender-btn")
    .forEach((btn) => btn.classList.remove("active"));
  el.classList.add("active");
  generateSuggestions();
}

// ══════════════════════════════════════════════════════════
//  GERAR NOME
// ══════════════════════════════════════════════════════════
function generateName() {
  const t = i18n[currentLang];
  const btn = document.getElementById("btn-gen-text");
  const button = document.getElementById("btn-gen");

  button.classList.add("btn-clicked");
  btn.textContent = t.generating;
  button.disabled = true;

  setTimeout(async () => {
    const db2 = namesDB[currentLang];
    const base = currentGender === "female" ? db2.female : db2.male;
    const name = pick(base) + " " + pick(db2.prefixo) + " " + pick(db2.sufixo);
    const titulo = pick(db2.titulo);

    currentName = name;

    typeWriter(name);
    document.getElementById("result-title").textContent = "✦ " + titulo + " ✦";

    generateSuggestions();

    btn.textContent = t.buttonAgain;
    button.classList.remove("btn-clicked");
    button.disabled = false;

    // 🔥// Incrementa contador real no Firestore Firebase seguro
    try {
      await syncCounter(1);
    } catch (e) {
      console.warn("Firebase falhou:", e.message);
    }

    setTimeout(() => button.classList.add("shake"), 1500);
    setTimeout(() => button.classList.remove("shake"), 2500);
  }, 300);

  setTimeout(() => button.classList.add("shake"), 1500);
  setTimeout(() => button.classList.remove("shake"), 2500);
}

// ══════════════════════════════════════════════════════════
//  SUGESTÕES
// ══════════════════════════════════════════════════════════
function generateSuggestions() {
  const db2 = namesDB[currentLang];
  const base = currentGender === "female" ? db2.female : db2.male;
  const list = document.getElementById("suggestions-list");
  const used = new Set();
  const fragment = document.createDocumentFragment();
  let attempts = 0;

  while (used.size < 4 && attempts < 40) {
    attempts++;
    const name = pick(base) + " " + pick(db2.prefixo) + " " + pick(db2.sufixo);
    if (used.has(name)) continue;
    used.add(name);

    const item = document.createElement("span");
    item.className = "suggestion-item";
    item.setAttribute("role", "listitem");
    item.textContent = "⚔️ " + name;
    item.addEventListener("click", () => useSuggestion(name));
    fragment.appendChild(item);
  }

  list.replaceChildren(fragment);
}

// ══════════════════════════════════════════════════════════
//  TYPEWRITER
// ══════════════════════════════════════════════════════════
let typeWriterTimer = null;

function typeWriter(text) {
  const el = document.getElementById("result-name");
  if (typeWriterTimer !== null) clearInterval(typeWriterTimer);
  el.textContent = "";
  let i = 0;
  typeWriterTimer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typeWriterTimer);
      typeWriterTimer = null;
    }
  }, 45);
}

function useSuggestion(name) {
  currentName = name;
  typeWriter(name);
  document.getElementById("result-title").textContent = "";
}

// ══════════════════════════════════════════════════════════
//  UTILITÁRIOS
// ══════════════════════════════════════════════════════════
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// ══════════════════════════════════════════════════════════
//  AÇÕES
// ══════════════════════════════════════════════════════════
async function copyName() {
  const t = i18n[currentLang];
  if (!currentName) {
    showToast(t.noName);
    return;
  }

  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error("Clipboard API indisponível");
    }
    await navigator.clipboard.writeText(currentName);
    showToast(t.copied);
  } catch (error) {
    console.warn("Não foi possível copiar o nome:", error);
    showToast(currentLang === "en" ? "Could not copy the name." : currentLang === "es" ? "No se pudo copiar el nombre." : "Não foi possível copiar o nome.");
  }
}

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem("pirateFav") || "[]");
    if (!Array.isArray(stored)) return [];
    return [...new Set(stored.filter((name) => typeof name === "string" && name.trim()).map((name) => name.trim()))].slice(0, 20);
  } catch (error) {
    console.warn("Não foi possível ler os favoritos:", error);
    return [];
  }
}

function saveFavorite() {
  const t = i18n[currentLang];
  if (!currentName) {
    showToast(t.noName);
    return;
  }

  try {
    const fav = readFavorites();
    if (fav.includes(currentName)) {
      showToast(t.favDupe);
      return;
    }

    fav.unshift(currentName);
    localStorage.setItem("pirateFav", JSON.stringify(fav.slice(0, 20)));
    showToast(t.favSaved);
    renderFavorites();
  } catch (error) {
    console.warn("Não foi possível salvar o favorito:", error);
    showToast(currentLang === "en" ? "Could not save favorite." : currentLang === "es" ? "No se pudo guardar el favorito." : "Não foi possível salvar o favorito.");
  }
}

function clearFavorites() {
  try {
    localStorage.removeItem("pirateFav");
  } catch (error) {
    console.warn("Não foi possível limpar os favoritos:", error);
  }
  renderFavorites();
}

function renderFavorites() {
  const fav = readFavorites();
  const section = document.getElementById("favorites-section");
  const list = document.getElementById("favorites-list");

  if (fav.length === 0) {
    section.style.display = "none";
    list.replaceChildren();
    return;
  }

  section.style.display = "block";
  const fragment = document.createDocumentFragment();
  fav.forEach((name) => {
    const item = document.createElement("span");
    item.className = "suggestion-item fav-item";
    item.setAttribute("role", "listitem");
    item.textContent = "⭐ " + name;
    item.addEventListener("click", () => useSuggestion(name));
    fragment.appendChild(item);
  });
  list.replaceChildren(fragment);
}

async function shareNative() {
  const t = i18n[currentLang];
  if (!currentName) {
    showToast(t.noName);
    return;
  }

  if (!navigator.share) {
    await copyName();
    return;
  }

  try {
    await navigator.share({ title: t.title, text: currentName, url: location.href });
  } catch (error) {
    if (error && error.name === "AbortError") return;
    console.warn("Não foi possível compartilhar o nome:", error);
    showToast(currentLang === "en" ? "Could not share the name." : currentLang === "es" ? "No se pudo compartir el nombre." : "Não foi possível compartilhar o nome.");
  }
}

// ══════════════════════════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════════════════════════
function quizAnswer(tipo) {
  const opts = quizNames[currentLang][tipo];
  const name = pick(opts);
  currentName = name;
  typeWriter(name);
  document.getElementById("result-title").textContent = "";
  syncCounter(1);
}
