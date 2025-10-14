"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  generateAnalysis,
  type GenerateAnalysisOutput,
} from "@/ai/flows/generate-analysis";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";

export default function AnalysisGenerator() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateAnalysisOutput | null>(null);
  const [query, setQuery] = useState("Show me a breakdown of leopard sightings in Pune for the last quarter.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast({
        variant: "destructive",
        title: "Query Required",
        description: "Please enter a query to generate an analysis.",
      });
      return;
    }
    startTransition(async () => {
      setResult(null);
      try {
        const analysisData = await generateAnalysis({ query });
        setResult(analysisData);
      } catch (error) {
        console.error("Failed to generate analysis:", error);
        toast({
          variant: "destructive",
          title: "Error Generating Analysis",
          description:
            "There was an issue with the AI service. Please try again later.",
        });
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>AI-Powered Analysis</CardTitle>
          <CardDescription>
            Use natural language to query your incident data and generate insights with Gemini.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="analysis-query">Your Query</Label>
            <Textarea
              id="analysis-query"
              placeholder="e.g., 'Compare crop damage incidents between January and March.'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
            />
          </div>
          {isPending && (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p>Generating analysis...</p>
            </div>
          )}
          {result && (
            <div className="space-y-2">
              <Label>Generated Analysis</Label>
              <ScrollArea className="h-60 w-full rounded-md border p-4">
                 <pre className="text-sm whitespace-pre-wrap font-body">{result.analysis}</pre>
              </ScrollArea>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Generate Analysis
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
