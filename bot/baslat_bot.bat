@echo off
title Ask Kosesi - Telegram Stok Botu
cls
echo ========================================================
echo  💖 ASKKOSESI TELEGRAM STOK BOTU BASLATILIYOR...
echo ========================================================
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0telegram_bot.ps1"
pause
