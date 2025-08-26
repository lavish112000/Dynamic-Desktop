'use server';

/**
 * @fileOverview A flow for generating unique color palettes for desktop themes using GenAI.
 *
 * - generateThemeColors - A function that generates a theme color palette.
 * - GenerateThemeColorsInput - The input type for the generateThemeColors function.
 * - GenerateThemeColorsOutput - The return type for the generateThemeColors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThemeColorsInputSchema = z.object({
  themeDescription: z
    .string()
    .describe('A description of the desired desktop theme, including mood, style, and any specific elements.'),
});
export type GenerateThemeColorsInput = z.infer<typeof GenerateThemeColorsInputSchema>;

const GenerateThemeColorsOutputSchema = z.object({
  primaryColor: z.string().describe('The primary color for the theme (hex code).'),
  backgroundColor: z.string().describe('The background color for the theme (hex code).'),
  accentColor: z.string().describe('The accent color for the theme (hex code).'),
  secondaryColor: z.string().describe('A secondary color for UI elements (hex code).'),
  textColor: z.string().describe('The text color for the theme (hex code).'),
});
export type GenerateThemeColorsOutput = z.infer<typeof GenerateThemeColorsOutputSchema>;

export async function generateThemeColors(input: GenerateThemeColorsInput): Promise<GenerateThemeColorsOutput> {
  return generateThemeColorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThemeColorsPrompt',
  input: {schema: GenerateThemeColorsInputSchema},
  output: {schema: GenerateThemeColorsOutputSchema},
  prompt: `You are an expert in UI/UX design, specializing in creating harmonious color palettes for desktop themes.

  Based on the user's description of their desired theme, generate a color palette consisting of a primary color, background color, accent color, a secondary color for UI elements, and a text color. Ensure the colors work well together and are visually appealing for a desktop environment.

  Description: {{{themeDescription}}}
  Consider accessibility when choosing the text color, ensuring sufficient contrast with the background color.

  Return the colors as hex codes.
  `,
});

const generateThemeColorsFlow = ai.defineFlow(
  {
    name: 'generateThemeColorsFlow',
    inputSchema: GenerateThemeColorsInputSchema,
    outputSchema: GenerateThemeColorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
