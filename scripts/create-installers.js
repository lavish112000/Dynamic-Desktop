const fs = require('fs');
const path = require('path');

console.log('🛠️  Creating Installer Scripts for Dynamic Desktop...\n');

// Create installers directory
const installersDir = path.join(__dirname, '..', 'installers');
if (!fs.existsSync(installersDir)) {
  fs.mkdirSync(installersDir, { recursive: true });
}

// Create NSIS (Nullsoft Scriptable Install System) script for Windows
const nsisScript = `
!define APP_NAME "Dynamic Desktop"
!define APP_VERSION "1.0.0"
!define APP_PUBLISHER "Dynamic Desktop Team"
!define APP_URL "https://github.com/lavish112000/Dynamic-Desktop"
!define APP_EXECUTABLE "start-windows.bat"

; Set the installer name
Name "\${APP_NAME}"
OutFile "Dynamic-Desktop-Setup.exe"

; Set the installation directory
InstallDir "$PROGRAMFILES64\\\\Dynamic Desktop"

; Request application privileges
RequestExecutionLevel admin

; Show license page
Page license
Page directory
Page instfiles

; License file (you'll need to create this)
LicenseData "LICENSE.txt"

Section "Install"
  ; Set output path to the installation directory
  SetOutPath $INSTDIR
  
  ; Copy all files
  File /r "..\\\\desktop-package\\\\*"
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\\\\Uninstall.exe"
  
  ; Create Start Menu shortcuts
  CreateDirectory "$SMPROGRAMS\\\\Dynamic Desktop"
  CreateShortCut "$SMPROGRAMS\\\\Dynamic Desktop\\\\Dynamic Desktop.lnk" "$INSTDIR\\\\start-windows.bat"
  CreateShortCut "$SMPROGRAMS\\\\Dynamic Desktop\\\\Uninstall.lnk" "$INSTDIR\\\\Uninstall.exe"
  
  ; Create Desktop shortcut
  CreateShortCut "$DESKTOP\\\\Dynamic Desktop.lnk" "$INSTDIR\\\\start-windows.bat"
  
  ; Register uninstaller in Control Panel
  WriteRegStr HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop" "DisplayName" "\${APP_NAME}"
  WriteRegStr HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop" "UninstallString" "$INSTDIR\\\\Uninstall.exe"
  WriteRegStr HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop" "Publisher" "\${APP_PUBLISHER}"
  WriteRegStr HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop" "DisplayVersion" "\${APP_VERSION}"
  WriteRegStr HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop" "URLInfoAbout" "\${APP_URL}"
  
SectionEnd

Section "Uninstall"
  ; Remove files
  RMDir /r "$INSTDIR"
  
  ; Remove Start Menu shortcuts
  RMDir /r "$SMPROGRAMS\\\\Dynamic Desktop"
  
  ; Remove Desktop shortcut
  Delete "$DESKTOP\\\\Dynamic Desktop.lnk"
  
  ; Remove registry entries
  DeleteRegKey HKLM "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Uninstall\\\\Dynamic Desktop"
  
SectionEnd
`;

fs.writeFileSync(path.join(installersDir, 'windows-installer.nsi'), nsisScript);

// Create PowerShell script for Windows installation
const powershellScript = `
# Dynamic Desktop PowerShell Installer
# This script creates a self-extracting installer for Windows

param(
    [string]$InstallPath = "$env:ProgramFiles\\Dynamic Desktop"
)

Write-Host "Dynamic Desktop Installer" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "This installer requires administrator privileges." -ForegroundColor Red
    Write-Host "Please run PowerShell as Administrator and try again." -ForegroundColor Red
    exit 1
}

# Create installation directory
Write-Host "Creating installation directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $InstallPath | Out-Null

# Copy files (assuming desktop-package exists)
$SourcePath = Join-Path $PSScriptRoot "..\\desktop-package"
if (Test-Path $SourcePath) {
    Write-Host "Copying application files..." -ForegroundColor Yellow
    Copy-Item -Path "$SourcePath\\*" -Destination $InstallPath -Recurse -Force
} else {
    Write-Host "Error: Source files not found. Please build the desktop package first." -ForegroundColor Red
    exit 1
}

# Create Start Menu shortcut
$StartMenuPath = "$env:ProgramData\\Microsoft\\Windows\\Start Menu\\Programs"
$ShortcutPath = "$StartMenuPath\\Dynamic Desktop.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "$InstallPath\\start-windows.bat"
$Shortcut.WorkingDirectory = $InstallPath
$Shortcut.Description = "Dynamic Desktop - Live Wallpaper Manager"
$Shortcut.Save()

# Create Desktop shortcut
$DesktopShortcut = "$env:PUBLIC\\Desktop\\Dynamic Desktop.lnk"
$DesktopShortcutObj = $WScriptShell.CreateShortcut($DesktopShortcut)
$DesktopShortcutObj.TargetPath = "$InstallPath\\start-windows.bat"
$DesktopShortcutObj.WorkingDirectory = $InstallPath
$DesktopShortcutObj.Description = "Dynamic Desktop - Live Wallpaper Manager"
$DesktopShortcutObj.Save()

# Add to Windows Programs list
$RegPath = "HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop"
New-Item -Path $RegPath -Force | Out-Null
Set-ItemProperty -Path $RegPath -Name "DisplayName" -Value "Dynamic Desktop"
Set-ItemProperty -Path $RegPath -Name "Publisher" -Value "Dynamic Desktop Team"
Set-ItemProperty -Path $RegPath -Name "DisplayVersion" -Value "1.0.0"
Set-ItemProperty -Path $RegPath -Name "InstallLocation" -Value $InstallPath
Set-ItemProperty -Path $RegPath -Name "UninstallString" -Value "powershell.exe -ExecutionPolicy Bypass -File \\"$InstallPath\\uninstall.ps1\\""

# Create uninstaller
$UninstallScript = @"
# Dynamic Desktop Uninstaller
Write-Host "Uninstalling Dynamic Desktop..." -ForegroundColor Yellow

# Remove files
Remove-Item -Path "$InstallPath" -Recurse -Force -ErrorAction SilentlyContinue

# Remove shortcuts
Remove-Item -Path "$ShortcutPath" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$DesktopShortcut" -Force -ErrorAction SilentlyContinue

# Remove registry entry
Remove-Item -Path "HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" -Force -ErrorAction SilentlyContinue

Write-Host "Dynamic Desktop has been uninstalled." -ForegroundColor Green
"@

$UninstallScript | Out-File -FilePath "$InstallPath\\uninstall.ps1" -Encoding UTF8

Write-Host ""
Write-Host "Installation completed successfully!" -ForegroundColor Green
Write-Host "You can find Dynamic Desktop in:" -ForegroundColor Cyan
Write-Host "- Start Menu" -ForegroundColor Cyan
Write-Host "- Desktop shortcut" -ForegroundColor Cyan
Write-Host "- $InstallPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "To uninstall, run: $InstallPath\\uninstall.ps1" -ForegroundColor Yellow
`;

fs.writeFileSync(path.join(installersDir, 'install-windows.ps1'), powershellScript);

// Create Linux installation script
const linuxInstallScript = `#!/bin/bash

# Dynamic Desktop Linux Installer
echo "Dynamic Desktop Installer"
echo "========================="

INSTALL_DIR="/opt/dynamic-desktop"
DESKTOP_FILE="/usr/share/applications/dynamic-desktop.desktop"
BIN_FILE="/usr/local/bin/dynamic-desktop"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "This installer requires root privileges."
    echo "Please run with sudo: sudo ./install-linux.sh"
    exit 1
fi

# Create installation directory
echo "Creating installation directory..."
mkdir -p "$INSTALL_DIR"

# Copy files
SOURCE_DIR="$(dirname "$0")/../desktop-package"
if [ -d "$SOURCE_DIR" ]; then
    echo "Copying application files..."
    cp -r "$SOURCE_DIR"/* "$INSTALL_DIR/"
    chmod +x "$INSTALL_DIR/start-unix.sh"
else
    echo "Error: Source files not found. Please build the desktop package first."
    exit 1
fi

# Create desktop entry
echo "Creating desktop entry..."
cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Name=Dynamic Desktop
Comment=Live Wallpaper Manager
Exec=$INSTALL_DIR/start-unix.sh
Icon=$INSTALL_DIR/icon.png
Terminal=false
Type=Application
Categories=Graphics;Utility;
StartupNotify=true
EOF

# Create command-line launcher
echo "Creating command-line launcher..."
cat > "$BIN_FILE" << EOF
#!/bin/bash
cd "$INSTALL_DIR"
./start-unix.sh
EOF

chmod +x "$BIN_FILE"

# Create uninstaller
cat > "$INSTALL_DIR/uninstall.sh" << EOF
#!/bin/bash
echo "Uninstalling Dynamic Desktop..."
sudo rm -rf "$INSTALL_DIR"
sudo rm -f "$DESKTOP_FILE"
sudo rm -f "$BIN_FILE"
echo "Dynamic Desktop has been uninstalled."
EOF

chmod +x "$INSTALL_DIR/uninstall.sh"

echo ""
echo "Installation completed successfully!"
echo "You can start Dynamic Desktop by:"
echo "- Searching for 'Dynamic Desktop' in your applications menu"
echo "- Running 'dynamic-desktop' in terminal"
echo "- Executing: $INSTALL_DIR/start-unix.sh"
echo ""
echo "To uninstall, run: $INSTALL_DIR/uninstall.sh"
`;

fs.writeFileSync(path.join(installersDir, 'install-linux.sh'), linuxInstallScript);

// Make Linux script executable
try {
  require('child_process').execSync(`chmod +x ${path.join(installersDir, 'install-linux.sh')}`);
} catch (e) {
  console.log('Note: Could not make Linux installer executable. Run chmod +x install-linux.sh manually.');
}

// Create macOS installation script
const macosInstallScript = `#!/bin/bash

# Dynamic Desktop macOS Installer
echo "Dynamic Desktop Installer for macOS"
echo "==================================="

INSTALL_DIR="/Applications/Dynamic Desktop.app"
CONTENTS_DIR="$INSTALL_DIR/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"

# Create app bundle structure
echo "Creating application bundle..."
mkdir -p "$MACOS_DIR"
mkdir -p "$RESOURCES_DIR"

# Copy files
SOURCE_DIR="$(dirname "$0")/../desktop-package"
if [ -d "$SOURCE_DIR" ]; then
    echo "Copying application files..."
    cp -r "$SOURCE_DIR"/* "$RESOURCES_DIR/"
    chmod +x "$RESOURCES_DIR/start-unix.sh"
else
    echo "Error: Source files not found. Please build the desktop package first."
    exit 1
fi

# Create Info.plist
cat > "$CONTENTS_DIR/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>dynamic-desktop</string>
    <key>CFBundleIdentifier</key>
    <string>com.dynamicdesktop.app</string>
    <key>CFBundleName</key>
    <string>Dynamic Desktop</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

# Create executable
cat > "$MACOS_DIR/dynamic-desktop" << EOF
#!/bin/bash
cd "\$(dirname "\$0")/../Resources"
./start-unix.sh
EOF

chmod +x "$MACOS_DIR/dynamic-desktop"

echo ""
echo "Installation completed successfully!"
echo "Dynamic Desktop is now installed in your Applications folder."
echo "You can find it in Launchpad or Applications directory."
`;

fs.writeFileSync(path.join(installersDir, 'install-macos.sh'), macosInstallScript);

// Make macOS script executable
try {
  require('child_process').execSync(`chmod +x ${path.join(installersDir, 'install-macos.sh')}`);
} catch (e) {
  console.log('Note: Could not make macOS installer executable. Run chmod +x install-macos.sh manually.');
}

// Create comprehensive installer documentation
const installerReadme = `# Dynamic Desktop - Installer Scripts

This directory contains installer scripts for different platforms to create native installation packages for Dynamic Desktop.

## Available Installers

### Windows (.exe installer)
\`\`\`bash
# Using NSIS (Nullsoft Scriptable Install System)
1. Install NSIS from https://nsis.sourceforge.io/
2. Compile: makensis windows-installer.nsi
3. Output: Dynamic-Desktop-Setup.exe

# Using PowerShell (simpler method)
1. Run as Administrator: powershell -ExecutionPolicy Bypass -File install-windows.ps1
2. Creates Start Menu and Desktop shortcuts
3. Adds to Windows Programs & Features
\`\`\`

### Linux (.deb/.rpm packages)
\`\`\`bash
# Simple installer
sudo ./install-linux.sh

# For .deb package creation (requires fpm)
gem install fpm
fpm -s dir -t deb -n dynamic-desktop -v 1.0.0 \\
    --description "Dynamic Desktop - Live Wallpaper Manager" \\
    --url "https://github.com/lavish112000/Dynamic-Desktop" \\
    --maintainer "Dynamic Desktop Team" \\
    ../desktop-package/=/opt/dynamic-desktop/

# For .rpm package creation
fpm -s dir -t rpm -n dynamic-desktop -v 1.0.0 \\
    --description "Dynamic Desktop - Live Wallpaper Manager" \\
    --url "https://github.com/lavish112000/Dynamic-Desktop" \\
    --maintainer "Dynamic Desktop Team" \\
    ../desktop-package/=/opt/dynamic-desktop/
\`\`\`

### macOS (.dmg/.pkg)
\`\`\`bash
# Simple installer
./install-macos.sh

# For .dmg creation (requires macOS)
hdiutil create -volname "Dynamic Desktop" \\
    -srcfolder "../desktop-package" \\
    -ov -format UDZO Dynamic-Desktop.dmg

# For .pkg creation (requires macOS)
pkgbuild --root ../desktop-package \\
    --identifier com.dynamicdesktop.app \\
    --version 1.0.0 \\
    --install-location /Applications/Dynamic-Desktop \\
    Dynamic-Desktop.pkg
\`\`\`

## Build Process

1. First, build the desktop package:
   \`\`\`bash
   npm run build:desktop
   \`\`\`

2. Then run the appropriate installer script for your target platform:
   \`\`\`bash
   # Windows
   powershell -ExecutionPolicy Bypass -File installers/install-windows.ps1
   
   # Linux
   sudo ./installers/install-linux.sh
   
   # macOS
   ./installers/install-macos.sh
   \`\`\`

## Advanced Packaging

### Creating MSI (Windows)
Use WiX Toolset for professional MSI installers:
1. Install WiX Toolset
2. Create .wxs file based on the NSIS script
3. Compile with candle.exe and light.exe

### Creating AppImage (Linux)
\`\`\`bash
# Download AppImageKit
wget https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
chmod +x appimagetool-x86_64.AppImage

# Create AppDir structure
mkdir -p Dynamic-Desktop.AppDir/usr/bin
cp -r ../desktop-package/* Dynamic-Desktop.AppDir/usr/bin/
# Add AppRun, .desktop file, and icon
./appimagetool-x86_64.AppImage Dynamic-Desktop.AppDir
\`\`\`

### Creating Snap Package (Linux)
\`\`\`yaml
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
\`\`\`

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
`;

fs.writeFileSync(path.join(installersDir, 'README.md'), installerReadme);

console.log('✅ Installer scripts created successfully!');
console.log('📁 Scripts location:', installersDir);
console.log('');
console.log('📋 Available installers:');
console.log('- Windows: install-windows.ps1 (PowerShell) or windows-installer.nsi (NSIS)');
console.log('- Linux: install-linux.sh');
console.log('- macOS: install-macos.sh');
console.log('');
console.log('📖 See installers/README.md for detailed instructions');
