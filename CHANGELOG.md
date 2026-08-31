# 📝 Güncelleme Yamaları & Sürüm Geçmişi (Changelog)

Bu dosyada siteye yapılan tüm güncellemeler, yeni özellikler ve yama notları kronolojik olarak saklanır.

---

### [v9.0.0] - 31.08.2026 (Stok Azalma & Geri Yüklenme Sorunu Kökten Çözüldü: Telegram Cloud Engine) 🚀📦🔒✨
- **Sorunun Kök Sebebi & Çözümü:**
  - Önceki harici JSON servisinin (ExtendsClass) tarayıcıların gönderdiği HTTP OPTIONS (CORS preflight) isteklerine 500 hata kodu döndürdüğü ve bu yüzden tarayıcıdan gelen PUT/POST yazma isteklerini engellediği tespit edildi. Tarayıcı yazamadığı için 4 saniye sonraki GET isteği eski stoğu geri yüklüyordu.
  - Harici güvensiz JSON servisi tamamen devreden çıkarıldı.
  - %100 CORS uyumlu, sıfır kesintili ve anlık çalışan **Telegram Cloud Storage (Dedicated Pinned Message Engine)** altyapısına geçildi.
  - Satın alım yapıldığında stok hem yerel hafızaya hem de Telegram bulutuna anında yazılır; sayfa yenilense veya telefondan girilse de kesinlikle geri yükselmez.
- **Yedekleme & Dağıtım:** Değişiklikler GitHub'a aktarıldı.

---

### [v8.1.0] - 31.08.2026 (Gelişmiş Yapay Zeka Romantik Cümle Üreticisi & Dengeli Edebi Havuz) 🧠💌🌙✨
- Yapay zeka romantik söz motoru sonsuz varyasyon üretecek şekilde genişletildi.

---

### [v8.0.0] - 31.08.2026 (Sihirli Animasyon Menüsü Dev Ekrana Büyütüldü, Tüm Yazılar Temizlendi & Animasyonlar Ultra Detaylandırıldı) 🎬🌸🌵🌹⭐🐾✨
- Dev ekrana büyütüldü ve yazılar temizlendi.

---

### [v1.0.0] - 31.08.2026 (İlk Kararlı Sürüm) 🚀
- İlk sürüm oluşturuldu.
