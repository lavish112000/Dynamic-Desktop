"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Wallpaper, Settings, ThemeColors } from '@/lib/types';

const initialWallpapers: Wallpaper[] = [
  { id: 'vid1', type: 'video', src: 'https://cdn.pixabay.com/video/2024/02/05/197907-910236049_large.mp4', thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjdlZWE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY0YmEyO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+VmlkZW8gMTwvdGV4dD48L3N2Zz4=', name: 'Cosmic Flow' },
  { id: 'vid2', type: 'video', src: 'https://cdn.pixabay.com/video/2023/07/01/172153-842289139_large.mp4', thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQyIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY2MzczO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmNzc5NDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQyKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5WaWRlbyAyPC90ZXh0Pjwvc3ZnPg==', name: 'Neon City' },
  { id: 'img1', type: 'image', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop', thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNGZhOTRkO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMwZjI0MjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQzKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5Nb3VudGFpbnM8L3RleHQ+PC9zdmc+', name: 'Misty Mountains' },
  { id: 'img2', type: 'image', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop', thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ0IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDVhNWZmO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFkNGVkODtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQ0KSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5CZWFjaDwvdGV4dD48L3N2Zz4=', name: 'Serene Beach' },
  { id: 'static', type: 'image', src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop', thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQ1IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOGJjMzRhO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzU1N2I4MztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQ1KSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5TdGF0aWM8L3RleHQ+PC9zdmc+', name: 'Static Default' },
];

interface AppContextType {
  wallpapers: Wallpaper[];
  currentWallpaper: Wallpaper;
  setCurrentWallpaper: (wallpaper: Wallpaper) => void;
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  switchToStatic: () => void;
  applyTheme: (colors: ThemeColors) => void;
  addWallpaper: (wallpaper: Omit<Wallpaper, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(initialWallpapers);
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [settings, setSettings] = useState<Settings>({
    startOnBoot: true,
    pauseOnFullscreen: true,
    fpsLimit: 30,
    muteAudio: false,
    lowPowerMode: false,
  });

  useEffect(() => {
    if (settings.pauseOnFullscreen) {
        console.log("Mock: Pause on fullscreen is enabled.");
    }
  }, [settings.pauseOnFullscreen])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const switchToStatic = () => {
    const staticWallpaper = wallpapers.find(w => w.id === 'static');
    if (staticWallpaper) {
        setCurrentWallpaper(staticWallpaper);
    }
  };
  
  const addWallpaper = (newWallpaperData: Omit<Wallpaper, 'id'>) => {
    const newWallpaper: Wallpaper = {
        id: `wallpaper_${Date.now()}`,
        ...newWallpaperData,
    };
    setWallpapers(prev => [...prev, newWallpaper]);
  };

  const applyTheme = (colors: ThemeColors) => {
    const root = document.documentElement;
    const hexToHsl = (hex: string): string => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    root.style.setProperty('--primary', hexToHsl(colors.primaryColor));
    root.style.setProperty('--background', hexToHsl(colors.backgroundColor));
    root.style.setProperty('--accent', hexToHsl(colors.accentColor));
    root.style.setProperty('--card', hexToHsl(colors.backgroundColor));
    root.style.setProperty('--popover', hexToHsl(colors.backgroundColor));
    root.style.setProperty('--secondary', hexToHsl(colors.secondaryColor));
    root.style.setProperty('--foreground', hexToHsl(colors.textColor));
    root.style.setProperty('--sidebar-background', hexToHsl(colors.backgroundColor));
  };


  return (
    <AppContext.Provider value={{ wallpapers, currentWallpaper, setCurrentWallpaper, settings, updateSettings, switchToStatic, applyTheme, addWallpaper }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
