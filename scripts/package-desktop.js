const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏗️  Building Dynamic Desktop for Desktop Installation...\n');

// Create desktop package directory
const desktopDir = path.join(__dirname, '..', 'desktop-package');
const distDir = path.join(__dirname, '..', 'dist');

// Clean and create desktop package directory
if (fs.existsSync(desktopDir)) {
  fs.rmSync(desktopDir, { recursive: true, force: true });
}
fs.mkdirSync(desktopDir, { recursive: true });

console.log('📁 Copying build files...');

// Copy dist files to desktop package
if (fs.existsSync(distDir)) {
  copyRecursive(distDir, path.join(desktopDir, 'app'));
} else {
  console.error('❌ Build files not found. Please run "npm run build" first.');
  process.exit(1);
}

// Create a simple server script for the desktop app
const serverScript = `
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'app')));

// Handle all routes with index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(PORT, () => {
  console.log('🚀 Dynamic Desktop is running on http://localhost:' + PORT);
  
  // Auto-open in default browser
  const start = process.platform === 'darwin' ? 'open' : 
                process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(start + ' http://localhost:' + PORT);
});
`;

fs.writeFileSync(path.join(desktopDir, 'server.js'), serverScript);

// Create package.json for the desktop app
const desktopPackageJson = {
  "name": "dynamic-desktop",
  "version": "1.0.0",
  "description": "Dynamic Desktop - Live Wallpaper Manager",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "install-deps": "npm install express"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "author": "Dynamic Desktop Team",
  "license": "MIT"
};

fs.writeFileSync(
  path.join(desktopDir, 'package.json'), 
  JSON.stringify(desktopPackageJson, null, 2)
);

// Create Windows batch file
const windowsBatch = `@echo off
title Dynamic Desktop
echo Installing dependencies...
call npm install
echo Starting Dynamic Desktop...
call npm start
pause
`;

fs.writeFileSync(path.join(desktopDir, 'start-windows.bat'), windowsBatch);

// Create Linux/Mac shell script
const shellScript = `#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Starting Dynamic Desktop..."
npm start
`;

fs.writeFileSync(path.join(desktopDir, 'start-unix.sh'), shellScript);

// Make shell script executable
try {
  execSync('chmod +x ' + path.join(desktopDir, 'start-unix.sh'));
} catch (e) {
  console.log('Note: Could not make shell script executable. Run chmod +x start-unix.sh manually.');
}

// Create README for the desktop package
const readme = `# Dynamic Desktop - Desktop Application

## Installation Instructions

### Windows:
1. Extract this folder to your desired location (e.g., C:\\\\Programs\\\\Dynamic-Desktop)
2. Double-click \`start-windows.bat\` to install dependencies and start the application
3. The application will open in your default browser at http://localhost:3000

### Linux/Mac:
1. Extract this folder to your desired location
2. Open terminal in this folder
3. Run: \`./start-unix.sh\`
4. The application will open in your default browser at http://localhost:3000

### Manual Installation:
1. Install Node.js if not already installed: https://nodejs.org/
2. Open terminal/command prompt in this folder
3. Run: \`npm install\`
4. Run: \`npm start\`
5. Open http://localhost:3000 in your browser

## Features:
- Complete wallpaper management system
- Left sidebar navigation with all controls
- Video and image wallpaper support
- Theme generation and customization
- Settings panel with advanced options
- Search and browse wallpaper collections

## Requirements:
- Node.js 18+ (automatically handled by start scripts)
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for video wallpapers

## Troubleshooting:
- If port 3000 is busy, edit server.js and change the PORT variable
- Make sure Node.js is installed and available in PATH
- For firewall issues, allow Node.js through your firewall

Enjoy your Dynamic Desktop experience!
`;

fs.writeFileSync(path.join(desktopDir, 'README.md'), readme);

console.log('✅ Desktop package created successfully!');
console.log('📦 Package location:', desktopDir);
console.log('');
console.log('📋 Next steps:');
console.log('1. Compress the desktop-package folder into a ZIP file');
console.log('2. Distribute the ZIP file to users');
console.log('3. Users can extract and run start-windows.bat (Windows) or start-unix.sh (Linux/Mac)');
console.log('');
console.log('🚀 To test locally, navigate to desktop-package and run:');
console.log('   npm install && npm start');

// Helper function to copy files recursively
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
