// Server actions are disabled for static export
// This file is kept for reference but not used in the static build

import type { GenerateThemeColorsInput, GenerateThemeColorsOutput } from "@/ai/flows/generate-theme-colors";

export async function generateThemeAction(input: GenerateThemeColorsInput): Promise<GenerateThemeColorsOutput> {
  // Mock implementation for static export
  return {
    primaryColor: "#667eea",
    backgroundColor: "#1a1a1a",
    accentColor: "#764ba2",
    secondaryColor: "#4a4a4a",
    textColor: "#ffffff"
  };
}
