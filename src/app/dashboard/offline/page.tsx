"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/contexts/language-context";
import { HardDriveDownload, WifiOff, FileText, Upload } from "lucide-react";

export default function OfflinePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight flex items-center gap-2">
        <WifiOff className="w-8 h-8" />
        {t('offline.title')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('offline.sync.title')}</CardTitle>
            <CardDescription>
              {t('offline.sync.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
            <HardDriveDownload className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              {t('offline.sync.placeholder')}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
                <Upload className="mr-2"/>
                {t('offline.sync.button')}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('offline.generate.title')}</CardTitle>
            <CardDescription>
              {t('offline.generate.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center h-48">
             <FileText className="w-12 h-12 text-muted-foreground" />
             <p className="text-muted-foreground">
                {t('offline.generate.placeholder')}
             </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              {t('offline.generate.button')}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>{t('offline.pending.title')}</CardTitle>
            <CardDescription>
                {t('offline.pending.description')}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder={t('offline.pending.placeholder')} rows={8} readOnly/>
        </CardContent>
      </Card>
    </div>
  );
}
