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
import { useTranslation } from "@/contexts/language-context";

export default function AnalysisGenerator() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateAnalysisOutput | null>(null);
  const [query, setQuery] = useState(t('analysis.defaultQuery'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast({
        variant: "destructive",
        title: t('analysis.toast.titleRequired'),
        description: t('analysis.toast.descriptionRequired'),
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
          title: t('analysis.toast.titleError'),
          description: t('analysis.toast.descriptionError'),
        });
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{t('analysis.card.title')}</CardTitle>
          <CardDescription>
            {t('analysis.card.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="analysis-query">{t('analysis.card.queryLabel')}</Label>
            <Textarea
              id="analysis-query"
              placeholder={t('analysis.card.queryPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
            />
          </div>
          {isPending && (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p>{t('analysis.card.generating')}</p>
            </div>
          )}
          {result && (
            <div className="space-y-2">
              <Label>{t('analysis.card.resultLabel')}</Label>
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
            {t('analysis.card.button')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
