# Dynamic Desktop - Installer Scripts

This directory contains installer scripts for different platforms to create native installation packages for Dynamic Desktop.

## Available Installers

### Windows (.exe installer)
```bash
# Using NSIS (Nullsoft Scriptable Install System)
1. Install NSIS from https://nsis.sourceforge.io/
2. Compile: makensis windows-installer.nsi
3. Output: Dynamic-Desktop-Setup.exe

# Using PowerShell (simpler method)
1. Run as Administrator: powershell -ExecutionPolicy Bypass -File install-windows.ps1
2. Creates Start Menu and Desktop shortcuts
3. Adds to Windows Programs & Features
```

### Linux (.deb/.rpm packages)
```bash
# Simple installer
sudo ./install-linux.sh

# For .deb package creation (requires fpm)
gem install fpm
fpm -s dir -t deb -n dynamic-desktop -v 1.0.0 \
    --description "Dynamic Desktop - Live Wallpaper Manager" \
    --url "https://github.com/lavish112000/Dynamic-Desktop" \
    --maintainer "Dynamic Desktop Team" \
    ../desktop-package/=/opt/dynamic-desktop/

# For .rpm package creation
fpm -s dir -t rpm -n dynamic-desktop -v 1.0.0 \
    --description "Dynamic Desktop - Live Wallpaper Manager" \
    --url "https://github.com/lavish112000/Dynamic-Desktop" \
    --maintainer "Dynamic Desktop Team" \
    ../desktop-package/=/opt/dynamic-desktop/
```

### macOS (.dmg/.pkg)
```bash
# Simple installer
./install-macos.sh

# For .dmg creation (requires macOS)
hdiutil create -volname "Dynamic Desktop" \
    -srcfolder "../desktop-package" \
    -ov -format UDZO Dynamic-Desktop.dmg

# For .pkg creation (requires macOS)
pkgbuild --root ../desktop-package \
    --identifier com.dynamicdesktop.app \
    --version 1.0.0 \
    --install-location /Applications/Dynamic-Desktop \
    Dynamic-Desktop.pkg
```

## Build Process

1. First, build the desktop package:
   ```bash
   npm run build:desktop
   ```

2. Then run the appropriate installer script for your target platform:
   ```bash
   # Windows
   powershell -ExecutionPolicy Bypass -File installers/install-windows.ps1
   
   # Linux
   sudo ./installers/install-linux.sh
   
   # macOS
   ./installers/install-macos.sh
   ```

## Advanced Packaging

### Creating MSI (Windows)
Use WiX Toolset for professional MSI installers:
1. Install WiX Toolset
2. Create .wxs file based on the NSIS script
3. Compile with candle.exe and light.exe

### Creating AppImage (Linux)
```bash
# Download AppImageKit
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage

# Create AppDir structure
mkdir -p Dynamic-Desktop.AppDir/usr/bin
cp -r ../desktop-package/* Dynamic-Desktop.AppDir/usr/bin/
# Add AppRun, .desktop file, and icon
./appimagetool-x86_64.AppImage Dynamic-Desktop.AppDir
```

### Creating Snap Package (Linux)
```yaml
# Create snapcraft.yaml
name: dynamic-desktop
version: '1.0.0'
summary: Live Wallpaper Manager
description: Dynamic Desktop application with wallpaper management

parts:
  dynamic-desktop:
    plugin: dump
    source: ../desktop-package/
    
apps:
  dynamic-desktop:
    command: start-unix.sh
```

## Distribution

After creating installers, you can distribute them via:
- GitHub Releases
- Your website
- Package repositories (chocolatey, homebrew, apt, etc.)
- Microsoft Store (for UWP packaging)
- Mac App Store (with proper certificates)
- Snap Store
- Flathub

## Code Signing

For production releases, sign your installers:
- Windows: Use signtool.exe with a code signing certificate
- macOS: Use codesign with Apple Developer certificate
- Linux: Use GPG signatures for packages

## Notes

- All installers create uninstall scripts/entries
- The application runs as a local web server on port 3000
- Node.js is required and should be bundled for production
- Consider using electron-builder for a more integrated solution
