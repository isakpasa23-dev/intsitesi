/* ==========================================================================
   SANA ÖZEL SEVGİ KÖŞESİ - JAVASCRIPT MOTORU
   Tek Ekran Uyumlu, Pop-up Destekli & Modüler Yapı
   ========================================================================== */

// ==========================================================================
// 1. ÜRÜN & KATEGORİ TANIMLARI (3 Farklı Menü)
// ==========================================================================
const PRODUCTS = [
  // 💖 1. Kategori: Aşk Menüsü
  {
    id: "askolcer",
    category: "ask",
    name: "Aşkölçer",
    price: 100,
    unit: "₺",
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
// 4. DOM ELEMENTLERİ
// ==========================================================================
const productsGrid = document.getElementById("products-grid");
const categoryTabs = document.getElementById("category-tabs");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartOverlay = document.getElementById("cart-overlay");
const cartDrawer = document.getElementById("cart-drawer");
const cartBadge = document.getElementById("cart-badge");
const cartCountText = document.getElementById("cart-count-text");
const cartItemsList = document.getElementById("cart-items-list");
const emptyCartState = document.getElementById("empty-cart-state");
const emptyShopBtn = document.getElementById("empty-shop-btn");

const couponInput = document.getElementById("coupon-input");
const applyCouponBtn = document.getElementById("apply-coupon-btn");
const couponAlert = document.getElementById("coupon-alert");
const couponHintBtn = document.getElementById("coupon-hint-btn");

const summarySubtotal = document.getElementById("summary-subtotal");
const summaryDiscountRow = document.getElementById("summary-discount-row");
const summaryDiscountTitle = document.getElementById("summary-discount-title");
const summaryDiscountAmount = document.getElementById("summary-discount-amount");
const summaryTotal = document.getElementById("summary-total");
const checkoutBtn = document.getElementById("checkout-btn");

// Modallar
const reviewModalOverlay = document.getElementById("review-modal-overlay");
const closeReviewModalBtn = document.getElementById("close-review-modal-btn");
const starRating = document.getElementById("star-rating");
const ratingText = document.getElementById("rating-text");
const loveChips = document.getElementById("love-chips");
const reviewNote = document.getElementById("review-note");
const submitReviewBtn = document.getElementById("submit-review-btn");

const letterModalOverlay = document.getElementById("letter-modal-overlay");
const closeLetterBtn = document.getElementById("close-letter-btn");
const letterConfirmBtn = document.getElementById("letter-confirm-btn");
const letterTitle = document.getElementById("letter-title");
const letterContent = document.getElementById("letter-content");

const quoteModalOverlay = document.getElementById("quote-modal-overlay");
const closeQuoteBtn = document.getElementById("close-quote-btn");
const quoteModalText = document.getElementById("quote-modal-text");
const newQuoteBtn = document.getElementById("new-quote-btn");

const receiptModalOverlay = document.getElementById("receipt-modal-overlay");
const closeReceiptBtn = document.getElementById("close-receipt-btn");
const newOrderBtn = document.getElementById("new-order-btn");
const receiptOrderId = document.getElementById("receipt-order-id");
const receiptDate = document.getElementById("receipt-date");
const receiptItemsList = document.getElementById("receipt-items-list");
const receiptSubtotal = document.getElementById("receipt-subtotal");
const receiptDiscountRow = document.getElementById("receipt-discount-row");
const receiptDiscount = document.getElementById("receipt-discount");
const receiptGrandTotal = document.getElementById("receipt-grand-total");
const whatsappShareBtn = document.getElementById("whatsapp-share-btn");

// ==========================================================================
// 5. SAYFA GEÇİŞİ (Router)
// ==========================================================================
window.switchView = function(viewName) {
  const views = {
    'menu': document.getElementById('view-menu'),
    'shop': document.getElementById('view-shop')
  };

  Object.values(views).forEach(v => {
    if (v) v.classList.remove('active');
  });

  if (views[viewName]) {
    views[viewName].classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ==========================================================================
// 6. KATEGORİ FİLTRELEME & ÜRÜNLERİ RENDER ETME
// ==========================================================================
window.filterCategory = function(catName) {
  currentCategory = catName;

  // Sekme butonlarını güncelle
  if (categoryTabs) {
    const tabs = categoryTabs.querySelectorAll(".tab-btn");
    tabs.forEach(t => t.classList.remove("active"));
    const activeBtn = Array.from(tabs).find(t => t.getAttribute("onclick").includes(`'${catName}'`));
    if (activeBtn) activeBtn.classList.add("active");
  }

  renderProducts();
};

function renderProducts() {
  if (!productsGrid) return;
  
  const filtered = PRODUCTS.filter(p => p.category === currentCategory);

  productsGrid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <span class="product-badge">${product.badge}</span>
      
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      
      <div class="product-footer">
        <div class="product-price">
          <span class="price-tag">Fiyat</span>
          <span class="price-val">${product.price === 0 ? "Ücretsiz 💕" : product.price + " " + product.unit}</span>
        </div>
        
        <button class="btn-add-cart" onclick="addToCart('${product.id}')">
          <span>Sepete Ekle</span>
          <span>🛍️</span>
        </button>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// 7. SEPET İŞLEMLERİ
// ==========================================================================
window.addToCart = function(productId) {
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
};

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
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  cartBadge.textContent = totalItemCount;
  cartCountText.textContent = `${totalItemCount} ürün`;

  if (cart.length === 0) {
    emptyCartState.style.display = "flex";
    cartItemsList.style.display = "none";
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    checkoutBtn.style.cursor = "not-allowed";
  } else {
    emptyCartState.style.display = "none";
    cartItemsList.style.display = "flex";
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      
      <div class="cart-item-info">
        <div class="cart-item-title">${item.product.name}</div>
        <div class="cart-item-price">${item.product.price === 0 ? "Ücretsiz 💕" : item.product.price + " " + item.product.unit}</div>
      </div>

      <div class="cart-item-actions">
        <div class="qty-control">
          <button class="btn-qty" onclick="updateQuantity('${item.product.id}', -1)" aria-label="Azalt">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="btn-qty" onclick="updateQuantity('${item.product.id}', 1)" aria-label="Artır">+</button>
        </div>
        
        <button class="btn-remove-item" onclick="removeFromCart('${item.product.id}')" title="Ürünü Kaldır">
          🗑️
        </button>
      </div>
    </div>
  `).join("");

  calculateAndRenderTotals();
}

function calculateAndRenderTotals() {
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

  summarySubtotal.textContent = `${subtotal.toLocaleString('tr-TR')} ₺`;

  if (discountAmount > 0) {
    summaryDiscountRow.style.display = "flex";
    summaryDiscountTitle.textContent = `İndirim (${appliedCoupon.type === 'percent' ? '%' + appliedCoupon.value : 'Özel'}):`;
    summaryDiscountAmount.textContent = `-${discountAmount.toLocaleString('tr-TR')} ₺`;
  } else {
    summaryDiscountRow.style.display = "none";
  }

  summaryTotal.textContent = `${grandTotal.toLocaleString('tr-TR')} ₺`;
}

function triggerBadgeBump() {
  cartBadge.classList.add("bump");
  setTimeout(() => {
    cartBadge.classList.remove("bump");
  }, 400);
}

// ==========================================================================
// 8. İNDİRİM & SÜRPRİZ KODLARI
// ==========================================================================
function applyCouponCode() {
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
  couponAlert.textContent = message;
  couponAlert.className = `coupon-alert ${type}`;
  couponAlert.style.display = "block";
}

// ==========================================================================
// 9. SİPARİŞ TAMAMLAMA & FİŞ (RECEIPT)
// ==========================================================================
function processCheckout() {
  if (cart.length === 0) {
    showCouponAlert("Sepetinizde ürün bulunmuyor!", "error");
    return;
  }

  const orderId = `ASK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  receiptOrderId.textContent = orderId;
  receiptDate.textContent = today;

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

  receiptItemsList.innerHTML = cart.map(item => `
    <div class="receipt-item-row">
      <span>${item.product.name} (x${item.quantity})</span>
      <span>${item.product.price === 0 ? "Ücretsiz" : (item.product.price * item.quantity).toLocaleString('tr-TR') + " ₺"}</span>
    </div>
  `).join("");

  receiptSubtotal.textContent = `${subtotal.toLocaleString('tr-TR')} ₺`;

  if (discountAmount > 0) {
    receiptDiscountRow.style.display = "flex";
    receiptDiscount.textContent = `-${discountAmount.toLocaleString('tr-TR')} ₺`;
  } else {
    receiptDiscountRow.style.display = "none";
  }

  receiptGrandTotal.textContent = `${grandTotal.toLocaleString('tr-TR')} ₺ (Sonsuz Sevgi)`;

  let orderSummaryText = `💖 *YENİ AŞK SİPARİŞİ!* 💖\n`;
  orderSummaryText += `📋 *Sipariş No:* ${orderId}\n`;
  orderSummaryText += `📅 *Tarih:* ${today}\n\n`;
  orderSummaryText += `🛍️ *Sipariş Detayları:*\n`;
  
  cart.forEach(item => {
    orderSummaryText += `• ${item.product.name} x${item.quantity}\n`;
  });

  if (appliedCoupon) {
    orderSummaryText += `\n🏷️ *Kullanılan Kod:* ${appliedCoupon.code}`;
  }

  orderSummaryText += `\n💰 *Ödenecek Tutar:* 0 ₺ (Ömür Boyu Aşk ve Sarılma)\n\n`;
  orderSummaryText += `💌 _"Minik yıldızın siparişi kalpten verildi, teslimatı sabırsızlıkla bekliyorum!"_`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(orderSummaryText)}`;
  whatsappShareBtn.href = waUrl;

  closeCartDrawer();
  openReceiptModal();
  triggerHeartsShower();
}

// ==========================================================================
// 10. POP-UP MODAL AÇMA / KAPATMA İŞLEMLERİ
// ==========================================================================
window.openReviewModal = function() {
  if (reviewModalOverlay) reviewModalOverlay.classList.add("active");
  triggerHeartsShower();
};

window.closeReviewModal = function() {
  if (reviewModalOverlay) reviewModalOverlay.classList.remove("active");
};

window.openDailyQuoteModal = function() {
  getRandomQuote();
  if (quoteModalOverlay) quoteModalOverlay.classList.add("active");
  triggerHeartsShower();
};

function getRandomQuote() {
  const quote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
  quoteModalText.textContent = quote;
}

function openLetterModal(title, content) {
  letterTitle.textContent = title;
  letterContent.textContent = content;
  letterModalOverlay.classList.add("active");
}

function closeLetterModal() {
  letterModalOverlay.classList.remove("active");
}

function openCartDrawer() {
  cartOverlay.classList.add("active");
  cartDrawer.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  cartOverlay.classList.remove("active");
  cartDrawer.classList.remove("active");
  document.body.style.overflow = "";
}

function openReceiptModal() {
  receiptModalOverlay.classList.add("active");
}

function closeReceiptModal() {
  receiptModalOverlay.classList.remove("active");
}

function resetOrder() {
  cart = [];
  appliedCoupon = null;
  couponInput.value = "";
  couponAlert.style.display = "none";
  updateCartUI();
  closeReceiptModal();
}

// ==========================================================================
// 11. DEĞERLENDİRME ANKETİ
// ==========================================================================
function setupReviewSection() {
  if (!starRating) return;

  const ratingDescriptions = {
    1: "Biraz İlgiye İhtiyacımız Var 🥺",
    2: "Daha Çok Sarılmalı! 💕",
    3: "Çok Tatlı & Sevgi Dolu 🥰",
    4: "Harika Bir Aşk Hizmeti! 💖",
    5: "Sonsuz Yıldız / Mükemmel Ötesi! 🌟"
  };

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
      ratingText.textContent = ratingDescriptions[currentRating];
      triggerHeartsShower();
    });
  });

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
      const note = reviewNote.value.trim() || "Çok güzelsin ve seni çok seviyorum!";
      triggerHeartsShower();
      closeReviewModal();

      alert(`🎉 Harika! Değerlendirmen kalbimize ulaştı minik yıldızım:\n\n⭐ Puanın: ${currentRating}/5\n💖 Sevgi Seviyen: ${selectedLoveChip}\n💌 Notun: "${note}"\n\nBu değerlendirme ömür boyu saklanacaktır! 🥰`);
      reviewNote.value = "";
    });
  }
}

// ==========================================================================
// 12. ANİMASYONLAR (Uçuşan Kalpler & Tıklama)
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
// 13. EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  openCartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);
  
  if (emptyShopBtn) {
    emptyShopBtn.addEventListener("click", () => {
      closeCartDrawer();
      switchView('shop');
    });
  }

  applyCouponBtn.addEventListener("click", applyCouponCode);
  couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyCouponCode();
    }
  });

  couponHintBtn.addEventListener("click", () => {
    alert("💡 Deneyebileceğin bazı sihirli kodlar:\n\n• SENICOKSEVIYORUM (%100 Bedava)\n• KAHVE (Sürpriz Kahve Hediyesi)\n• SURPRIZ (Gizli Aşk Mektubu)\n• OPUCUK (%50 Öpücük İndirimi)\n• CANIMBENIM (50 ₺ Sarılma İndirimi)");
  });

  checkoutBtn.addEventListener("click", processCheckout);

  // Modalları Kapat
  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener("click", closeReviewModal);
  if (reviewModalOverlay) {
    reviewModalOverlay.addEventListener("click", (e) => {
      if (e.target === reviewModalOverlay) closeReviewModal();
    });
  }

  closeLetterBtn.addEventListener("click", closeLetterModal);
  letterConfirmBtn.addEventListener("click", closeLetterModal);
  letterModalOverlay.addEventListener("click", (e) => {
    if (e.target === letterModalOverlay) closeLetterModal();
  });

  if (closeQuoteBtn) closeQuoteBtn.addEventListener("click", () => quoteModalOverlay.classList.remove("active"));
  if (newQuoteBtn) newQuoteBtn.addEventListener("click", getRandomQuote);
  if (quoteModalOverlay) {
    quoteModalOverlay.addEventListener("click", (e) => {
      if (e.target === quoteModalOverlay) quoteModalOverlay.classList.remove("active");
    });
  }

  closeReceiptBtn.addEventListener("click", closeReceiptModal);
  newOrderBtn.addEventListener("click", resetOrder);
  receiptModalOverlay.addEventListener("click", (e) => {
    if (e.target === receiptModalOverlay) closeReceiptModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeLetterModal();
      closeReceiptModal();
      closeReviewModal();
      if (quoteModalOverlay) quoteModalOverlay.classList.remove("active");
    }
  });
}

// Başlat
function initApp() {
  renderProducts();
  setupEventListeners();
  setupReviewSection();
  startBackgroundHearts();
  updateCartUI();
}

document.addEventListener("DOMContentLoaded", initApp);
