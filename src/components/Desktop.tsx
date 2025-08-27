"use client";

import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import OSD from "./OSD";

export default function Desktop() {
  const { currentWallpaper, settings } = useAppContext();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {currentWallpaper.type === 'image' && (
        <Image
          src={currentWallpaper.src}
          alt={currentWallpaper.name}
          fill
          className="object-cover"
          quality={100}
          priority
          data-ai-hint="desktop background"
        />
      )}
      {currentWallpaper.type === 'video' && (
        <video
          key={currentWallpaper.src}
          autoPlay
          loop
          muted={settings.muteAudio}
          className="absolute top-0 left-0 w-full h-full object-cover"
          playsInline
          aria-label={`Desktop wallpaper: ${currentWallpaper.name}`}
          preload="metadata"
        >
          <source src={currentWallpaper.src} type="video/mp4" />
          <p>Your browser does not support the video tag. Please consider updating your browser for the best experience.</p>
        </video>
      )}
      <div className="absolute inset-0 bg-black/20" />
      <OSD />
    </div>
  );
}
