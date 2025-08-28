#!/bin/bash

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
cd "$(dirname "$0")/../Resources"
./start-unix.sh
EOF

chmod +x "$MACOS_DIR/dynamic-desktop"

echo ""
echo "Installation completed successfully!"
echo "Dynamic Desktop is now installed in your Applications folder."
echo "You can find it in Launchpad or Applications directory."
