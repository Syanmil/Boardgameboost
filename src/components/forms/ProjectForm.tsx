'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  projectSchema,
  type ProjectFormData,
} from '@/lib/schemas/project.schema';
import { useCreateProject } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, Loader2, X } from 'lucide-react';

/**
 * Multi-step Project Creation Form
 * Steps: 1. Basic Info -> 2. Game Details -> 3. Review & Submit
 */

const MECHANICS_OPTIONS = [
  'Worker Placement',
  'Deck Building',
  'Hand Management',
  'Set Collection',
  'Tile Placement',
  'Dice Rolling',
  'Area Control',
  'Cooperative',
  'Engine Building',
  'Drafting',
  'Real-Time',
  'Push Your Luck',
  'Trading',
  'Auction Bidding',
  'Pattern Building',
];

const THEMES_OPTIONS = [
  'Fantasy',
  'Science Fiction',
  'Medieval',
  'Ancient Civilizations',
  'Economic',
  'Abstract',
  'Horror',
  'Adventure',
  'Pirates',
  'Space Exploration',
  'City Building',
  'Farming',
  'Animals',
  'Mystery',
  'War',
];

type ProjectFormProps = {
  onSuccess?: (projectId: string) => void;
  onCancel?: () => void;
};

export function ProjectForm({ onSuccess, onCancel }: ProjectFormProps) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const createProject = useCreateProject();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      tagline: '',
      stage: 'concept',
      playerCount: {
        min: 2,
        max: 4,
      },
      playTime: 60,
      complexity: 3,
      mechanics: [],
      themes: [],
      visibility: 'public',
    },
  });

  const watchedMechanics = form.watch('mechanics');
  const watchedThemes = form.watch('themes');

  // Toggle mechanic selection
  const toggleMechanic = (mechanic: string) => {
    const current = form.getValues('mechanics');
    if (current.includes(mechanic)) {
      form.setValue(
        'mechanics',
        current.filter((m) => m !== mechanic)
      );
    } else {
      if (current.length < 10) {
        form.setValue('mechanics', [...current, mechanic]);
      }
    }
  };

  // Toggle theme selection
  const toggleTheme = (theme: string) => {
    const current = form.getValues('themes') || [];
    if (current.includes(theme)) {
      form.setValue(
        'themes',
        current.filter((t) => t !== theme)
      );
    } else {
      if (current.length < 5) {
        form.setValue('themes', [...current, theme]);
      }
    }
  };

  // Validate current step before proceeding
  const validateStep = async (currentStep: number) => {
    let fieldsToValidate: (keyof ProjectFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['title', 'description', 'tagline', 'stage'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['playerCount', 'playTime', 'complexity', 'mechanics'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    createProject.mutate(data, {
      onSuccess: (project) => {
        if (onSuccess) {
          onSuccess(project.id);
        } else {
          router.push(`/projects/${project.id}`);
        }
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step > s
                    ? 'bg-primary border-primary text-primary-foreground'
                    : step === s
                    ? 'border-primary text-primary'
                    : 'border-muted text-muted-foreground'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    step > s ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${step === 1 ? 'font-semibold' : 'text-muted-foreground'}`}>
            Basic Info
          </span>
          <span className={`text-sm ${step === 2 ? 'font-semibold' : 'text-muted-foreground'}`}>
            Game Details
          </span>
          <span className={`text-sm ${step === 3 ? 'font-semibold' : 'text-muted-foreground'}`}>
            Review
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Tell us about your game. You can always update this later.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Nusantara Traders" {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a memorable name for your game (3-100 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., A spice trading adventure in ancient Indonesia"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short, catchy description (optional, max 150 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your game's core concept, gameplay, and what makes it unique..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description of your game (50-2000 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Development Stage *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="concept">Concept - Initial idea</SelectItem>
                          <SelectItem value="prototype">Prototype - Building first version</SelectItem>
                          <SelectItem value="playtesting">Playtesting - Ready to test</SelectItem>
                          <SelectItem value="refining">Refining - Improving based on feedback</SelectItem>
                          <SelectItem value="pitching">Pitching - Ready for publishers</SelectItem>
                          <SelectItem value="published">Published - Game is released</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Where is your game in the development process?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Game Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Game Details</CardTitle>
                <CardDescription>
                  Tell us about the gameplay specifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="playerCount.min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Players *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={20}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="playerCount.max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Players *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={20}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="playTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Play Time (minutes) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={5}
                          max={600}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Estimated play time in minutes (5-600)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complexity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complexity (1-5) *</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <Button
                              key={level}
                              type="button"
                              variant={field.value === level ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => field.onChange(level)}
                            >
                              {level}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        1 = Very Simple, 5 = Very Complex
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mechanics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game Mechanics * (select 1-10)</FormLabel>
                      <div className="flex flex-wrap gap-2 p-4 border rounded-md">
                        {MECHANICS_OPTIONS.map((mechanic) => (
                          <Badge
                            key={mechanic}
                            variant={watchedMechanics.includes(mechanic) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleMechanic(mechanic)}
                          >
                            {mechanic}
                            {watchedMechanics.includes(mechanic) && (
                              <X className="ml-1 w-3 h-3" />
                            )}
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>
                        Selected: {watchedMechanics.length}/10
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="themes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Themes (optional, up to 5)</FormLabel>
                      <div className="flex flex-wrap gap-2 p-4 border rounded-md">
                        {THEMES_OPTIONS.map((theme) => (
                          <Badge
                            key={theme}
                            variant={(watchedThemes || []).includes(theme) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => toggleTheme(theme)}
                          >
                            {theme}
                            {(watchedThemes || []).includes(theme) && (
                              <X className="ml-1 w-3 h-3" />
                            )}
                          </Badge>
                        ))}
                      </div>
                      <FormDescription>
                        Selected: {(watchedThemes || []).length}/5
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Project</CardTitle>
                <CardDescription>
                  Please review your information before submitting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{form.getValues('title')}</h3>
                  {form.getValues('tagline') && (
                    <p className="text-sm text-muted-foreground italic mb-2">
                      {form.getValues('tagline')}
                    </p>
                  )}
                  <p className="text-sm mb-4">{form.getValues('description')}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Stage:</span>{' '}
                    <Badge className="ml-2 capitalize">{form.getValues('stage')}</Badge>
                  </div>
                  <div>
                    <span className="font-semibold">Players:</span>{' '}
                    {form.getValues('playerCount.min')}-{form.getValues('playerCount.max')}
                  </div>
                  <div>
                    <span className="font-semibold">Play Time:</span>{' '}
                    {form.getValues('playTime')} min
                  </div>
                  <div>
                    <span className="font-semibold">Complexity:</span>{' '}
                    {form.getValues('complexity')}/5
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-sm">Mechanics:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.getValues('mechanics').map((mechanic) => (
                      <Badge key={mechanic} variant="secondary">
                        {mechanic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {(form.getValues('themes') || []).length > 0 && (
                  <div>
                    <span className="font-semibold text-sm">Themes:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(form.getValues('themes') || []).map((theme) => (
                        <Badge key={theme} variant="outline">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              {step === 1 && onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {step < 3 && (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {step === 3 && (
                <Button type="submit" disabled={createProject.isPending}>
                  {createProject.isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Create Project
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
