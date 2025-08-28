#!/bin/bash

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
