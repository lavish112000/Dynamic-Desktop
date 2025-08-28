# 📋 Dynamic Desktop - Installation Guide

## Quick Start (Recommended)

### Option 1: Portable Version (No Installation Required)
1. **Download**: `Dynamic-Desktop-Portable.zip`
2. **Extract**: Unzip to any folder (e.g., `C:\Programs\Dynamic-Desktop`)
3. **Run**:
   - **Windows**: Double-click `start-windows.bat`
   - **Mac/Linux**: Open terminal, run `./start-unix.sh`
4. **Enjoy**: App opens automatically in your browser!

### Option 2: System Installation (With Shortcuts)
1. **Download**: `Dynamic-Desktop-Installers.zip`
2. **Extract**: Unzip the installers
3. **Install**:
   - **Windows**: Right-click `install-windows.ps1` → "Run with PowerShell"
   - **Linux**: `sudo ./install-linux.sh`
   - **macOS**: `./install-macos.sh`
4. **Launch**: Use desktop shortcut or start menu

## Detailed Installation Instructions

### Windows Installation

#### Method 1: Portable (Easiest)
```cmd
1. Download Dynamic-Desktop-Portable.zip
2. Right-click → Extract All → Choose location
3. Navigate to extracted folder
4. Double-click start-windows.bat
5. Wait for browser to open automatically
```

#### Method 2: System Install
```powershell
1. Download Dynamic-Desktop-Installers.zip
2. Extract to a temporary folder
3. Right-click start-windows.ps1
4. Select "Run with PowerShell"
5. Follow prompts (may require Admin privileges)
6. Find "Dynamic Desktop" in Start Menu
```

### macOS Installation

#### Method 1: Portable
```bash
1. Download Dynamic-Desktop-Portable.zip
2. Double-click to extract
3. Open Terminal
4. cd /path/to/extracted/folder
5. chmod +x start-unix.sh
6. ./start-unix.sh
```

#### Method 2: System Install
```bash
1. Download Dynamic-Desktop-Installers.zip
2. Extract and open Terminal
3. cd /path/to/installers
4. chmod +x install-macos.sh
5. ./install-macos.sh
6. Find Dynamic Desktop in Applications
```

### Linux Installation

#### Method 1: Portable
```bash
1. Download Dynamic-Desktop-Portable.zip
2. unzip Dynamic-Desktop-Portable.zip
3. cd desktop-package
4. chmod +x start-unix.sh
5. ./start-unix.sh
```

#### Method 2: System Install (Ubuntu/Debian)
```bash
1. Download Dynamic-Desktop-Installers.zip
2. unzip Dynamic-Desktop-Installers.zip
3. cd installers
4. chmod +x install-linux.sh
5. sudo ./install-linux.sh
6. Launch from applications menu
```

## Prerequisites

### Required (Auto-installed with system installers)
- **Node.js 18+**: For running the local server
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Manual Node.js Installation (if needed)
- **Windows**: Download from [nodejs.org](https://nodejs.org)
- **macOS**: `brew install node` or download from nodejs.org
- **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian)

## Configuration

### Port Configuration
Edit `server.js` in the installation folder:
```javascript
const PORT = 3000; // Change to your preferred port
```

### Browser Configuration
To use a specific browser, modify the start scripts:
```bash
# Linux/Mac: edit start-unix.sh
google-chrome http://localhost:3000  # For Chrome
firefox http://localhost:3000        # For Firefox

# Windows: edit start-windows.bat
start chrome http://localhost:3000
```

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
- **Windows**: Run `uninstall.ps1` or use Control Panel
- **Linux**: Run the generated `uninstall.sh` script
- **macOS**: Run the generated uninstall script or delete from Applications

## Troubleshooting

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Change PORT in server.js or kill process using port 3000

### Node.js Not Found
```
'node' is not recognized as an internal or external command
```
**Solution**: Install Node.js or add to PATH

### Permission Denied (Linux/Mac)
```
Permission denied: ./start-unix.sh
```
**Solution**: `chmod +x start-unix.sh`

### Browser Doesn't Open
**Solution**: Manually navigate to http://localhost:3000

## Advanced Usage

### Running as Service (Windows)
Use NSSM (Non-Sucking Service Manager):
```cmd
nssm install DynamicDesktop
nssm set DynamicDesktop Application node.exe
nssm set DynamicDesktop AppParameters server.js
nssm set DynamicDesktop AppDirectory C:\Program Files\Dynamic Desktop
nssm start DynamicDesktop
```

### Running as Daemon (Linux)
Create systemd service:
```bash
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
```

## Support

Need help? Check these resources:
1. **README.md** files in each package
2. **Console output** for error messages  
3. **System requirements** verification
4. **Port availability** checking

---

**Happy wallpaper managing!** 🎨
