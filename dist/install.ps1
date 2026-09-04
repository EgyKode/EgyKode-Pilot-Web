# EgyKode Pilot — Windows Installer Script
# From Code to Cloud.
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   EgyKode Pilot — Cloud DevOps Compiler" -ForegroundColor Green
Write-Host "   From Code to Cloud." -ForegroundColor DarkGray
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$installerUrl = "https://pilot.egykode.com/downloads/EgyKode-Pilot-0.1.0-x64.exe"
$destPath = "$env:TEMP\EgyKode-Pilot-Setup.exe"

Write-Host "[1/2] Downloading latest desktop installer..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $installerUrl -OutFile $destPath -UseBasicParsing

Write-Host "[2/2] Launching installer..." -ForegroundColor Green
Start-Process -FilePath $destPath

Write-Host "Setup initialized. Complete installation in the window." -ForegroundColor Cyan
