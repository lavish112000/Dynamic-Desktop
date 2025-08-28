"use client";

import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Desktop() {
  const { currentWallpaper, settings } = useAppContext();

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
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
        >
          <source src={currentWallpaper.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Sidebar Toggle Button - positioned in top-left */}
      <div className="absolute top-4 left-4 z-50">
        <div className="p-2 bg-card/50 backdrop-blur-md rounded-lg border border-border shadow-lg">
          <SidebarTrigger className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
