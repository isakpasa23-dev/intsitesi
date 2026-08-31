# 💖 Sonsuz Sevgi & Romantik Sipariş Sitesi

Sevgilinize veya değer verdiğiniz birine gönderebileceğiniz; tamamen ücretsiz yayınlanabilen, mobil uyumlu, tatlı ve eğlenceli bir "Sipariş Sitesi".

---

## 🌟 Özellikler

- **Saf Web Teknolojisi:** Harici sunucu veya veritabanı gerektirmez (`HTML`, `CSS`, `Vanilla JS`).
- **Göz Alıcı Romantik Tasarım:** Pembe/kırmızı pastel tonlar, süzülen kalpler, cam efekti (glassmorphism) ve tıklama kalp patlaması.
- **Sipariş Oluştur Bölümü:**
  - `Aşkölçer`
  - `Canım Cicim`
- **Gelişmiş Sepet:** Ürün ekleme, adet artırma/azaltma, silme ve dinamik toplam hesaplama.
- **Genişletilebilir İndirim ve Sürpriz Kodları:**
  - Yüzdelik indirimler (`SENICOKSEVIYORUM`, `OPUCUK`)
  - Sabit indirimler (`CANIMBENIM`)
  - Hediye ürün tanımlama ve sepete hediye atma (`KAHVE`)
  - Gizli aşk mektubu açma (`SURPRIZ`, `MEKTUP`)
  - Hatalı kodlarda sevimli uyarı mesajları
- **Aşk Makbuzu / Sipariş Fişi:** Sipariş tamamlandığında çıkan romantik fiş ve **WhatsApp ile Tek Tıkla Sevgiline Gönder** butonu.

---

## 🛠️ Nasıl Özelleştirilir?

### 1. Yeni Ürün Eklemek veya Fiyatları Değiştirmek
`script.js` dosyasının en başındaki `PRODUCTS` dizisini düzenleyebilirsiniz:

```javascript
const PRODUCTS = [
  {
    id: "askolcer",
    name: "Aşkölçer",
    price: 100,
    unit: "₺",
    badge: "Çok Satan 🔥",
    description: "Aşkınızın derecesini %100 hassasiyetle ölçen sihirli cihaz.",
    image: "assets/askolcer.svg"
  },
  // Yeni ürün eklemek için buraya ekleme yapabilirsiniz
];
```

### 2. Yeni İndirim & Sürpriz Kodları Eklemek
`script.js` dosyasındaki `discountCodes` nesnesine yeni kodlar ekleyebilirsiniz:

```javascript
const discountCodes = {
  "BENIMSIN": {
    type: "percent",
    value: 100,
    message: "🎉 %100 Aşk İndirimi uygulandı!",
    action: "heartsRain"
  }
};
```

---

## 🚀 GitHub Pages ile Tamamen ÜCRETSİZ Nasıl Yayınlanır?

Sitenizi tüm dünyaya açıp sevgilinize gönderebileceğiniz bir link elde etmek için:

### Adım 1: GitHub Hesabı ve Repo Oluşturma
1. [github.com](https://github.com) adresine gidin ve oturum açın (hesabınız yoksa ücretsiz kaydolun).
2. Sağ üstteki **`+`** simgesine tıklayıp **"New repository"** seçin.
3. Repository name kısmına örneğin `ask-butigi` veya `ask-sitesi` yazın.
4. Reponun **"Public"** seçili olduğundan emin olun ve **"Create repository"** butonuna basın.

### Adım 2: Dosyaları Yükleme
1. Açılan sayfada **"uploading an existing file"** linkine tıklayın.
2. Bu klasördeki tüm dosyaları (`index.html`, `style.css`, `script.js` ve `assets` klasörünü) sürükleyip GitHub yükleme alanına bırakın.
3. Sayfanın altındaki yeşil **"Commit changes"** butonuna tıklayın.

### Adım 3: GitHub Pages'i Aktif Etme
1. Reponuzun üst menüsündeki **"Settings"** (Ayarlar) sekmesine tıklayın.
2. Sol menüden **"Pages"** başlığını seçin.
3. **"Branch"** kısmında `None` yerine **`main`** seçin, klasör olarak `/ (root)` seçili kalsın ve **"Save"** butonuna basın.
4. 1-2 dakika sonra sayfanın yukarısında **`https://kullaniciadiniz.github.io/ask-sitesi/`** şeklinde canlı site linkiniz belirecektir!

Bu linki doğrudan sevgilinize/arkadaşınıza gönderebilirsiniz! 💕
