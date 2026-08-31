/* ==========================================================================
   SANA ÖZEL SEVGİ KÖŞESİ - JAVASCRIPT MOTORU
   Müşteri İsmi, Sipariş Notu & Dinamik Teslimat Süresi Hesaplayıcı ⏱️
   ========================================================================== */

const TELEGRAM_BOT_TOKEN = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8";
const TELEGRAM_CHAT_ID = "6497058542";

// Arka Planda Sessiz Telegram Bildirimi Gönderen Fonksiyon
async function sendTelegramNotification(messageText) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "Markdown"
      })
    });
  } catch (error) {
    console.warn("Telegram bildirimi gönderilirken hata oluştu:", error);
  }
}

// ==========================================================================
// 1. ÜRÜNLER & TAHMİNİ TESLİMAT SÜRELERİ (3 Menü)
// ==========================================================================
const PRODUCTS = [
  // 💖 1. Kategori: Aşk Menüsü
  {
    id: "askolcer",
    category: "ask",
    name: "Aşkölçer",
    price: 100,
    unit: "₺",
    deliveryMinutes: 15,
    deliveryText: "15 Dakika (Işık Hızı)",
    badge: "Çok Satan 🔥",
    description: "Aşkınızın derecesini %100 hassasiyetle ölçen sihirli aşk cihazı.",
    image: "assets/askolcer.svg"
  },
  {
    id: "canim-cicim",
    category: "ask",
    name: "Canım Cicim",
    price: 150,
    unit: "₺",
    deliveryMinutes: 30,
    deliveryText: "30 Dakika (Özel Paket)",
    badge: "Özel Paket 🎁",
    description: "İçerisinde sıcacık sarılmalar ve tatlı iltifatlar barındıran sevgi paketi.",
    image: "assets/canim-cicim.svg"
  },

  // ☕ 2. Kategori: Keyif & Kahve
  {
    id: "kahve-kacamagi",
    category: "keyif",
    name: "Baş Başa Kahve Kaçamağı",
    price: 0,
    unit: "₺",
    deliveryMinutes: 45,
    deliveryText: "45 Dakika (Taze Demleme)",
    badge: "Keyif Vakti ☕",
    description: "İstediğin zaman kullanabileceğin, en tatlı kahve ve sohbet garantili kupon.",
    image: "assets/gift-coffee.svg"
  },
  {
    id: "gece-sohbeti",
    category: "keyif",
    name: "Gece Sohbeti & Şarkı",
    price: 0,
    unit: "₺",
    deliveryMinutes: 20,
    deliveryText: "20 Dakika",
    badge: "Huzur 🌙",
    description: "Uyumadan önce dinlenecek en güzel şarkılar ve sıcacık ses kaydı.",
    image: "assets/love-letter.svg"
  },

  // 🎁 3. Kategori: Şımartma Paketi
  {
    id: "sarilma-kuponu",
    category: "simartma",
    name: "Sınırsız Sarılma Kuponu",
    price: 0,
    unit: "₺",
    deliveryMinutes: 5,
    deliveryText: "5 Dakika (Anında)",
    badge: "Sonsuz 💖",
    description: "Canın ne zaman sıkılırsa anında geçerli 100 saatlik sımsıkı sarılma hakkı.",
    image: "assets/canim-cicim.svg"
  },
  {
    id: "film-gecesi",
    category: "simartma",
    name: "Film Seçme Hakkı",
    price: 0,
    unit: "₺",
    deliveryMinutes: 60,
    deliveryText: "60 Dakika (Mısır Hazırlığı)",
    badge: "VIP Sinema 🍿",
    description: "Filmi tamamen senin seçeceğin, atıştırmalıkların hazır olduğu sinema gecesi.",
    image: "assets/askolcer.svg"
  }
];

// ==========================================================================
// 2. İNDİRİM & SÜRPRİZ KODLARI
// ==========================================================================
const discountCodes = {
  "SENICOKSEVIYORUM": {
    type: "percent",
    value: 100,
    message: "🎉 Tebrikler! Sonsuz Aşk İndirimi: Sepetteki her şey %100 BEDAVA!",
    action: "heartsRain"
  },
  "CANIMBENIM": {
    type: "fixed",
    value: 50,
    message: "💕 Tatlı bir sarılma indirimi: 50 ₺ sepete uygulandı!",
    action: "heartsRain"
  },
  "OPUCUK": {
    type: "percent",
    value: 50,
    message: "💋 %50 Kocaman Öpücük İndirimi uygulandı!",
    action: "heartsRain"
  },
  "KAHVE": {
    type: "gift",
    giftItem: {
      id: "kahve-hediye",
      category: "keyif",
      name: "☕ Baş Başa Kahve Sözü",
      price: 0,
      unit: "₺",
      deliveryMinutes: 25,
      deliveryText: "25 Dakika",
      badge: "Hediye 🎁",
      description: "Birlikte içilecek en tatlı kahve hediyesi!",
      image: "assets/gift-coffee.svg"
    },
    message: "☕ Harika! Sepetine 'Baş Başa Kahve Sözü' hediye olarak eklendi!",
    action: "addGift"
  },
  "SURPRIZ": {
    type: "special",
    message: "💌 Minik yıldızıma özel gizli bir mektup açıldı!",
    letterTitle: "Minik Yıldızıma Özel Mektup ✨",
    letterText: "Hayatıma girdiğin günden beri her günüm seninle çok daha parlak ve güzel. Bu site sadece yüzünde tatlı bir tebessüm oluşturmak için tasarlandı. Seni her şeyden çok seviyorum minik yıldızım! 🥰",
    action: "openLetter"
  },
  "MEKTUP": {
    type: "special",
    message: "💌 Gizli aşk notun açıldı!",
    letterTitle: "Günün En Güzel Haberi 💖",
    letterText: "Biliyor musun? Dünyadaki bütün siparişler toplansa, senin bir tek gülüşün kadar değerli olamaz. İyi ki varsın!",
    action: "openLetter"
  }
};

const invalidCodeMessages = [
  "Hmm, bu kod kalbimizde kayıtlı değil... Ama seni yine de çok seviyoruz! 🥰",
  "Geçersiz kod! İpucu: 'SENICOKSEVIYORUM' veya 'SURPRIZ' yazmayı dene 😉",
  "Bu kod sevgimizin büyüklüğüne yetmedi! Farklı bir kod dene 💕",
  "Aşk sistemimiz bu kodu tanıyamadı, belki 'KAHVE' veya 'OPUCUK' denemek istersin? ✨"
];

const romanticQuotes = [
  "\"Gözlerinin içine baktığım her an dünya biraz daha güzelleşiyor.\"",
  "\"Seninle geçen her saniye, hayatımın en güzel anısı olmaya aday.\"",
  "\"Dünyada milyarlarca insan var ama benim kalbim sadece minik yıldızım için atıyor. 💕\"",
  "\"Günün en tatlı anı: Seni düşündüğüm ve gülümsediğim an! ✨\"",
  "\"Sen sadece sevdiğim insan değilsin, aynı zamanda en huzurlu limanımsın. 🥰\"",
  "\"Bugün ve her gün: Seni dünden daha çok, yarından daha az seviyorum! 💖\""
];

// ==========================================================================
// 3. STATE
// ==========================================================================
let cart = [];
let appliedCoupon = null;
let currentRating = 5;
let selectedLoveChip = "Sonsuz";
let currentCategory = "ask";

// ==========================================================================
// 4. SAYFA VE GÖRÜNÜM GEÇİŞİ (Router)
// ==========================================================================
function switchView(viewName) {
  const menuView = document.getElementById("view-menu");
  const shopView = document.getElementById("view-shop");

  if (viewName === "shop") {
    if (menuView) menuView.classList.remove("active");
    if (shopView) shopView.classList.add("active");
    filterCategory("ask");
  } else {
    if (shopView) shopView.classList.remove("active");
    if (menuView) menuView.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================================
// 5. KATEGORİ VE ÜRÜNLERİ RENDER ETME
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

  grid.innerHTML = items.map(product => `
    <div class="product-card">
      <span class="product-badge">${product.badge}</span>
      
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      
      <div class="product-footer">
        <div class="product-price">
          <span class="price-tag">Fiyat • ⏳ ${product.deliveryText}</span>
          <span class="price-val">${product.price === 0 ? "Ücretsiz 💕" : product.price + " " + product.unit}</span>
        </div>
        
        <button class="btn-add-cart" data-id="${product.id}">
          <span>Sepete Ekle</span>
          <span>🛍️</span>
        </button>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
    });
  });
}

// ==========================================================================
// 6. SEPET İŞLEMLERİ
// ==========================================================================
function addToCart(productId) {
  let product = PRODUCTS.find(p => p.id === productId);
  
  if (!product && appliedCoupon && appliedCoupon.giftItem && appliedCoupon.giftItem.id === productId) {
    product = appliedCoupon.giftItem;
  }
  
  if (!product) return;

  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product: product, quantity: 1 });
  }

  triggerBadgeBump();
  updateCartUI();
  openCartDrawer();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.product.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
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
            <div class="cart-item-price">${item.product.price === 0 ? "Ücretsiz 💕" : item.product.price + " " + item.product.unit} • ⏳ ${item.product.deliveryMinutes || 15} dk</div>
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
  const summaryDiscountRow = document.getElementById("summary-discount-row");
  const summaryDiscountTitle = document.getElementById("summary-discount-title");
  const summaryDiscountAmount = document.getElementById("summary-discount-amount");
  const summaryTotal = document.getElementById("summary-total");

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let discountAmount = 0;

  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  if (summarySubtotal) summarySubtotal.textContent = `${subtotal.toLocaleString('tr-TR')} ₺`;

  if (discountAmount > 0) {
    if (summaryDiscountRow) summaryDiscountRow.style.display = "flex";
    if (summaryDiscountTitle) summaryDiscountTitle.textContent = `İndirim (${appliedCoupon.type === 'percent' ? '%' + appliedCoupon.value : 'Özel'}):`;
    if (summaryDiscountAmount) summaryDiscountAmount.textContent = `-${discountAmount.toLocaleString('tr-TR')} ₺`;
  } else {
    if (summaryDiscountRow) summaryDiscountRow.style.display = "none";
  }

  if (summaryTotal) summaryTotal.textContent = `${grandTotal.toLocaleString('tr-TR')} ₺`;
}

function triggerBadgeBump() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 400);
  }
}

// ==========================================================================
// 7. İNDİRİM & SÜRPRİZ KODLARI
// ==========================================================================
function applyCouponCode() {
  const couponInput = document.getElementById("coupon-input");
  if (!couponInput) return;

  const code = couponInput.value.trim().toUpperCase();
  
  if (!code) {
    showCouponAlert("Lütfen bir indirim veya sürpriz kodu giriniz!", "error");
    return;
  }

  const coupon = discountCodes[code];

  if (coupon) {
    appliedCoupon = { code: code, ...coupon };
    showCouponAlert(coupon.message, "success");

    if (coupon.action === "heartsRain") {
      triggerHeartsShower();
    } else if (coupon.action === "addGift" && coupon.giftItem) {
      const hasGift = cart.some(item => item.product.id === coupon.giftItem.id);
      if (!hasGift) {
        cart.push({ product: coupon.giftItem, quantity: 1 });
      }
      triggerHeartsShower();
    } else if (coupon.action === "openLetter") {
      openLetterModal(coupon.letterTitle, coupon.letterText);
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
// 8. SİPARİŞ TAMAMLAMA AKIŞI (İSİM, NOT & TESLİMAT SÜRESİ HESAPLAMA)
// ==========================================================================

// 1. Adım: Sepetteki "Siparişi Tamamla" butonuna basınca Bilgi Alma Pop-up'ını Açar
function openCheckoutInfoModal() {
  if (cart.length === 0) {
    showCouponAlert("Sepetinizde ürün bulunmuyor!", "error");
    return;
  }

  closeCartDrawer();
  const infoModal = document.getElementById("checkout-info-modal-overlay");
  if (infoModal) infoModal.classList.add("active");
  triggerHeartsShower();
}

function closeCheckoutInfoModal() {
  const infoModal = document.getElementById("checkout-info-modal-overlay");
  if (infoModal) infoModal.classList.remove("active");
}

// 2. Adım: Bilgileri onaylayınca Sipariş Fişini oluşturur ve Telegram'a bildirir
function finalizeOrder() {
  const nameInput = document.getElementById("customer-name-input");
  const noteInput = document.getElementById("customer-note-input");

  const customerName = (nameInput && nameInput.value.trim()) || "Minik Yıldızım";
  const customerNote = (noteInput && noteInput.value.trim()) || "";

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
  const receiptMaxDeliveryTime = document.getElementById("receipt-max-delivery-time");
  const receiptSubtotal = document.getElementById("receipt-subtotal");
  const receiptDiscountRow = document.getElementById("receipt-discount-row");
  const receiptDiscount = document.getElementById("receipt-discount");
  const receiptGrandTotal = document.getElementById("receipt-grand-total");

  if (receiptOrderId) receiptOrderId.textContent = orderId;
  if (receiptDate) receiptDate.textContent = today;
  if (receiptCustomerName) receiptCustomerName.textContent = `${customerName} 🥰`;

  if (customerNote) {
    if (receiptCustomerNote) receiptCustomerNote.textContent = `"${customerNote}"`;
    if (receiptNoteRow) receiptNoteRow.style.display = "block";
  } else {
    if (receiptNoteRow) receiptNoteRow.style.display = "none";
  }

  // Toplam Teslimat Süresi = En Uzun Süren Ürünün Teslimat Süresi (Math.max)
  const deliveryTimes = cart.map(item => item.product.deliveryMinutes || 15);
  const maxDeliveryMinutes = Math.max(...deliveryTimes);

  if (receiptMaxDeliveryTime) {
    receiptMaxDeliveryTime.textContent = `${maxDeliveryMinutes} Dakika`;
  }

  // Ürünlerin Fişe Basılması (Bireysel teslimat süreleriyle birlikte)
  if (receiptItemsList) {
    receiptItemsList.innerHTML = cart.map(item => `
      <div class="receipt-item-block">
        <div class="receipt-item-row">
          <span><strong>${item.product.name}</strong> (x${item.quantity})</span>
          <span>${item.product.price === 0 ? "Ücretsiz" : (item.product.price * item.quantity).toLocaleString('tr-TR') + " ₺"}</span>
        </div>
        <div class="receipt-item-delivery">⏳ Tahmini Hazırlanma: ${item.product.deliveryMinutes || 15} Dakika</div>
      </div>
    `).join("");
  }

  // Fiyat Hesaplama
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let discountAmount = 0;

  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percent") {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === "fixed") {
      discountAmount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  if (receiptSubtotal) receiptSubtotal.textContent = `${subtotal.toLocaleString('tr-TR')} ₺`;

  if (discountAmount > 0) {
    if (receiptDiscountRow) receiptDiscountRow.style.display = "flex";
    if (receiptDiscount) receiptDiscount.textContent = `-${discountAmount.toLocaleString('tr-TR')} ₺`;
  } else {
    if (receiptDiscountRow) receiptDiscountRow.style.display = "none";
  }

  if (receiptGrandTotal) receiptGrandTotal.textContent = `${grandTotal.toLocaleString('tr-TR')} ₺ (Sonsuz Sevgi)`;

  // ================= TELEGRAM'A SESSİZ BİLDİRİM GÖNDERME 🤖 =================
  let telegramOrderMsg = `🛍️ *YENİ AŞK SİPARİŞİ GELDİ!* 🛍️\n\n`;
  telegramOrderMsg += `📋 *Sipariş No:* \`${orderId}\`\n`;
  telegramOrderMsg += `📅 *Tarih:* ${today}\n`;
  telegramOrderMsg += `👤 *Müşteri Adı:* ${customerName}\n`;
  if (customerNote) {
    telegramOrderMsg += `📝 *Sipariş Notu:* "${customerNote}"\n`;
  }
  telegramOrderMsg += `\n📦 *Sipariş Edilen Ürünler:*\n`;
  
  cart.forEach(item => {
    telegramOrderMsg += `• ${item.product.name} (x${item.quantity}) - Süre: ${item.product.deliveryMinutes || 15} dk\n`;
  });

  if (appliedCoupon) {
    telegramOrderMsg += `\n🏷️ *Kullanılan İndirim Kodu:* ${appliedCoupon.code}`;
  }

  telegramOrderMsg += `\n\n⏳ *TOPLAM TESLİMAT SÜRESİ:* ${maxDeliveryMinutes} Dakika (En uzun ürüne göre)\n`;
  telegramOrderMsg += `💰 *Ödenecek Tutar:* 0 ₺ (Ömür Boyu Aşk)\n\n`;
  telegramOrderMsg += `💌 _"Sipariş başarıyla tamamlandı, teslimat hazırlanıyor!"_`;

  sendTelegramNotification(telegramOrderMsg);

  openReceiptModal();
  triggerHeartsShower();
}

// ==========================================================================
// 9. POP-UP MODAL AÇMA & KAPATMA İŞLEMLERİ
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
    const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    textEl.textContent = quote;
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
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (overlay) overlay.classList.remove("active");
  if (drawer) drawer.classList.remove("active");
  document.body.style.overflow = "";
}

function openReceiptModal() {
  const modal = document.getElementById("receipt-modal-overlay");
  if (modal) modal.classList.add("active");
}

function closeReceiptModal() {
  const modal = document.getElementById("receipt-modal-overlay");
  if (modal) modal.classList.remove("active");
}

function resetOrder() {
  cart = [];
  appliedCoupon = null;
  const input = document.getElementById("coupon-input");
  const alertBox = document.getElementById("coupon-alert");
  if (input) input.value = "";
  if (alertBox) alertBox.style.display = "none";
  updateCartUI();
  closeReceiptModal();
}

// ==========================================================================
// 10. ANİMASYONLAR
// ==========================================================================
function startBackgroundHearts() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "✨", "🌸", "⭐"];

  setInterval(() => {
    if (document.hidden) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart-bg";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${6 + Math.random() * 8}s`;
    heart.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 14000);
  }, 1200);
}

function triggerHeartsShower() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "✨", "⭐", "🥰", "🎉"];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart-bg";
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 4}s`;
      heart.style.fontSize = `${1.2 + Math.random() * 1.5}rem`;
      heart.style.zIndex = "3000";

      container.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }, i * 70);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.closest("input") || e.target.closest("a") || e.target.closest("textarea")) return;

  const heart = document.createElement("div");
  heart.className = "click-heart";
  
  const symbols = ["💖", "💕", "✨", "⭐", "🌸"];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
});

// ==========================================================================
// 11. TÜM EVENT LISTENERS BAĞLANTILARI
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
    couponHintBtn.addEventListener("click", () => {
      alert("💡 Deneyebileceğin bazı sihirli kodlar:\n\n• SENICOKSEVIYORUM (%100 Bedava)\n• KAHVE (Sürpriz Kahve Hediyesi)\n• SURPRIZ (Gizli Aşk Mektubu)\n• OPUCUK (%50 Öpücük İndirimi)\n• CANIMBENIM (50 ₺ Sarılma İndirimi)");
    });
  }

  // Sepetteki "Siparişi Tamamla" butonuna basınca Bilgi Alma Modalını Açar
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", openCheckoutInfoModal);

  // Bilgi Alma Modalı Eventleri
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

  // Değerlendirme Modalı ve Sessiz Telegram Gönderimi
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
      reviewMsg += `⭐ *Puan:* ${currentRating}/5 (${ratingDescriptions[currentRating]})\n`;
      reviewMsg += `🥰 *Sevgi Seviyesi:* ${selectedLoveChip}\n`;
      reviewMsg += `💌 *Yazdığı Not:* "${note}"\n`;
      reviewMsg += `📅 *Tarih:* ${today}\n\n`;
      reviewMsg += `✨ _"Minik yıldızından kalpten gelen bir değerlendirme!"_`;

      sendTelegramNotification(reviewMsg);

      alert(`🎉 Teşekkürler minik yıldızım!\n\nDeğerlendirmen kalbimize ulaştı. Seni her şeyden çok seviyorum! 🥰`);
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
      const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
      textEl.textContent = quote;
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
  const receiptModalOverlay = document.getElementById("receipt-modal-overlay");

  if (closeReceiptBtn) closeReceiptBtn.addEventListener("click", closeReceiptModal);
  if (newOrderBtn) newOrderBtn.addEventListener("click", resetOrder);
  if (receiptModalOverlay) {
    receiptModalOverlay.addEventListener("click", (e) => {
      if (e.target === receiptModalOverlay) closeReceiptModal();
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
    }
  });
}

// ==========================================================================
// 12. BAŞLAT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupAllEvents();
  startBackgroundHearts();
  updateCartUI();
});
