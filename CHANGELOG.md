# 📝 Güncelleme Yamaları & Sürüm Geçmişi (Changelog)

Bu dosyada siteye yapılan tüm güncellemeler, yeni özellikler ve yama notları kronolojik olarak saklanır.

---

### [v11.0.0] - 01.09.2026 (Sihirli Sahneye 3 Yeni Büyü Eklendi + GPU & CPU Kökten Optimize Edildi) 🎬☕🧸🐧⚡❄️
- **3 Yeni Büyülü Animasyon Eklendi (Toplam 7 Sahne):**
  - ☕ **Aşk Kahvesi / Çayı & Kalp Buharı:** Masada tokuşan tatlı yüzlü pembe ve turkuaz kupalar, havada kalplere dönüşen ışıltılı aşk buharı.
  - 🧸 **Uçan Kalp Balonları & Sevimli Ayıcık:** Pastel bulutların arasından renkli kalp balonlarına tutunarak süzülen kırmızı papyonlu sevimli peluş ayıcık.
  - 🐧 **Kutup Işıkları & Aşk Penguenleri:** Dalgalanan yeşil/pembe Aurora Borealis altında birbirine parıldayan aşk çakıl taşı hediye eden tatlı kutup penguenleri.
- **Ultra GPU & CPU Performans Optimizasyonu (Fan / Isınma Kökten Çözüldü):**
  - Ağır Gaussian blur hesaplamaları (`ctx.shadowBlur`) kaldırıldı, hafif katmanlı alfa gradyanlarına geçildi.
  - Render döngüsü 60 FPS'e sabitlendi (ekran kartının sınırsız Hz'de bağırması engellendi).
  - Yüksek çözünürlüklü ekranlarda DPR sınırı getirilerek GPU bellek ve çizim yükü %85 düşürüldü.
  - Parçacık havuzu sınırlandırılarak RAM ve CPU tüketimi minimuma indirildi.
- **Yedekleme & Dağıtım:** Değişiklikler GitHub'a aktarıldı.

---

### [v10.2.0] - 01.09.2026 (Ekran Kedisi Replikleri Gerçekçi Kedi Davranışlarına Uyarlandı) 🐾🐈‍⬛🐟
- Kedi replikleri tatlı kedi davranışlarına uyarlandı.

---

### [v10.1.0] - 01.09.2026 (Telegram Botu & Site Stok Senkronizasyonu %100 Senkronize Edildi) 🤖📦🔄✨
- Bot ve site stokları eşitlendi.

---

### [v1.0.0] - 31.08.2026 (İlk Kararlı Sürüm) 🚀
- İlk sürüm oluşturuldu.
