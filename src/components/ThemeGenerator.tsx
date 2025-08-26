"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateThemeAction } from '@/app/actions';
import { Loader2, Paintbrush } from 'lucide-react';
import type { ThemeColors } from '@/lib/types';
import { useAppContext } from '@/contexts/AppContext';

const FormSchema = z.object({
  themeDescription: z.string().min(10, {
    message: "Please describe your desired theme in at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ThemeGenerator({ onFinish }: { onFinish: () => void }) {
  const { toast } = useToast();
  const { applyTheme } = useAppContext();
  const [generatedColors, setGeneratedColors] = useState<ThemeColors | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      themeDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedColors(null);
    try {
      const result = await generateThemeAction(data);
      setGeneratedColors(result);
      toast({
        title: "Theme Generated!",
        description: "Review the new theme colors below.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleApplyTheme = () => {
    if (generatedColors) {
        applyTheme(generatedColors);
        toast({
            title: "Theme Applied!",
            description: "The new color scheme has been applied.",
        });
        onFinish();
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="themeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A serene underwater world with glowing coral..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
                <>
                 <Paintbrush className="mr-2 h-4 w-4" />
                 Generate
                </>
            )}
          </Button>
        </form>
      </Form>

      {generatedColors && (
        <div className="mt-6 space-y-4 animate-in fade-in-50">
            <h4 className="font-semibold">Generated Palette</h4>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {Object.entries(generatedColors).map(([name, color]) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full border-2" style={{ backgroundColor: color }} />
                        <div className="text-center">
                            <p className="text-sm font-medium capitalize">{name.replace('Color', '')}</p>
                            <p className="text-xs text-muted-foreground">{color}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={handleApplyTheme} className="w-full">
                Apply Theme
            </Button>
        </div>
      )}
    </div>
  );
}
