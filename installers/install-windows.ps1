
# Dynamic Desktop PowerShell Installer
# This script creates a self-extracting installer for Windows

param(
    [string]$InstallPath = "$env:ProgramFiles\Dynamic Desktop"
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
$SourcePath = Join-Path $PSScriptRoot "..\desktop-package"
if (Test-Path $SourcePath) {
    Write-Host "Copying application files..." -ForegroundColor Yellow
    Copy-Item -Path "$SourcePath\*" -Destination $InstallPath -Recurse -Force
} else {
    Write-Host "Error: Source files not found. Please build the desktop package first." -ForegroundColor Red
    exit 1
}

# Create Start Menu shortcut
$StartMenuPath = "$env:ProgramData\Microsoft\Windows\Start Menu\Programs"
$ShortcutPath = "$StartMenuPath\Dynamic Desktop.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "$InstallPath\start-windows.bat"
$Shortcut.WorkingDirectory = $InstallPath
$Shortcut.Description = "Dynamic Desktop - Live Wallpaper Manager"
$Shortcut.Save()

# Create Desktop shortcut
$DesktopShortcut = "$env:PUBLIC\Desktop\Dynamic Desktop.lnk"
$DesktopShortcutObj = $WScriptShell.CreateShortcut($DesktopShortcut)
$DesktopShortcutObj.TargetPath = "$InstallPath\start-windows.bat"
$DesktopShortcutObj.WorkingDirectory = $InstallPath
$DesktopShortcutObj.Description = "Dynamic Desktop - Live Wallpaper Manager"
$DesktopShortcutObj.Save()

# Add to Windows Programs list
$RegPath = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Dynamic Desktop"
New-Item -Path $RegPath -Force | Out-Null
Set-ItemProperty -Path $RegPath -Name "DisplayName" -Value "Dynamic Desktop"
Set-ItemProperty -Path $RegPath -Name "Publisher" -Value "Dynamic Desktop Team"
Set-ItemProperty -Path $RegPath -Name "DisplayVersion" -Value "1.0.0"
Set-ItemProperty -Path $RegPath -Name "InstallLocation" -Value $InstallPath
Set-ItemProperty -Path $RegPath -Name "UninstallString" -Value "powershell.exe -ExecutionPolicy Bypass -File \"$InstallPath\uninstall.ps1\""

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
Remove-Item -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\Dynamic Desktop" -Force -ErrorAction SilentlyContinue

Write-Host "Dynamic Desktop has been uninstalled." -ForegroundColor Green
"@

$UninstallScript | Out-File -FilePath "$InstallPath\uninstall.ps1" -Encoding UTF8

Write-Host ""
Write-Host "Installation completed successfully!" -ForegroundColor Green
Write-Host "You can find Dynamic Desktop in:" -ForegroundColor Cyan
Write-Host "- Start Menu" -ForegroundColor Cyan
Write-Host "- Desktop shortcut" -ForegroundColor Cyan
Write-Host "- $InstallPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "To uninstall, run: $InstallPath\uninstall.ps1" -ForegroundColor Yellow
