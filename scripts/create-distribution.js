const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating distributable packages for Dynamic Desktop...\n');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'distributions');

// Create distributions directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('🗜️  Creating ZIP archives...');

try {
  // Create main distribution ZIP
  console.log('Creating Dynamic-Desktop-Portable.zip...');
  execSync(`cd "${rootDir}" && zip -r "${path.join(distDir, 'Dynamic-Desktop-Portable.zip')}" desktop-package/`, { stdio: 'inherit' });
  
  // Create installers ZIP
  console.log('Creating Dynamic-Desktop-Installers.zip...');
  execSync(`cd "${rootDir}" && zip -r "${path.join(distDir, 'Dynamic-Desktop-Installers.zip')}" installers/`, { stdio: 'inherit' });
  
  // Create source code ZIP (excluding node_modules and build artifacts)
  console.log('Creating Dynamic-Desktop-Source.zip...');
  execSync(`cd "${rootDir}" && zip -r "${path.join(distDir, 'Dynamic-Desktop-Source.zip')}" . -x "node_modules/*" ".next/*" "dist/*" "desktop-package/*" "distributions/*" ".git/*"`, { stdio: 'inherit' });
  
} catch (error) {
  console.log('⚠️  ZIP command not available, creating TAR archives instead...');
  
  // Fallback to tar if zip is not available
  execSync(`cd "${rootDir}" && tar -czf "${path.join(distDir, 'Dynamic-Desktop-Portable.tar.gz')}" desktop-package/`, { stdio: 'inherit' });
  execSync(`cd "${rootDir}" && tar -czf "${path.join(distDir, 'Dynamic-Desktop-Installers.tar.gz')}" installers/`, { stdio: 'inherit' });
  execSync(`cd "${rootDir}" && tar --exclude='node_modules' --exclude='.next' --exclude='dist' --exclude='desktop-package' --exclude='distributions' --exclude='.git' -czf "${path.join(distDir, 'Dynamic-Desktop-Source.tar.gz')}" .`, { stdio: 'inherit' });
}

// Create release notes
const releaseNotes = `# Dynamic Desktop v1.0.0 - Release Notes

## 🚀 What's New

### Desktop Application Package
Transform your web-based Dynamic Desktop into a full desktop application that runs natively on Windows, macOS, and Linux.

### Key Features
- **Complete Wallpaper Management**: Browse, add, and organize your wallpaper collection
- **Advanced Sidebar Navigation**: Left sidebar with all controls and quick access buttons  
- **Video & Image Support**: Full support for both video and static image wallpapers
- **Theme Generator**: Built-in theme generator with intelligent color suggestions
- **Real-time Playback Controls**: Play, pause, mute, and refresh wallpapers instantly
- **Settings Panel**: Comprehensive settings including low power mode and fullscreen behavior
- **Search & Organization**: Search wallpapers by name with grid/list view options
- **Cross-Platform**: Works on Windows, macOS, and Linux

### Installation Options

#### 📁 Portable Version (Recommended for most users)
1. Download: \`Dynamic-Desktop-Portable.zip\`
2. Extract to your desired location
3. Run:
   - **Windows**: Double-click \`start-windows.bat\`
   - **macOS/Linux**: Run \`./start-unix.sh\` in terminal
4. Application opens automatically in your browser

#### 🛠️ System Installation
1. Download: \`Dynamic-Desktop-Installers.zip\`
2. Extract and choose your platform installer:
   - **Windows**: Run \`install-windows.ps1\` as Administrator
   - **Linux**: Run \`sudo ./install-linux.sh\`  
   - **macOS**: Run \`./install-macos.sh\`
3. Creates desktop shortcuts and start menu entries

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **Memory**: 2GB RAM
- **Storage**: 100MB free space
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+

### Recommended Requirements  
- **Memory**: 4GB+ RAM
- **Storage**: 500MB+ free space (for wallpaper cache)
- **Internet**: Broadband connection for video wallpapers
- **Display**: 1920x1080 or higher resolution

## 🔧 Technical Details

### Built With
- **Frontend**: Next.js 15.3.3, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Desktop Runtime**: Node.js + Express server
- **Packaging**: Custom build scripts with static export

### Architecture
- Static web application served by local Express server
- Runs on localhost:3000 (configurable)
- No external dependencies after installation
- Automatic browser launching

## 📖 Usage Guide

### Getting Started
1. Install using one of the methods above
2. The application opens in your default browser
3. Use the left sidebar to navigate features
4. Click "Browse Wallpapers" to see your collection
5. Add new wallpapers using the "+" button

### Sidebar Navigation
- **📁 Browse Wallpapers**: View and select from your collection
- **➕ Add Wallpaper**: Add new video or image wallpapers
- **🎨 Theme Generator**: Create custom color themes
- **⏯️ Playback Controls**: Control video wallpaper playback
- **🔧 Settings**: Access advanced configuration options

### Tips & Tricks
- Use **Ctrl/Cmd + B** to toggle sidebar
- Enable "Low Power Mode" for better battery life
- Use "Pause on Fullscreen" to pause wallpapers when apps go fullscreen
- Search wallpapers by name in the browse dialog
- Switch between grid and list views for better organization

## 🐛 Troubleshooting

### Common Issues
**Application won't start**
- Ensure Node.js is installed (included in installers)
- Check if port 3000 is available
- Try running as administrator (Windows)

**Wallpapers not loading**
- Check internet connection for video wallpapers
- Verify wallpaper URLs are accessible
- Try refreshing the current wallpaper

**Poor performance**
- Enable "Low Power Mode" in settings
- Close other resource-intensive applications
- Consider using static wallpapers instead of videos

### Getting Help
- Check the README.md files in each package
- Review the console output for error messages
- Ensure your system meets the minimum requirements

## 🔄 Updates

This is version 1.0.0. Future updates will include:
- Automatic update checking
- More wallpaper sources and integrations
- Advanced effects and filters
- Cloud synchronization
- Mobile companion app

## 📄 License

This software is released under the MIT License. See LICENSE.txt for details.

---

**Enjoy your Dynamic Desktop experience!** 🎉
`;

fs.writeFileSync(path.join(distDir, 'RELEASE_NOTES.md'), releaseNotes);

// Create installation guide
const installGuide = `# 📋 Dynamic Desktop - Installation Guide

## Quick Start (Recommended)

### Option 1: Portable Version (No Installation Required)
1. **Download**: \`Dynamic-Desktop-Portable.zip\`
2. **Extract**: Unzip to any folder (e.g., \`C:\\Programs\\Dynamic-Desktop\`)
3. **Run**:
   - **Windows**: Double-click \`start-windows.bat\`
   - **Mac/Linux**: Open terminal, run \`./start-unix.sh\`
4. **Enjoy**: App opens automatically in your browser!

### Option 2: System Installation (With Shortcuts)
1. **Download**: \`Dynamic-Desktop-Installers.zip\`
2. **Extract**: Unzip the installers
3. **Install**:
   - **Windows**: Right-click \`install-windows.ps1\` → "Run with PowerShell"
   - **Linux**: \`sudo ./install-linux.sh\`
   - **macOS**: \`./install-macos.sh\`
4. **Launch**: Use desktop shortcut or start menu

## Detailed Installation Instructions

### Windows Installation

#### Method 1: Portable (Easiest)
\`\`\`cmd
1. Download Dynamic-Desktop-Portable.zip
2. Right-click → Extract All → Choose location
3. Navigate to extracted folder
4. Double-click start-windows.bat
5. Wait for browser to open automatically
\`\`\`

#### Method 2: System Install
\`\`\`powershell
1. Download Dynamic-Desktop-Installers.zip
2. Extract to a temporary folder
3. Right-click start-windows.ps1
4. Select "Run with PowerShell"
5. Follow prompts (may require Admin privileges)
6. Find "Dynamic Desktop" in Start Menu
\`\`\`

### macOS Installation

#### Method 1: Portable
\`\`\`bash
1. Download Dynamic-Desktop-Portable.zip
2. Double-click to extract
3. Open Terminal
4. cd /path/to/extracted/folder
5. chmod +x start-unix.sh
6. ./start-unix.sh
\`\`\`

#### Method 2: System Install
\`\`\`bash
1. Download Dynamic-Desktop-Installers.zip
2. Extract and open Terminal
3. cd /path/to/installers
4. chmod +x install-macos.sh
5. ./install-macos.sh
6. Find Dynamic Desktop in Applications
\`\`\`

### Linux Installation

#### Method 1: Portable
\`\`\`bash
1. Download Dynamic-Desktop-Portable.zip
2. unzip Dynamic-Desktop-Portable.zip
3. cd desktop-package
4. chmod +x start-unix.sh
5. ./start-unix.sh
\`\`\`

#### Method 2: System Install (Ubuntu/Debian)
\`\`\`bash
1. Download Dynamic-Desktop-Installers.zip
2. unzip Dynamic-Desktop-Installers.zip
3. cd installers
4. chmod +x install-linux.sh
5. sudo ./install-linux.sh
6. Launch from applications menu
\`\`\`

## Prerequisites

### Required (Auto-installed with system installers)
- **Node.js 18+**: For running the local server
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Manual Node.js Installation (if needed)
- **Windows**: Download from [nodejs.org](https://nodejs.org)
- **macOS**: \`brew install node\` or download from nodejs.org
- **Linux**: \`sudo apt install nodejs npm\` (Ubuntu/Debian)

## Configuration

### Port Configuration
Edit \`server.js\` in the installation folder:
\`\`\`javascript
const PORT = 3000; // Change to your preferred port
\`\`\`

### Browser Configuration
To use a specific browser, modify the start scripts:
\`\`\`bash
# Linux/Mac: edit start-unix.sh
google-chrome http://localhost:3000  # For Chrome
firefox http://localhost:3000        # For Firefox

# Windows: edit start-windows.bat
start chrome http://localhost:3000
\`\`\`

## Verification

After installation, verify everything works:
1. **Check Service**: Application should show "🚀 Dynamic Desktop is running"
2. **Check Browser**: Should open to http://localhost:3000
3. **Check Sidebar**: Left sidebar should be visible and functional
4. **Check Wallpapers**: Default wallpapers should be loaded

## Uninstallation

### Portable Version
Simply delete the extracted folder.

### System Installation
- **Windows**: Run \`uninstall.ps1\` or use Control Panel
- **Linux**: Run the generated \`uninstall.sh\` script
- **macOS**: Run the generated uninstall script or delete from Applications

## Troubleshooting

### Port Already in Use
\`\`\`
Error: listen EADDRINUSE :::3000
\`\`\`
**Solution**: Change PORT in server.js or kill process using port 3000

### Node.js Not Found
\`\`\`
'node' is not recognized as an internal or external command
\`\`\`
**Solution**: Install Node.js or add to PATH

### Permission Denied (Linux/Mac)
\`\`\`
Permission denied: ./start-unix.sh
\`\`\`
**Solution**: \`chmod +x start-unix.sh\`

### Browser Doesn't Open
**Solution**: Manually navigate to http://localhost:3000

## Advanced Usage

### Running as Service (Windows)
Use NSSM (Non-Sucking Service Manager):
\`\`\`cmd
nssm install DynamicDesktop
nssm set DynamicDesktop Application node.exe
nssm set DynamicDesktop AppParameters server.js
nssm set DynamicDesktop AppDirectory C:\\Program Files\\Dynamic Desktop
nssm start DynamicDesktop
\`\`\`

### Running as Daemon (Linux)
Create systemd service:
\`\`\`bash
sudo tee /etc/systemd/system/dynamic-desktop.service > /dev/null <<EOF
[Unit]
Description=Dynamic Desktop
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/opt/dynamic-desktop
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable dynamic-desktop
sudo systemctl start dynamic-desktop
\`\`\`

## Support

Need help? Check these resources:
1. **README.md** files in each package
2. **Console output** for error messages  
3. **System requirements** verification
4. **Port availability** checking

---

**Happy wallpaper managing!** 🎨
`;

fs.writeFileSync(path.join(distDir, 'INSTALLATION_GUIDE.md'), installGuide);

console.log('');
console.log('✅ Distribution packages created successfully!');
console.log('📁 Location:', distDir);
console.log('');
console.log('📦 Available packages:');
const files = fs.readdirSync(distDir);
files.forEach(file => {
  const filePath = path.join(distDir, file);
  const stats = fs.statSync(filePath);
  const size = (stats.size / 1024 / 1024).toFixed(2);
  console.log(`   - ${file} (${size} MB)`);
});
console.log('');
console.log('🚀 Ready for distribution!');
console.log('📋 Users can download and install using the packages above.');
