# Dynamic Desktop - Live Wallpaper Application

Dynamic Desktop is a Next.js-based live wallpaper application that allows users to set video or image backgrounds with AI-powered theme generation capabilities. It features an on-screen display (OSD) for quick access to wallpaper management, settings, and theme generation.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Dependencies
- **ALWAYS** start with dependency installation:
  - `npm install` -- takes 40 seconds. NEVER CANCEL. Set timeout to 90+ seconds.
- Node.js version: 20.19.4
- npm version: 10.8.2
- Uses Next.js 15.3.3 with Turbopack

### Build Process
- **TypeScript check:** `npm run typecheck` -- takes 6 seconds. NEVER CANCEL. Set timeout to 15+ seconds.
- **Linting:** `npm run lint` -- takes 3 seconds. NEVER CANCEL. Set timeout to 15+ seconds.
  - Note: First-time ESLint setup takes 3.5 minutes and requires user input (select "Strict" option)
- **Build:** `npm run build` -- takes 27 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
  - Creates optimized production build with static generation
  - May show handlebars webpack warnings (expected, not breaking)

### Development Environment
- **Development server:** `npm run dev` -- starts in <1 second on port 9002. NEVER CANCEL. Set timeout to 30+ seconds.
  - Uses Turbopack for fast hot reloading
  - Access at: http://localhost:9002
- **Production server:** `npm run start` -- starts in <1 second on port 3000. NEVER CANCEL. Set timeout to 30+ seconds.
  - Requires `npm run build` first
  - Access at: http://localhost:3000

### AI Features (Genkit)
- **Genkit development:** `npm run genkit:dev` -- starts Genkit developer UI
  - **REQUIRES:** GEMINI_API_KEY or GOOGLE_API_KEY environment variable
  - **FAILS without API key** - this is expected behavior
  - Runs on http://localhost:4000 when API key is provided
- **Genkit with watch:** `npm run genkit:watch` -- auto-restarts on file changes

## Validation

### ALWAYS run these validation steps after making changes:
1. **Lint and type check:** `npm run lint && npm run typecheck`
2. **Build verification:** `npm run build`
3. **Manual testing scenarios:**
   - Start development server: `npm run dev`
   - Navigate to http://localhost:9002
   - **CRITICAL:** Test the OSD functionality by clicking each button:
     - Plus button: Should open "Add Wallpaper" dialog
     - Palette button: Should open "Generate Theme" dialog (may fail without API key - expected)
     - Settings button: Should open settings panel from the right
     - Image button: Should switch to static wallpaper
     - Power button: Mock quit functionality (tooltip shows "Quit (Mock)")
   - **Theme switching:** Test switching between different wallpapers
   - **Video playback:** Verify video wallpapers play correctly (may be blocked by browser)

### Manual Validation Requirements
- **NEVER** just start and stop the application - you MUST interact with the UI
- **ALWAYS** test at least one complete user flow: wallpaper selection, settings adjustment, or theme generation attempt
- **ALWAYS** verify the OSD (on-screen display) appears and all buttons are interactive
- **ALWAYS** check for console errors in browser developer tools

## Common Tasks

### Adding New Features
- **UI Components:** Located in `src/components/ui/` (shadcn/ui components)
- **Main Components:** Located in `src/components/` (Desktop, OSD, SettingsPanel, ThemeGenerator, AddWallpaperForm)
- **Types:** Defined in `src/lib/types.ts`
- **Context:** Application state managed in `src/contexts/AppContext.tsx`
- **AI Flows:** Located in `src/ai/flows/` for Genkit AI functionality

### Important File Locations
- **Main page:** `src/app/page.tsx`
- **Layout:** `src/app/layout.tsx`
- **Global styles:** `src/app/globals.css`
- **Tailwind config:** `tailwind.config.ts`
- **Component config:** `components.json` (shadcn/ui)
- **AI configuration:** `src/ai/genkit.ts`

### Environment Setup
- **NEVER** commit API keys to the repository
- **AI functionality requires:** Create `.env.local` with `GEMINI_API_KEY=your_key_here`
- **Firebase hosting:** Configured via `apphosting.yaml`

## Repository Structure Reference

### Root Directory Contents
```
.
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json
├── postcss.config.mjs
├── apphosting.yaml
├── .eslintrc.json
├── docs/
│   └── blueprint.md
└── src/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   ├── actions.ts
    │   └── globals.css
    ├── components/
    │   ├── Desktop.tsx
    │   ├── OSD.tsx
    │   ├── SettingsPanel.tsx
    │   ├── ThemeGenerator.tsx
    │   ├── AddWallpaperForm.tsx
    │   └── ui/ (shadcn/ui components)
    ├── contexts/
    │   └── AppContext.tsx
    ├── hooks/
    │   └── use-toast.ts
    ├── lib/
    │   ├── types.ts
    │   └── utils.ts
    └── ai/
        ├── genkit.ts
        ├── dev.ts
        └── flows/
            └── generate-theme-colors.ts
```

### Key Dependencies
- **Framework:** Next.js 15.3.3 with TypeScript
- **UI:** shadcn/ui components with Radix UI primitives
- **Styling:** TailwindCSS with tailwindcss-animate
- **AI:** Genkit with Google AI integration
- **Forms:** react-hook-form with zod validation
- **State:** React Context (AppContext)

## Troubleshooting

### Common Issues
- **Build warnings about handlebars:** Expected due to Genkit dependencies, not breaking
- **Video loading failures:** CDN resources may be blocked in development environment
- **AI functionality errors:** Requires valid GEMINI_API_KEY environment variable
- **ESLint configuration:** First run requires user interaction to select configuration

### Performance Notes
- **NEVER CANCEL** long-running commands - all operations complete in under 60 seconds
- Development server with Turbopack is extremely fast
- Build process is optimized and completes quickly
- Static generation is enabled for optimal performance

## Testing Strategy

### Pre-commit Validation
1. `npm run lint` (fixes linting issues)
2. `npm run typecheck` (validates TypeScript)
3. `npm run build` (ensures production build works)
4. Manual UI testing (verify OSD functionality)

### Continuous Integration
- No CI/CD workflows currently configured
- Manual validation is the primary testing strategy
- Focus on build success and UI functionality