# ==============================================================================
# AŞK KÖŞESİ - 7/24 TELEGRAM BOTU STOK YÖNETİCİSİ (PowerShell)
# Bu betik arka planda çalışarak Telegram komutlarını dinler ve bulut stokları yönetir.
# ==============================================================================

$BotToken = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8"
$CloudEndpoint = "https://extendsclass.com/api/json-storage/bin/bbaafac"
$LastUpdateId = 0

$ProductAliases = @{
    "askolcer" = "askolcer"; "aşkölçer" = "askolcer"; "ask" = "askolcer"; "aşk" = "askolcer"
    "canim-cicim" = "canim-cicim"; "canim" = "canim-cicim"; "canım" = "canim-cicim"
    "kahve-kacamagi" = "kahve-kacamagi"; "kahve" = "kahve-kacamagi"; "cay" = "kahve-kacamagi"; "çay" = "kahve-kacamagi"; "cay-kacagi" = "kahve-kacamagi"
    "cigkofte-ziyafeti" = "cigkofte-ziyafeti"; "cigkofte" = "cigkofte-ziyafeti"; "çiğköfte" = "cigkofte-ziyafeti"
    "beraber-yuruyus" = "beraber-yuruyus"; "yuruyus" = "beraber-yuruyus"; "yürüyüş" = "beraber-yuruyus"; "yuru" = "beraber-yuruyus"
    "gece-sohbeti" = "gece-sohbeti"; "gece" = "gece-sohbeti"; "sohbet" = "gece-sohbeti"; "kulaklik" = "gece-sohbeti"; "kulaklık" = "gece-sohbeti"; "tek-kulaklik" = "gece-sohbeti"
    "patron-sensin" = "patron-sensin"; "patron" = "patron-sensin"; "kralice" = "patron-sensin"; "kraliçe" = "patron-sensin"; "kralicem" = "patron-sensin"
    "film-gecesi" = "film-gecesi"; "film" = "film-gecesi"; "sinema" = "film-gecesi"
    "goruntulu-arama" = "goruntulu-arama"; "goruntulu" = "goruntulu-arama"; "görüntülü" = "goruntulu-arama"; "arama" = "goruntulu-arama"; "aninda-arama" = "goruntulu-arama"
    "ozlem-sarilmasi" = "ozlem-sarilmasi"; "ozlem" = "ozlem-sarilmasi"; "özlem" = "ozlem-sarilmasi"
    "ozel-ses-kaydi" = "ozel-ses-kaydi"; "ses" = "ozel-ses-kaydi"
}

$InitialStocks = @{
    "askolcer" = 1; "canim-cicim" = 9847; "kahve-kacamagi" = 4320; "cigkofte-ziyafeti" = 6350; "beraber-yuruyus" = 9999999
    "gece-sohbeti" = 12580; "patron-sensin" = 1450; "film-gecesi" = 3745; "goruntulu-arama" = 8650
    "ozlem-sarilmasi" = 9999999; "ozel-ses-kaydi" = 7890; "kahve-hediye" = 2450
}

function Send-TgMessage($chatId, $text) {
    try {
        $body = @{ chat_id = $chatId; text = $text; parse_mode = "Markdown" } | ConvertTo-Json
        Invoke-RestMethod -Uri "https://api.telegram.org/bot$BotToken/sendMessage" -Method Post -Body $body -ContentType "application/json" | Out-Null
    } catch {
        Write-Host "Mesaj gönderilemedi: $_"
    }
}

function Get-CloudStocks() {
    try {
        $res = Invoke-RestMethod -Uri "$CloudEndpoint`?_t=$(Get-Date -UFormat %s)" -Method Get
        return $res
    } catch {
        return $InitialStocks
    }
}

function Set-CloudStocks($stocks) {
    try {
        $body = $stocks | ConvertTo-Json
        Invoke-RestMethod -Uri $CloudEndpoint -Method Put -Body $body -ContentType "application/json" | Out-Null
        return $true
    } catch {
        return $false
    }
}

Write-Host "🤖 Aşk Köşesi Telegram Botu Başlatıldı... Komutlar bekleniyor!" -ForegroundColor Magenta

while ($true) {
    try {
        $url = "https://api.telegram.org/bot$BotToken/getUpdates?offset=$($LastUpdateId + 1)&timeout=10"
        $updates = Invoke-RestMethod -Uri $url -Method Get
        
        if ($updates.result) {
            foreach ($u in $updates.result) {
                $LastUpdateId = $u.update_id
                $msg = $u.message
                if (-not $msg -or -not $msg.text) { continue }
                
                $text = $msg.text.Trim()
                $chatId = $msg.chat.id
                Write-Host "📩 Gelen Komut: $text (Chat ID: $chatId)" -ForegroundColor Cyan
                
                if ($text -in @("/stok", "/stoklar", "/start", "/yardim")) {
                    $stocks = Get-CloudStocks
                    $m = "📦 *GÜNCEL CANLI STOK DURUMU* 📦`n`n"
                    $m += "• 🔥 *Aşkölçer* (`askolcer`): *$($stocks.askolcer) Adet*`n"
                    $m += "• 🎁 *Canım Cicim* (`canim`): *$($stocks.'canim-cicim') Adet*`n"
                    $m += "• 🫖 *Baş Başa Çay Kaçağı* (`cay`): *$($stocks.'kahve-kacamagi') Adet*`n"
                    $m += "• 🌯 *Çiğköfte Ziyafeti* (`cigkofte`): *$($stocks.'cigkofte-ziyafeti') Adet*`n"
                    $m += "• 👫 *Beraber Yürüyüş* (`yuruyus`): *Sınırsız ♾️*`n"
                    $m += "• 👑 *Kraliçe* (`kralice`): *$($stocks.'patron-sensin') Adet*`n"
                    $m += "• 🍿 *Baş Başa Film* (`film`): *$($stocks.'film-gecesi') Adet*`n"
                    $m += "• 🎵 *Tek Kulaklık* (`kulaklik`): *$($stocks.'gece-sohbeti') Adet*`n"
                    $m += "• 📱 *Anında Arama* (`arama`): *$($stocks.'goruntulu-arama') Adet*`n"
                    $m += "• 🫂 *Özlem Sarılması* (`ozlem`): *Sınırsız ♾️*`n"
                    $m += "• 🎙️ *Ses Kaydı* (`ses`): *$($stocks.'ozel-ses-kaydi') Adet*`n`n"
                    $m += "✍ *Komutlar:*`n"
                    $m += "• `/set askolcer 1` ➔ Stoğu 1 yap`n"
                    $m += "• `/ekle arama 50` ➔ Arama stoğuna ekle`n"
                    $m += "• `/sifirla` ➔ Tüm stokları sıfırla"
                    Send-TgMessage $chatId $m
                }
                elseif ($text -match "^/(set|ayar)\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[2].ToLower()
                    $qty = [int]$Matches[3]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $stocks.$pId = $qty
                    Set-CloudStocks $stocks
                    Send-TgMessage $chatId "✅ *$pId* stoğu başarıyla *$qty Adet* olarak ayarlandı ve web sitesine yansıtıldı! ✨"
                }
                elseif ($text -match "^/ekle\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[1].ToLower()
                    $qty = [int]$Matches[2]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $stocks.$pId = [int]($stocks.$pId) + $qty
                    Set-CloudStocks $stocks
                    Send-TgMessage $chatId "✅ *$pId* stoğuna +$qty eklendi! Yeni Stok: *$($stocks.$pId) Adet* 📦"
                }
                elseif ($text -match "^/(cikar|çıkar)\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[2].ToLower()
                    $qty = [int]$Matches[3]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $stocks.$pId = [Math]::Max(0, [int]($stocks.$pId) - $qty)
                    Set-CloudStocks $stocks
                    Send-TgMessage $chatId "🔻 *$pId* stoğundan -$qty düşüldü! Kalan Stok: *$($stocks.$pId) Adet* 📦"
                }
                elseif ($text -in @("/sifirla", "/sıfırla")) {
                    Set-CloudStocks $InitialStocks
                    Send-TgMessage $chatId "🔄 *Tüm ürün stokları ilk günkü ayarlarına sıfırlandı ve web sitesi güncellendi!* (Aşkölçer: 1 Adet) 🔥"
                }
            }
        }
    } catch {
        Start-Sleep -Seconds 2
    }
}
