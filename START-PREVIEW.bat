@echo off
cd /d "%~dp0"
echo Starting preview server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-preview.ps1"
pause
