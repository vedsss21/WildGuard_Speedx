"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useTranslation } from "@/contexts/language-context";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
  
  export default function RangersPage() {
    const { t } = useTranslation();
    const wildlifeCollage = PlaceHolderImages.find(p => p.id === 'wildlife-collage');

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
            <CardContent className="flex flex-col items-center gap-4">
                <p>{t('rangers.content')}</p>
                {wildlifeCollage && (
                  <Image 
                    src={wildlifeCollage.imageUrl}
                    alt="Wildlife collage"
                    width={800}
                    height={300}
                    className="rounded-lg object-cover"
                    data-ai-hint={wildlifeCollage.imageHint}
                  />
                )}
            </CardContent>
        </Card>
      </div>
    );
  }
