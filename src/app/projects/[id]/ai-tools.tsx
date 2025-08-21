"use client";

import { useState } from "react";
import type { GameProject, Feedback } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { summarizePlaytestFeedback } from "@/ai/flows/summarize-feedback";
import { findThematicConflicts } from "@/ai/flows/find-thematic-conflicts";
import { suggestImprovements } from "@/ai/flows/suggest-improvements";
import { Bot, Loader2, Sparkles } from "lucide-react";

type AIToolsProps = {
  project: GameProject;
  feedback: Feedback[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}

export function AIToolsClient({ project, feedback }: AIToolsProps) {
  const [summaryState, summaryAction] = useFormState(
    async (_p: any, formData: FormData) => {
      const feedbackText = formData.get("feedbackText") as string;
      return summarizePlaytestFeedback({ feedbackText });
    },
    null
  );

  const [conflictState, conflictAction] = useFormState(
    async (_p: any, _formData: FormData) => {
      return findThematicConflicts({
        gameDescription: project.description,
        gameRules:
          "Players take turns to collect spice resources and fulfill contracts. The game ends when a player reaches 10 prestige points.", // Mock rules
      });
    },
    null
  );
  
  const [suggestionState, suggestionAction] = useFormState(
    async (_p: any, _formData: FormData) => {
      const feedbackSummary = feedback.map(f => `Player says: ${f.comments.liked} but disliked ${f.comments.disliked}, suggesting ${f.comments.suggestions}`).join('\n');
      return suggestImprovements({
        gameDescription: project.description,
        feedbackSummary: feedbackSummary || "No feedback available.",
      });
    },
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot />
          AI Design Assistant
        </CardTitle>
        <CardDescription>
          Use generative AI to get insights and accelerate your design process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Summarize Feedback</AccordionTrigger>
            <AccordionContent>
              <form action={summaryAction} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Paste in raw feedback notes to get a concise summary.
                </p>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="feedbackText">Feedback Text</Label>
                  <Textarea
                    placeholder="e.g., The game was fun, but the rules for scoring were hard to understand..."
                    id="feedbackText"
                    name="feedbackText"
                    rows={5}
                  />
                </div>
                <SubmitButton label="Generate Summary" />
                {summaryState?.summary && (
                  <div className="p-4 bg-muted rounded-lg border mt-4">
                    <h4 className="font-semibold mb-2">AI Summary:</h4>
                    <p className="text-sm">{summaryState.summary}</p>
                  </div>
                )}
              </form>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Find Thematic Conflicts</AccordionTrigger>
            <AccordionContent>
              <form action={conflictAction} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Analyze your game&apos;s description and rules to find elements that might not fit the theme.
                </p>
                <SubmitButton label="Analyze Theme" />
                {conflictState && (
                  <div className="p-4 bg-muted rounded-lg border mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">AI Analysis Summary:</h4>
                        <p className="text-sm">{conflictState.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Potential Conflicts:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                           {conflictState.conflicts.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                  </div>
                )}
              </form>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Suggest Improvements</AccordionTrigger>
            <AccordionContent>
            <form action={suggestionAction} className="space-y-4">
                 <p className="text-sm text-muted-foreground">
                  Get AI-powered suggestions based on existing feedback for your project. This tool will use the feedback submitted on the previous tab.
                </p>
                <SubmitButton label="Get Suggestions" />
                {suggestionState && (
                  <div className="p-4 bg-muted rounded-lg border mt-4 space-y-4">
                     <div>
                        <h4 className="font-semibold mb-2">Improvement Suggestions:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                           {suggestionState.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    {suggestionState.thematicConflicts.length > 0 && <div>
                        <h4 className="font-semibold mb-2">Identified Thematic Conflicts:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                           {suggestionState.thematicConflicts.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>}
                  </div>
                )}
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
