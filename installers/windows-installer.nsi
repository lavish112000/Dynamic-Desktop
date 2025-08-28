
!define APP_NAME "Dynamic Desktop"
!define APP_VERSION "1.0.0"
!define APP_PUBLISHER "Dynamic Desktop Team"
!define APP_URL "https://github.com/lavish112000/Dynamic-Desktop"
!define APP_EXECUTABLE "start-windows.bat"

; Set the installer name
Name "${APP_NAME}"
OutFile "Dynamic-Desktop-Setup.exe"

; Set the installation directory
InstallDir "$PROGRAMFILES64\\Dynamic Desktop"

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
  File /r "..\\desktop-package\\*"
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\\Uninstall.exe"
  
  ; Create Start Menu shortcuts
  CreateDirectory "$SMPROGRAMS\\Dynamic Desktop"
  CreateShortCut "$SMPROGRAMS\\Dynamic Desktop\\Dynamic Desktop.lnk" "$INSTDIR\\start-windows.bat"
  CreateShortCut "$SMPROGRAMS\\Dynamic Desktop\\Uninstall.lnk" "$INSTDIR\\Uninstall.exe"
  
  ; Create Desktop shortcut
  CreateShortCut "$DESKTOP\\Dynamic Desktop.lnk" "$INSTDIR\\start-windows.bat"
  
  ; Register uninstaller in Control Panel
  WriteRegStr HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" "DisplayName" "${APP_NAME}"
  WriteRegStr HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" "UninstallString" "$INSTDIR\\Uninstall.exe"
  WriteRegStr HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" "Publisher" "${APP_PUBLISHER}"
  WriteRegStr HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" "DisplayVersion" "${APP_VERSION}"
  WriteRegStr HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop" "URLInfoAbout" "${APP_URL}"
  
SectionEnd

Section "Uninstall"
  ; Remove files
  RMDir /r "$INSTDIR"
  
  ; Remove Start Menu shortcuts
  RMDir /r "$SMPROGRAMS\\Dynamic Desktop"
  
  ; Remove Desktop shortcut
  Delete "$DESKTOP\\Dynamic Desktop.lnk"
  
  ; Remove registry entries
  DeleteRegKey HKLM "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Dynamic Desktop"
  
SectionEnd
