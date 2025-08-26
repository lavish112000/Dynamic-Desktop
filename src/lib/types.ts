export type Wallpaper = {
  id: string;
  type: 'video' | 'image';
  src: string;
  thumbnail: string;
  name: string;
};

export type Settings = {
  startOnBoot: boolean;
  pauseOnFullscreen: boolean;
  fpsLimit: number;
  muteAudio: boolean;
  lowPowerMode: boolean;
};

export type ThemeColors = {
    primaryColor: string;
    backgroundColor: string;
    accentColor: string;
    secondaryColor: string;
    textColor: string;
};
