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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  generateIncidentReport,
  type GenerateIncidentReportOutput,
} from "@/ai/flows/generate-incident-report";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { useTranslation } from "@/contexts/language-context";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

export default function ReportGenerator() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateIncidentReportOutput | null>(null);
  const [month, setMonth] = useState(months[new Date().getMonth() -1]);
  const [year, setYear] = useState(currentYear.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      setResult(null);
      try {
        const reportData = await generateIncidentReport({ month, year });
        setResult(reportData);
      } catch (error) {
        console.error("Failed to generate report:", error);
        toast({
          variant: "destructive",
          title: t('reportGenerator.toast.titleError'),
          description:
          t('reportGenerator.toast.descriptionError'),
        });
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{t('reportGenerator.card.title')}</CardTitle>
          <CardDescription>
            {t('reportGenerator.card.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={setMonth} defaultValue={month}>
              <SelectTrigger>
                <SelectValue placeholder={t('reportGenerator.card.monthPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {t(`monthsFull.${m.toLowerCase()}` as any)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setYear} defaultValue={year}>
              <SelectTrigger>
                <SelectValue placeholder={t('reportGenerator.card.yearPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isPending && (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p>{t('reportGenerator.card.generating')}</p>
            </div>
          )}
          {result && (
            <ScrollArea className="h-48 w-full rounded-md border p-4">
               <pre className="text-sm whitespace-pre-wrap font-body">{result.report}</pre>
            </ScrollArea>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t('reportGenerator.card.button')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
