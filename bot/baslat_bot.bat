@echo off
title Ask Kosesi - Telegram Stok Botu
cls
echo ========================================================
echo   💖 ASKKOSESI TELEGRAM STOK BOTU BASLATILIYOR...
echo ========================================================
echo.
python "%~dp0telegram_bot.py"
if %errorlevel% neq 0 (
    echo Python bulunamadi, PowerShell moduyla baslatiliyor...
    powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0telegram_bot.ps1"
)
pause
