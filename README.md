# Dynamic Desktop

A Next.js-based live wallpaper application with AI-powered theme generation capabilities.

## Features

- **Live Wallpapers**: Support for video (MP4/WebM) and static image wallpapers
- **AI Theme Generation**: Generate custom color themes using GenKit AI
- **Dynamic Settings**: Configurable performance settings including FPS limit, power modes, and auto-pause
- **Custom Wallpapers**: Add your own wallpapers with thumbnail support
- **Accessibility**: Built with accessibility in mind including proper ARIA labels and contrast considerations
- **Error Handling**: Comprehensive error boundaries and validation

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **AI Integration**: GenKit AI for theme color generation
- **State Management**: React Context with proper TypeScript typing
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lavish112000/Dynamic-Desktop.git
cd Dynamic-Desktop
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if using AI features):
```bash
cp .env.example .env.local
# Add your GenKit AI configuration
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) to view the application.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start GenKit development server
- `npm run genkit:watch` - Start GenKit with file watching

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Home page
│   ├── actions.ts      # Server actions
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # Reusable UI components (Radix-based)
│   ├── Desktop.tsx    # Main desktop wallpaper component
│   ├── OSD.tsx        # On-screen display controls
│   ├── SettingsPanel.tsx    # Settings management
│   ├── ThemeGenerator.tsx   # AI theme generation
│   ├── AddWallpaperForm.tsx # Wallpaper upload form
│   └── ErrorBoundary.tsx   # Error handling component
├── contexts/          # React contexts
│   └── AppContext.tsx # Main application state
├── hooks/             # Custom React hooks
│   └── use-toast.ts   # Toast notifications
├── lib/               # Utility functions and types
│   ├── types.ts       # TypeScript type definitions
│   └── utils.ts       # Utility functions
└── ai/                # AI integration
    ├── flows/         # GenKit flows
    └── genkit.ts      # GenKit configuration
```

## Features in Detail

### Wallpaper Management
- Support for multiple wallpaper formats (images and videos)
- Dynamic wallpaper switching
- Custom wallpaper upload with thumbnail generation
- Memory-safe object URL handling

### AI Theme Generation
- Describe your desired theme in natural language
- AI generates harmonious color palettes
- One-click theme application
- Color validation and accessibility considerations

### Settings & Performance
- Start on boot configuration
- Pause on fullscreen applications
- FPS limiting for performance optimization
- Audio mute controls for video wallpapers
- Low power mode for battery conservation

### Accessibility
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Error states and user feedback
- Responsive design for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Quality

This project maintains high code quality standards:

- **TypeScript**: Full TypeScript coverage with strict mode
- **ESLint**: Configured with Next.js and TypeScript rules
- **Error Handling**: Comprehensive error boundaries and validation
- **Performance**: Optimized builds and lazy loading
- **Accessibility**: WCAG compliance considerations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- AI powered by [GenKit](https://firebase.google.com/docs/genkit)
- Icons from [Lucide React](https://lucide.dev/)
