"use client";

import { useState } from 'react';
import { Settings, Palette, Power, Image as ImageIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SettingsPanel from './SettingsPanel';
import ThemeGenerator from './ThemeGenerator';
import { useAppContext } from '@/contexts/AppContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import AddWallpaperForm from './AddWallpaperForm';


export default function OSD() {
    const { switchToStatic } = useAppContext();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [themeGeneratorOpen, setThemeGeneratorOpen] = useState(false);
    const [addWallpaperOpen, setAddWallpaperOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-2 p-2 bg-card/50 backdrop-blur-md rounded-full border border-border shadow-lg">
                    <Dialog open={addWallpaperOpen} onOpenChange={setAddWallpaperOpen}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                                            <Plus className="h-6 w-6" />
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add Wallpaper</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add a New Wallpaper</DialogTitle>
                            </DialogHeader>
                            <AddWallpaperForm onFinish={() => setAddWallpaperOpen(false)} />
                        </DialogContent>
                    </Dialog>

                     <Dialog open={themeGeneratorOpen} onOpenChange={setThemeGeneratorOpen}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                                            <Palette className="h-6 w-6 text-accent" />
                                        </Button>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Generate Theme</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Generate a New Theme</DialogTitle>
                            </DialogHeader>
                            <ThemeGenerator onFinish={() => setThemeGeneratorOpen(false)} />
                        </DialogContent>
                    </Dialog>

                    <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                                            <Settings className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Settings</SheetTitle>
                            </SheetHeader>
                            <SettingsPanel />
                        </SheetContent>
                    </Sheet>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12" onClick={switchToStatic}>
                                    <ImageIcon className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Switch to Static</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                 <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
                                    <Power className="h-6 w-6 text-destructive" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Quit (Mock)</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
}
