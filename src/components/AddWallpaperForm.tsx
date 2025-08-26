"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  type: z.enum(["image", "video"], { required_error: "You need to select a wallpaper type." }),
  sourceFile: z.any().refine(file => file instanceof File, "Please upload a source file."),
  thumbnailFile: z.any().refine(file => file instanceof File, "Please upload a thumbnail file."),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddWallpaperForm({ onFinish }: { onFinish: () => void }) {
  const { toast } = useToast();
  const { addWallpaper } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        name: "",
        type: "image",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const srcUrl = URL.createObjectURL(data.sourceFile);
      const thumbnailUrl = URL.createObjectURL(data.thumbnailFile);
      
      addWallpaper({
          name: data.name,
          type: data.type,
          src: srcUrl,
          thumbnail: thumbnailUrl
      });

      toast({
        title: "Wallpaper Added!",
        description: `${data.name} has been added to your collection.`,
      });
      onFinish();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Cyberpunk City'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="image" />
                      </FormControl>
                      <FormLabel className="font-normal">Image</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="video" />
                      </FormControl>
                      <FormLabel className="font-normal">Video</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sourceFile"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Source File</FormLabel>
                <FormControl>
                  <Input 
                    type="file"
                    accept={form.watch('type') === 'image' ? "image/*" : "video/*"}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            onChange(file);
                        }
                    }}
                    {...rest}
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnailFile"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Thumbnail File</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            onChange(file);
                        }
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Add Wallpaper
          </Button>
        </form>
      </Form>
    </div>
  );
}
