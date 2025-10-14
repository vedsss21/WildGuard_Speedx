"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useTranslation } from "@/contexts/language-context";
  
  export default function RangersPage() {
    const { t } = useTranslation();
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {t('nav.rangers')}
        </h1>
        <Card>
            <CardHeader>
                <CardTitle>{t('rangers.title')}</CardTitle>
                <CardDescription>
                    {t('rangers.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{t('rangers.content')}</p>
            </CardContent>
        </Card>
      </div>
    );
  }
