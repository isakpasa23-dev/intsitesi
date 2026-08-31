# 📝 Güncelleme Yamaları & Sürüm Geçmişi (Changelog)

Bu dosyada siteye yapılan tüm güncellemeler, yeni özellikler ve yama notları kronolojik olarak saklanır.

---

### [v6.1.0] - 31.08.2026 (İstenmeyen Otomatik Stok Yenilenmesi Hatası Kökten Düzeltildi) 🛑📦🔒✨
- **Kritik Hata Tespiti & Düzeltmesi:**
  - Tarayıcı içerisindeki JavaScript'in her sayfa yenilendiğinde geçmiş Telegram mesajlarını (`getUpdates`) sıfırdan okuyup eski `/sifirla` veya `/set` komutlarını tekrar çalıştırarak stokları geri yüklemesi sorunu tespit edildi.
  - Tarayıcı içerisindeki Telegram mesaj dinleyicisi tamamen kaldırıldı. Telegram botu artık yalnızca arka plandaki PowerShell betiği üzerinden çalışır.
  - Satın alınan ürünlerin stokları azaldıktan sonra **sen Telegram'dan bizzat `/ekle` veya `/set` komutu vermediğin sürece stoklar ASLA geri artmaz veya sıfırlanmaz.**
  - `/stok` komutu artık yalnızca stokları ekrana yazdırır, hiçbir veriyi değiştirmez.
- **Yedekleme & Dağıtım:** Değişiklikler GitHub'a aktarıldı.

---

### [v6.0.0] - 31.08.2026 (İnteraktif Sihirli Sevgi & Animasyon Bahçesi Eklendi) 🌹🌵⭐🎆🦋✨
- İnteraktif animasyon bahçesi eklendi.

---

### [v1.0.0] - 31.08.2026 (İlk Kararlı Sürüm) 🚀
- İlk sürüm oluşturuldu.
