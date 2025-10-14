"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/contexts/language-context";


const MapViewFull = dynamic(() => import("@/components/dashboard/map-view-full"), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
});


const initialPeakTimeData = [
    { hour: "00:00", sightings: 10 },
    { hour: "03:00", sightings: 15 },
    { hour: "06:00", sightings: 45 },
    { hour: "09:00", sightings: 30 },
    { hour: "12:00", sightings: 20 },
    { hour: "15:00", sightings: 25 },
    { hour: "18:00", sightings: 80 },
    { hour: "21:00", sightings: 50 },
];
  
const initialSightingFrequencyData = [
    { animal: "Leopard", count: 120 },
    { animal: "Elephant", count: 80 },
    { animal: "Wild Boar", count: 250 },
    { animal: "Snake", count: 180 },
    { animal: "Monkey", count: 300 },
];
  
export default function AnalyzerPage() {
    const { t } = useTranslation();
    const [peakTimeData, setPeakTimeData] = useState(initialPeakTimeData);
    const [sightingFrequencyData, setSightingFrequencyData] = useState(initialSightingFrequencyData);

    useEffect(() => {
        const interval = setInterval(() => {
          setPeakTimeData(prevData =>
            prevData.map(item => ({
              ...item,
              sightings: Math.max(5, item.sightings + Math.floor(Math.random() * 5) - 2),
            }))
          );
    
          setSightingFrequencyData(prevData =>
            prevData.map(item => ({
              ...item,
              count: item.count + Math.floor(Math.random() * 3),
            }))
          );
        }, 3000); 
    
        return () => clearInterval(interval);
      }, []);


    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
                {t('analyzer.title')}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('analyzer.peakTimes.title')}</CardTitle>
                        <CardDescription>{t('analyzer.peakTimes.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer config={{}} className="w-full h-full">
                                <LineChart data={peakTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        content={<ChartTooltipContent
                                            labelFormatter={(label) => `${t('analyzer.peakTimes.tooltipTime')}: ${label}`}
                                            formatter={(value) => [`${value} ${t('analyzer.peakTimes.tooltipSightings')}`, t('analyzer.peakTimes.tooltipSightings')]}
                                            indicator="dot"
                                        />}
                                    />
                                    <Line type="monotone" dataKey="sightings" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('analyzer.frequency.title')}</CardTitle>
                        <CardDescription>{t('analyzer.frequency.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer config={{}} className="w-full h-full">
                                <BarChart data={sightingFrequencyData.map(d => ({...d, animal: t(`animals.${d.animal.toLowerCase().replace(' ','')}` as any)}))} accessibilityLayer margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="animal" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent 
                                            formatter={(value) => [`${value} ${t('analyzer.frequency.tooltipSightings')}`, t('analyzer.frequency.tooltipTotalSightings')]}
                                            indicator="dot" 
                                        />}
                                    />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>{t('analyzer.hotspots.title')}</CardTitle>
                    <CardDescription>{t('analyzer.hotspots.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="h-[400px] w-full rounded-lg overflow-hidden border">
                        <MapViewFull />
                   </div>
                </CardContent>
            </Card>
        </div>
    );
}
