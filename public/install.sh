#!/bin/sh
# EgyKode Pilot — Unix (macOS & Linux) Installer Script
# From Code to Cloud.
set -e

echo ""
echo "=================================================="
echo "   EgyKode Pilot — Cloud DevOps Compiler"
echo "   From Code to Cloud."
echo "=================================================="
echo ""

OS="$(uname -s)"

if [ "$OS" = "Darwin" ]; then
    echo "Detected macOS system."
    URL="https://pilot.egykode.com/downloads/EgyKode-Pilot-0.1.0-mac-universal.dmg"
    DEST="/tmp/EgyKode-Pilot.dmg"
    echo "[1/2] Downloading macOS Universal DMG..."
    curl -fsSL "$URL" -o "$DEST"
    echo "[2/2] Mounting installer..."
    hdiutil attach "$DEST"
    echo "Installer mounted. Drag EgyKode Pilot to Applications."
elif [ "$OS" = "Linux" ]; then
    echo "Detected Linux system."
    URL="https://pilot.egykode.com/downloads/EgyKode-Pilot-0.1.0-linux-x64.AppImage"
    DEST="$HOME/EgyKode-Pilot.AppImage"
    echo "[1/2] Downloading Linux AppImage..."
    curl -fsSL "$URL" -o "$DEST"
    chmod +x "$DEST"
    echo "[2/2] Download complete: $DEST"
    echo "Run with: $DEST"
else
    echo "Unsupported operating system: $OS"
    exit 1
fi
