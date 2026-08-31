# ==============================================================================
# AŞK KÖŞESİ - 7/24 TELEGRAM BOTU STOK YÖNETİCİSİ (PowerShell)
# Bu betik arka planda çalışarak Telegram komutlarını dinler ve Telegram bulut stoklarını yönetir.
# ==============================================================================

$BotToken = "8632534778:AAFs3kIgNAOJNDD4G4lei8ApFosDc7TKoR8"
$ChatId = "6497058542"
$StorageMessageId = 85
$LastUpdateId = 0

$ProductAliases = @{
    "askolcer" = "askolcer"; "aşkölçer" = "askolcer"; "ask" = "askolcer"; "aşk" = "askolcer"
    "canim-cicim" = "canim-cicim"; "canim" = "canim-cicim"; "canım" = "canim-cicim"
    "kahve-kacamagi" = "kahve-kacamagi"; "kahve" = "kahve-kacamagi"; "cay" = "kahve-kacamagi"; "çay" = "kahve-kacamagi"; "cay-kacagi" = "kahve-kacamagi"
    "cigkofte-ziyafeti" = "cigkofte-ziyafeti"; "cigkofte" = "cigkofte-ziyafeti"; "çiğköfte" = "cigkofte-ziyafeti"
    "beraber-yuruyus" = "beraber-yuruyus"; "yuruyus" = "beraber-yuruyus"; "yürüyüş" = "beraber-yuruyus"; "yuru" = "beraber-yuruyus"
    "patron-sensin" = "patron-sensin"; "patron" = "patron-sensin"; "kralice" = "patron-sensin"; "kraliçe" = "patron-sensin"; "kralicem" = "patron-sensin"
    "film-gecesi" = "film-gecesi"; "film" = "film-gecesi"; "sinema" = "film-gecesi"
    "gece-sohbeti" = "gece-sohbeti"; "gece" = "gece-sohbeti"; "sohbet" = "gece-sohbeti"; "kulaklik" = "gece-sohbeti"; "kulaklık" = "gece-sohbeti"; "tek-kulaklik" = "gece-sohbeti"
    "goruntulu-arama" = "goruntulu-arama"; "goruntulu" = "goruntulu-arama"; "görüntülü" = "goruntulu-arama"; "arama" = "goruntulu-arama"; "aninda-arama" = "goruntulu-arama"
    "ozlem-sarilmasi" = "ozlem-sarilmasi"; "ozlem" = "ozlem-sarilmasi"; "özlem" = "ozlem-sarilmasi"
    "ozel-ses-kaydi" = "ozel-ses-kaydi"; "ses" = "ozel-ses-kaydi"; "ismail" = "ozel-ses-kaydi"; "sarki" = "ozel-ses-kaydi"
}

$InitialStocks = @{
    "askolcer" = 1; "canim-cicim" = 9847; "kahve-kacamagi" = 4320; "cigkofte-ziyafeti" = 6350; "beraber-yuruyus" = 9999999
    "patron-sensin" = 1450; "film-gecesi" = 3745; "gece-sohbeti" = 12580; "goruntulu-arama" = 8650
    "ozlem-sarilmasi" = 9999999; "ozel-ses-kaydi" = 7890; "kahve-hediye" = 2450; "opucuk-hediye" = 9999999
    "sarilma-hediye" = 9999999; "sonsuz-sevgi-hediye" = 9999999
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
        $chatInfo = Invoke-RestMethod -Uri "https://api.telegram.org/bot$BotToken/getChat?chat_id=$ChatId" -Method Get
        $pinnedText = $chatInfo.result.pinned_message.text
        if ($pinnedText -and $pinnedText.StartsWith("{")) {
            return ($pinnedText | ConvertFrom-Json)
        }
        return $InitialStocks
    } catch {
        return $InitialStocks
    }
}

function Set-CloudStocks($stocks) {
    try {
        $cleanJson = $stocks | ConvertTo-Json -Compress
        $editBody = @{
            chat_id = $ChatId
            message_id = $StorageMessageId
            text = $cleanJson
        } | ConvertTo-Json
        Invoke-RestMethod -Uri "https://api.telegram.org/bot$BotToken/editMessageText" -Method Post -Body $editBody -ContentType "application/json" | Out-Null
        return $true
    } catch {
        return $false
    }
}

Clear-Host
Write-Host "======================================================" -ForegroundColor Magenta
Write-Host "  💖 ASKKOSESI TELEGRAM BULUT BOTU BASLATILDI (v10.1.0) " -ForegroundColor Yellow
Write-Host "  Canli Stok Senkronizasyonu: AKTIF (Telegram Pinned Msg 85)" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Magenta

# İlk açılışta eski geçmiş mesajları atla
try {
    $initUpdates = Invoke-RestMethod -Uri "https://api.telegram.org/bot$BotToken/getUpdates?offset=-1" -Method Get
    if ($initUpdates.result -and $initUpdates.result.Count -gt 0) {
        $LastUpdateId = $initUpdates.result[-1].update_id
    }
} catch {}

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
                $senderChatId = $msg.chat.id
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Gelen Komut: $text" -ForegroundColor Cyan
                
                if ($text -in @("/stok", "/stoklar", "/start", "/yardim", "/menu")) {
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
                    $m += "• 🎙️ *Özel Ses Kaydı & Şarkı* (`ses`): *$($stocks.'ozel-ses-kaydi') Adet*`n`n"
                    $m += "✍ *Kullanabileceğin Komutlar:*`n"
                    $m += "• `/set askolcer 1` ➔ Aşkölçer stoğunu 1 yap`n"
                    $m += "• `/set cigkofte 100` ➔ Çiğköfte stoğunu 100 yap`n"
                    $m += "• `/ekle arama 50` ➔ Arama stoğuna 50 ekle`n"
                    $m += "• `/cikar kralice 10` ➔ Kraliçe stoğundan 10 düşür`n"
                    $m += "• `/sifirla` ➔ Tüm stokları varsayılana döndür"
                    Send-TgMessage $senderChatId $m
                }
                elseif ($text -match "^/(set|ayar)\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[2].ToLower()
                    $qty = [int]$Matches[3]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $stocks.$pId = $qty
                    Set-CloudStocks $stocks
                    Send-TgMessage $senderChatId "✅ *$pId* stoğu başarıyla *$qty Adet* olarak güncellendi ve web sitesine yansıtıldı! ✨"
                }
                elseif ($text -match "^/ekle\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[1].ToLower()
                    $qty = [int]$Matches[2]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $curVal = if ($stocks.$pId) { [int]$stocks.$pId } else { 0 }
                    $stocks.$pId = $curVal + $qty
                    Set-CloudStocks $stocks
                    Send-TgMessage $senderChatId "✅ *$pId* stoğuna +$qty eklendi! Yeni Canlı Stok: *$($stocks.$pId) Adet* 📦"
                }
                elseif ($text -match "^/(cikar|çıkar)\s+([^\s]+)\s+(\d+)$") {
                    $key = $Matches[2].ToLower()
                    $qty = [int]$Matches[3]
                    $pId = if ($ProductAliases.ContainsKey($key)) { $ProductAliases[$key] } else { $key }
                    
                    $stocks = Get-CloudStocks
                    $curVal = if ($stocks.$pId) { [int]$stocks.$pId } else { 0 }
                    $stocks.$pId = [Math]::Max(0, $curVal - $qty)
                    Set-CloudStocks $stocks
                    Send-TgMessage $senderChatId "🔻 *$pId* stoğundan -$qty düşüldü! Kalan Canlı Stok: *$($stocks.$pId) Adet* 📦"
                }
                elseif ($text -in @("/sifirla", "/sıfırla")) {
                    Set-CloudStocks $InitialStocks
                    Send-TgMessage $senderChatId "🔄 *Tüm ürün stokları ilk günkü zengin sayılarına sıfırlandı ve web sitesi güncellendi!* (Aşkölçer: 1 Adet) 🔥"
                }
            }
        }
    } catch {
        Start-Sleep -Seconds 2
    }
}
