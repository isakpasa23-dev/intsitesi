/* ==========================================================================
   SANA ÖZEL SEVGİ KÖŞESİ - JAVASCRIPT MOTORU
   Yapay Zeka Destekli Tatlı Söz Motoru, Çiğköfte Ziyafeti & Bulut Stoklar 🌯🤖💌✨
   ========================================================================== */

const TELEGRAM_BOT_TOKEN = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8";
const TELEGRAM_CHAT_ID = "6497058542";

// ☁️ Canlı Bulut Stok API Uç Noktası (ExtendsClass JSON Storage)
const CLOUD_STOCK_ENDPOINT = "https://extendsclass.com/api/json-storage/bin/bbaafac";

// 🎯 Aşkölçer Hedef Tarihi: 8 Haziran 2029 Saat 09:00:00
const TARGET_DATE_ASKOLCER = new Date(2029, 5, 8, 9, 0, 0);

// Fiş Canlı Sayacı Timer ID'si
let receiptTimerInterval = null;
let lastQuoteIndex = -1;
let telegramLastUpdateId = 0;

// ==========================================================================
// 1. 🤖 YAPAY ZEKA & ZENGİN ROMANTİK SÖZ MOTORU
// ==========================================================================
const curatedRomanticQuotes = [
  "\"Bu gece ay çok güzel değil mi? 🌙✨ (Seni her şeyden çok seviyorum...)\"",
  "\"Birtanem, bu gece ay çok güzel değil mi? 🌙💖\"",
  "\"Bebeğim, seninle geçen her saniye ömrümün en tatlı hediyesi. İyi ki hayatımdasın! 💖\"",
  "\"Hayatımın anlamı, gözlerinin içine baktığım her an dünya benim için biraz daha güzelleşiyor. ✨\"",
  "\"Aşkım, dünyada milyarlarca insan var ama benim kalbim sadece senin için çarpıyor. 🌟\"",
  "\"Tatlım, senin bir tebessümün dünyanın bütün yorgunluklarını unutturmaya yeter! 🥰\"",
  "\"Canım sevgilim, sen sadece sevdiğim insan değilsin; en huzurlu limanımsın. 💕\"",
  "\"Birtanem, bugün ve her gün: Seni dünden daha çok, yarından daha az seviyorum! 🌸\"",
  "\"Ömrüm, gülüşün öyle sihirli ki, karanlık gecelerimin en parlak kutup yıldızı sensin. 🌙\"",
  "\"Bebeğim, kalbimdeki en güzel köşe sonsuza kadar sadece sana ait. 💌\"",
  "\"Aşkım, her sabah uyandığımda aklıma gelen ilk ve en tatlı düşünce sensin. ☀️\"",
  "\"Hayatımın anlamı, sen benim bu dünyadaki en kıymetli mucizemsin. 🎁\"",
  "\"Canım benim, bir fincan çay, senin tatlı sesin ve huzur... Bana dünyaları verseler değişmem. 🫖\"",
  "\"Tatlım, ellerini tuttuğum an tüm dünya duruyor gibi hissediyorum. 🤝\"",
  "\"Gözümün nuru, senin varlığın en yorgun anlarımda bile bana güç veren tek enerji kaynağım. ⚡\"",
  "\"Bebeğim, dünyanın bütün çiçeklerini toplasam, senin bir kokun kadar güzel olamaz. 🌷\"",
  "\"Aşkım, seninle dinlenen her şarkı anlamlı, izlenen her film güzel. 🎶\"",
  "\"Hayatımın anlamı, ne zaman canın sıkılırsa hatırla: Seni dünyadaki her şeyden çok seven biri var! 🥰\"",
  "\"Canım, gökyüzündeki tüm yıldızlar diyor ki: Bugün minik yıldıza sımsıkı ve doya doya sarılınmalı! 🧸\"",
  "\"Tatlım, seninle susmak bile dünyanın en güzel sohbetini yapmaktan daha tatlı. 🤍\"",
  "\"Ömrüm, aşkın en saf, en masum ve en gerçek hali senin kalbinde saklı. 💖\"",
  "\"Bebeğim, sen benim ömrüme doğan en güzel güneşsin. ☀️\"",
  "\"Aşkım, yarınlar seninle güzel, dünler seninle unutuldu, bugünüm seninle dolu! ✨\""
];

const aiEndearments = [
  "Bebeğim", "Hayatımın anlamı", "Aşkım", "Tatlım", "Canım", 
  "Birtanem", "Ömrüm", "Gözümün nuru", "Kalp hırsızım", "Güzeller güzelim"
];

const aiIntros = [
  "seninle geçen her an masal gibi geliyor,",
  "gülüşün içimi sıcacık ısıtıyor,",
  "seni düşündüğümde istemsizce gülümsüyorum,",
  "senin sesini duymak günümün en güzel ödülü,",
  "kalbimin en derin köşesinde sadece senin sevgin var,",
  "gözlerine her baktığımda sonsuz bir huzur buluyorum,"
];

const aiFeelings = [
  "dünyanın bütün güzellikleri senin bir tebessümünde saklı.",
  "sen benim başıma gelen en tatlı mucizesin.",
  "seni gökyüzündeki tüm yıldızların toplamından daha çok seviyorum.",
  "ömrümün sonuna kadar sadece sana sarılmak istiyorum.",
  "sen benim bu hayattaki en büyük şansımsın.",
  "varlığın kalbime öyle iyi geliyor ki anlatamam."
];

const aiEmojis = ["💖", "🥰", "✨", "🌸", "💕", "🌠", "🧸", "🤍"];

function generateAIRomanticQuote() {
  const isCurated = Math.random() > 0.45;
  if (isCurated) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * curatedRomanticQuotes.length);
    } while (newIndex === lastQuoteIndex && curatedRomanticQuotes.length > 1);
    lastQuoteIndex = newIndex;
    return curatedRomanticQuotes[newIndex];
  } else {
    const endearment = aiEndearments[Math.floor(Math.random() * aiEndearments.length)];
    const intro = aiIntros[Math.floor(Math.random() * aiIntros.length)];
    const feeling = aiFeelings[Math.floor(Math.random() * aiFeelings.length)];
    const emoji = aiEmojis[Math.floor(Math.random() * aiEmojis.length)];
    
    return `"${endearment}, ${intro} ${feeling} ${emoji}"`;
  }
}

// Telegram Bildirim Fonksiyonu
async function sendTelegramNotification(messageText, customChatId = null) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: customChatId || TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "Markdown"
      })
    });
  } catch (error) {
    console.warn("Telegram bildirimi gönderilemedi:", error);
  }
}

// 8 Haziran 2029 Saat 09:00 Geri Sayım Hesaplayıcı
function getAskolcerDetailedRemaining() {
  const now = new Date();
  const diff = TARGET_DATE_ASKOLCER - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, text: "Kavuşma Saati Geldi! 💖" };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, text: `${days} Gün Kaldı` };
}

// ==========================================================================
// 2. ÜRÜNLER & BULUT SENKRONİZASYONLU CANLI STOKLAR
// ==========================================================================
const INITIAL_STOCKS = {
  "askolcer": 1,          // Aşkölçer sadece 1 adet
  "canim-cicim": 9847,    // Küsüratlı yüksek adet
  "kahve-kacamagi": 4320, // Küsüratlı yüksek adet
  "cigkofte-ziyafeti": 6350, // Çiğköfte ziyafeti
  "beraber-yuruyus": 9999999, // Sınırsız
  "gece-sohbeti": 12580,  // Küsüratlı yüksek adet
  "patron-sensin": 1450,  // Bugün patron sensin kartı
  "film-gecesi": 3745,    // Küsüratlı yüksek adet
  "goruntulu-arama": 8650,// Küsüratlı yüksek adet
  "ozlem-sarilmasi": 9999999, // Sınırsız
  "ozel-ses-kaydi": 7890, // Küsüratlı yüksek adet
  "kahve-hediye": 2450,
  "opucuk-hediye": 9999999,
  "sarilma-hediye": 9999999,
  "sonsuz-sevgi-hediye": 9999999
};

const PRODUCT_ALIASES = {
  "askolcer": "askolcer", "aşkölçer": "askolcer", "ask": "askolcer", "aşk": "askolcer",
  "canim-cicim": "canim-cicim", "canim": "canim-cicim", "canım": "canim-cicim",
  "kahve-kacamagi": "kahve-kacamagi", "kahve": "kahve-kacamagi", "cay": "kahve-kacamagi", "çay": "kahve-kacamagi", "cay-kacagi": "kahve-kacamagi",
  "cigkofte-ziyafeti": "cigkofte-ziyafeti", "cigkofte": "cigkofte-ziyafeti", "çiğköfte": "cigkofte-ziyafeti",
  "beraber-yuruyus": "beraber-yuruyus", "yuruyus": "beraber-yuruyus", "yürüyüş": "beraber-yuruyus", "yuru": "beraber-yuruyus",
  "gece-sohbeti": "gece-sohbeti", "gece": "gece-sohbeti", "sohbet": "gece-sohbeti", "kulaklik": "gece-sohbeti", "kulaklık": "gece-sohbeti", "tek-kulaklik": "gece-sohbeti",
  "patron-sensin": "patron-sensin", "patron": "patron-sensin", "kralice": "patron-sensin", "kraliçe": "patron-sensin", "kralicem": "patron-sensin",
  "film-gecesi": "film-gecesi", "film": "film-gecesi",
  "goruntulu-arama": "goruntulu-arama", "goruntulu": "goruntulu-arama", "görüntülü": "goruntulu-arama", "arama": "goruntulu-arama", "aninda-arama": "goruntulu-arama", "sesli-arama": "goruntulu-arama",
  "ozlem-sarilmasi": "ozlem-sarilmasi", "ozlem": "ozlem-sarilmasi", "özlem": "ozlem-sarilmasi",
  "ozel-ses-kaydi": "ozel-ses-kaydi", "ses": "ozel-ses-kaydi"
};

function getProductStock(productId) {
  const savedStocks = JSON.parse(localStorage.getItem("site_cloud_stocks_cache") || "null");
  if (savedStocks && typeof savedStocks[productId] !== "undefined") {
    return savedStocks[productId];
  }
  return INITIAL_STOCKS[productId] || 9999;
}

// ☁️ Buluttan Canlı Stokları Çekme
async function fetchCloudStocks() {
  try {
    const res = await fetch(`${CLOUD_STOCK_ENDPOINT}?_t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && typeof data.askolcer !== "undefined") {
        const prevDataStr = localStorage.getItem("site_cloud_stocks_cache");
        const newDataStr = JSON.stringify(data);
        if (prevDataStr !== newDataStr) {
          localStorage.setItem("site_cloud_stocks_cache", newDataStr);
          renderProducts();
        }
      }
    }
  } catch (err) {
    // Sessiz devam
  }
}

// ☁️ Buluta Güncel Stokları Kaydetme (Atomik & Anlık)
async function pushCloudStocks(updatedStocks) {
  try {
    localStorage.setItem("site_cloud_stocks_cache", JSON.stringify(updatedStocks));
    renderProducts();

    await fetch(CLOUD_STOCK_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStocks)
    });
  } catch (err) {
    console.warn("Bulut stok güncellenemedi:", err);
  }
}

// Sepetteki tüm ürünleri tek seferde atomik olarak buluttan düşürme
async function decrementCartStocks(cartItems) {
  let currentStocks = JSON.parse(localStorage.getItem("site_cloud_stocks_cache") || "null");
  if (!currentStocks) {
    currentStocks = { ...INITIAL_STOCKS };
  }

  cartItems.forEach(item => {
    const pid = item.product.id;
    if (pid !== "beraber-yuruyus" && pid !== "ozlem-sarilmasi" && pid !== "sarilma-kuponu" && !pid.includes("hediye")) {
      const curVal = typeof currentStocks[pid] !== "undefined" ? currentStocks[pid] : (INITIAL_STOCKS[pid] || 100);
      currentStocks[pid] = Math.max(0, curVal - item.quantity);
    }
  });

  await pushCloudStocks(currentStocks);
}

function decrementProductStock(productId, quantity) {
  decrementCartStocks([{ product: { id: productId }, quantity: quantity }]);
}

const PRODUCTS = [
  // 💖 1. Kategori: Aşk Menüsü
  {
    id: "askolcer",
    category: "ask",
    name: "Aşkölçer",
    price: 0,
    unit: "💖",
    isCountdown: true,
    deliveryText: "8 Haziran 2029 ⏳",
    badge: "Tek & Özel Üretim 🔥",
    description: "Aşkınızın derecesini %100 hassasiyetle ölçen sihirli aşk cihazı.",
    image: "assets/askolcer.svg"
  },
  {
    id: "canim-cicim",
    category: "ask",
    name: "Canım Cicim",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Özel Paket 🎁",
    description: "İçerisinde sıcacık sarılmalar ve tatlı iltifatlar barındıran sevgi paketi.",
    image: "assets/canim-cicim.svg"
  },

  // ☕ 2. Kategori: Keyif & Lezzet
  {
    id: "kahve-kacamagi",
    category: "keyif",
    name: "Baş Başa Çay Kaçağı",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Tavşan Kanı 🫖",
    description: "İnce belli bardakta dumanı üstünde sıcacık çay ve tatlı sohbet garantili kupon.",
    image: "assets/tea-glass.svg"
  },
  {
    id: "cigkofte-ziyafeti",
    category: "keyif",
    name: "Baş Başa Çiğköfte Ziyafeti",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Acılı & Limonlu 🌯",
    description: "Bol limonlu, bol yeşillikli ve yanında buz gibi ayranla beraber çiğköfte yeme keyfi!",
    image: "assets/cigkofte.svg"
  },
  {
    id: "beraber-yuruyus",
    category: "keyif",
    name: "Beraber Yürüyüş",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "El Ele 👫",
    description: "Günün yorgunluğunu atmak için el ele tutuşup saatlerce huzurla yürüme garantisi.",
    image: "assets/walking.svg"
  },

  // 🎁 3. Kategori: Şımartma Paketi
  {
    id: "patron-sensin",
    category: "simartma",
    name: "Kraliçe",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "VIP Kraliçe 👑",
    description: "Günün bütün kararlarını kraliçemin vereceği, her istediğinin anında yapılacağı sınırsız yetki kartı!",
    image: "assets/crown-patron.svg"
  },
  {
    id: "film-gecesi",
    category: "simartma",
    name: "Baş Başa Film",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "VIP Sinema 🍿",
    description: "Filmi senin seçeceğin, sıcacık patlamış mısır eşliğinde baş başa sinema keyfi!",
    image: "assets/popcorn.svg"
  },
  {
    id: "gece-sohbeti",
    category: "simartma",
    name: "Tek Kulaklık",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Aynı Şarkı 🎵",
    description: "Kulaklığın tekini sana verip aynı şarkıda kaybolma ve huzur garantili anlar!",
    image: "assets/music-note.svg"
  },

  // 🥺 4. Kategori: Seni Özledim Menüsü
  {
    id: "goruntulu-arama",
    category: "ozlem",
    name: "Anında Arama",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Görüntülü / Sesli 📱",
    description: "İster görüntülü ister sesli... Yüzünü görmek ya da sesini duymak istediğinde anında arama hakkı.",
    image: "assets/phone-videocall.svg"
  },
  {
    id: "ozlem-sarilmasi",
    category: "ozlem",
    name: "Kavuşma & Özlem Sarılması",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "Sıcacık 🫂",
    description: "İlk buluşmada dakikalarca sürecek, kokunu içine çeke çeke sımsıkı sarılma garantisi.",
    image: "assets/hug.svg"
  },
  {
    id: "ozel-ses-kaydi",
    category: "ozlem",
    name: "Özel Aşk Ses Kaydı & Şarkı",
    price: 0,
    unit: "💖",
    isCountdown: false,
    deliveryText: "Anında ⚡",
    badge: "İsmail YK 🎙️",
    description: "Özlediğin her an dinlemen için kaydedilmiş en tatlı ses kaydı ve özel şarkı armağanı.",
    image: "assets/microphone.svg"
  }
];

// ==========================================================================
// 4. SEPETE DOĞRUDAN EKLENEN SAMİMİ SÜRPRİZ HEDİYELER
// ==========================================================================
const discountCodes = {
  "SURPRIZ": {
    type: "letter",
    message: "💌 Sana özel gizli bir aşk mektubu açıldı birtanem!",
    letterTitle: "Minik Yıldızıma Özel Mektup ✨",
    letterText: "Seni gökyüzündeki yıldızlar kadar çok seviyorum ve her yıldız kaydığında seni diliyorum. 🌠💖",
    action: "openLetter"
  },
  "SUPRIZ": {
    type: "letter",
    message: "💌 Sana özel gizli bir aşk mektubu açıldı birtanem!",
    letterTitle: "Minik Yıldızıma Özel Mektup ✨",
    letterText: "Seni gökyüzündeki yıldızlar kadar çok seviyorum ve her yıldız kaydığında seni diliyorum. 🌠💖",
    action: "openLetter"
  },
  "OPUCUK": {
    type: "gift",
    giftItem: {
      id: "opucuk-hediye",
      category: "simartma",
      name: "Sevgi Dolu Öpücük",
      price: 0,
      unit: "💖",
      isCountdown: false,
      deliveryText: "Anında ⚡",
      badge: "Özel Hediye 🎁",
      description: "İçten, sıcacık ve sevgi dolu tatlı bir öpücük hakkı!",
      image: "assets/kiss.svg"
    },
    message: "💋 Sevgi dolu sıcacık bir öpücük sepetine eklendi birtanem! 😘",
    action: "addGift"
  },
  "CANIMBENIM": {
    type: "gift",
    giftItem: {
      id: "sarilma-hediye",
      category: "simartma",
      name: "Sımsıkı Sarılma",
      price: 0,
      unit: "💖",
      isCountdown: false,
      deliveryText: "Anında ⚡",
      badge: "Özel Hediye 🎁",
      description: "Kokunu içine çeke çeke doya doya sımsıkı sarılma hakkı!",
      image: "assets/hug.svg"
    },
    message: "💕 Sımsıkı bir sarılma sepetine eklendi canım benim! 🫂",
    action: "addGift"
  },
  "SENICOKSEVIYORUM": {
    type: "gift",
    giftItem: {
      id: "sonsuz-sevgi-hediye",
      category: "ask",
      name: "💖 Sonsuz Sevgi & İlgi Paketi",
      price: 0,
      unit: "💖",
      isCountdown: false,
      deliveryText: "Ömür Boyu ✨",
      badge: "Sana Özel 🌟",
      description: "Her an her saniye sadece seni düşünen ve seven bir kalp!",
      image: "assets/love-letter.svg"
    },
    message: "🎉 Sonsuz sevgi ve ilgi paketi sepetine eklendi minik yıldızım! 🥰",
    action: "addGift"
  },
  "KAHVE": {
    type: "gift",
    giftItem: {
      id: "kahve-hediye",
      category: "keyif",
      name: "☕ Baş Başa Kahve Sözü",
      price: 0,
      unit: "💖",
      isCountdown: false,
      deliveryText: "Anında ⚡",
      badge: "Hediye 🎁",
      description: "Birlikte içilecek en tatlı kahve ve sohbet hediyesi!",
      image: "assets/gift-coffee.svg"
    },
    message: "☕ Baş başa içeceğimiz en tatlı kahve sözü sepetine eklendi sevgilim! ✨",
    action: "addGift"
  },
  "MEKTUP": {
    type: "letter",
    message: "💌 Özel aşk mektubun açıldı birtanem!",
    letterTitle: "Günün En Güzel Haberi 💖",
    letterText: "Biliyor musun? Dünyadaki bütün hazineler toplansa, senin bir tek gülüşün kadar değerli olamaz. İyi ki varsın minik yıldızım! 🥰",
    action: "openLetter"
  }
};

const invalidCodeMessages = [
  "Hmm, bu kod kalbimizde kayıtlı değil... Ama seni yine de dünyalar kadar seviyoruz! 🥰",
  "Bu kod sevgimizin büyüklüğüne yetmedi! Farklı bir sürpriz kod dene sevgilim 💕",
  "Aşk sistemimiz bu kodu bulamadı, 'OPUCUK', 'CANIMBENIM' veya 'KAHVE' yazmayı dene 😉"
];

// ==========================================================================
// 5. STATE & KALICI SEPET HAFIZASI
// ==========================================================================
let cart = [];
let appliedCoupon = null;
let currentRating = 5;
let selectedLoveChip = "Sonsuz";
let currentCategory = "ask";
let lastCompletedOrderHasAskolcer = false;

function saveCartToStorage() {
  localStorage.setItem("user_cart_cache", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const saved = localStorage.getItem("user_cart_cache");
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

// ==========================================================================
// 6. SAYFA VE GÖRÜNÜM GEÇİŞİ (Router)
// ==========================================================================
function switchView(viewName) {
  const menuView = document.getElementById("view-menu");
  const shopView = document.getElementById("view-shop");

  if (viewName === "shop") {
    if (menuView) menuView.classList.remove("active");
    if (shopView) shopView.classList.add("active");
    filterCategory("ask");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    if (shopView) shopView.classList.remove("active");
    if (menuView) menuView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ==========================================================================
// 7. KATEGORİ VE ÜRÜNLERİ RENDER ETME
// ==========================================================================
function filterCategory(catName) {
  currentCategory = catName;

  const categoryTabs = document.getElementById("category-tabs");
  if (categoryTabs) {
    const buttons = categoryTabs.querySelectorAll(".tab-btn");
    buttons.forEach(btn => {
      if (btn.dataset.category === catName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const items = PRODUCTS.filter(p => p.category === currentCategory);

  grid.innerHTML = items.map(product => {
    const stock = getProductStock(product.id);
    let stockDisplay = "";
    let isOutOfStock = stock <= 0;

    if (product.id === "askolcer") {
      stockDisplay = stock > 0 ? "📦 Stok: 1 Adet (Tek & Özel) 🔥" : "💖 Tükendi (Sana Özel)";
    } else if (product.id === "beraber-yuruyus" || product.id === "ozlem-sarilmasi") {
      stockDisplay = "📦 Stok: Sınırsız ♾️";
    } else if (stock > 0) {
      stockDisplay = `📦 Stok: ${stock.toLocaleString('tr-TR')} Adet ✨`;
    } else {
      stockDisplay = "💖 Tükendi (Sana Özel)";
    }

    return `
      <div class="product-card">
        <span class="product-badge">${product.badge}</span>
        
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        
        <div class="product-footer">
          <div class="product-stock-info">
            <span class="delivery-tag">⏳ Teslimat: ${product.deliveryText}</span>
            <span class="stock-badge ${stock <= 1 && product.id === 'askolcer' ? (isOutOfStock ? 'out' : 'low') : ''}">${stockDisplay}</span>
          </div>
          
          <button class="btn-add-cart" data-id="${product.id}">
            <span>Sepete Ekle</span>
            <span>🛍️</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
}

// ==========================================================================
// 8. SEPET İŞLEMLERİ
// ==========================================================================
function addToCart(productId) {
  let product = PRODUCTS.find(p => p.id === productId);
  
  if (!product) {
    for (let codeKey in discountCodes) {
      if (discountCodes[codeKey].giftItem && discountCodes[codeKey].giftItem.id === productId) {
        product = discountCodes[codeKey].giftItem;
        break;
      }
    }
  }
  
  if (!product) return;

  const currentStock = getProductStock(productId);
  const existingItem = cart.find(item => item.product.id === productId);
  const currentQtyInCart = existingItem ? existingItem.quantity : 0;

  if (currentStock <= 0) {
    alert(`🥺 Üzgünüm bebeğim, "${product.name}" şu an stokta tükendi!`);
    return;
  }

  if (currentQtyInCart + 1 > currentStock) {
    alert(`⚠️ "${product.name}" ürününden stokta sadece ${currentStock} adet bulunuyor!`);
    return;
  }

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }

  saveCartToStorage();
  triggerBadgeBump();
  updateCartUI();
  openCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.product.id === productId);
  if (!item) return;

  if (delta > 0) {
    const currentStock = getProductStock(productId);
    if (item.quantity + 1 > currentStock) {
      alert(`⚠️ "${item.product.name}" ürününden stokta en fazla ${currentStock} adet alabilirsiniz!`);
      return;
    }
  }

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToStorage();
    updateCartUI();
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById("cart-badge");
  const cartCountText = document.getElementById("cart-count-text");
  const emptyCartState = document.getElementById("empty-cart-state");
  const cartItemsList = document.getElementById("cart-items-list");
  const checkoutBtn = document.getElementById("checkout-btn");

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cartBadge) cartBadge.textContent = totalItemCount;
  if (cartCountText) cartCountText.textContent = `${totalItemCount} ürün`;

  if (cart.length === 0) {
    if (emptyCartState) emptyCartState.style.display = "flex";
    if (cartItemsList) cartItemsList.style.display = "none";
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.5";
      checkoutBtn.style.cursor = "not-allowed";
    }
  } else {
    if (emptyCartState) emptyCartState.style.display = "none";
    if (cartItemsList) {
      cartItemsList.style.display = "flex";
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.product.image}" alt="${item.product.name}">
          </div>
          
          <div class="cart-item-info">
            <div class="cart-item-title">${item.product.name}</div>
            <div class="cart-item-price">${item.product.deliveryText}</div>
          </div>

          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="btn-qty btn-minus" data-id="${item.product.id}">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="btn-qty btn-plus" data-id="${item.product.id}">+</button>
            </div>
            
            <button class="btn-remove-item" data-id="${item.product.id}" title="Ürünü Kaldır">
              🗑️
            </button>
          </div>
        </div>
      `).join("");

      cartItemsList.querySelectorAll(".btn-minus").forEach(b => {
        b.addEventListener("click", () => updateQuantity(b.dataset.id, -1));
      });
      cartItemsList.querySelectorAll(".btn-plus").forEach(b => {
        b.addEventListener("click", () => updateQuantity(b.dataset.id, 1));
      });
      cartItemsList.querySelectorAll(".btn-remove-item").forEach(b => {
        b.addEventListener("click", () => removeFromCart(b.dataset.id));
      });
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = "1";
      checkoutBtn.style.cursor = "pointer";
    }
  }

  calculateAndRenderTotals();
}

function calculateAndRenderTotals() {
  const summarySubtotal = document.getElementById("summary-subtotal");
  const summaryTotal = document.getElementById("summary-total");

  if (summarySubtotal) summarySubtotal.textContent = "Aşk Dolu 💕";
  if (summaryTotal) summaryTotal.textContent = "Sonsuz Sevgi 💖";
}

function triggerBadgeBump() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 300);
  }
}

// ==========================================================================
// 9. SÜRPRİZ & SEVGİ KODLARI
// ==========================================================================
function applyCouponCode() {
  const couponInput = document.getElementById("coupon-input");
  if (!couponInput) return;

  const code = couponInput.value.trim().toUpperCase();
  
  if (!code) {
    showCouponAlert("Lütfen bir sürpriz kodu giriniz!", "error");
    return;
  }

  const coupon = discountCodes[code];

  if (coupon) {
    appliedCoupon = { code: code, ...coupon };
    showCouponAlert(coupon.message, "success");

    if (coupon.action === "addGift" && coupon.giftItem) {
      const existingGift = cart.find(item => item.product.id === coupon.giftItem.id);
      if (existingGift) {
        existingGift.quantity += 1;
      } else {
        cart.push({ product: coupon.giftItem, quantity: 1 });
      }
      saveCartToStorage();
      triggerBadgeBump();
      triggerHeartsShower();
    } else if (coupon.action === "openLetter") {
      openLetterModal(coupon.letterTitle, coupon.letterText);
      triggerHeartsShower();
    }

    updateCartUI();
  } else {
    const randomMsg = invalidCodeMessages[Math.floor(Math.random() * invalidCodeMessages.length)];
    showCouponAlert(randomMsg, "error");
  }
}

function showCouponAlert(message, type) {
  const alertBox = document.getElementById("coupon-alert");
  if (!alertBox) return;
  alertBox.textContent = message;
  alertBox.className = `coupon-alert ${type}`;
  alertBox.style.display = "block";
}

// ==========================================================================
// 10. SİPARİŞ TAMAMLAMA AKIŞI
// ==========================================================================
function openCheckoutInfoModal() {
  if (cart.length === 0) {
    showCouponAlert("Sepetinizde ürün bulunmuyor!", "error");
    return;
  }

  for (let item of cart) {
    const currentStock = getProductStock(item.product.id);
    if (currentStock <= 0) {
      showCouponAlert(`❌ "${item.product.name}" stokta tükendi! Lütfen sepetinizden kaldırınız.`, "error");
      return;
    }
    if (item.quantity > currentStock) {
      showCouponAlert(`❌ "${item.product.name}" için yeterli stok yok (Kalan Stok: ${currentStock} adet).`, "error");
      return;
    }
  }

  closeCartDrawer();
  const infoModal = document.getElementById("checkout-info-modal-overlay");
  const nameInput = document.getElementById("customer-name-input");
  const noteInput = document.getElementById("customer-note-input");

  const savedCustomerName = localStorage.getItem("saved_customer_name") || "Minik Yıldızım";
  if (nameInput) nameInput.value = savedCustomerName;
  if (noteInput) noteInput.value = "";

  if (infoModal) infoModal.classList.add("active");
  triggerHeartsShower();
}

function closeCheckoutInfoModal() {
  const infoModal = document.getElementById("checkout-info-modal-overlay");
  if (infoModal) infoModal.classList.remove("active");
}

function updateReceiptLiveTimer() {
  const receiptDeliveryEl = document.getElementById("receipt-max-delivery-time");
  if (!receiptDeliveryEl) return;

  if (lastCompletedOrderHasAskolcer) {
    const countdown = getAskolcerDetailedRemaining();
    receiptDeliveryEl.innerHTML = `
      8 Haziran 2029 - Saat 09:00 ⏳<br>
      <span style="font-size:0.92rem; font-weight:800; color:#d63031; display:inline-block; margin-top:4px;">
        ${countdown.days} Gün, ${countdown.hours} Saat, ${countdown.minutes} Dk, ${countdown.seconds} Sn
      </span>
    `;
  } else {
    receiptDeliveryEl.textContent = `Anında Teslimat ⚡ (Hemen Şimdi!)`;
  }
}

function finalizeOrder() {
  const nameInput = document.getElementById("customer-name-input");
  const noteInput = document.getElementById("customer-note-input");

  const customerName = (nameInput && nameInput.value.trim()) || "Minik Yıldızım";
  const customerNote = (noteInput && noteInput.value.trim()) || "";

  localStorage.setItem("saved_customer_name", customerName);

  // Sepetteki tüm ürünlerin stoklarını atomik olarak buluttan düşür
  decrementCartStocks(cart);

  renderProducts();
  closeCheckoutInfoModal();

  const orderId = `ASK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const receiptOrderId = document.getElementById("receipt-order-id");
  const receiptDate = document.getElementById("receipt-date");
  const receiptCustomerName = document.getElementById("receipt-customer-name");
  const receiptCustomerNote = document.getElementById("receipt-customer-note");
  const receiptNoteRow = document.getElementById("receipt-note-row");
  const receiptItemsList = document.getElementById("receipt-items-list");

  if (receiptOrderId) receiptOrderId.textContent = orderId;
  if (receiptDate) receiptDate.textContent = today;
  if (receiptCustomerName) receiptCustomerName.textContent = `${customerName} 🥰`;

  if (customerNote) {
    if (receiptCustomerNote) receiptCustomerNote.textContent = `"${customerNote}"`;
    if (receiptNoteRow) receiptNoteRow.style.display = "block";
  } else {
    if (receiptNoteRow) receiptNoteRow.style.display = "none";
  }

  lastCompletedOrderHasAskolcer = cart.some(item => item.product.isCountdown === true);

  if (receiptTimerInterval) clearInterval(receiptTimerInterval);
  updateReceiptLiveTimer();
  receiptTimerInterval = setInterval(updateReceiptLiveTimer, 1000);

  if (receiptItemsList) {
    receiptItemsList.innerHTML = cart.map(item => `
      <div class="receipt-item-block">
        <div class="receipt-item-row">
          <span><strong>${item.product.name}</strong> (x${item.quantity})</span>
          <span>${item.product.deliveryText}</span>
        </div>
      </div>
    `).join("");
  }

  let telegramOrderMsg = `🛍️ *YENİ AŞK SİPARİŞİ GELDİ!* 🛍️\n\n`;
  telegramOrderMsg += `📋 *Sipariş No:* \`${orderId}\`\n\n`;
  telegramOrderMsg += `📅 *Tarih:* ${today}\n\n`;
  telegramOrderMsg += `👤 *Müşteri Adı:* ${customerName}\n\n`;
  
  if (customerNote) {
    telegramOrderMsg += `📝 *Sipariş Notu:* "${customerNote}"\n\n`;
  }
  
  telegramOrderMsg += `📦 *Sipariş Edilen Ürünler:*\n`;
  cart.forEach(item => {
    telegramOrderMsg += `• ${item.product.name} (x${item.quantity})\n`;
  });

  if (appliedCoupon) {
    telegramOrderMsg += `\n🏷️ *Kullanılan Sürpriz Kodu:* ${appliedCoupon.code}`;
  }

  telegramOrderMsg += `\n\n💡 _Stokları yönetmek için bota /stok veya /set askolcer 1 yazabilirsin._`;

  sendTelegramNotification(telegramOrderMsg);

  openReceiptModal();
  triggerHeartsShower();
}

// ==========================================================================
// 11. FİŞİ RESİM OLARAK İNDİRME
// ==========================================================================
async function downloadReceiptImage() {
  const receiptCard = document.getElementById("receipt-printable-card");
  const downloadBtn = document.getElementById("btn-download-receipt");
  const actionsBox = document.getElementById("receipt-actions-box");
  const closeBtn = document.querySelector(".receipt-card .modal-close-btn");

  if (!receiptCard) return;

  if (typeof window.html2canvas === "undefined") {
    alert("Resim oluşturucu kütüphanesi yükleniyor, lütfen birkaç saniye sonra tekrar deneyin!");
    return;
  }

  try {
    if (downloadBtn) downloadBtn.textContent = "⏳ Fiş Kaydediliyor...";
    if (actionsBox) actionsBox.style.display = "none";
    if (closeBtn) closeBtn.style.display = "none";

    const canvas = await html2canvas(receiptCard, {
      scale: 2.2,
      backgroundColor: "#ffffff",
      useCORS: true
    });

    if (actionsBox) actionsBox.style.display = "flex";
    if (closeBtn) closeBtn.style.display = "flex";
    if (downloadBtn) downloadBtn.textContent = "📥 Fişi İndir (Resim Olarak Kaydet)";

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const orderId = document.getElementById("receipt-order-id")?.textContent || "siparis";
    link.href = image;
    link.download = `Ask_Kosesi_Fisi_${orderId}.png`;
    link.click();
    triggerHeartsShower();
  } catch (err) {
    console.error("Fiş indirme hatası:", err);
    if (actionsBox) actionsBox.style.display = "flex";
    if (closeBtn) closeBtn.style.display = "flex";
    if (downloadBtn) downloadBtn.textContent = "📥 Fişi İndir (Resim Olarak Kaydet)";
  }
}

// ==========================================================================
// 12. 🐈‍⬛ 4 BACAKLI YÜRÜYEN SİYAH KEDİ MOTORU
// ==========================================================================
function initScreenCat() {
  const cat = document.getElementById("screen-cat-companion");
  const flipWrap = document.getElementById("cat-flip-wrap");
  const bubble = document.getElementById("cat-speech-bubble");
  if (!cat || !flipWrap) return;

  let catX = window.innerWidth / 2;
  let targetX = window.innerWidth / 2;
  let currentFacing = 1;
  let speechTimeout = null;
  let lastUserActivity = Date.now();

  const catPhrases = [
    "Miyav! 🐾💕",
    "Seni çok seviyorum bebeğim! 🥰",
    "Mırrr... Tatlım benim! 💖",
    "İyi ki varsın hayatımın anlamı! ✨",
    "Beni sevmene bayılıyorum aşkım! 🐈‍⬛",
    "Pati dostun her zaman yanında canım! 🐾",
    "Bugün çok tatlısın birtanem! 🌸"
  ];

  function setTarget(x) {
    const maxX = Math.max(80, window.innerWidth - 60);
    targetX = Math.max(15, Math.min(maxX, x));
    lastUserActivity = Date.now();
  }

  window.addEventListener("mousemove", (e) => {
    setTarget(e.clientX - 25);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) {
      setTarget(e.touches[0].clientX - 25);
    }
  }, { passive: true });

  window.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      setTarget(e.touches[0].clientX - 25);
    }
  }, { passive: true });

  setInterval(() => {
    if (Date.now() - lastUserActivity > 4000) {
      const randomX = 25 + Math.random() * (window.innerWidth - 80);
      targetX = randomX;
    }
  }, 4500);

  function animateCat() {
    const diff = targetX - catX;
    const distance = Math.abs(diff);

    if (distance > 2.5) {
      if (diff > 2.5 && currentFacing !== 1) {
        currentFacing = 1;
        flipWrap.classList.remove("facing-left");
        flipWrap.classList.add("facing-right");
      } else if (diff < -2.5 && currentFacing !== -1) {
        currentFacing = -1;
        flipWrap.classList.remove("facing-right");
        flipWrap.classList.add("facing-left");
      }

      const speed = Math.min(Math.max(distance * 0.04, 1.2), 3.2);
      catX += Math.sign(diff) * speed;
      cat.classList.add("walking");
    } else {
      cat.classList.remove("walking");
    }

    cat.style.transform = `translate3d(${catX}px, 0, 0)`;
    cat.style.webkitTransform = `translate3d(${catX}px, 0, 0)`;
    requestAnimationFrame(animateCat);
  }

  requestAnimationFrame(animateCat);

  cat.addEventListener("click", () => {
    cat.classList.add("purring");
    setTimeout(() => cat.classList.remove("purring"), 400);

    const phrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
    if (bubble) {
      bubble.textContent = phrase;
      bubble.classList.add("active");
      clearTimeout(speechTimeout);
      speechTimeout = setTimeout(() => {
        bubble.classList.remove("active");
      }, 2400);
    }

    triggerHeartsShower();
  });
}

// ==========================================================================
// 13. POP-UP MODAL AÇMA & KAPATMA İŞLEMLERİ
// ==========================================================================
function openReviewModal() {
  const modal = document.getElementById("review-modal-overlay");
  if (modal) modal.classList.add("active");
  triggerHeartsShower();
}

function closeReviewModal() {
  const modal = document.getElementById("review-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function openDailyQuoteModal() {
  const modal = document.getElementById("quote-modal-overlay");
  const textEl = document.getElementById("quote-modal-text");
  if (textEl) {
    textEl.textContent = generateAIRomanticQuote();
  }
  if (modal) modal.classList.add("active");
  triggerHeartsShower();
}

function closeDailyQuoteModal() {
  const modal = document.getElementById("quote-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function openLetterModal(title, content) {
  const modal = document.getElementById("letter-modal-overlay");
  const titleEl = document.getElementById("letter-title");
  const contentEl = document.getElementById("letter-content");
  if (titleEl) titleEl.textContent = title;
  if (contentEl) contentEl.textContent = content;
  if (modal) modal.classList.add("active");
}

function closeLetterModal() {
  const modal = document.getElementById("letter-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function openCartDrawer() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (overlay) overlay.classList.add("active");
  if (drawer) drawer.classList.add("active");
}

function closeCartDrawer() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (overlay) overlay.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
}

function openHintModal() {
  const modal = document.getElementById("hint-modal-overlay");
  if (modal) modal.classList.add("active");
  triggerHeartsShower();
}

function closeHintModal() {
  const modal = document.getElementById("hint-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function openReceiptModal() {
  const modal = document.getElementById("receipt-modal-overlay");
  if (modal) modal.classList.add("active");
}

function closeReceiptModal() {
  if (receiptTimerInterval) clearInterval(receiptTimerInterval);
  const modal = document.getElementById("receipt-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function resetOrder() {
  cart = [];
  appliedCoupon = null;
  saveCartToStorage();
  const input = document.getElementById("coupon-input");
  const alertBox = document.getElementById("coupon-alert");
  if (input) input.value = "";
  if (alertBox) alertBox.style.display = "none";
  updateCartUI();
  closeReceiptModal();
}

// ==========================================================================
// 14. HAFİF ANİMASYONLAR
// ==========================================================================
function startBackgroundHearts() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "✨", "🌸", "⭐"];

  setInterval(() => {
    if (document.hidden) return;
    if (container.children.length > 6) {
      container.removeChild(container.firstChild);
    }

    const heart = document.createElement("span");
    heart.className = "floating-heart-bg";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 96}vw`;
    heart.style.animationDuration = `${7 + Math.random() * 6}s`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 13000);
  }, 1800);
}

function triggerHeartsShower() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "✨", "⭐", "🥰", "🐾"];
  
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart-bg";
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = `${Math.random() * 95}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 3}s`;
      heart.style.fontSize = `${1.1 + Math.random() * 1.3}rem`;
      heart.style.zIndex = "3000";

      container.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    }, i * 80);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.closest("input") || e.target.closest("a") || e.target.closest("textarea") || e.target.closest("#screen-cat-companion")) return;

  const heart = document.createElement("div");
  heart.className = "click-heart";
  
  const symbols = ["💖", "💕", "✨", "⭐", "🌸"];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
});

// ==========================================================================
// 15. TÜM EVENT LISTENERS BAĞLANTILARI
// ==========================================================================
function setupAllEvents() {
  const navBrand = document.getElementById("nav-brand-btn");
  if (navBrand) navBrand.addEventListener("click", () => switchView("menu"));

  const tileShop = document.getElementById("tile-shop");
  if (tileShop) tileShop.addEventListener("click", () => switchView("shop"));

  const tileReview = document.getElementById("tile-review");
  if (tileReview) tileReview.addEventListener("click", openReviewModal);

  const tileQuote = document.getElementById("tile-quote");
  if (tileQuote) tileQuote.addEventListener("click", openDailyQuoteModal);

  const tileCart = document.getElementById("tile-cart");
  if (tileCart) tileCart.addEventListener("click", openCartDrawer);

  const btnBack = document.getElementById("btn-back-to-menu");
  if (btnBack) btnBack.addEventListener("click", () => switchView("menu"));

  const btnViewCart = document.getElementById("btn-view-cart-bottom");
  if (btnViewCart) btnViewCart.addEventListener("click", openCartDrawer);

  const categoryTabs = document.getElementById("category-tabs");
  if (categoryTabs) {
    categoryTabs.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterCategory(btn.dataset.category);
      });
    });
  }

  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const emptyShopBtn = document.getElementById("empty-shop-btn");

  if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);
  if (emptyShopBtn) emptyShopBtn.addEventListener("click", () => {
    closeCartDrawer();
    switchView("shop");
  });

  const applyCouponBtn = document.getElementById("apply-coupon-btn");
  const couponInput = document.getElementById("coupon-input");
  const couponHintBtn = document.getElementById("coupon-hint-btn");

  if (applyCouponBtn) applyCouponBtn.addEventListener("click", applyCouponCode);
  if (couponInput) {
    couponInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyCouponCode();
      }
    });
  }

  if (couponHintBtn) {
    couponHintBtn.addEventListener("click", openHintModal);
  }

  const closeHintModalBtn = document.getElementById("close-hint-modal-btn");
  const btnCloseHintModal = document.getElementById("btn-close-hint-modal");
  const hintModalOverlay = document.getElementById("hint-modal-overlay");

  if (closeHintModalBtn) closeHintModalBtn.addEventListener("click", closeHintModal);
  if (btnCloseHintModal) btnCloseHintModal.addEventListener("click", closeHintModal);
  if (hintModalOverlay) {
    hintModalOverlay.addEventListener("click", (e) => {
      if (e.target === hintModalOverlay) closeHintModal();
    });
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", openCheckoutInfoModal);

  const closeCheckoutInfoBtn = document.getElementById("close-checkout-info-btn");
  const btnConfirmCheckoutInfo = document.getElementById("btn-confirm-checkout-info");
  const checkoutInfoModalOverlay = document.getElementById("checkout-info-modal-overlay");

  if (closeCheckoutInfoBtn) closeCheckoutInfoBtn.addEventListener("click", closeCheckoutInfoModal);
  if (btnConfirmCheckoutInfo) btnConfirmCheckoutInfo.addEventListener("click", finalizeOrder);
  if (checkoutInfoModalOverlay) {
    checkoutInfoModalOverlay.addEventListener("click", (e) => {
      if (e.target === checkoutInfoModalOverlay) closeCheckoutInfoModal();
    });
  }

  const closeReviewModalBtn = document.getElementById("close-review-modal-btn");
  const reviewModalOverlay = document.getElementById("review-modal-overlay");
  const submitReviewBtn = document.getElementById("submit-review-btn");
  const starRating = document.getElementById("star-rating");
  const ratingText = document.getElementById("rating-text");
  const loveChips = document.getElementById("love-chips");
  const reviewNote = document.getElementById("review-note");

  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener("click", closeReviewModal);
  if (reviewModalOverlay) {
    reviewModalOverlay.addEventListener("click", (e) => {
      if (e.target === reviewModalOverlay) closeReviewModal();
    });
  }

  const ratingDescriptions = {
    1: "Biraz İlgiye İhtiyacımız Var 🥺",
    2: "Daha Çok Sarılmalı! 💕",
    3: "Çok Tatlı & Sevgi Dolu 🥰",
    4: "Harika Bir Aşk Hizmeti! 💖",
    5: "Sonsuz Yıldız / Mükemmel Ötesi! 🌟"
  };

  if (starRating) {
    const stars = starRating.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        currentRating = index + 1;
        stars.forEach((s, i) => {
          if (i <= index) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
        if (ratingText) ratingText.textContent = ratingDescriptions[currentRating];
        triggerHeartsShower();
      });
    });
  }

  if (loveChips) {
    const chips = loveChips.querySelectorAll(".chip-item");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        selectedLoveChip = chip.dataset.value;
      });
    });
  }

  if (submitReviewBtn) {
    submitReviewBtn.addEventListener("click", () => {
      const note = (reviewNote && reviewNote.value.trim()) || "Çok tatlısın ve seni çok seviyorum!";
      triggerHeartsShower();
      closeReviewModal();

      const today = new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      let reviewMsg = `💖 *YENİ AŞK DEĞERLENDİRMESİ GELDİ!* 💖\n\n`;
      reviewMsg += `⭐ *Puan:* ${currentRating}/5 (${ratingDescriptions[currentRating]})\n\n`;
      reviewMsg += `🥰 *Sevgi Seviyesi:* ${selectedLoveChip}\n\n`;
      reviewMsg += `📝 *Not:* "${note}"\n\n`;
      reviewMsg += `📅 *Tarih:* ${today}`;

      sendTelegramNotification(reviewMsg);

      alert(`🎉 Teşekkürler bebeğim!\n\nDeğerlendirmen kalbimize ulaştı. Seni her şeyden çok seviyorum! 🥰`);
      if (reviewNote) reviewNote.value = "";
    });
  }

  const closeQuoteBtn = document.getElementById("close-quote-btn");
  const newQuoteBtn = document.getElementById("new-quote-btn");
  const quoteModalOverlay = document.getElementById("quote-modal-overlay");

  if (closeQuoteBtn) closeQuoteBtn.addEventListener("click", closeDailyQuoteModal);
  if (newQuoteBtn) newQuoteBtn.addEventListener("click", () => {
    const textEl = document.getElementById("quote-modal-text");
    if (textEl) {
      textEl.textContent = generateAIRomanticQuote();
      triggerHeartsShower();
    }
  });
  if (quoteModalOverlay) {
    quoteModalOverlay.addEventListener("click", (e) => {
      if (e.target === quoteModalOverlay) closeDailyQuoteModal();
    });
  }

  const closeLetterBtn = document.getElementById("close-letter-btn");
  const letterConfirmBtn = document.getElementById("letter-confirm-btn");
  const letterModalOverlay = document.getElementById("letter-modal-overlay");

  if (closeLetterBtn) closeLetterBtn.addEventListener("click", closeLetterModal);
  if (letterConfirmBtn) letterConfirmBtn.addEventListener("click", closeLetterModal);
  if (letterModalOverlay) {
    letterModalOverlay.addEventListener("click", (e) => {
      if (e.target === letterModalOverlay) closeLetterModal();
    });
  }

  const closeReceiptBtn = document.getElementById("close-receipt-btn");
  const newOrderBtn = document.getElementById("new-order-btn");
  const btnDownloadReceipt = document.getElementById("btn-download-receipt");
  const receiptModalOverlay = document.getElementById("receipt-modal-overlay");

  if (closeReceiptBtn) closeReceiptBtn.addEventListener("click", closeReceiptModal);
  if (newOrderBtn) newOrderBtn.addEventListener("click", resetOrder);
  if (btnDownloadReceipt) btnDownloadReceipt.addEventListener("click", downloadReceiptImage);
  if (receiptModalOverlay) {
    receiptModalOverlay.addEventListener("click", (e) => {
      if (e.target === receiptModalOverlay) closeReceiptModal();
    });
  }

  const tileCelebration = document.getElementById("tile-celebration");
  if (tileCelebration) {
    tileCelebration.addEventListener("click", () => {
      openMagicModal();
    });
  }

  const closeMagicModalBtn = document.getElementById("close-magic-modal-btn");
  const btnMagicClose = document.getElementById("btn-magic-close");
  const btnMagicReplay = document.getElementById("btn-magic-replay");
  const magicModalOverlay = document.getElementById("magic-modal-overlay");
  const magicStageContainer = document.getElementById("magic-stage-container");

  if (closeMagicModalBtn) closeMagicModalBtn.addEventListener("click", closeMagicModal);
  if (btnMagicClose) btnMagicClose.addEventListener("click", closeMagicModal);
  if (btnMagicReplay) btnMagicReplay.addEventListener("click", () => playRandomMagicAnimation());
  if (magicStageContainer) magicStageContainer.addEventListener("click", () => playRandomMagicAnimation());

  if (magicModalOverlay) {
    magicModalOverlay.addEventListener("click", (e) => {
      if (e.target === magicModalOverlay) closeMagicModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeLetterModal();
      closeReceiptModal();
      closeReviewModal();
      closeDailyQuoteModal();
      closeCheckoutInfoModal();
      closeHintModal();
      closeMagicModal();
    }
  });
}

// ==========================================================================
// 15.1 🎨 SİHİRLİ SEVGİ & ANİMASYON BAHÇESİ (Detaylı & Tatlı Animasyon Motoru)
// ==========================================================================
const MAGIC_ANIM_LIST = ["cactus", "rose", "star", "cat_bubbles"];
const MAGIC_ANIM_TITLES = {
  "cactus": "🌵 Sevimli Kaktüs & Çiçek Açma 🌸",
  "rose": "🌹 Senin İçin Açan Sonsuz Aşk Gülü 💖",
  "star": "⭐ Gökyüzündeki En Parlak Kutup Yıldızım ✨",
  "cat_bubbles": "🐾 Minik Kedicik & Aşk Baloncukları 🫧"
};

let currentMagicAnimIndex = 0;
let magicAnimFrameId = null;

function openMagicModal() {
  const modal = document.getElementById("magic-modal-overlay");
  if (modal) modal.classList.add("active");

  const cat = document.getElementById("screen-cat-companion");
  const bubble = document.getElementById("cat-speech-bubble");
  if (cat && bubble) {
    cat.classList.add("purring");
    bubble.textContent = "✨ Büyülü bahçeye hoş geldin! 🌸";
    bubble.classList.add("active");
    setTimeout(() => {
      cat.classList.remove("purring");
      bubble.classList.remove("active");
    }, 3500);
  }

  setTimeout(() => {
    playRandomMagicAnimation();
  }, 100);
}

function closeMagicModal() {
  if (magicAnimFrameId) {
    cancelAnimationFrame(magicAnimFrameId);
    magicAnimFrameId = null;
  }
  const modal = document.getElementById("magic-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function playRandomMagicAnimation() {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * MAGIC_ANIM_LIST.length);
  } while (nextIdx === currentMagicAnimIndex && MAGIC_ANIM_LIST.length > 1);
  currentMagicAnimIndex = nextIdx;

  const animKey = MAGIC_ANIM_LIST[currentMagicAnimIndex];
  const badgeEl = document.getElementById("magic-anim-title-badge");
  if (badgeEl) {
    badgeEl.textContent = MAGIC_ANIM_TITLES[animKey] || "✨ Sihirli Sevgi Gösterisi 💕";
  }

  playCurrentMagicAnimation(animKey);
}

function playCurrentMagicAnimation(animKey = null) {
  const selectedAnim = animKey || MAGIC_ANIM_LIST[currentMagicAnimIndex];
  const canvas = document.getElementById("magic-canvas");
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const stageW = rect.width || 520;
  const stageH = rect.height || 310;

  canvas.width = stageW * dpr;
  canvas.height = stageH * dpr;

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const width = stageW;
  const height = stageH;

  if (magicAnimFrameId) cancelAnimationFrame(magicAnimFrameId);

  const startTime = Date.now();
  const magicParticles = [];

  function addSparkles(x, y, count = 3, colors = ["#ff1361", "#ffd700", "#ffffff", "#ff758c"]) {
    for (let i = 0; i < count; i++) {
      magicParticles.push({
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 0.9,
        size: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        isHeart: Math.random() > 0.6
      });
    }
  }

  function updateParticles() {
    for (let i = magicParticles.length - 1; i >= 0; i--) {
      const p = magicParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        magicParticles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.isHeart) {
        ctx.font = `${Math.floor(p.size * 3.5)}px sans-serif`;
        ctx.fillText("💖", p.x, p.y);
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // =========================================================================
  // 1. 🌵 SÜPER TATLI KALPLİ KAKTÜS (Kawaii Cactus & Blooming Flower)
  // =========================================================================
  function renderKawaiiCactus(t) {
    const growDur = 2600;
    const progress = Math.min(1, t / growDur);
    const ease = 1 - Math.pow(1 - progress, 3);

    const cx = width / 2;
    const groundY = height - 32;

    // Zemin yumuşak gölgesi
    ctx.save();
    ctx.fillStyle = "rgba(235, 150, 170, 0.25)";
    ctx.beginPath();
    ctx.ellipse(cx, groundY + 10, 75 * ease, 14 * ease, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sevimli Saksı (Terracotta Pot)
    ctx.save();
    const potW = 72;
    const potH = 62;
    const potY = groundY - potH;

    // Saksı Gövdesi
    ctx.fillStyle = "#f08080";
    ctx.beginPath();
    ctx.moveTo(cx - potW / 2 + 7, groundY);
    ctx.lineTo(cx + potW / 2 - 7, groundY);
    ctx.lineTo(cx + potW / 2, potY + 14);
    ctx.lineTo(cx - potW / 2, potY + 14);
    ctx.closePath();
    ctx.fill();

    // Saksı Kenar Şeridi (Ribbon & Rim)
    ctx.fillStyle = "#ff6b81";
    ctx.beginPath();
    ctx.roundRect(cx - potW / 2 - 6, potY, potW + 12, 16, 6);
    ctx.fill();

    // Saksı Ortasındaki Parlayan Beyaz Kalp
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(cx, potY + 36, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Kaktüs Gövdesi (Saksıdan Yükselen Canlı Yeşil Gövde)
    const cactusH = 96 * ease;
    const cactusW = 48 * ease;
    const cactusY = potY - cactusH + 6;
    const sway = Math.sin(t * 0.003) * 2.5 * progress;

    ctx.save();
    ctx.translate(cx + sway, potY);
    ctx.rotate(sway * 0.01);
    ctx.translate(-(cx + sway), -potY);

    // Ana Gövde
    ctx.fillStyle = "#2ecc71";
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - cactusW / 2, cactusY, cactusW, cactusH + 8, cactusW / 2);
    ctx.fill();
    ctx.stroke();

    // Kaktüs Çizgileri
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 10 * ease, cactusY + 12);
    ctx.lineTo(cx - 10 * ease, potY);
    ctx.moveTo(cx + 10 * ease, cactusY + 12);
    ctx.lineTo(cx + 10 * ease, potY);
    ctx.stroke();

    // Yan Kollar (Arms)
    if (progress > 0.35) {
      const armP = Math.min(1, (progress - 0.35) / 0.35);
      const armEase = 1 - Math.pow(1 - armP, 3);

      // Sol Kol
      ctx.fillStyle = "#2ecc71";
      ctx.strokeStyle = "#27ae60";
      ctx.beginPath();
      ctx.roundRect(cx - cactusW / 2 - 16 * armEase, cactusY + 30, 18 * armEase, 28 * armEase, 9);
      ctx.fill();
      ctx.stroke();

      // Sağ Kol
      ctx.beginPath();
      ctx.roundRect(cx + cactusW / 2 - 2 * armEase, cactusY + 22, 18 * armEase, 30 * armEase, 9);
      ctx.fill();
      ctx.stroke();
    }

    // Sevimli Kawaii Yüz (Büyük Işıltılı Gözler & Pembe Yanaklar)
    if (progress > 0.45) {
      const faceAlpha = Math.min(1, (progress - 0.45) / 0.3);
      ctx.globalAlpha = faceAlpha;

      // Sol Göz
      ctx.fillStyle = "#2d3436";
      ctx.beginPath();
      ctx.arc(cx - 9, cactusY + cactusH * 0.42, 3.5, 0, Math.PI * 2);
      ctx.arc(cx + 9, cactusY + cactusH * 0.42, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Göz Işıltısı (Sparkle in eyes)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 10.2, cactusY + cactusH * 0.42 - 1.2, 1.3, 0, Math.PI * 2);
      ctx.arc(cx + 7.8, cactusY + cactusH * 0.42 - 1.2, 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Gülümseme (Cute Mouth)
      ctx.strokeStyle = "#2d3436";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cactusY + cactusH * 0.46, 5, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();

      // Kızarmış Yanaklar (Blush)
      ctx.fillStyle = "rgba(255, 118, 117, 0.85)";
      ctx.beginPath();
      ctx.arc(cx - 13, cactusY + cactusH * 0.48, 4.5, 0, Math.PI * 2);
      ctx.arc(cx + 13, cactusY + cactusH * 0.48, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Tepede Açan Katmerli Çiçek (Lotus Blooming Flower)
    if (progress > 0.62) {
      const flowerP = Math.min(1, (progress - 0.62) / 0.38);
      const flowerScale = 1 - Math.pow(1 - flowerP, 3);
      const flowerY = cactusY;

      ctx.save();
      ctx.translate(cx, flowerY);
      ctx.scale(flowerScale, flowerScale);

      // Dış Taç Yapraklar (10 Yapraklı Pembe Çiçek)
      ctx.fillStyle = "#ff758c";
      for (let i = 0; i < 10; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 10);
        ctx.beginPath();
        ctx.ellipse(0, -18, 6.5, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // İç Taç Yapraklar
      ctx.fillStyle = "#ff4081";
      for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 8 + 0.3);
        ctx.beginPath();
        ctx.ellipse(0, -12, 5, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Altın Çiçek Göbeği
      ctx.fillStyle = "#ffd700";
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (Math.random() > 0.35) {
        addSparkles(cx + (Math.random() - 0.5) * 55, flowerY + (Math.random() - 0.5) * 45, 2, ["#ff758c", "#ffd700", "#ffffff", "#ff4081"]);
      }
    }

    ctx.restore();
  }

  // =========================================================================
  // 2. 🌹 BÜYÜLÜ AŞK GÜLÜ (Magical Blooming Love Rose & Butterfly)
  // =========================================================================
  function renderBloomingRose(t) {
    const growDur = 2800;
    const progress = Math.min(1, t / growDur);
    const ease = 1 - Math.pow(1 - progress, 3);

    const cx = width / 2;
    const groundY = height - 35;
    const topY = height * 0.28;
    const stemHeight = (groundY - topY) * ease;
    const currentStemY = groundY - stemHeight;

    // Bahçe Çimi ve Toprağı
    ctx.save();
    ctx.fillStyle = "#a8e6cf";
    ctx.beginPath();
    ctx.ellipse(cx, groundY + 12, 85 * ease, 14 * ease, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Kıvrımlı Yeşil Aşk Dalı (Curved Stem)
    ctx.save();
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 5.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, groundY);
    const cpX = cx + Math.sin(progress * Math.PI) * 18;
    const cpY = groundY - stemHeight * 0.5;
    ctx.quadraticCurveTo(cpX, cpY, cx, currentStemY);
    ctx.stroke();

    // Yapraklar ve Damarları
    if (progress > 0.32) {
      const leafP = Math.min(1, (progress - 0.32) / 0.35);
      const leafScale = 1 - Math.pow(1 - leafP, 3);

      // Sol Yaprak
      ctx.save();
      ctx.translate(cx - 16 * leafScale, groundY - stemHeight * 0.45);
      ctx.rotate(-0.55);
      ctx.fillStyle = "#2ecc71";
      ctx.beginPath();
      ctx.ellipse(0, 0, 20 * leafScale, 9 * leafScale, 0, 0, Math.PI * 2);
      ctx.fill();
      // Yaprak Damarı
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-18 * leafScale, 0);
      ctx.lineTo(18 * leafScale, 0);
      ctx.stroke();
      ctx.restore();

      // Sağ Yaprak
      ctx.save();
      ctx.translate(cx + 18 * leafScale, groundY - stemHeight * 0.65);
      ctx.rotate(0.55);
      ctx.fillStyle = "#2ecc71";
      ctx.beginPath();
      ctx.ellipse(0, 0, 18 * leafScale, 8 * leafScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-16 * leafScale, 0);
      ctx.lineTo(16 * leafScale, 0);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    // Katman Katman Açan Kadife Kırmızı Gül (Multi-Layer Rose Bloom)
    if (progress > 0.6) {
      const bloomP = Math.min(1, (progress - 0.6) / 0.4);
      const bloomEase = 1 - Math.pow(1 - bloomP, 3);
      const roseR = 36 * bloomEase;

      ctx.save();
      // Çanak Yapraklar
      ctx.fillStyle = "#27ae60";
      for (let s = 0; s < 5; s++) {
        ctx.save();
        ctx.translate(cx, currentStemY + 5);
        ctx.rotate((s * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, 8, 4, 12 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Dış Katman (Koyu Bordo / Kadife Kırmızı)
      ctx.fillStyle = "#c2185b";
      ctx.beginPath();
      ctx.arc(cx, currentStemY - 6, roseR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Katman (Canlı Kırmızı Taç Yapraklar)
      ctx.fillStyle = "#e91e63";
      for (let p = 0; p < 6; p++) {
        ctx.save();
        ctx.translate(cx, currentStemY - 6);
        ctx.rotate((p * Math.PI * 2) / 6);
        ctx.beginPath();
        ctx.ellipse(0, -roseR * 0.45, roseR * 0.48, roseR * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Katman (Parlak Aşk Pembesi Taç Yapraklar)
      ctx.fillStyle = "#ff1361";
      for (let p = 0; p < 5; p++) {
        ctx.save();
        ctx.translate(cx, currentStemY - 6);
        ctx.rotate((p * Math.PI * 2) / 5 + 0.4);
        ctx.beginPath();
        ctx.ellipse(0, -roseR * 0.28, roseR * 0.35, roseR * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Gülün İçi (Spiral Merkez)
      ctx.strokeStyle = "#880e4f";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, currentStemY - 6, roseR * 0.32, 0.2 * Math.PI, 1.8 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, currentStemY - 6, roseR * 0.16, 1.1 * Math.PI, 2.8 * Math.PI);
      ctx.stroke();

      // Altın Parıltı Tozları
      if (Math.random() > 0.3) {
        addSparkles(cx + (Math.random() - 0.5) * 60, currentStemY - 12 + (Math.random() - 0.5) * 50, 2, ["#ff1361", "#ffd700", "#ffffff", "#ff80ab"]);
      }

      ctx.restore();

      // Gülün Etrafında Uçuşan Minik Aşk Kelebeği
      const bAngle = t * 0.0035;
      const bDist = 65 + Math.sin(t * 0.004) * 15;
      const bx = cx + Math.cos(bAngle) * bDist;
      const by = currentStemY - 20 + Math.sin(bAngle * 2) * 20;
      const bFlap = Math.sin(t * 0.03);

      ctx.save();
      ctx.translate(bx, by);
      ctx.fillStyle = "#ffd700";
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = 8;
      // Kelebek Sol Kanat
      ctx.beginPath();
      ctx.ellipse(-7 * Math.abs(bFlap), -2, 8 * Math.abs(bFlap), 6, -0.3, 0, Math.PI * 2);
      ctx.fill();
      // Kelebek Sağ Kanat
      ctx.beginPath();
      ctx.ellipse(7 * Math.abs(bFlap), -2, 8 * Math.abs(bFlap), 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // =========================================================================
  // 3. ⭐ SİHİRLİ KUTUP YILDIZI & AŞK TAKIMYILDIZI (Celestial Star)
  // =========================================================================
  function renderConstellationStar(t) {
    const drawDur = 2700;
    const progress = Math.min(1, t / drawDur);
    const cx = width / 2;
    const cy = height / 2 - 10;
    const r = 78;

    // Arka Plan Gece Yıldızları
    ctx.save();
    const starBgCount = 18;
    for (let i = 0; i < starBgCount; i++) {
      const bx = (Math.sin(i * 123.45) * 0.5 + 0.5) * width;
      const by = (Math.cos(i * 678.9) * 0.5 + 0.5) * height;
      const twinkle = (Math.sin(t * 0.005 + i) + 1) / 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + twinkle * 0.7})`;
      ctx.beginPath();
      ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sağ Üst Köşedeki Hilal Ay (Crescent Moon)
    const moonX = width - 48;
    const moonY = 42;
    ctx.fillStyle = "#fff275";
    ctx.shadowColor = "#fff275";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff4f7";
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(moonX - 7, moonY - 5, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5 Köşeli Yıldız Çizim Noktaları (0 -> 2 -> 4 -> 1 -> 3 -> 0)
    const order = [0, 2, 4, 1, 3, 0];
    const starPoints = [];
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      starPoints.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }

    const totalSegs = 5;
    const currentSegProgress = progress * totalSegs;
    const activeSegIdx = Math.floor(currentSegProgress);
    const segSubP = currentSegProgress - activeSegIdx;

    ctx.save();
    // Yıldız Işıltılı Çizgi Yolu
    ctx.strokeStyle = "#f39c12";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "#f1c40f";
    ctx.shadowBlur = 16;

    ctx.beginPath();
    ctx.moveTo(starPoints[order[0]].x, starPoints[order[0]].y);

    for (let s = 0; s < Math.min(5, activeSegIdx); s++) {
      const p2 = starPoints[order[s + 1]];
      ctx.lineTo(p2.x, p2.y);
    }

    let headX = starPoints[order[0]].x;
    let headY = starPoints[order[0]].y;

    if (activeSegIdx < 5) {
      const p1 = starPoints[order[activeSegIdx]];
      const p2 = starPoints[order[activeSegIdx + 1]];
      headX = p1.x + (p2.x - p1.x) * segSubP;
      headY = p1.y + (p2.y - p1.y) * segSubP;
      ctx.lineTo(headX, headY);
    }
    ctx.stroke();

    // Çizim Yapan Parlak Kuyruklu Yıldız Ucu
    if (progress < 1) {
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ff1361";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(headX, headY, 8, 0, Math.PI * 2);
      ctx.fill();
      addSparkles(headX, headY, 4, ["#f1c40f", "#ff758c", "#ffffff", "#00cec9"]);
    } else {
      // Yıldız Tamamlandı: Sıcak Işıkla Dol ve Kalp Işınları Saç
      const pulse = (Math.sin((t - drawDur) / 220) + 1) / 2;
      ctx.fillStyle = `rgba(254, 202, 87, ${0.4 + pulse * 0.4})`;
      ctx.beginPath();
      ctx.moveTo(starPoints[order[0]].x, starPoints[order[0]].y);
      for (let s = 1; s <= 5; s++) ctx.lineTo(starPoints[order[s]].x, starPoints[order[s]].y);
      ctx.closePath();
      ctx.fill();

      // Merkezi Parlayan Güneş Işığı
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, 18 + pulse * 8, 0, Math.PI * 2);
      ctx.fill();

      if (Math.random() > 0.3) {
        addSparkles(cx + (Math.random() - 0.5) * 110, cy + (Math.random() - 0.5) * 110, 3, ["#f1c40f", "#ffffff", "#ff4b72", "#a29bfe"]);
      }
    }
    ctx.restore();
  }

  // =========================================================================
  // 4. 🐾 PATİ DOSTUMUZ & AŞK BALONCUKLARI (Paws & Floating Love Bubbles)
  // =========================================================================
  const bubbles = [];
  function renderCatBubbles(t) {
    const cx = width / 2;
    const catY = height - 42;

    // Yeni Sevgi Baloncuğu Üret
    if (Math.random() > 0.9 && bubbles.length < 9) {
      bubbles.push({
        x: cx + (Math.random() - 0.5) * 40,
        y: catY - 20,
        r: Math.random() * 12 + 16,
        speedY: Math.random() * 1.5 + 1.2,
        wobbleSpeed: Math.random() * 0.005 + 0.003,
        color: ["#ff758c", "#00cec9", "#a29bfe", "#fd79a8", "#ffd700"][Math.floor(Math.random() * 5)]
      });
    }

    // Sevimli Siyah Kedi Çizimi
    ctx.save();
    // Kedi Gövdesi
    ctx.fillStyle = "#1e272e";
    ctx.beginPath();
    ctx.ellipse(cx, catY + 12, 28, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Kedi Kafası
    ctx.beginPath();
    ctx.arc(cx, catY - 8, 20, 0, Math.PI * 2);
    ctx.fill();

    // Kedi Kulakları
    ctx.beginPath();
    ctx.moveTo(cx - 16, catY - 14);
    ctx.lineTo(cx - 24, catY - 32);
    ctx.lineTo(cx - 6, catY - 24);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 16, catY - 14);
    ctx.lineTo(cx + 24, catY - 32);
    ctx.lineTo(cx + 6, catY - 24);
    ctx.closePath();
    ctx.fill();

    // Pembe Kulak İçi
    ctx.fillStyle = "#ff758c";
    ctx.beginPath();
    ctx.moveTo(cx - 15, catY - 15);
    ctx.lineTo(cx - 21, catY - 28);
    ctx.lineTo(cx - 8, catY - 22);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 15, catY - 15);
    ctx.lineTo(cx + 21, catY - 28);
    ctx.lineTo(cx + 8, catY - 22);
    ctx.closePath();
    ctx.fill();

    // Sevimli Gözler (Büyük Parlak Gözler)
    ctx.fillStyle = "#00d2d3";
    ctx.beginPath();
    ctx.arc(cx - 7, catY - 9, 5, 0, Math.PI * 2);
    ctx.arc(cx + 7, catY - 9, 5, 0, Math.PI * 2);
    ctx.fill();

    // Gözbebekleri & Işıltı
    ctx.fillStyle = "#1e272e";
    ctx.beginPath();
    ctx.arc(cx - 7, catY - 9, 3, 0, Math.PI * 2);
    ctx.arc(cx + 7, catY - 9, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx - 8, catY - 11, 1.5, 0, Math.PI * 2);
    ctx.arc(cx + 6, catY - 11, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Pembe Burun & Bıyıklar
    ctx.fillStyle = "#ff9ff3";
    ctx.beginPath();
    ctx.arc(cx, catY - 3, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - 6, catY - 3); ctx.lineTo(cx - 22, catY - 6);
    ctx.moveTo(cx - 6, catY - 1); ctx.lineTo(cx - 20, catY + 3);
    ctx.moveTo(cx + 6, catY - 3); ctx.lineTo(cx + 22, catY - 6);
    ctx.moveTo(cx + 6, catY - 1); ctx.lineTo(cx + 20, catY + 3);
    ctx.stroke();

    // Kuyruk Sallanması
    const tailWiggle = Math.sin(t * 0.005) * 12;
    ctx.strokeStyle = "#1e272e";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx + 22, catY + 16);
    ctx.quadraticCurveTo(cx + 38 + tailWiggle, catY + 6, cx + 32 + tailWiggle, catY - 10);
    ctx.stroke();
    ctx.restore();

    // Baloncukları Güncelle ve Çiz
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.y -= b.speedY;
      const bx = b.x + Math.sin(t * b.wobbleSpeed) * 16;

      ctx.save();
      // Sabun Baloncuğu Gövdesi
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Baloncuk İçi Kalp
      ctx.font = `${Math.floor(b.r * 1.1)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💖", bx, b.y + 1);

      // Baloncuk Işıltısı
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(bx - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Tavana Ulaşınca Patlat
      if (b.y < 35) {
        addSparkles(bx, b.y, 5, [b.color, "#ffffff", "#ffd700"]);
        bubbles.splice(i, 1);
      }
    }
  }

  // --- ANA ANİMASYON DÖNGÜSÜ ---
  function loop() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    if (selectedAnim === "cactus") {
      renderKawaiiCactus(elapsed);
    } else if (selectedAnim === "rose") {
      renderBloomingRose(elapsed);
    } else if (selectedAnim === "star") {
      renderConstellationStar(elapsed);
    } else if (selectedAnim === "cat_bubbles") {
      renderCatBubbles(elapsed);
    }

    updateParticles();

    magicAnimFrameId = requestAnimationFrame(loop);
  }

  magicAnimFrameId = requestAnimationFrame(loop);
}

// ==========================================================================
// 16. BAŞLAT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderProducts();
  setupAllEvents();
  startBackgroundHearts();
  updateCartUI();
  initScreenCat();

  fetchCloudStocks();
  setInterval(fetchCloudStocks, 4000);
});
