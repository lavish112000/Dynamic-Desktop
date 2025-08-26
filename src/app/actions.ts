"use server";

import { generateThemeColors } from "@/ai/flows/generate-theme-colors";
import type { GenerateThemeColorsInput, GenerateThemeColorsOutput } from "@/ai/flows/generate-theme-colors";

export async function generateThemeAction(input: GenerateThemeColorsInput): Promise<GenerateThemeColorsOutput> {
  try {
    const output = await generateThemeColors(input);
    return output;
  } catch (error) {
    console.error("Error generating theme:", error);
    throw new Error("Failed to generate theme colors. Please try again.");
  }
}
