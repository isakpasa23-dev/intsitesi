/* ==========================================================================
   SANA ÖZEL SEVGİ KÖŞESİ - JAVASCRIPT MOTORU
   Yapay Zeka Destekli Tatlı Söz Motoru, Çiğköfte Ziyafeti & Bulut Stoklar 🌯🤖💌✨
   ========================================================================== */

const TELEGRAM_BOT_TOKEN = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8";
const TELEGRAM_CHAT_ID = "6497058542";

// 🎯 Aşkölçer Hedef Tarihi: 8 Haziran 2029 Saat 09:00:00
const TARGET_DATE_ASKOLCER = new Date(2029, 5, 8, 9, 0, 0);

// Fiş Canlı Sayacı Timer ID'si
let receiptTimerInterval = null;
let lastQuoteIndex = -1;
let telegramLastUpdateId = 0;

// ==========================================================================
// 1. 🤖 GELİŞMİŞ YAPAY ZEKA & ZENGİN ROMANTİK SÖZ MOTORU
// ==========================================================================
const curatedRomanticQuotes = [
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
  "\"Aşkım, yarınlar seninle güzel, dünler seninle unutuldu, bugünüm seninle dolu! ✨\"",
  "\"Bu gece ay çok güzel değil mi? 🌙✨ (Seni her şeyden çok seviyorum...)\"",
  "\"Minik Yıldızım, gökyüzünde bir kayan yıldız görsem yine sadece seni dilerdim. 🌠\"",
  "\"Canımın içi, dünyanın bütün güzellikleri senin o sıcacık gülüşünde toplanmış. 💕\"",
  "\"Birtanem, sen benim bu hayatta yazdığım en kusursuz aşk şiirimsin. 📖💖\"",
  "\"Kraliçem, kalbimin tahtı da anahtarı da sonsuza dek sadece sende saklı. 👑🥰\"",
  "\"Gözbebeğim, senin kokunu içime çektiğim an kalbime bahar geliyor. 🌸\"",
  "\"Aşkım, seninle geçen bir ömür bile bana yetmeyecek kadar kısa gelir. ⏳💖\"",
  "\"Pamuk şekerim, seninle saçmalamak dünyanın en tatlı eğlencesi! 🎈🥰\"",
  "\"Huzurum, senin kollarında olmak dünyadaki bütün fırtınaları dindirmeye yetiyor. 🫂✨\""
];

const aiEndearments = [
  "Minik Yıldızım", "Bebeğim", "Canımın İçi", "Ömrümün Baharı", "Kraliçem",
  "Hayatımın Anlamı", "Birtanem", "Gözümün Nuru", "Sevgilim", "Kalbimin Sahibi",
  "Güzel Gözlüm", "Pamuk Şekerim", "Huzurum", "Balım", "Dünyalar Güzeli",
  "İlk ve Son Aşkım", "Gökyüzüm", "Tatlı Cadım", "Gül Yüzlüm", "Güneşim"
];

const aiTimeContexts = [
  "bu gece gökyüzüne her baktığımda,",
  "senin sesini duyduğum her an,",
  "gözlerimi her kapattığımda,",
  "seninle geçen her dakikada,",
  "gülüşünü her aklıma getirdiğimde,",
  "gecenin en sessiz saatlerinde,",
  "ellerini tuttuğum o ilk andan beri,",
  "kalbimin her atışında,",
  "sabah uyandığım ilk saniyede,",
  "dünyanın bütün kalabalığının ortasında bile,"
];

const aiObservations = [
  "içimde binlerce renkli kelebek aynı anda havalanıyor,",
  "dünyadaki bütün yorgunluklarım bir anda yok olup gidiyor,",
  "kalbime öyle tatlı ve sıcacık bir huzur yayılıyor ki,",
  "bütün şarkılar sadece bizim masalımızı anlatmaya başlıyor,",
  "zaman duruyor ve evrende sadece senin varlığın kalıyor,",
  "hayatımın en büyük ve en tatlı mucizesini yaşadığımı anlıyorum,",
  "gökyüzündeki tüm yıldızlar senin gözlerinin yanında sönük kalıyor,",
  "dünyanın en şanslı ve en mutlu insanı olduğumu hissediyorum,"
];

const aiDeclarations = [
  "çünkü sen benim bu hayattaki en kıymetli hazinemsin.",
  "ömrümün sonuna kadar sadece senin yanında olmak istiyorum.",
  "seni dünyadaki her şeyden ve herkesten çok seviyorum.",
  "varlığın benim en büyük şükür ve mutluluk sebebim.",
  "kalbimin her zerresi sonsuza kadar sadece senin için çarpacak.",
  "sen benim hem en huzurlu yuvam hem de en güzel masalımsın.",
  "seninle geçen tek bir saniyeyi bile dünyalara değişmem.",
  "sen benim ömrüme doğan ve hiç batmayan en parlak güneşsin.",
  "bu dünyada iyi ki varsın, iyi ki hayatımdasın birtanem."
];

const aiEmojis = ["💖", "🥰", "✨", "🌸", "💕", "🌠", "🧸", "🤍", "🌷", "👑", "🌙", "🔥"];

const quoteHistoryBuffer = [];

function generateAIRomanticQuote() {
  let selectedQuote = "";
  let attempts = 0;

  do {
    const isCurated = Math.random() > 0.65; // %35 Hazır Klasikler, %65 Dinamik AI Üretimi

    if (isCurated) {
      const idx = Math.floor(Math.random() * curatedRomanticQuotes.length);
      selectedQuote = curatedRomanticQuotes[idx];
    } else {
      const endearment = aiEndearments[Math.floor(Math.random() * aiEndearments.length)];
      const timeCtx = aiTimeContexts[Math.floor(Math.random() * aiTimeContexts.length)];
      const obs = aiObservations[Math.floor(Math.random() * aiObservations.length)];
      const dec = aiDeclarations[Math.floor(Math.random() * aiDeclarations.length)];
      const emoji = aiEmojis[Math.floor(Math.random() * aiEmojis.length)];

      selectedQuote = `"${endearment}, ${timeCtx} ${obs} ${dec} ${emoji}"`;
    }
    attempts++;
  } while (quoteHistoryBuffer.includes(selectedQuote) && attempts < 15);

  quoteHistoryBuffer.push(selectedQuote);
  if (quoteHistoryBuffer.length > 20) {
    quoteHistoryBuffer.shift();
  }

  return selectedQuote;
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

const TELEGRAM_STORAGE_MSG_ID = 85;

function getProductStock(productId) {
  const savedStocks = JSON.parse(localStorage.getItem("site_cloud_stocks_cache") || "null");
  if (savedStocks && typeof savedStocks[productId] !== "undefined") {
    return savedStocks[productId];
  }
  return INITIAL_STOCKS[productId] || 9999;
}

// ☁️ Buluttan Canlı Stokları Çekme (Telegram Cloud Storage)
async function fetchCloudStocks() {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=${TELEGRAM_CHAT_ID}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const rawText = data?.result?.pinned_message?.text;
      if (rawText && rawText.startsWith("{")) {
        const stocks = JSON.parse(rawText);
        if (stocks && typeof stocks.askolcer !== "undefined") {
          const prevDataStr = localStorage.getItem("site_cloud_stocks_cache");
          const newDataStr = JSON.stringify(stocks);
          if (prevDataStr !== newDataStr) {
            localStorage.setItem("site_cloud_stocks_cache", newDataStr);
            renderProducts();
            updateCartUI();
          }
        }
      }
    }
  } catch (err) {
    // Sessiz devam
  }
}

// ☁️ Buluta Güncel Stokları Kaydetme (Telegram Cloud Storage - %100 Kalıcı & Anlık)
async function pushCloudStocks(updatedStocks) {
  try {
    localStorage.setItem("site_cloud_stocks_cache", JSON.stringify(updatedStocks));
    renderProducts();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        message_id: TELEGRAM_STORAGE_MSG_ID,
        text: JSON.stringify(updatedStocks)
      })
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
let currentRating = 10;
let selectedLoveChip = "Sonsuz ♾️";
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
  const funView = document.getElementById("view-fun");

  if (viewName !== "fun" && typeof window.stopHeartGame === "function") {
    window.stopHeartGame();
  }

  if (menuView) menuView.classList.remove("active");
  if (shopView) shopView.classList.remove("active");
  if (funView) funView.classList.remove("active");

  if (viewName === "shop") {
    if (shopView) shopView.classList.add("active");
    filterCategory("ask");
  } else if (viewName === "fun") {
    if (funView) funView.classList.add("active");
  } else {
    if (menuView) menuView.classList.add("active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
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
    "Miyav! 🐾",
    "Mırrr... Başımı okşar mısın? 🐱",
    "Pati uzattım sana! 🐾✨",
    "Mama saati geldi mi acaba? 🐟",
    "Mırrr... Çok tatlısın! 🐾",
    "Beni sevmene bayılıyorum! Mırrr 🐾",
    "Uykum geldi sanki... 😴💤",
    "Ekranda yürümek çok eğlenceli! 🐈‍⬛",
    "Gözlerimin içine bak, miyav! 👀✨",
    "Pisi pisi dersen hemen koşarım! 🐾",
    "Kutuların içine girmeyi çok severim! 📦"
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

  const tileFun = document.getElementById("tile-fun");
  if (tileFun) tileFun.addEventListener("click", () => switchView("fun"));

  const btnBackFromFun = document.getElementById("btn-back-from-fun");
  if (btnBackFromFun) btnBackFromFun.addEventListener("click", () => switchView("menu"));

  const btnFunToShop = document.getElementById("btn-fun-to-shop");
  if (btnFunToShop) btnFunToShop.addEventListener("click", () => switchView("shop"));

  const tileReview = document.getElementById("tile-review");
  if (tileReview) tileReview.addEventListener("click", openReviewModal);

  const tileQuote = document.getElementById("tile-quote");
  if (tileQuote) tileQuote.addEventListener("click", openDailyQuoteModal);

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
    1: "1/10 - Benimle Azcık İlgilensen 🥺",
    2: "2/10 - Daha Fazla Sarılmalı! 💕",
    3: "3/10 - Tatlı Bir Başlangıç 🥰",
    4: "4/10 - Kalbim Isınmaya Başladı 💖",
    5: "5/10 - Sevgi Dozu Çok İyi 🌸",
    6: "6/10 - Harika Bir Aşk Deneyimi! ✨",
    7: "7/10 - Kalbimi Çaldın Bile! 😍",
    8: "8/10 - Büyüleyici & Çok Romantik! 🌹",
    9: "9/10 - Kusursuz Bir Aşk Masalı! 💫",
    10: "10/10 - Sonsuz Aşk & Mükemmel Ötesi! 🌟"
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
      reviewMsg += `⭐ *Puan:* ${currentRating}/10 (${ratingDescriptions[currentRating]})\n\n`;
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

  const btnMagicClose = document.getElementById("btn-magic-close");
  const magicModalOverlay = document.getElementById("magic-modal-overlay");
  const magicStageContainer = document.getElementById("magic-stage-container");

  if (btnMagicClose) btnMagicClose.addEventListener("click", closeMagicModal);
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
// 15.1 🎨 SİHİRLİ SEVGİ & ANİMASYON BAHÇESİ (Yüksek Performanslı & 7 Büyülü Gösteri)
// ==========================================================================
const MAGIC_ANIM_LIST = [
  "cactus",
  "rose",
  "star",
  "cat_bubbles",
  "coffee_love",
  "teddy_balloons",
  "love_letter",
  "bunny_moon_swing"
];

let currentMagicAnimIndex = 0;
let magicAnimFrameId = null;

function openMagicModal() {
  const modal = document.getElementById("magic-modal-overlay");
  if (modal) modal.classList.add("active");

  const cat = document.getElementById("screen-cat-companion");
  const bubble = document.getElementById("cat-speech-bubble");
  if (cat && bubble) {
    cat.classList.add("purring");
    bubble.textContent = "Miyav! Büyülü bahçeye hoş geldin! 🐾✨";
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
  playCurrentMagicAnimation(animKey);
}

function playCurrentMagicAnimation(animKey = null) {
  const selectedAnim = animKey || MAGIC_ANIM_LIST[currentMagicAnimIndex];
  const canvas = document.getElementById("magic-canvas");
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // GPU aşırı yükünü engelleyen optimize DPR
  const stageW = rect.width || 700;
  const stageH = rect.height || 440;

  canvas.width = Math.floor(stageW * dpr);
  canvas.height = Math.floor(stageH * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  const width = stageW;
  const height = stageH;

  if (magicAnimFrameId) {
    cancelAnimationFrame(magicAnimFrameId);
    magicAnimFrameId = null;
  }

  const startTime = Date.now();
  let lastFrameTime = performance.now();
  const magicParticles = [];

  function addSparkles(x, y, count = 2, colors = ["#ff1361", "#ffd700", "#ffffff", "#ff758c", "#a29bfe"]) {
    if (magicParticles.length >= 30) return; // Parçacık havuz sınırı
    for (let i = 0; i < count; i++) {
      magicParticles.push({
        x: x + (Math.random() - 0.5) * 26,
        y: y + (Math.random() - 0.5) * 26,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        size: Math.random() * 3.5 + 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.018 + 0.012,
        isHeart: Math.random() > 0.65
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // =========================================================================
  // 1. 🌵 SÜPER TATLI KALPLİ KAKTÜS (Kawaii Cactus & Blooming Lotus)
  // =========================================================================
  function renderKawaiiCactus(t) {
    const growDur = 2700;
    const progress = Math.min(1, t / growDur);
    const ease = 1 - Math.pow(1 - progress, 3);
    const cx = width / 2;
    const groundY = height - 42;

    ctx.save();
    ctx.fillStyle = "rgba(255, 175, 195, 0.35)";
    ctx.beginPath();
    ctx.ellipse(cx, groundY + 12, 100 * ease, 18 * ease, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    const potW = 90;
    const potH = 76;
    const potY = groundY - potH;

    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.moveTo(cx - potW / 2 + 10, groundY);
    ctx.lineTo(cx + potW / 2 - 10, groundY);
    ctx.lineTo(cx + potW / 2, potY + 16);
    ctx.lineTo(cx - potW / 2, potY + 16);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#e84393";
    ctx.beginPath();
    ctx.roundRect(cx - potW / 2 - 8, potY, potW + 16, 20, 8);
    ctx.fill();

    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("💖", cx, potY + 44);
    ctx.restore();

    const cactusH = 135 * ease;
    const cactusW = 64 * ease;
    const cactusY = potY - cactusH + 8;
    const sway = Math.sin(t * 0.003) * 3 * progress;

    ctx.save();
    ctx.translate(cx + sway, potY);
    ctx.rotate(sway * 0.012);
    ctx.translate(-(cx + sway), -potY);

    ctx.fillStyle = "#2ecc71";
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx - cactusW / 2, cactusY, cactusW, cactusH + 10, cactusW / 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 14 * ease, cactusY + 14);
    ctx.lineTo(cx - 14 * ease, potY);
    ctx.moveTo(cx + 14 * ease, cactusY + 14);
    ctx.lineTo(cx + 14 * ease, potY);
    ctx.stroke();

    if (progress > 0.35) {
      const armP = Math.min(1, (progress - 0.35) / 0.35);
      const armEase = 1 - Math.pow(1 - armP, 3);

      ctx.fillStyle = "#2ecc71";
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cx - cactusW / 2 - 24 * armEase, cactusY + 42, 26 * armEase, 38 * armEase, 12);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(cx + cactusW / 2 - 2 * armEase, cactusY + 30, 26 * armEase, 42 * armEase, 12);
      ctx.fill();
      ctx.stroke();

      if (armP > 0.7) {
        ctx.font = "14px sans-serif";
        ctx.fillText("🌸", cx - cactusW / 2 - 16 * armEase, cactusY + 38);
        ctx.fillText("🌸", cx + cactusW / 2 + 12 * armEase, cactusY + 26);
      }
    }

    if (progress > 0.45) {
      const faceAlpha = Math.min(1, (progress - 0.45) / 0.3);
      ctx.globalAlpha = faceAlpha;

      ctx.fillStyle = "#2d3436";
      ctx.beginPath();
      ctx.arc(cx - 12, cactusY + cactusH * 0.42, 4.5, 0, Math.PI * 2);
      ctx.arc(cx + 12, cactusY + cactusH * 0.42, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 13.5, cactusY + cactusH * 0.42 - 1.5, 1.8, 0, Math.PI * 2);
      ctx.arc(cx + 10.5, cactusY + cactusH * 0.42 - 1.5, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#2d3436";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cactusY + cactusH * 0.48, 6.5, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 107, 129, 0.85)";
      ctx.beginPath();
      ctx.arc(cx - 18, cactusY + cactusH * 0.50, 6, 0, Math.PI * 2);
      ctx.arc(cx + 18, cactusY + cactusH * 0.50, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (progress > 0.6) {
      const flowerP = Math.min(1, (progress - 0.6) / 0.4);
      const flowerScale = 1 - Math.pow(1 - flowerP, 3);
      const flowerY = cactusY;

      ctx.save();
      ctx.translate(cx, flowerY);
      ctx.scale(flowerScale, flowerScale);

      ctx.fillStyle = "#ff758c";
      for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 12);
        ctx.beginPath();
        ctx.ellipse(0, -24, 8.5, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = "#ff4081";
      for (let i = 0; i < 10; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 10 + 0.3);
        ctx.beginPath();
        ctx.ellipse(0, -16, 6.5, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (Math.random() > 0.4) {
        addSparkles(cx + (Math.random() - 0.5) * 80, flowerY + (Math.random() - 0.5) * 60, 2, ["#ff758c", "#ffd700", "#ffffff"]);
      }
    }

    ctx.restore();
  }

  // =========================================================================
  // 2. 🌹 BÜYÜLÜ AŞK GÜLÜ (Magical Blooming Love Rose & Dual Butterflies)
  // =========================================================================
  function renderBloomingRose(t) {
    const growDur = 2900;
    const progress = Math.min(1, t / growDur);
    const ease = 1 - Math.pow(1 - progress, 3);

    const cx = width / 2;
    const groundY = height - 45;
    const topY = height * 0.24;
    const stemHeight = (groundY - topY) * ease;
    const currentStemY = groundY - stemHeight;

    ctx.save();
    ctx.fillStyle = "#a8e6cf";
    ctx.beginPath();
    ctx.ellipse(cx, groundY + 14, 110 * ease, 18 * ease, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, groundY);
    const cpX = cx + Math.sin(progress * Math.PI) * 24;
    const cpY = groundY - stemHeight * 0.5;
    ctx.quadraticCurveTo(cpX, cpY, cx, currentStemY);
    ctx.stroke();

    if (progress > 0.3) {
      const leafP = Math.min(1, (progress - 0.3) / 0.35);
      const leafScale = 1 - Math.pow(1 - leafP, 3);

      ctx.save();
      ctx.translate(cx - 22 * leafScale, groundY - stemHeight * 0.42);
      ctx.rotate(-0.55);
      ctx.fillStyle = "#2ecc71";
      ctx.beginPath();
      ctx.ellipse(0, 0, 26 * leafScale, 12 * leafScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-24 * leafScale, 0); ctx.lineTo(24 * leafScale, 0);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx + 24 * leafScale, groundY - stemHeight * 0.65);
      ctx.rotate(0.55);
      ctx.fillStyle = "#2ecc71";
      ctx.beginPath();
      ctx.ellipse(0, 0, 24 * leafScale, 11 * leafScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#27ae60";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-22 * leafScale, 0); ctx.lineTo(22 * leafScale, 0);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();

    // Katman Katman Açan Katmerli & Çok Renkli Büyülü Aşk Gülü (Multi-Tone Blooming Rose)
    if (progress > 0.55) {
      const bloomP = Math.min(1, (progress - 0.55) / 0.45);
      const bloomEase = 1 - Math.pow(1 - bloomP, 3);
      const flowerY = currentStemY - 10;

      ctx.save();
      ctx.translate(cx, flowerY);

      // Çanak Yeşil Yapraklar (Sepals)
      ctx.fillStyle = "#27ae60";
      for (let s = 0; s < 5; s++) {
        ctx.save();
        ctx.rotate((s * Math.PI * 2) / 5 + 0.3);
        ctx.beginPath();
        ctx.ellipse(0, 18 * bloomEase, 6.5, 18 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 1. Katman (En Dış - 12 Yapraklı Kadife Bordo & Derin Gül Yaprakları)
      ctx.fillStyle = "#c0392b";
      for (let p = 0; p < 12; p++) {
        ctx.save();
        ctx.rotate((p * Math.PI * 2) / 12);
        ctx.beginPath();
        ctx.ellipse(0, -38 * bloomEase, 14 * bloomEase, 24 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Katman (10 Yapraklı Canlı Mercan & Yakut Kırmızı Yapraklar)
      ctx.fillStyle = "#ff4757";
      for (let p = 0; p < 10; p++) {
        ctx.save();
        ctx.rotate((p * Math.PI * 2) / 10 + 0.35);
        ctx.beginPath();
        ctx.ellipse(0, -28 * bloomEase, 12 * bloomEase, 20 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Katman (8 Yapraklı Parlak Şeker Pembesi & Fuşya)
      ctx.fillStyle = "#ff758c";
      for (let p = 0; p < 8; p++) {
        ctx.save();
        ctx.rotate((p * Math.PI * 2) / 8 + 0.7);
        ctx.beginPath();
        ctx.ellipse(0, -20 * bloomEase, 10 * bloomEase, 16 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Katman (6 Yapraklı Pastel Pembe & Şeftali Gonca)
      ctx.fillStyle = "#fd79a8";
      for (let p = 0; p < 6; p++) {
        ctx.save();
        ctx.rotate((p * Math.PI * 2) / 6 + 1.05);
        ctx.beginPath();
        ctx.ellipse(0, -12 * bloomEase, 8 * bloomEase, 12 * bloomEase, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Merkez Göbek (Altın Parıltılı Aşk Tohumu & Kalp İncisi)
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.arc(0, 0, 11 * bloomEase, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-2.5 * bloomEase, -2.5 * bloomEase, 3.5 * bloomEase, 0, Math.PI * 2);
      ctx.fill();

      // Gül Yaprakları Üzerinde Parıldayan Su Damlaları (Dewdrops)
      if (bloomP > 0.8) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(16 * bloomEase, -22 * bloomEase, 2.5, 0, Math.PI * 2);
        ctx.arc(-18 * bloomEase, -14 * bloomEase, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Düşen Aşk Gül Yaprakları
      for (let i = 0; i < 6; i++) {
        const px = cx + Math.sin(t * 0.0012 + i * 1.6) * (width * 0.42);
        const py = ((t * 0.065 + i * 65) % height);
        const prot = t * 0.0025 + i * 1.1;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(prot);
        ctx.fillStyle = i % 2 === 0 ? "rgba(255, 71, 87, 0.85)" : "rgba(255, 117, 140, 0.85)";
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 5.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (Math.random() > 0.35) {
        addSparkles(cx + (Math.random() - 0.5) * 90, flowerY + (Math.random() - 0.5) * 70, 2, ["#ffd700", "#ff4757", "#ff758c", "#ffffff"]);
      }

      // Çift Kelebek
      const bAngle1 = t * 0.0035;
      const bx1 = cx + Math.cos(bAngle1) * (85 + Math.sin(t * 0.004) * 20);
      const by1 = currentStemY - 30 + Math.sin(bAngle1 * 2) * 26;
      const bFlap1 = Math.sin(t * 0.035);

      ctx.save();
      ctx.translate(bx1, by1);
      ctx.fillStyle = "#ffd700";
      ctx.beginPath();
      ctx.ellipse(-9 * Math.abs(bFlap1), -2, 10 * Math.abs(bFlap1), 8, -0.3, 0, Math.PI * 2);
      ctx.ellipse(9 * Math.abs(bFlap1), -2, 10 * Math.abs(bFlap1), 8, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const bAngle2 = -t * 0.003 + 2;
      const bx2 = cx + Math.cos(bAngle2) * (70 + Math.cos(t * 0.005) * 15);
      const by2 = currentStemY - 10 + Math.sin(bAngle2 * 2) * 22;
      const bFlap2 = Math.sin(t * 0.04);

      ctx.save();
      ctx.translate(bx2, by2);
      ctx.fillStyle = "#ff758c";
      ctx.beginPath();
      ctx.ellipse(-7 * Math.abs(bFlap2), -2, 8 * Math.abs(bFlap2), 6, -0.3, 0, Math.PI * 2);
      ctx.ellipse(7 * Math.abs(bFlap2), -2, 8 * Math.abs(bFlap2), 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // =========================================================================
  // 3. ⭐ SİHİRLİ KUTUP YILDIZI & KOZMİK TAKIMYILDIZ (Celestial Supernova)
  // =========================================================================
  function renderConstellationStar(t) {
    const drawDur = 2800;
    const progress = Math.min(1, t / drawDur);
    const cx = width / 2;
    const cy = height / 2 - 12;
    const r = 105;

    ctx.save();
    const starBgCount = 22;
    for (let i = 0; i < starBgCount; i++) {
      const bx = (Math.sin(i * 143.45) * 0.5 + 0.5) * width;
      const by = (Math.cos(i * 789.9) * 0.5 + 0.5) * height;
      const twinkle = (Math.sin(t * 0.005 + i) + 1) / 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.35 + twinkle * 0.65})`;
      ctx.beginPath();
      ctx.arc(bx, by, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const moonX = width - 58;
    const moonY = 52;
    ctx.fillStyle = "#fff275";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff4f7";
    ctx.beginPath();
    ctx.arc(moonX - 9, moonY - 6, 21, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f39c12";
    ctx.beginPath();
    ctx.arc(moonX + 8, moonY - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

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
    ctx.strokeStyle = "#f39c12";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

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

    if (progress < 1) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(headX, headY, 9, 0, Math.PI * 2);
      ctx.fill();
      addSparkles(headX, headY, 3, ["#f1c40f", "#ff758c", "#ffffff"]);
    } else {
      const pulse = (Math.sin((t - drawDur) / 200) + 1) / 2;
      ctx.fillStyle = `rgba(254, 202, 87, ${0.4 + pulse * 0.35})`;
      ctx.beginPath();
      ctx.moveTo(starPoints[order[0]].x, starPoints[order[0]].y);
      for (let s = 1; s <= 5; s++) ctx.lineTo(starPoints[order[s]].x, starPoints[order[s]].y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 22 + pulse * 8, 0, Math.PI * 2);
      ctx.fill();

      if (Math.random() > 0.3) {
        addSparkles(cx + (Math.random() - 0.5) * 140, cy + (Math.random() - 0.5) * 140, 3, ["#f1c40f", "#ffffff", "#ff4b72"]);
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
    const catY = height - 52;

    if (Math.random() > 0.9 && bubbles.length < 8) {
      bubbles.push({
        x: cx + (Math.random() - 0.5) * 45,
        y: catY - 26,
        r: Math.random() * 12 + 18,
        speedY: Math.random() * 1.5 + 1.1,
        wobbleSpeed: Math.random() * 0.005 + 0.003,
        color: ["#ff758c", "#00cec9", "#a29bfe", "#fd79a8", "#ffd700"][Math.floor(Math.random() * 5)]
      });
    }

    ctx.save();
    ctx.fillStyle = "#1e272e";
    ctx.beginPath();
    ctx.ellipse(cx, catY + 16, 36, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, catY - 10, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - 20, catY - 16); ctx.lineTo(cx - 30, catY - 40); ctx.lineTo(cx - 8, catY - 30);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 20, catY - 16); ctx.lineTo(cx + 30, catY - 40); ctx.lineTo(cx + 8, catY - 30);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ff758c";
    ctx.beginPath();
    ctx.moveTo(cx - 19, catY - 18); ctx.lineTo(cx - 26, catY - 34); ctx.lineTo(cx - 10, catY - 27);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 19, catY - 18); ctx.lineTo(cx + 26, catY - 34); ctx.lineTo(cx + 10, catY - 27);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#00d2d3";
    ctx.beginPath();
    ctx.arc(cx - 9, catY - 11, 6.5, 0, Math.PI * 2);
    ctx.arc(cx + 9, catY - 11, 6.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1e272e";
    ctx.beginPath();
    ctx.arc(cx - 9, catY - 11, 4, 0, Math.PI * 2);
    ctx.arc(cx + 9, catY - 11, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx - 10.5, catY - 13, 2, 0, Math.PI * 2);
    ctx.arc(cx + 7.5, catY - 13, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff9ff3";
    ctx.beginPath();
    ctx.arc(cx, catY - 3, 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx - 8, catY - 3); ctx.lineTo(cx - 28, catY - 7);
    ctx.moveTo(cx - 8, catY - 1); ctx.lineTo(cx - 26, catY + 4);
    ctx.moveTo(cx + 8, catY - 3); ctx.lineTo(cx + 28, catY - 7);
    ctx.moveTo(cx + 8, catY - 1); ctx.lineTo(cx + 26, catY + 4);
    ctx.stroke();

    const tailWiggle = Math.sin(t * 0.005) * 15;
    ctx.strokeStyle = "#1e272e";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx + 28, catY + 20);
    ctx.quadraticCurveTo(cx + 48 + tailWiggle, catY + 8, cx + 40 + tailWiggle, catY - 14);
    ctx.stroke();
    ctx.restore();

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.y -= b.speedY;
      const bx = b.x + Math.sin(t * b.wobbleSpeed) * 18;

      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = `${Math.floor(b.r * 1.1)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💖", bx, b.y + 1);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(bx - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (b.y < 35) {
        addSparkles(bx, b.y, 4, [b.color, "#ffffff", "#ffd700"]);
        bubbles.splice(i, 1);
      }
    }
  }

  // =========================================================================
  // 5. ☕ AŞK KAHVESİ / ÇAYI & KALP BUHARI (Two Cute Clinking Mugs & Steam)
  // =========================================================================
  function renderCoffeeLove(t) {
    const growDur = 2500;
    const progress = Math.min(1, t / growDur);
    const ease = 1 - Math.pow(1 - progress, 3);
    const cx = width / 2;
    const tableY = height - 50;

    // Masa / Sehpa Örtüsü
    ctx.save();
    ctx.fillStyle = "#ffeaa7";
    ctx.beginPath();
    ctx.roundRect(cx - 160 * ease, tableY + 10, 320 * ease, 30, 15);
    ctx.fill();
    ctx.restore();

    // Tokuşma Mesafesi Animasyonu
    const clinkOffset = (1 - ease) * 80 + Math.sin(t * 0.004) * 4;

    // Pembe Kupa (Sol)
    const mug1X = cx - 45 - clinkOffset;
    const mug1Y = tableY - 60;
    ctx.save();
    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.roundRect(mug1X - 30, mug1Y, 60, 65, [4, 4, 18, 18]);
    ctx.fill();
    // Kupa Kulpu
    ctx.strokeStyle = "#ff7675";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(mug1X - 30, mug1Y + 30, 16, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    // Sevimli Yüz
    ctx.fillStyle = "#2d3436";
    ctx.beginPath();
    ctx.arc(mug1X - 10, mug1Y + 28, 3, 0, Math.PI * 2);
    ctx.arc(mug1X + 10, mug1Y + 28, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2d3436";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(mug1X, mug1Y + 34, 4, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    // Yanaklar
    ctx.fillStyle = "#fd79a8";
    ctx.beginPath();
    ctx.arc(mug1X - 14, mug1Y + 34, 3.5, 0, Math.PI * 2);
    ctx.arc(mug1X + 14, mug1Y + 34, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Turkuaz Kupa (Sağ)
    const mug2X = cx + 45 + clinkOffset;
    const mug2Y = tableY - 60;
    ctx.save();
    ctx.fillStyle = "#00cec9";
    ctx.beginPath();
    ctx.roundRect(mug2X - 30, mug2Y, 60, 65, [4, 4, 18, 18]);
    ctx.fill();
    // Kupa Kulpu
    ctx.strokeStyle = "#00cec9";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(mug2X + 30, mug2Y + 30, 16, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.stroke();
    // Sevimli Yüz
    ctx.fillStyle = "#2d3436";
    ctx.beginPath();
    ctx.arc(mug2X - 10, mug2Y + 28, 3, 0, Math.PI * 2);
    ctx.arc(mug2X + 10, mug2Y + 28, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2d3436";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(mug2X, mug2Y + 34, 4, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    // Yanaklar
    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.arc(mug2X - 14, mug2Y + 34, 3.5, 0, Math.PI * 2);
    ctx.arc(mug2X + 14, mug2Y + 34, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Yükselen Aşk Buharı & Kalpler
    for (let i = 0; i < 5; i++) {
      const steamP = ((t * 0.05 + i * 50) % 220);
      const sy = mug1Y - steamP;
      const sx = cx + Math.sin(t * 0.003 + i) * 35;
      const alpha = Math.max(0, 1 - steamP / 220);

      ctx.save();
      ctx.globalAlpha = alpha * 0.85;
      ctx.font = `${16 + i * 3}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(i % 2 === 0 ? "💖" : "✨", sx, sy);
      ctx.restore();
    }

    if (Math.random() > 0.45) {
      addSparkles(cx + (Math.random() - 0.5) * 90, tableY - 120, 2, ["#ff7675", "#00cec9", "#ffd700"]);
    }
  }

  // =========================================================================
  // 6. 🧸 UÇAN KALP BALONLARI & SEVİMLİ AYICIK (Teddy & Heart Balloons)
  // =========================================================================
  function renderTeddyBalloons(t) {
    const cx = width / 2;
    const floatY = height * 0.48 + Math.sin(t * 0.003) * 18;
    const balloonCenterY = floatY - 120;

    // Arka Plan Yumuşak Bulutlar
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    for (let c = 0; c < 4; c++) {
      const cloudX = ((t * 0.02 + c * 180) % (width + 120)) - 60;
      const cloudY = 50 + c * 40;
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 22, 0, Math.PI * 2);
      ctx.arc(cloudX + 18, cloudY - 8, 26, 0, Math.PI * 2);
      ctx.arc(cloudX + 38, cloudY, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 5 Renkli Kalp Balon Demeti
    const balloonColors = ["#ff7675", "#fd79a8", "#a29bfe", "#74b9ff", "#ffeaa7"];
    const balloonOffsets = [
      { x: -38, y: -25, r: 24, c: balloonColors[0] },
      { x: 38, y: -25, r: 24, c: balloonColors[1] },
      { x: -18, y: -50, r: 26, c: balloonColors[2] },
      { x: 18, y: -50, r: 26, c: balloonColors[3] },
      { x: 0, y: -75, r: 28, c: balloonColors[4] }
    ];

    ctx.save();
    // İpler
    ctx.strokeStyle = "rgba(200, 180, 190, 0.7)";
    ctx.lineWidth = 1.5;
    balloonOffsets.forEach(b => {
      ctx.beginPath();
      ctx.moveTo(cx + b.x, balloonCenterY + b.y + 15);
      ctx.lineTo(cx, floatY - 10);
      ctx.stroke();
    });

    // Balonlar
    balloonOffsets.forEach(b => {
      ctx.save();
      ctx.translate(cx + b.x, balloonCenterY + b.y);
      ctx.fillStyle = b.c;
      ctx.font = `${Math.floor(b.r * 1.8)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💖", 0, 0);
      ctx.restore();
    });
    ctx.restore();

    // Sevimli Ayıcık Çizimi
    ctx.save();
    const bearX = cx;
    const bearY = floatY + 20;

    // Ayıcık Gövdesi
    ctx.fillStyle = "#b08d57";
    ctx.beginPath();
    ctx.ellipse(bearX, bearY + 16, 26, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ayıcık Kafası
    ctx.beginPath();
    ctx.arc(bearX, bearY - 14, 22, 0, Math.PI * 2);
    ctx.fill();

    // Kulaklar
    ctx.beginPath();
    ctx.arc(bearX - 16, bearY - 30, 9, 0, Math.PI * 2);
    ctx.arc(bearX + 16, bearY - 30, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e0a96d";
    ctx.beginPath();
    ctx.arc(bearX - 16, bearY - 30, 5, 0, Math.PI * 2);
    ctx.arc(bearX + 16, bearY - 30, 5, 0, Math.PI * 2);
    ctx.fill();

    // Yüz & Burun
    ctx.beginPath();
    ctx.ellipse(bearX, bearY - 10, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#2d3436";
    ctx.beginPath();
    ctx.arc(bearX - 7, bearY - 18, 2.5, 0, Math.PI * 2);
    ctx.arc(bearX + 7, bearY - 18, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(bearX, bearY - 12, 3.5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Kırmızı Papyon
    ctx.fillStyle = "#e84393";
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🎀", bearX, bearY + 2);

    // Kollar (İpi Tutan Kollar)
    ctx.fillStyle = "#b08d57";
    ctx.beginPath();
    ctx.ellipse(bearX - 14, bearY, 7, 14, -0.6, 0, Math.PI * 2);
    ctx.ellipse(bearX + 14, bearY, 7, 14, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (Math.random() > 0.4) {
      addSparkles(cx + (Math.random() - 0.5) * 110, floatY + (Math.random() - 0.5) * 90, 2, ["#ffeaa7", "#fd79a8", "#ffffff"]);
    }
  }

  // =========================================================================
  // 7. 💌 BÜYÜLÜ AŞK MEKTUBU & KALP HAVAİ FİŞEKLERİ (Love Letter & Heart Fireworks)
  // =========================================================================
  function renderLoveLetter(t) {
    const cx = width / 2;
    const floatY = height * 0.52 + Math.sin(t * 0.003) * 14;
    const envW = 110;
    const envH = 75;

    // Arka Plan Işıltıları
    ctx.save();
    for (let i = 0; i < 16; i++) {
      const sx = (Math.sin(i * 123.4) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 456.7) * 0.5 + 0.5) * height;
      const twinkle = (Math.sin(t * 0.004 + i) + 1) / 2;
      ctx.fillStyle = `rgba(255, 117, 140, ${0.25 + twinkle * 0.65})`;
      ctx.font = "14px sans-serif";
      ctx.fillText("✨", sx, sy);
    }
    ctx.restore();

    // Çırpınan Melek Kanatları (Angel Wings)
    const wingFlap = Math.sin(t * 0.02) * 0.25;
    ctx.save();
    ctx.translate(cx - envW / 2, floatY);
    ctx.rotate(-wingFlap);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.ellipse(-24, -10, 26, 14, -0.4, 0, Math.PI * 2);
    ctx.ellipse(-18, 4, 20, 10, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(cx + envW / 2, floatY);
    ctx.rotate(wingFlap);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.ellipse(24, -10, 26, 14, 0.4, 0, Math.PI * 2);
    ctx.ellipse(18, 4, 20, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Zarfın İçinden Çıkan Parlayan Aşk Mektubu
    const letterRise = Math.min(45, (t * 0.03) % 90);
    ctx.save();
    ctx.fillStyle = "#fffdf9";
    ctx.strokeStyle = "#fdcb6e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx - 42, floatY - envH / 2 - letterRise, 84, 55, 6);
    ctx.fill();
    ctx.stroke();

    // Mektup Üzerindeki Aşk Çizgileri & Kalp Mührü
    ctx.strokeStyle = "#ff758c";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 30, floatY - envH / 2 - letterRise + 16); ctx.lineTo(cx + 30, floatY - envH / 2 - letterRise + 16);
    ctx.moveTo(cx - 30, floatY - envH / 2 - letterRise + 26); ctx.lineTo(cx + 20, floatY - envH / 2 - letterRise + 26);
    ctx.moveTo(cx - 30, floatY - envH / 2 - letterRise + 36); ctx.lineTo(cx + 10, floatY - envH / 2 - letterRise + 36);
    ctx.stroke();

    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("💖", cx + 22, floatY - envH / 2 - letterRise + 38);
    ctx.restore();

    // Pembe Aşk Zarfı Gövdesi
    ctx.save();
    ctx.fillStyle = "#ff7675";
    ctx.strokeStyle = "#e84393";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - envW / 2, floatY - envH / 2, envW, envH, 10);
    ctx.fill();
    ctx.stroke();

    // Zarf Katlama Çizgileri (Envelope Folds)
    ctx.strokeStyle = "#fab1a0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - envW / 2, floatY + envH / 2);
    ctx.lineTo(cx, floatY);
    ctx.lineTo(cx + envW / 2, floatY + envH / 2);
    ctx.stroke();

    // Kalp Mührü
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("💌", cx, floatY + 6);
    ctx.restore();

    // Mektuptan Havai Fişek Gibi Fışkıran Kalpler
    for (let k = 0; k < 6; k++) {
      const fAngle = (t * 0.002 + k * 1.05);
      const fDist = ((t * 0.06 + k * 35) % 130) + 20;
      const hx = cx + Math.cos(fAngle) * fDist;
      const hy = floatY - envH / 2 - letterRise - Math.abs(Math.sin(fAngle)) * fDist;
      const hAlpha = Math.max(0, 1 - fDist / 150);

      ctx.save();
      ctx.globalAlpha = hAlpha;
      ctx.font = `${14 + (k % 3) * 4}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(["💖", "💕", "✨", "🌸", "💗"][k % 5], hx, hy);
      ctx.restore();
    }

    if (Math.random() > 0.4) {
      addSparkles(cx + (Math.random() - 0.5) * 100, floatY - 60, 2, ["#ff7675", "#ffd700", "#ff9ff3"]);
    }
  }

  // =========================================================================
  // 8. 🌙 HİLAL AY SALINCAĞINDA SEVİMLİ TAVŞANCIK (Bunny on Moon Swing)
  // =========================================================================
  function renderBunnyMoonSwing(t) {
    const pivotX = width / 2;
    const pivotY = -20;
    const ropeLen = height * 0.58;
    const swingAngle = Math.sin(t * 0.0022) * 0.16;

    const seatX = pivotX + Math.sin(swingAngle) * ropeLen;
    const seatY = pivotY + Math.cos(swingAngle) * ropeLen;

    // Arka Plan Gece Gökyüzü & Parıldayan Yıldızlar
    ctx.save();
    for (let i = 0; i < 22; i++) {
      const sx = (Math.sin(i * 88.3) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 321.4) * 0.5 + 0.5) * height;
      const twinkle = (Math.sin(t * 0.005 + i) + 1) / 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + twinkle * 0.7})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Altın Yıldızlı Salıncak İpleri
    ctx.save();
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(pivotX - 30, pivotY);
    ctx.lineTo(seatX - 25, seatY);
    ctx.moveTo(pivotX + 30, pivotY);
    ctx.lineTo(seatX + 25, seatY);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(seatX, seatY);
    ctx.rotate(swingAngle * 0.85);

    // Parlayan Hilal Ay Salıncağı (Glowing Crescent Moon)
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1e272e"; // Sahne arka planı ile hilal oyuğu
    ctx.beginPath();
    ctx.arc(-14, -10, 42, 0, Math.PI * 2);
    ctx.fill();

    // Sevimli Beyaz Tavşancık (Cute Fluffy Bunny)
    const bunnyX = 6;
    const bunnyY = -8;

    // Gövde
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(bunnyX, bunnyY + 12, 16, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    // Kafa
    ctx.beginPath();
    ctx.arc(bunnyX, bunnyY - 10, 15, 0, Math.PI * 2);
    ctx.fill();

    // Uzun Tavşan Kulakları
    const earWiggle = Math.sin(t * 0.005) * 0.08;
    ctx.save();
    ctx.translate(bunnyX - 7, bunnyY - 22);
    ctx.rotate(-0.2 + earWiggle);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(0, -12, 5.5, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.ellipse(0, -12, 3, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(bunnyX + 7, bunnyY - 22);
    ctx.rotate(0.2 - earWiggle);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(0, -12, 5.5, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.ellipse(0, -12, 3, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Sevimli Tavşan Yüzü
    ctx.fillStyle = "#2d3436";
    ctx.beginPath();
    ctx.arc(bunnyX - 5, bunnyY - 11, 2.2, 0, Math.PI * 2);
    ctx.arc(bunnyX + 5, bunnyY - 11, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ff7675";
    ctx.beginPath();
    ctx.arc(bunnyX, bunnyY - 6, 2, 0, Math.PI * 2);
    ctx.arc(bunnyX - 8, bunnyY - 7, 3, 0, Math.PI * 2);
    ctx.arc(bunnyX + 8, bunnyY - 7, 3, 0, Math.PI * 2);
    ctx.fill();

    // Tavşanın Tuttuğu Parlayan Yıldız / Kalp Değneği
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🌟", bunnyX + 16, bunnyY + 4);
    ctx.restore();

    // Salıncak Hareket Ettikçe Arkasında Kalan Altın Yıldız Tozu İzi
    if (Math.random() > 0.35) {
      addSparkles(seatX + (Math.random() - 0.5) * 60, seatY + 20, 2, ["#ffd700", "#ff7675", "#ffffff"]);
    }
  }

  // --- ANA ANİMASYON DÖNGÜSÜ (60 FPS Limiti & Sıfır GPU Yükü) ---
  function loop(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;

    // 60 FPS'e sabitleyerek aşırı CPU/GPU ısınmasını engelle
    if (delta >= 15.8) {
      lastFrameTime = timestamp - (delta % 15.8);
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
      } else if (selectedAnim === "coffee_love") {
        renderCoffeeLove(elapsed);
      } else if (selectedAnim === "teddy_balloons") {
        renderTeddyBalloons(elapsed);
      } else if (selectedAnim === "love_letter") {
        renderLoveLetter(elapsed);
      } else if (selectedAnim === "bunny_moon_swing") {
        renderBunnyMoonSwing(elapsed);
      }

      updateParticles();
    }

    magicAnimFrameId = requestAnimationFrame(loop);
  }

  magicAnimFrameId = requestAnimationFrame(loop);
}

// ==========================================================================
// 15.2 ⏳ AŞK SAYACIMIZ (10.08.2026 00:00:00)
// ==========================================================================
function initRelationshipTimer() {
  const startDate = new Date(2026, 7, 10, 0, 0, 0); // 10 Ağustos 2026 00:00:00

  function updateTimer() {
    const now = new Date();
    let diff = now.getTime() - startDate.getTime();
    diff = Math.abs(diff);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById("timer-days");
    const hEl = document.getElementById("timer-hours");
    const mEl = document.getElementById("timer-minutes");
    const sEl = document.getElementById("timer-seconds");

    if (dEl) dEl.textContent = days;
    if (hEl) hEl.textContent = String(hours).padStart(2, "0");
    if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
    if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==========================================================================
// 15.3 🎡 EĞLENCE & HATIRA KÖŞESİ (Çarkıfelek, Kalp Oyunu, Polaroid Albüm)
// ==========================================================================
function initFunHub() {
  // 1. Sekmeler (yeni fun-tab-tile sınıfıyla)
  const funTabs = document.getElementById("fun-tabs");
  if (funTabs) {
    const tabBtns = funTabs.querySelectorAll(".fun-tab-tile");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabKey = btn.dataset.funTab;
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".fun-tab-panel").forEach(p => p.classList.remove("active"));
        const targetPanel = document.getElementById(`panel-${tabKey}`);
        if (targetPanel) targetPanel.classList.add("active");

        if (tabKey !== "game" && typeof window.stopHeartGame === "function") {
          window.stopHeartGame();
        }

        if (tabKey === "polaroid" && window.renderPolaroidGallery) {
          window.renderPolaroidGallery();
        }
        if (tabKey === "crystal") {
          initCrystalBall();
        }
      });
    });
  }

  // 2. KRİSTAL AŞK KÜRESİ
  const PROPHECIES = [
    "Yıldızlar bu gece beklenmedik bir öpücük saldırısına uğrayacağını fısıldıyor... ✨",
    "Galaksi, sevgilinin sımsıkı sarılacağını ve bırakmayacağını söylüyor. 🫂💫",
    "Evrenin sırları açıklanıyor: Bugün biri seni çok düşünüyor, tahmin et kim? 🥰",
    "Büyülü kristal görüyor: Yakında çok sürpriz bir 'seni seviyorum' gelecek! 💌",
    "Kozmik güçler hizalandı; bugün bir kahve molası aşkı derinleştirecek. ☕🌟",
    "Ay sana mesaj bıraktı: Bu gece battaniye altı film seans zamanı! 🍿🌙",
    "Kader yazıldı: Bir sarılma borcu var, bugün mutlaka ödenecek! 🫂💖",
    "Neptün fısıldıyor: Birlikte çiğköfte yenilmeden bu hafta kapanmayacak! 🌯✨",
    "Kristal kehanet açık: O kişi şu an seni düşünüyor ve içi ısınıyor! 🔥💕",
    "Yıldız haritası diyor ki: İki kalp aynı anda çarpıyor, senin ve onun! 💖💗",
    "Büyücü küresi gösteriyor: Yakında birlikte kahkaha atacağınız bir an geliyor! 😂💫",
    "Evrenin cevabı: Evet, o seni çok, çok, çok seviyor. Daha fazlasıyla. 🥰🌠",
    "Sihirli sis kalktı: Bu hafta en az 5 tane ekstra sarılma alacaksın! 🫂⭐",
    "Vega yıldızı müjdeliyor: Yakında 'seninle her şey güzel' anı yaşayacaksın. 🌹✨",
    "Kristal net konuşuyor: İki ruh arasındaki bağ her geçen gün daha güçleniyor. 💑🔮"
  ];

  let crystalAnimId = null;
  let crystalInitialized = false;

  function initCrystalBall() {
    const canvas = document.getElementById("crystal-canvas");
    if (!canvas || crystalInitialized) return;
    crystalInitialized = true;

    const ctx = canvas.getContext("2d");
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;

    // Mist particles
    const mists = Array.from({ length: 28 }, () => ({
      x: cx + (Math.random() - 0.5) * r * 1.2,
      y: cy + (Math.random() - 0.5) * r * 1.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: 18 + Math.random() * 28,
      opacity: 0.08 + Math.random() * 0.14,
      hue: 260 + Math.random() * 60,
      phase: Math.random() * Math.PI * 2
    }));

    // Stars inside
    const stars = Array.from({ length: 18 }, () => ({
      x: cx + (Math.random() - 0.5) * r * 1.5,
      y: cy + (Math.random() - 0.5) * r * 1.5,
      size: 1 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.04
    }));

    let time = 0;

    function drawBall() {
      ctx.clearRect(0, 0, size, size);

      // Deep space bg inside sphere (clipped circle)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
      ctx.clip();

      // BG gradient — deep indigo/purple
      const bg = ctx.createRadialGradient(cx * 0.7, cy * 0.7, 5, cx, cy, r);
      bg.addColorStop(0, "#2a005e");
      bg.addColorStop(0.45, "#12003a");
      bg.addColorStop(1, "#050010");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);

      // Mist blobs
      for (const m of mists) {
        m.x += m.vx;
        m.y += m.vy;
        m.phase += 0.012;
        const pulsedR = m.radius * (1 + 0.12 * Math.sin(m.phase));
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, pulsedR);
        const alpha = m.opacity * (0.8 + 0.2 * Math.sin(m.phase));
        grad.addColorStop(0, `hsla(${m.hue}, 90%, 70%, ${alpha})`);
        grad.addColorStop(1, `hsla(${m.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, pulsedR, 0, Math.PI * 2);
        ctx.fill();

        // bounce inside sphere
        const dist = Math.hypot(m.x - cx, m.y - cy);
        if (dist + pulsedR > r - 4) {
          const nx = (m.x - cx) / dist;
          const ny = (m.y - cy) / dist;
          m.vx -= 2 * (m.vx * nx + m.vy * ny) * nx * 0.6;
          m.vy -= 2 * (m.vx * nx + m.vy * ny) * ny * 0.6;
        }
      }

      // Stars twinkle
      for (const s of stars) {
        s.phase += s.speed;
        const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.phase));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${280 + Math.sin(s.phase) * 60}, 80%, 90%)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shimmer highlight
      const shimmer = ctx.createRadialGradient(cx * 0.6, cy * 0.45, 2, cx * 0.7, cy * 0.55, r * 0.55);
      shimmer.addColorStop(0, "rgba(255,255,255,0.18)");
      shimmer.addColorStop(0.5, "rgba(255,255,255,0.04)");
      shimmer.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, size, size);

      ctx.restore();

      // Outer glow ring
      const ringGlow = ctx.createRadialGradient(cx, cy, r - 6, cx, cy, r + 10);
      ringGlow.addColorStop(0, `rgba(162, 90, 255, ${0.3 + 0.1 * Math.sin(time)})`);
      ringGlow.addColorStop(1, "rgba(107, 53, 255, 0)");
      ctx.fillStyle = ringGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
      ctx.fill();

      // Glass rim
      ctx.strokeStyle = "rgba(200, 160, 255, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
      ctx.stroke();

      time += 0.02;
      crystalAnimId = requestAnimationFrame(drawBall);
    }

    if (crystalAnimId) cancelAnimationFrame(crystalAnimId);
    crystalAnimId = requestAnimationFrame(drawBall);
  }

  // Crystal ball click — show prophecy
  const crystalStage = document.getElementById("crystal-stage");
  const btnCrystal = document.getElementById("btn-crystal-reveal");
  const prophecyText = document.getElementById("crystal-prophecy-text");

  function showProphecy() {
    const p = PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
    if (prophecyText) {
      prophecyText.style.animation = "none";
      void prophecyText.offsetWidth;
      prophecyText.textContent = p;
      prophecyText.style.animation = "crystalFadeIn 0.6s ease";
    }
    triggerHeartsShower();
    // ripple the stage
    if (crystalStage) {
      crystalStage.style.transform = "scale(1.07)";
      setTimeout(() => { crystalStage.style.transform = ""; }, 350);
    }
  }

  if (crystalStage) crystalStage.addEventListener("click", showProphecy);
  if (btnCrystal) btnCrystal.addEventListener("click", showProphecy);

  // 2. ÇARKI FELEK
  const ACTIVITIES = [
    { emoji: "🫂💋", title: "Sımsıkı Sarılma & Öpücük Yağmuru", desc: "Bugün bol bol sarılıp birbirimize en tatlı aşk sözlerini fısıldıyoruz! 💕" },
    { emoji: "☕🫖", title: "Baş Başa Kahve & Çay Molası", desc: "Gözlerinin içine bakarak en sevdiğimiz sıcacık içeceği yudumluyoruz. ✨" },
    { emoji: "🍿🎬", title: "Romantik Film & Dizi Gecesi", desc: "Işıkları kapatıp battaniyenin altında mısır eşliğinde film izliyoruz! 🎥" },
    { emoji: "👫🌿", title: "El Ele Beraber Yürüyüş", desc: "Tertemiz havada ellerimiz hiç ayrılmadan tatlı bir yürüyüşe çıkıyoruz. 🌸" },
    { emoji: "💆‍♀️✨", title: "Özel Masaj & Şımartma Seansı", desc: "Bugün tüm yorgunluğunu unutturacak sıcacık bir ilgi ve masaj seni bekliyor. 💆‍♂️" },
    { emoji: "🌯🌶️", title: "Baş Başa Çiğköfte Ziyafeti", desc: "Acılı, limonlu ve bol kahkahalı enfes bir akşam ziyafeti çekiyoruz! 🌯" },
    { emoji: "🎙️💃", title: "İsmail YK Eşliğinde Dans", desc: "En neşeli şarkıyı son ses açıp kahkahalarla çılgınca dans ediyoruz! 🎵" },
    { emoji: "🥰💌", title: "Birbirimize 5 Yeni Sevgi Cümlesi", desc: "Göz göze gelip kalbimizden geçen en derin 5 duyguyu birbirimize söylüyoruz. 💖" }
  ];

  let selectedActivity = null;
  const btnSpin = document.getElementById("btn-spin-wheel");
  const resultCard = document.getElementById("wheel-result-card");
  const resultEmoji = document.getElementById("wheel-result-emoji");
  const resultTitle = document.getElementById("wheel-result-title");
  const resultDesc = document.getElementById("wheel-result-desc");
  const btnShareTg = document.getElementById("btn-share-activity-tg");

  if (btnSpin) {
    btnSpin.addEventListener("click", () => {
      btnSpin.disabled = true;
      if (resultCard) resultCard.classList.add("spinning");

      let count = 0;
      const spinInterval = setInterval(() => {
        const temp = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
        if (resultEmoji) resultEmoji.textContent = temp.emoji;
        if (resultTitle) resultTitle.textContent = temp.title;
        count++;
        if (count > 12) {
          clearInterval(spinInterval);
          selectedActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
          if (resultEmoji) resultEmoji.textContent = selectedActivity.emoji;
          if (resultTitle) resultTitle.textContent = selectedActivity.title;
          if (resultDesc) resultDesc.textContent = selectedActivity.desc;
          if (resultCard) resultCard.classList.remove("spinning");
          btnSpin.disabled = false;

          triggerHeartsShower();
          if (btnShareTg) btnShareTg.classList.remove("hidden");
        }
      }, 90);
    });
  }

  if (btnShareTg) {
    btnShareTg.addEventListener("click", () => {
      if (!selectedActivity) return;
      const msg = `🎲 *BUGÜNKÜ AŞK PLANIMIZ BELLİ OLDU!* 💖\n\n${selectedActivity.emoji} *${selectedActivity.title}*\n📝 "${selectedActivity.desc}"\n\nHemen hazırlan birtanem, seni çok seviyorum! 🥰✨`;
      sendTelegramNotification(msg);
      alert("💌 Harika! Seçilen plan Telegram'dan sevgiline iletildi! 💕");
    });
  }

  // 3. KALP & YILDIZ YAKALAMA OYUNU (FARE / DOKUNMATİK KEDİ SEPETLİ TOPLAYICI)
  const gameCanvas = document.getElementById("heart-game-canvas");
  const gameOverlayStart = document.getElementById("game-overlay-start");
  const btnStartGame = document.getElementById("btn-start-heart-game");
  const scoreEl = document.getElementById("game-score");
  const highScoreEl = document.getElementById("game-high-score");
  const timerEl = document.getElementById("game-timer");

  let gameScore = 0;
  let gameHighScore = parseInt(localStorage.getItem("heart_game_high_score") || "0", 10);
  if (highScoreEl) highScoreEl.textContent = gameHighScore;

  let gameActive = false;
  let gameTimeLeft = 30;
  let gameTimerInterval = null;
  let gameAnimId = null;
  let fallingItems = [];
  let floatingPopups = [];
  let gameParticles = [];

  // Kedi Sepeti Durumu
  let catX = 200;
  let targetCatX = 200;
  const catWidth = 74;
  const catBasketHeight = 22;
  let hitReaction = "normal"; // "normal", "happy", "sad", "bomb"
  let hitReactionTimer = 0;
  let screenShakeTimer = 0;

  const ITEM_TYPES = [
    { type: "heart",  sym: "💖", points:  5, popupColor: "#ff758c", weight: 45, size: 26 },
    { type: "star",   sym: "⭐", points:  8, popupColor: "#2ed573", weight: 25, size: 26 },
    { type: "broken", sym: "💔", points: -3, popupColor: "#ff4757", weight: 18, size: 24 },
    { type: "bomb",   sym: "💣", points: -5, popupColor: "#ff3838", weight: 12, size: 26 }
  ];

  const TOTAL_WEIGHT = ITEM_TYPES.reduce((a, it) => a + it.weight, 0);

  function getRandomItemType() {
    let rand = Math.random() * TOTAL_WEIGHT;
    for (const it of ITEM_TYPES) {
      if (rand < it.weight) return it;
      rand -= it.weight;
    }
    return ITEM_TYPES[0];
  }

  function startHeartGame() {
    if (!gameCanvas) return;
    gameScore = 0;
    gameTimeLeft = 30;
    gameActive = true;
    fallingItems = [];
    floatingPopups = [];
    gameParticles = [];
    hitReaction = "normal";
    screenShakeTimer = 0;

    if (scoreEl) scoreEl.textContent = "0";
    if (timerEl) timerEl.textContent = "30s";
    if (gameOverlayStart) gameOverlayStart.classList.add("hidden");

    const ctx = gameCanvas.getContext("2d");
    const rect = gameCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    gameCanvas.width = Math.floor(rect.width * dpr);
    gameCanvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const gw = rect.width;
    const gh = rect.height;
    catX = gw / 2;
    targetCatX = gw / 2;
    const catY = gh - 36;

    // Sepet gradient'ı bir kez oluştur
    const bw = catWidth;
    const bh = catBasketHeight;
    const bxBase = -bw / 2;
    const byBase = -2;

    // Parçacık renk tablosu (string yaratımını azaltmak için)
    const PARTICLE_COLORS = {
      star:   ["#ffd700", "#ffe566", "#ffec8b"],
      heart:  ["#ff4757", "#ff6b81", "#ff758c"],
      broken: ["#e84118", "#ff6348", "#c0392b"],
      bomb:   ["#636e72", "#2d3436", "#b2bec3"]
    };

    if (gameTimerInterval) clearInterval(gameTimerInterval);
    gameTimerInterval = setInterval(() => {
      gameTimeLeft--;
      if (timerEl) timerEl.textContent = `${gameTimeLeft}s`;
      if (gameTimeLeft <= 0) endHeartGame();
    }, 1000);

    function spawnItem() {
      if (!gameActive || fallingItems.length >= 10) return; // Max 10 nesne
      const it = getRandomItemType();
      const speedMult = 1 + (30 - gameTimeLeft) * 0.018;
      fallingItems.push({
        x: 35 + Math.random() * (gw - 70),
        y: -28,
        sym: it.sym,
        points: it.points,
        popupColor: it.popupColor,
        type: it.type,
        speed: (2.0 + Math.random() * 1.6) * speedMult,
        size: it.size,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.03 + Math.random() * 0.03
      });
    }

    let lastSpawn = Date.now();
    let lastFrameTime = performance.now();

    // ─── Kedi Çizici ─────────────────────────────────────────
    function drawCatCatcher(cx, cy, time) {
      ctx.save();
      ctx.translate(cx, cy);

      // Kuyruk (sallanır)
      const tailAngle = Math.sin(time * 0.005) * 0.32;
      ctx.save();
      ctx.translate(20, 8);
      ctx.rotate(tailAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(12, -8, 14, -22);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#1c1c20";
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      // Kafa
      ctx.fillStyle = "#1c1c20";
      ctx.beginPath();
      ctx.arc(0, -9, 15, 0, Math.PI * 2);
      ctx.fill();

      // Sol & Sağ Kulak (tek seferde çiz)
      ctx.fillStyle = "#1c1c20";
      ctx.beginPath();
      ctx.moveTo(-13,-13); ctx.lineTo(-17,-27); ctx.lineTo(-4,-20); ctx.closePath();
      ctx.moveTo(4,-20); ctx.lineTo(17,-27); ctx.lineTo(13,-13); ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ff758c";
      ctx.beginPath();
      ctx.moveTo(-12,-14); ctx.lineTo(-15,-23); ctx.lineTo(-5,-19); ctx.closePath();
      ctx.moveTo(5,-19); ctx.lineTo(15,-23); ctx.lineTo(12,-14); ctx.closePath();
      ctx.fill();

      // Gözler
      if (hitReaction === "bomb") {
        ctx.strokeStyle = "#ff4757"; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-8,-13); ctx.lineTo(-4,-9); ctx.lineTo(-8,-5);
        ctx.moveTo(8,-13); ctx.lineTo(4,-9); ctx.lineTo(8,-5);
        ctx.stroke();
      } else if (hitReaction === "sad") {
        ctx.fillStyle = "#2ed573";
        ctx.beginPath();
        ctx.arc(-6,-10,3,0,Math.PI);
        ctx.arc(6,-10,3,0,Math.PI);
        ctx.fill();
      } else if (hitReaction === "happy") {
        ctx.strokeStyle = "#2ed573"; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(-6,-8,4,Math.PI,0);
        ctx.arc(6,-8,4,Math.PI,0);
        ctx.stroke();
      } else {
        ctx.fillStyle = "#2ed573";
        ctx.beginPath();
        ctx.ellipse(-6,-10,3,4,0,0,Math.PI*2);
        ctx.ellipse(6,-10,3,4,0,0,Math.PI*2);
        ctx.fill();
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.ellipse(-6,-11,1.5,2.8,0,0,Math.PI*2);
        ctx.ellipse(6,-11,1.5,2.8,0,0,Math.PI*2);
        ctx.fill();
      }

      // Burun
      ctx.fillStyle = "#ff758c";
      ctx.beginPath();
      ctx.moveTo(-2,-5); ctx.lineTo(2,-5); ctx.lineTo(0,-3);
      ctx.closePath();
      ctx.fill();

      // Bıyıklar (tek path)
      ctx.strokeStyle = "#777"; ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-10,-6); ctx.lineTo(-20,-8);
      ctx.moveTo(-10,-3); ctx.lineTo(-20,-2);
      ctx.moveTo(10,-6); ctx.lineTo(20,-8);
      ctx.moveTo(10,-3); ctx.lineTo(20,-2);
      ctx.stroke();

      // Sepet (düz renk + ince stroke, gradient kaldırıldı)
      ctx.fillStyle = "#fdcb6e";
      ctx.beginPath();
      ctx.roundRect(bxBase, byBase, bw, bh, [3,3,12,12]);
      ctx.fill();
      ctx.strokeStyle = "#c0392b"; ctx.lineWidth = 1.4;
      ctx.stroke();

      // Kalp ikonu
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("💖", 0, byBase + bh / 2 + 1);

      // Patiler
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#1c1c20"; ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(-22, byBase+1, 5, 3.5, 0, 0, Math.PI*2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(22, byBase+1, 5, 3.5, 0, 0, Math.PI*2);
      ctx.fill(); ctx.stroke();

      ctx.restore();
    }

    // ─── Parçacık Ekleyici ────────────────────────────────────
    function addParticles(px, py, type, count) {
      if (gameParticles.length > 18) return; // Max 18 parçacık
      const colors = PARTICLE_COLORS[type] || ["#fff"];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1.2 + Math.random() * 2.6;
        gameParticles.push({
          x: px, y: py,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1.0,
          color: colors[i % colors.length],
          size: 2.5 + Math.random() * 2.5,
          alpha: 1.0,
          decay: 0.042 + Math.random() * 0.02
        });
      }
    }

    // ─── Ana Oyun Döngüsü ────────────────────────────────────
    function gameLoop(timestamp) {
      if (!gameActive) return;

      // 30 FPS kilidi — CPU'yu çok daha az yorar
      const delta = timestamp - lastFrameTime;
      if (delta < 30) {
        gameAnimId = requestAnimationFrame(gameLoop);
        return;
      }
      lastFrameTime = timestamp;

      // Ekran sarsıntısı
      let ox = 0, oy = 0;
      if (screenShakeTimer > 0) {
        screenShakeTimer--;
        ox = (Math.random() - 0.5) * 7;
        oy = (Math.random() - 0.5) * 5;
      }

      ctx.save();
      if (ox || oy) ctx.translate(ox, oy);

      // Ekranı temizle (emoji alpha compositing için clearRect şart)
      ctx.clearRect(0, 0, gw, gh);

      // Kedi takibi
      catX += (targetCatX - catX) * 0.36;
      catX = Math.max(catWidth / 2 + 6, Math.min(gw - catWidth / 2 - 6, catX));

      // Nesne üretimi
      const now = Date.now();
      if (now - lastSpawn > 480) {
        spawnItem();
        lastSpawn = now;
      }

      // Tepki sıfırlama
      if (hitReaction !== "normal" && now - hitReactionTimer > 380) {
        hitReaction = "normal";
      }

      // Sepet hitbox
      const basketLeft   = catX - catWidth / 2 - 4;
      const basketRight  = catX + catWidth / 2 + 4;
      const basketTop    = catY - 12;
      const basketBottom = catY + catBasketHeight + 2;

      // Düşen nesneler
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      for (let i = fallingItems.length - 1; i >= 0; i--) {
        const it = fallingItems[i];
        it.y += it.speed;
        it.wobble += it.wobbleSpeed;
        const wx = it.x + Math.sin(it.wobble) * 2;

        ctx.font = `${it.size}px sans-serif`;
        ctx.fillText(it.sym, wx, it.y);

        // Yakalama kontrolü
        if (wx >= basketLeft && wx <= basketRight && it.y >= basketTop && it.y <= basketBottom) {
          gameScore = Math.max(0, gameScore + it.points);
          if (scoreEl) scoreEl.textContent = gameScore;

          const popText = it.points > 0 ? `+${it.points}` : `${it.points}`;
          if (floatingPopups.length < 6) {
            floatingPopups.push({ x: wx, y: catY - 20, text: popText, color: it.popupColor, alpha: 1.0, vy: -1.5 });
          }

          if (it.type === "star")        { addParticles(wx, catY, "star",   5); hitReaction = "happy"; hitReactionTimer = now; }
          else if (it.type === "heart")  { addParticles(wx, catY, "heart",  4); hitReaction = "happy"; hitReactionTimer = now; }
          else if (it.type === "broken") { addParticles(wx, catY, "broken", 4); hitReaction = "sad";   hitReactionTimer = now; }
          else if (it.type === "bomb")   { addParticles(wx, catY, "bomb",   6); screenShakeTimer = 6; hitReaction = "bomb"; hitReactionTimer = now; }

          fallingItems.splice(i, 1);
          continue;
        }

        if (it.y > gh + 30) fallingItems.splice(i, 1);
      }

      // Kediyi çiz
      drawCatCatcher(catX, catY, timestamp);

      // Parçacıklar (globalAlpha değişimini minimize et)
      for (let i = gameParticles.length - 1; i >= 0; i--) {
        const p = gameParticles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.alpha -= p.decay;
        if (p.alpha <= 0) { gameParticles.splice(i, 1); continue; }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x | 0, p.y | 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Uçuşan puan yazıları (shadowBlur YOK)
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = floatingPopups.length - 1; i >= 0; i--) {
        const pop = floatingPopups[i];
        pop.y += pop.vy; pop.alpha -= 0.035;
        if (pop.alpha <= 0) { floatingPopups.splice(i, 1); continue; }
        ctx.globalAlpha = pop.alpha;
        ctx.fillStyle = pop.color;
        ctx.fillText(pop.text, pop.x, pop.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
      gameAnimId = requestAnimationFrame(gameLoop);
    }

    if (gameAnimId) cancelAnimationFrame(gameAnimId);
    gameAnimId = requestAnimationFrame(gameLoop);
  }

  function endHeartGame() {
    gameActive = false;
    if (gameTimerInterval) clearInterval(gameTimerInterval);
    if (gameAnimId) cancelAnimationFrame(gameAnimId);

    if (gameScore > gameHighScore) {
      gameHighScore = gameScore;
      localStorage.setItem("heart_game_high_score", gameHighScore);
      if (highScoreEl) highScoreEl.textContent = gameHighScore;
    }

    if (gameOverlayStart) {
      gameOverlayStart.classList.remove("hidden");
      const title = gameOverlayStart.querySelector(".game-start-title");
      const desc = gameOverlayStart.querySelector(".game-start-desc");
      if (title) title.textContent = "🎉 Oyun Bitti! Harikasın!";
      if (desc) desc.textContent = `Toplam Skorun: ${gameScore} Puan! Miyav, seninle gurur duyuyorum minik yıldızım! 🐾💖`;
    }
  }

  window.stopHeartGame = endHeartGame;

  function handlePointerMove(clientX) {
    if (!gameCanvas) return;
    const rect = gameCanvas.getBoundingClientRect();
    targetCatX = clientX - rect.left;
  }

  if (gameCanvas) {
    gameCanvas.addEventListener("mousemove", (e) => handlePointerMove(e.clientX));
    gameCanvas.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX);
      }
    }, { passive: true });
    gameCanvas.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX);
      }
    }, { passive: true });
  }

  if (btnStartGame) btnStartGame.addEventListener("click", startHeartGame);

  // 4. POLAROİD ALBÜMÜ
  initPolaroidAlbum();
}

function initPolaroidAlbum() {
  const DEFAULT_MEMORIES = [
    {
      id: "mem-1",
      title: "Gözlerinin Parıltısı ✨",
      caption: "Sana ilk baktığım o büyüleyici an... (10.08.2026) 💕",
      img: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23ffccd5'/><circle cx='200' cy='130' r='60' fill='%23ff758c'/><text x='200' y='145' font-size='60' text-anchor='middle'>💖</text><text x='200' y='230' font-size='22' font-family='sans-serif' font-weight='bold' fill='%23d63031' text-anchor='middle'>10.08.2026 ✨</text></svg>"
    },
    {
      id: "mem-2",
      title: "Sımsıkı Sarılma Anı 🫂",
      caption: "Kollarının arasında zamanın durduğu en huzurlu yer. 💖",
      img: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23ffeaa7'/><circle cx='200' cy='130' r='60' fill='%23fdcb6e'/><text x='200' y='145' font-size='60' text-anchor='middle'>🫂</text><text x='200' y='230' font-size='22' font-family='sans-serif' font-weight='bold' fill='%23e17055' text-anchor='middle'>Sımsıkı Aşk 💕</text></svg>"
    },
    {
      id: "mem-3",
      title: "Baş Başa İlk Kahvemiz ☕",
      caption: "Göz göze, sıcacık kahve kokulu en tatlı sohbetimiz. ☕",
      img: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23dff9fb'/><circle cx='200' cy='130' r='60' fill='%23c7ecee'/><text x='200' y='145' font-size='60' text-anchor='middle'>☕</text><text x='200' y='230' font-size='22' font-family='sans-serif' font-weight='bold' fill='%2322a6b3' text-anchor='middle'>Kahve & Aşk 🫖</text></svg>"
    }
  ];

  function getMemories() {
    const saved = localStorage.getItem("user_polaroid_memories");
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return DEFAULT_MEMORIES;
  }

  function saveMemories(mems) {
    localStorage.setItem("user_polaroid_memories", JSON.stringify(mems));
    renderPolaroidGallery();
  }

  window.renderPolaroidGallery = function() {
    const grid = document.getElementById("polaroid-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const mems = getMemories();
    mems.forEach(m => {
      const item = document.createElement("div");
      item.className = "polaroid-item";
      item.innerHTML = `
        <div class="polaroid-tape"></div>
        <div class="polaroid-img-wrap">
          <img src="${m.img}" alt="${m.title}">
        </div>
        <h4 class="polaroid-title">${m.title}</h4>
        <p class="polaroid-caption">${m.caption}</p>
      `;

      item.addEventListener("click", () => openLightbox(m));
      grid.appendChild(item);
    });
  };

  // Lightbox
  let currentViewingMemory = null;
  const lightboxModal = document.getElementById("lightbox-modal-overlay");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightboxBtn = document.getElementById("close-lightbox-btn");
  const btnDeleteMemory = document.getElementById("btn-delete-polaroid-item");

  function openLightbox(m) {
    currentViewingMemory = m;
    if (lightboxImg) lightboxImg.src = m.img;
    if (lightboxTitle) lightboxTitle.textContent = m.title;
    if (lightboxCaption) lightboxCaption.textContent = m.caption;
    if (lightboxModal) lightboxModal.classList.add("active");
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove("active");
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (btnDeleteMemory) {
    btnDeleteMemory.addEventListener("click", () => {
      if (!currentViewingMemory) return;
      if (confirm("Bu güzel anıyı albümden silmek istediğine emin misin?")) {
        let mems = getMemories().filter(m => m.id !== currentViewingMemory.id);
        saveMemories(mems);
        closeLightbox();
      }
    });
  }

  // Fotoğraf Ekleme Modalı
  const addModal = document.getElementById("add-photo-modal-overlay");
  const btnOpenAdd = document.getElementById("btn-open-add-photo-modal");
  const btnCloseAdd = document.getElementById("close-add-photo-modal-btn");
  const btnSavePhoto = document.getElementById("btn-save-photo");
  const fileInput = document.getElementById("photo-file-input");
  const previewBox = document.getElementById("photo-preview-box");
  const previewImg = document.getElementById("photo-preview-img");
  const titleInput = document.getElementById("photo-title-input");
  const captionInput = document.getElementById("photo-caption-input");

  let uploadedBase64 = "";

  if (btnOpenAdd) {
    btnOpenAdd.addEventListener("click", () => {
      uploadedBase64 = "";
      if (fileInput) fileInput.value = "";
      if (titleInput) titleInput.value = "";
      if (captionInput) captionInput.value = "";
      if (previewBox) previewBox.classList.add("hidden");
      if (addModal) addModal.classList.add("active");
    });
  }

  if (btnCloseAdd) {
    btnCloseAdd.addEventListener("click", () => {
      if (addModal) addModal.classList.remove("active");
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedBase64 = event.target.result;
          if (previewImg) previewImg.src = uploadedBase64;
          if (previewBox) previewBox.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnSavePhoto) {
    btnSavePhoto.addEventListener("click", () => {
      const title = (titleInput && titleInput.value.trim()) || "Tatlı Bir Anı 💕";
      const caption = (captionInput && captionInput.value.trim()) || "Seni çok seviyorum! (10.08.2026)";

      if (!uploadedBase64) {
        alert("Lütfen galerinden bir fotoğraf seç sevgilim! 📷");
        return;
      }

      const newMem = {
        id: "mem-" + Date.now(),
        title: title,
        caption: caption,
        img: uploadedBase64
      };

      const mems = getMemories();
      mems.unshift(newMem);
      saveMemories(mems);

      if (addModal) addModal.classList.remove("active");
      triggerHeartsShower();
      alert("📸 Anın başarıyla Polaroid albümüne eklendi! ✨");
    });
  }

  renderPolaroidGallery();
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
  initRelationshipTimer();
  initFunHub();

  fetchCloudStocks();
  setInterval(fetchCloudStocks, 4000);
});
