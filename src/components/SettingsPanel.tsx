"use client";

import Image from 'next/image';
import { useAppContext } from "@/contexts/AppContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPanel() {
    const { settings, updateSettings, wallpapers, currentWallpaper, setCurrentWallpaper } = useAppContext();

    return (
        <div className="grid gap-6 py-4">
            <h3 className="font-semibold text-lg">Performance</h3>
            <div className="flex items-center justify-between">
                <Label htmlFor="start-on-boot" className="flex flex-col gap-1">
                    <span>Start on Boot</span>
                    <span className="font-normal text-muted-foreground text-sm">Launch when Windows starts.</span>
                </Label>
                <Switch id="start-on-boot" checked={settings.startOnBoot} onCheckedChange={(val) => updateSettings({ startOnBoot: val })} />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="pause-on-fullscreen" className="flex flex-col gap-1">
                    <span>Pause on Fullscreen App</span>
                     <span className="font-normal text-muted-foreground text-sm">Pause when a game or app is fullscreen.</span>
                </Label>
                <Switch id="pause-on-fullscreen" checked={settings.pauseOnFullscreen} onCheckedChange={(val) => updateSettings({ pauseOnFullscreen: val })} />
            </div>
             <div className="flex items-center justify-between">
                <Label htmlFor="low-power-mode" className="flex flex-col gap-1">
                    <span>Low Power Mode</span>
                     <span className="font-normal text-muted-foreground text-sm">Reduces resource usage.</span>
                </Label>
                <Switch id="low-power-mode" checked={settings.lowPowerMode} onCheckedChange={(val) => updateSettings({ lowPowerMode: val })} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="fps-limit">FPS Limit: {settings.fpsLimit}</Label>
                <Slider id="fps-limit" min={10} max={60} step={5} value={[settings.fpsLimit]} onValueChange={(val) => updateSettings({ fpsLimit: val[0] })} />
            </div>

             <div className="flex items-center justify-between">
                <Label htmlFor="mute-audio" className="flex flex-col gap-1">
                    <span>Mute Audio</span>
                     <span className="font-normal text-muted-foreground text-sm">Mute audio from video wallpapers.</span>
                </Label>
                <Switch id="mute-audio" checked={settings.muteAudio} onCheckedChange={(val) => updateSettings({ muteAudio: val })} />
            </div>

            <h3 className="font-semibold text-lg mt-4">Wallpapers</h3>
            <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-4">
                    {wallpapers.map(wp => (
                        <Card key={wp.id} className={cn("cursor-pointer group relative overflow-hidden transition-all hover:scale-105", currentWallpaper.id === wp.id && "ring-2 ring-accent")} onClick={() => setCurrentWallpaper(wp)}>
                             <CardContent className="p-0">
                                <Image
                                    src={wp.thumbnail}
                                    alt={wp.name}
                                    width={300}
                                    height={200}
                                    className="aspect-video object-cover transition-transform group-hover:scale-110"
                                    data-ai-hint={wp.name.split(' ').slice(0,2).join(' ').toLowerCase()}
                                />
                                {currentWallpaper.id === wp.id && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-white" />
                                    </div>
                                )}
                             </CardContent>
                             <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                 <p className="text-white text-sm font-semibold truncate">{wp.name}</p>
                             </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
