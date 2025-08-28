"use client";

import { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Power, 
  Image as ImageIcon, 
  Plus,
  Home,
  Monitor,
  Folder,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RefreshCw,
  Upload,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  Clock,
  Zap,
  MoreHorizontal,
  Heart,
  Download,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar as SidebarUI, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsPanel from './SettingsPanel';
import ThemeGenerator from './ThemeGenerator';
import AddWallpaperForm from './AddWallpaperForm';
import { useAppContext } from '@/contexts/AppContext';
import Image from 'next/image';

export default function Sidebar() {
  const { 
    wallpapers, 
    currentWallpaper, 
    setCurrentWallpaper, 
    settings, 
    updateSettings, 
    switchToStatic 
  } = useAppContext();
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeGeneratorOpen, setThemeGeneratorOpen] = useState(false);
  const [addWallpaperOpen, setAddWallpaperOpen] = useState(false);
  const [wallpaperGridOpen, setWallpaperGridOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredWallpapers = wallpapers.filter(wallpaper =>
    wallpaper.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Here you would implement actual play/pause logic for video wallpapers
    console.log(isPlaying ? 'Pausing wallpaper' : 'Playing wallpaper');
  };

  const handleMuteToggle = () => {
    updateSettings({ muteAudio: !settings.muteAudio });
  };

  const handleRefresh = () => {
    // Refresh current wallpaper
    console.log('Refreshing wallpaper');
    setCurrentWallpaper(currentWallpaper);
  };

  const handleExport = () => {
    // Export wallpaper collection
    console.log('Exporting wallpaper collection');
  };

  const handleImport = () => {
    // Import wallpaper collection
    console.log('Importing wallpaper collection');
  };

  const WallpaperGrid = () => (
    <ScrollArea className="h-[60vh] w-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Wallpapers</h3>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  >
                    {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {viewMode === 'grid' ? 'List' : 'Grid'} View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredWallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  currentWallpaper.id === wallpaper.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-transparent hover:border-muted-foreground/20'
                }`}
                onClick={() => setCurrentWallpaper(wallpaper)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={wallpaper.thumbnail}
                    alt={wallpaper.name}
                    fill
                    className="object-cover"
                  />
                  {wallpaper.type === 'video' && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        <Play className="h-3 w-3 mr-1" />
                        Video
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-2 bg-card">
                  <p className="text-sm font-medium truncate">{wallpaper.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredWallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  currentWallpaper.id === wallpaper.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentWallpaper(wallpaper)}
              >
                <div className="relative w-12 h-8 rounded overflow-hidden">
                  <Image
                    src={wallpaper.thumbnail}
                    alt={wallpaper.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{wallpaper.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{wallpaper.type}</p>
                </div>
                {currentWallpaper.id === wallpaper.id && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
            ))}
          </div>
        )}
        
        {filteredWallpapers.length === 0 && searchQuery && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No wallpapers found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );

  return (
    <SidebarUI className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <Monitor className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Dynamic Desktop</h2>
            <p className="text-xs text-muted-foreground">Wallpaper Manager</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Dialog open={wallpaperGridOpen} onOpenChange={setWallpaperGridOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <SidebarMenuButton>
                            <Folder className="h-4 w-4" />
                            <span>Browse Wallpapers</span>
                            <Badge variant="secondary" className="ml-auto">
                              {wallpapers.length}
                            </Badge>
                          </SidebarMenuButton>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Browse and select wallpapers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Wallpaper Collection</DialogTitle>
                    </DialogHeader>
                    <WallpaperGrid />
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Dialog open={addWallpaperOpen} onOpenChange={setAddWallpaperOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <SidebarMenuButton>
                            <Plus className="h-4 w-4" />
                            <span>Add Wallpaper</span>
                          </SidebarMenuButton>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Add a new wallpaper</p>
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
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Dialog open={themeGeneratorOpen} onOpenChange={setThemeGeneratorOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <SidebarMenuButton>
                            <Palette className="h-4 w-4" />
                            <span>Theme Generator</span>
                          </SidebarMenuButton>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Generate custom themes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Generate a New Theme</DialogTitle>
                    </DialogHeader>
                    <ThemeGenerator onFinish={() => setThemeGeneratorOpen(false)} />
                  </DialogContent>
                </Dialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Playback Controls */}
        <SidebarGroup>
          <SidebarGroupLabel>Playback Controls</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span>{isPlaying ? 'Pause' : 'Play'}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{isPlaying ? 'Pause wallpaper' : 'Resume wallpaper'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton onClick={handleMuteToggle}>
                        {settings.muteAudio ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span>{settings.muteAudio ? 'Unmute' : 'Mute'}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{settings.muteAudio ? 'Unmute audio' : 'Mute audio'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton onClick={switchToStatic}>
                        <ImageIcon className="h-4 w-4" />
                        <span>Switch to Static</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Switch to static wallpaper</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton onClick={handleRefresh}>
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Refresh current wallpaper</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Current Wallpaper Info */}
        <SidebarGroup>
          <SidebarGroupLabel>Current Wallpaper</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-12 h-8 rounded overflow-hidden">
                  <Image
                    src={currentWallpaper.thumbnail}
                    alt={currentWallpaper.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{currentWallpaper.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {currentWallpaper.type}
                    </Badge>
                    {currentWallpaper.type === 'video' && (
                      <Badge variant="secondary" className="text-xs">
                        {isPlaying ? 'Playing' : 'Paused'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Quick Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Low Power Mode</span>
                </div>
                <Switch
                  checked={settings.lowPowerMode}
                  onCheckedChange={(checked: boolean) => updateSettings({ lowPowerMode: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Maximize2 className="h-4 w-4" />
                  <span className="text-sm">Pause on Fullscreen</span>
                </div>
                <Switch
                  checked={settings.pauseOnFullscreen}
                  onCheckedChange={(checked: boolean) => updateSettings({ pauseOnFullscreen: checked })}
                />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <SidebarMenuButton>
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SheetTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Open settings panel</p>
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
          </SidebarMenuItem>

          <SidebarMenuItem>
            <AlertDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <SidebarMenuButton>
                        <Power className="h-4 w-4 text-destructive" />
                        <span>Quit Application</span>
                      </SidebarMenuButton>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Quit the application</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will close the Dynamic Desktop application and stop all wallpaper playback.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Quit Application
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarUI>
  );
}
