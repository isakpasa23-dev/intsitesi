# 📝 Güncelleme Yamaları & Sürüm Geçmişi (Changelog)

Bu dosyada siteye yapılan tüm güncellemeler, yeni özellikler ve yama notları kronolojik olarak saklanır.

---

### [v1.4.0] - 31.08.2026 (Sipariş Bilgi Formu & Dinamik Teslimat Süresi Hesaplayıcı) ⏱️📦
- **İki Adımlı Zarif Sipariş Akışı:**
  - Sepetteki *"Siparişi Tamamla"* butonuna tıklandığında ekranın ortasında **Sipariş Bilgileri Pop-up'ı** açılır.
  - Müşteri kendi adını/hitap şeklini (`Örn: Minik Yıldızım`) ve isterse özel sipariş notunu (`Örn: Yanında kahve ve sarılma olsun`) girer.
- **Dinamik Teslimat Süreleri:**
  - Her ürün için tahmini hazırlanma/teslimat süresi tanımlandı (Örn: Aşkölçer: 15 dk, Canım Cicim: 30 dk, Kahve: 45 dk vb.).
  - Fişin altında **Toplam Teslimat Süresi = Sepetteki en uzun süren ürünün süresi** (`Math.max`) kuralıyla otomatik hesaplanarak gösterilir.
- **Sessiz Telegram Bildirimi:**
  - Sipariş tamamlandığında müşterinin girdiği isim, sipariş notu, sipariş edilen ürünler ve toplam teslimat süresi **otomatik ve sessizce Telegram'ınıza (`@Site_bildirimbot`) bildirilir.**
- **WhatsApp Yönlendirmesi Kaldırıldı:** Sipariş tamamlandığında harici uygulama açılmaz, doğrudan ekranda resmi aşk fişi çıkar.
- **Yedekleme & Dağıtım:** Değişiklikler GitHub'a aktarıldı.

---

### [v1.3.1] - 31.08.2026 (Tipografi & Sepet Alt Alanı Kompaktlaştırma) 🎨
- 'Y' harfi alt boşluğu ve kompakt sepet altı.

---

### [v1.3.0] - 31.08.2026 (Sessiz Arka Plan Telegram Bot Bildirim Hattı) 🤖✨
- Telegram Bot API (`@Site_bildirimbot`) entegre edildi.

---

### [v1.2.2] - 31.08.2026 (Sipariş Menüsü Hizalama) 📱
- CSS sekme gizleme/gösterme hiyerarşisi düzeltildi.

---

### [v1.2.0] - 31.08.2026 (Kompakt Tek Ekran & Pop-up Deneyimi) ✨
- Başlık: *"Hoş Geldin Minik Yıldızım! ✨"*

---

### [v1.0.0] - 31.08.2026 (İlk Kararlı Sürüm) 🚀
- İlk sürüm oluşturuldu.
