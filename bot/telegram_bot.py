# -*- coding: utf-8 -*-
"""
AŞK KÖŞESİ - 7/24 TELEGRAM BOTU STOK YÖNETİCİSİ (PYTHON)
Bu betik arka planda çalışarak Telegram komutlarını dinler ve Telegram bulut stoklarını yönetir.
Harici kütüphane gerektirmez (Standart urllib ile çalışır).
"""

import json
import time
import urllib.request
import urllib.parse

BOT_TOKEN = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8"
CHAT_ID = "6497058542"
STORAGE_MSG_ID = 85

PRODUCT_ALIASES = {
    "askolcer": "askolcer", "aşkölçer": "askolcer", "ask": "askolcer", "aşk": "askolcer",
    "canim-cicim": "canim-cicim", "canim": "canim-cicim", "canım": "canim-cicim",
    "kahve-kacamagi": "kahve-kacamagi", "kahve": "kahve-kacamagi", "cay": "kahve-kacamagi", "çay": "kahve-kacamagi", "cay-kacagi": "kahve-kacamagi",
    "cigkofte-ziyafeti": "cigkofte-ziyafeti", "cigkofte": "cigkofte-ziyafeti", "çiğköfte": "cigkofte-ziyafeti",
    "beraber-yuruyus": "beraber-yuruyus", "yuruyus": "beraber-yuruyus", "yürüyüş": "beraber-yuruyus", "yuru": "beraber-yuruyus",
    "patron-sensin": "patron-sensin", "patron": "patron-sensin", "kralice": "patron-sensin", "kraliçe": "patron-sensin", "kralicem": "patron-sensin",
    "film-gecesi": "film-gecesi", "film": "film-gecesi", "sinema": "film-gecesi",
    "gece-sohbeti": "gece-sohbeti", "gece": "gece-sohbeti", "sohbet": "gece-sohbeti", "kulaklik": "gece-sohbeti", "kulaklık": "gece-sohbeti", "tek-kulaklik": "gece-sohbeti",
    "goruntulu-arama": "goruntulu-arama", "goruntulu": "goruntulu-arama", "görüntülü": "goruntulu-arama", "arama": "goruntulu-arama", "aninda-arama": "goruntulu-arama",
    "ozlem-sarilmasi": "ozlem-sarilmasi", "ozlem": "ozlem-sarilmasi", "özlem": "ozlem-sarilmasi",
    "ozel-ses-kaydi": "ozel-ses-kaydi", "ses": "ozel-ses-kaydi", "ismail": "ozel-ses-kaydi", "sarki": "ozel-ses-kaydi"
}

INITIAL_STOCKS = {
    "askolcer": 1, "canim-cicim": 9847, "kahve-kacamagi": 4320, "cigkofte-ziyafeti": 6350,
    "beraber-yuruyus": 9999999, "patron-sensin": 1450, "film-gecesi": 3745,
    "gece-sohbeti": 12580, "goruntulu-arama": 8650, "ozlem-sarilmasi": 9999999,
    "ozel-ses-kaydi": 7890, "kahve-hediye": 2450, "opucuk-hediye": 9999999,
    "sarilma-hediye": 9999999, "sonsuz-sevgi-hediye": 9999999
}

def tg_api(method, payload=None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    try:
        if payload is not None:
            data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
        else:
            req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=12) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        return None

def send_message(chat_id, text):
    return tg_api("sendMessage", {"chat_id": chat_id, "text": text, "parse_mode": "Markdown"})

def get_cloud_stocks():
    res = tg_api("getChat", {"chat_id": CHAT_ID})
    if res and res.get("ok"):
        pinned = res.get("result", {}).get("pinned_message", {}).get("text", "")
        if pinned.startswith("{"):
            try:
                return json.loads(pinned)
            except:
                pass
    return INITIAL_STOCKS.copy()

def set_cloud_stocks(stocks):
    clean_json = json.dumps(stocks, separators=(',', ':'))
    res = tg_api("editMessageText", {
        "chat_id": CHAT_ID,
        "message_id": STORAGE_MSG_ID,
        "text": clean_json
    })
    return res and res.get("ok")

import sys

# Windows konsolunda UTF-8 çıktı desteği
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

def main():
    print("=" * 60)
    print("  [ASK KOSESI] TELEGRAM STOK BOTU (PYTHON) BASLATILDI")
    print("  Canli Stok Senkronizasyonu: AKTIF (Telegram Cloud Msg 85)")
    print("=" * 60)
    
    last_update_id = 0
    # Başlangıçta eski geçmiş mesajları atla
    init_up = tg_api("getUpdates", {"offset": -1})
    if init_up and init_up.get("result"):
        last_update_id = init_up["result"][-1]["update_id"]

    while True:
        try:
            updates = tg_api("getUpdates", {"offset": last_update_id + 1, "timeout": 10})
            if updates and updates.get("result"):
                for u in updates["result"]:
                    last_update_id = u["update_id"]
                    msg = u.get("message")
                    if not msg or not msg.get("text"):
                        continue
                    
                    text = msg["text"].strip()
                    sender_id = msg["chat"]["id"]
                    print(f"[{time.strftime('%H:%M:%S')}] Gelen Komut: {text}")

                    # Komut: /stok veya /start
                    if text in ["/stok", "/stoklar", "/start", "/yardim", "/menu"]:
                        stocks = get_cloud_stocks()
                        m = (
                            "📦 *GÜNCEL CANLI STOK DURUMU* 📦\n\n"
                            f"• 🔥 *Aşkölçer* (`askolcer`): *{stocks.get('askolcer', 0)} Adet*\n"
                            f"• 🎁 *Canım Cicim* (`canim`): *{stocks.get('canim-cicim', 0)} Adet*\n"
                            f"• 🫖 *Baş Başa Çay Kaçağı* (`cay`): *{stocks.get('kahve-kacamagi', 0)} Adet*\n"
                            f"• 🌯 *Çiğköfte Ziyafeti* (`cigkofte`): *{stocks.get('cigkofte-ziyafeti', 0)} Adet*\n"
                            "• 👫 *Beraber Yürüyüş* (`yuruyus`): *Sınırsız ♾️*\n"
                            f"• 👑 *Kraliçe* (`kralice`): *{stocks.get('patron-sensin', 0)} Adet*\n"
                            f"• 🍿 *Baş Başa Film* (`film`): *{stocks.get('film-gecesi', 0)} Adet*\n"
                            f"• 🎵 *Tek Kulaklık* (`kulaklik`): *{stocks.get('gece-sohbeti', 0)} Adet*\n"
                            f"• 📱 *Anında Arama* (`arama`): *{stocks.get('goruntulu-arama', 0)} Adet*\n"
                            "• 🫂 *Özlem Sarılması* (`ozlem`): *Sınırsız ♾️*\n"
                            f"• 🎙️ *Özel Ses Kaydı & Şarkı* (`ses`): *{stocks.get('ozel-ses-kaydi', 0)} Adet*\n\n"
                            "✍ *Kullanabileceğin Komutlar:*\n"
                            "• `/set askolcer 1` ➔ Aşkölçer stoğunu 1 yap\n"
                            "• `/set cigkofte 100` ➔ Çiğköfte stoğunu 100 yap\n"
                            "• `/ekle arama 50` ➔ Arama stoğuna 50 ekle\n"
                            "• `/cikar kralice 10` ➔ Kraliçe stoğundan 10 düşür\n"
                            "• `/sifirla` ➔ Tüm stokları varsayılana döndür"
                        )
                        send_message(sender_id, m)

                    # Komut: /set urun adet
                    elif text.startswith("/set ") or text.startswith("/ayar "):
                        parts = text.split()
                        if len(parts) >= 3 and parts[2].isdigit():
                            raw_key = parts[1].lower()
                            qty = int(parts[2])
                            pid = PRODUCT_ALIASES.get(raw_key, raw_key)
                            stocks = get_cloud_stocks()
                            stocks[pid] = qty
                            set_cloud_stocks(stocks)
                            send_message(sender_id, f"✅ *{pid}* stoğu başarıyla *{qty} Adet* olarak ayarlandı ve web sitesine yansıtıldı! ✨")

                    # Komut: /ekle urun adet
                    elif text.startswith("/ekle "):
                        parts = text.split()
                        if len(parts) >= 3 and parts[2].isdigit():
                            raw_key = parts[1].lower()
                            qty = int(parts[2])
                            pid = PRODUCT_ALIASES.get(raw_key, raw_key)
                            stocks = get_cloud_stocks()
                            stocks[pid] = int(stocks.get(pid, 0)) + qty
                            set_cloud_stocks(stocks)
                            send_message(sender_id, f"✅ *{pid}* stoğuna +{qty} eklendi! Yeni Canlı Stok: *{stocks[pid]} Adet* 📦")

                    # Komut: /cikar urun adet
                    elif text.startswith("/cikar ") or text.startswith("/çıkar "):
                        parts = text.split()
                        if len(parts) >= 3 and parts[2].isdigit():
                            raw_key = parts[1].lower()
                            qty = int(parts[2])
                            pid = PRODUCT_ALIASES.get(raw_key, raw_key)
                            stocks = get_cloud_stocks()
                            stocks[pid] = max(0, int(stocks.get(pid, 0)) - qty)
                            set_cloud_stocks(stocks)
                            send_message(sender_id, f"🔻 *{pid}* stoğundan -{qty} düşüldü! Kalan Canlı Stok: *{stocks[pid]} Adet* 📦")

                    # Komut: /sifirla
                    elif text in ["/sifirla", "/sıfırla"]:
                        set_cloud_stocks(INITIAL_STOCKS)
                        send_message(sender_id, "🔄 *Tüm ürün stokları ilk günkü zengin sayılarına sıfırlandı ve web sitesi güncellendi!* (Aşkölçer: 1 Adet) 🔥")

            time.sleep(0.5)
        except Exception as e:
            time.sleep(2)

if __name__ == "__main__":
    main()
