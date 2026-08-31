/* ==========================================================================
   ROMANTİK SİPARİŞ SİTESİ - JAVASCRIPT MOTORU
   Vanilla JS, Saf & Bağımsız Kod Yapısı
   ========================================================================== */

// ==========================================================================
// 1. ÜRÜN TANIMLARI (Buradan kolayca yeni ürün ekleyip değiştirebilirsiniz)
// ==========================================================================
const PRODUCTS = [
  {
    id: "askolcer",
    name: "Aşkölçer",
    price: 100,
    unit: "₺",
    badge: "Çok Satan 🔥",
    description: "Aşkınızın derecesini %100 hassasiyetle ölçen, her baktığında seni hatırlatacak eğlenceli ve sihirli aşk cihazı.",
    image: "assets/askolcer.svg"
  },
  {
    id: "canim-cicim",
    name: "Canım Cicim",
    price: 150,
    unit: "₺",
    badge: "Özel Paket 🎁",
    description: "İçerisinde sıcacık sarılmalar, tatlı iltifatlar ve sonsuz huzur barındıran en tatlı sevgi ve mutluluk paketi.",
    image: "assets/canim-cicim.svg"
  }
];

// ==========================================================================
// 2. İNDİRİM & SÜRPRİZ KODLARI
// (Buradan kolayca yeni gizli kodlar, indirimler veya sürprizler tanımlayabilirsiniz)
// ==========================================================================
const discountCodes = {
  "SENICOKSEVIYORUM": {
    type: "percent",
    value: 100, // %100 İndirim
    message: "🎉 Tebrikler! Sonsuz Aşk İndirimi: Sepetteki her şey %100 BEDAVA!",
    action: "heartsRain"
  },
  "CANIMBENIM": {
    type: "fixed",
    value: 50, // 50 TL İndirim
    message: "💕 Tatlı bir sarılma indirimi: 50 ₺ sepete uygulandı!",
    action: "heartsRain"
  },
  "OPUCUK": {
    type: "percent",
    value: 50, // %50 İndirim
    message: "💋 %50 Kocaman Öpücük İndirimi uygulandı!",
    action: "heartsRain"
  },
  "KAHVE": {
    type: "gift",
    giftItem: {
      id: "kahve-hediye",
      name: "☕ Baş Başa Kahve Sözü",
      price: 0,
      unit: "₺",
      badge: "Hediye 🎁",
      description: "Birlikte içilecek en tatlı kahve ve sohbet hediyesi!",
      image: "assets/gift-coffee.svg"
    },
    message: "☕ Harika! Sepetine 'Baş Başa Kahve Sözü' hediye olarak eklendi!",
    action: "addGift"
  },
  "SURPRIZ": {
    type: "special",
    message: "💌 Sana özel gizli bir mektup açıldı!",
    letterTitle: "Canımın İçi İçin Özel Mektup ✨",
    letterText: "Hayatıma girdiğin günden beri her günüm seninle çok daha güzel ve anlamlı. Bu site sadece yüzünde küçük bir tebessüm oluşturmak içindi ama sevgim sonsuz ve çok gerçek! Seni her şeyden çok seviyorum. 🥰",
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

// Eğlenceli Hatalı Kod Mesajları Listesi
const invalidCodeMessages = [
  "Hmm, bu kod kalbimizde kayıtlı değil... Ama seni yine de çok seviyoruz! 🥰",
  "Geçersiz kod! İpucu: 'SENICOKSEVIYORUM' veya 'SURPRIZ' yazmayı dene 😉",
  "Bu kod sevgimizin büyüklüğüne yetmedi! Farklı bir kod dene 💕",
  "Aşk sistemimiz bu kodu tanıyamadı, belki 'KAHVE' veya 'OPUCUK' denemek istersin? ✨"
];

// ==========================================================================
// 3. SEPET VE UYGULAMA DURUMU (State)
// ==========================================================================
let cart = [];
let appliedCoupon = null;

// ==========================================================================
// 4. DOM ELEMENTLERİ
// ==========================================================================
const productsGrid = document.getElementById("products-grid");
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
const letterModalOverlay = document.getElementById("letter-modal-overlay");
const closeLetterBtn = document.getElementById("close-letter-btn");
const letterConfirmBtn = document.getElementById("letter-confirm-btn");
const letterTitle = document.getElementById("letter-title");
const letterContent = document.getElementById("letter-content");

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
// 5. BAŞLANGIÇ & ÜRÜNLERİ RENDER ETME
// ==========================================================================
function initApp() {
  renderProducts();
  setupEventListeners();
  startBackgroundHearts();
  updateCartUI();
}

// Ürün Kartlarını Ekrana Bas
function renderProducts() {
  if (!productsGrid) return;
  
  productsGrid.innerHTML = PRODUCTS.map(product => `
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
          <span class="price-val">${product.price} ${product.unit}</span>
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
// 6. SEPET İŞLEMLERİ (Ekle, Sil, Miktar Güncelle, Hesapla)
// ==========================================================================
window.addToCart = function(productId) {
  // Ürünü bul
  let product = PRODUCTS.find(p => p.id === productId);
  
  // Eğer ürün ana listede yoksa, hediye ürünlerden biri olabilir
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

  // Rozet animasyonu
  triggerBadgeBump();
  updateCartUI();
  
  // Küçük bildirim veya sepeti açma opsiyonu
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

// Sepet Arayüzünü Güncelle
function updateCartUI() {
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Rozet ve sayaçlar
  cartBadge.textContent = totalItemCount;
  cartCountText.textContent = `${totalItemCount} ürün`;

  // Boşluk durumu kontrolü
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

  // Sepet Listesini Bas
  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      
      <div class="cart-item-info">
        <div class="cart-item-title">${item.product.name}</div>
        <div class="cart-item-price">${item.product.price} ${item.product.unit}</div>
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

  // Fiyat Hesaplamaları
  calculateAndRenderTotals();
}

// Toplam Fiyat & İndirim Hesaplama
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

// Rozet Animasyonu
function triggerBadgeBump() {
  cartBadge.classList.add("bump");
  setTimeout(() => {
    cartBadge.classList.remove("bump");
  }, 400);
}

// ==========================================================================
// 7. İNDİRİM & SÜRPRİZ KODU MOTORU
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

    // Özel Aksiyonları Tetikle
    if (coupon.action === "heartsRain") {
      triggerHeartsShower();
    } else if (coupon.action === "addGift" && coupon.giftItem) {
      // Hediye ürünü sepete ekle
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
    // Rastgele eğlenceli hata mesajı
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
// 8. SİPARİŞ TAMAMLAMA & FİŞ (RECEIPT) OLUŞTURMA
// ==========================================================================
function processCheckout() {
  if (cart.length === 0) {
    showCouponAlert("Sepetinizde ürün bulunmuyor!", "error");
    return;
  }

  // Rastgele tatlı sipariş kodu oluştur
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

  // Fiş ürünlerini listele
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
      <span>${(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
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

  // WhatsApp Mesaj Linki Oluştur
  let orderSummaryText = `💖 *YENİ AŞK SİPARİŞİ!* 💖\n`;
  orderSummaryText += `📋 *Sipariş No:* ${orderId}\n`;
  orderSummaryText += `📅 *Tarih:* ${today}\n\n`;
  orderSummaryText += `🛍️ *Sipariş Detayları:*\n`;
  
  cart.forEach(item => {
    orderSummaryText += `• ${item.product.name} x${item.quantity} - ${(item.product.price * item.quantity)} ₺\n`;
  });

  if (appliedCoupon) {
    orderSummaryText += `\n🏷️ *Kullanılan Kod:* ${appliedCoupon.code}`;
  }

  orderSummaryText += `\n💰 *Ödenecek Tutar:* 0 ₺ (Ömür Boyu Aşk ve Sarılma)\n\n`;
  orderSummaryText += `💌 _"Siparişim kalpten verildi, teslimatını sabırsızlıkla bekliyorum!"_`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(orderSummaryText)}`;
  whatsappShareBtn.href = waUrl;

  // Çekmeceyi kapat ve fiş modalını aç
  closeCartDrawer();
  openReceiptModal();
  triggerHeartsShower();
}

// ==========================================================================
// 9. MODAL & ÇEKMECE KONTROLLERİ
// ==========================================================================
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

function openLetterModal(title, content) {
  letterTitle.textContent = title;
  letterContent.textContent = content;
  letterModalOverlay.classList.add("active");
}

function closeLetterModal() {
  letterModalOverlay.classList.remove("active");
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
// 10. ANİMASYONLAR: UÇUŞAN KALPLER & TIKLAMA EFEKTLERİ
// ==========================================================================
function startBackgroundHearts() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "💗", "💓", "🌸", "✨"];

  setInterval(() => {
    if (document.hidden) return; // Sekme aktif değilken yormasın

    const heart = document.createElement("span");
    heart.className = "floating-heart-bg";
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${6 + Math.random() * 8}s`;
    heart.style.fontSize = `${0.9 + Math.random() * 1.2}rem`;

    container.appendChild(heart);

    // Animasyon bitince temizle
    setTimeout(() => {
      heart.remove();
    }, 14000);
  }, 1200);
}

// Kalp Yağmuru / Kutlama Efekti
function triggerHeartsShower() {
  const container = document.getElementById("heart-bg-container");
  if (!container) return;

  const heartSymbols = ["💖", "💕", "💋", "❤️", "🥰", "✨", "🎉"];
  
  for (let i = 0; i < 35; i++) {
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

// Ekrana Tıklayınca Çıkan Kalp Efekti
document.addEventListener("click", (e) => {
  // Buton ve modal kontrolleri dışındaysa
  if (e.target.closest("button") || e.target.closest("input") || e.target.closest("a")) return;

  const heart = document.createElement("div");
  heart.className = "click-heart";
  
  const symbols = ["💖", "💕", "✨", "🌸", "💓"];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
});

// ==========================================================================
// 11. EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Sepet Çekmecesi Aç / Kapat
  openCartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);
  
  if (emptyShopBtn) {
    emptyShopBtn.addEventListener("click", () => {
      closeCartDrawer();
      const siparisSection = document.getElementById("siparis");
      if (siparisSection) siparisSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // İndirim Kodu Butonları & Enter Tuşu
  applyCouponBtn.addEventListener("click", applyCouponCode);
  couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyCouponCode();
    }
  });

  // İpucu Butonu
  couponHintBtn.addEventListener("click", () => {
    alert("💡 Deneyebileceğin bazı sihirli kodlar:\n\n• SENICOKSEVIYORUM (%100 Bedava)\n• KAHVE (Sürpriz Kahve Hediyesi)\n• SURPRIZ (Gizli Aşk Mektubu)\n• OPUCUK (%50 Öpücük İndirimi)\n• CANIMBENIM (50 ₺ Sarılma İndirimi)");
  });

  // Siparişi Tamamla
  checkoutBtn.addEventListener("click", processCheckout);

  // Modalları Kapat
  closeLetterBtn.addEventListener("click", closeLetterModal);
  letterConfirmBtn.addEventListener("click", closeLetterModal);
  letterModalOverlay.addEventListener("click", (e) => {
    if (e.target === letterModalOverlay) closeLetterModal();
  });

  closeReceiptBtn.addEventListener("click", closeReceiptModal);
  newOrderBtn.addEventListener("click", resetOrder);
  receiptModalOverlay.addEventListener("click", (e) => {
    if (e.target === receiptModalOverlay) closeReceiptModal();
  });

  // ESC tuşu ile açık modalları kapat
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeLetterModal();
      closeReceiptModal();
    }
  });
}

// Uygulamayı Başlat
document.addEventListener("DOMContentLoaded", initApp);
