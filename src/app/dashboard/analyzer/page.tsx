
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, LineChart, Line, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const peakTimeData = [
    { hour: "00:00", sightings: 10 },
    { hour: "03:00", sightings: 15 },
    { hour: "06:00", sightings: 45 },
    { hour: "09:00", sightings: 30 },
    { hour: "12:00", sightings: 20 },
    { hour: "15:00", sightings: 25 },
    { hour: "18:00", sightings: 80 },
    { hour: "21:00", sightings: 50 },
  ];
  
const sightingFrequencyData = [
    { animal: "Leopard", count: 120 },
    { animal: "Elephant", count: 80 },
    { animal: "Wild Boar", count: 250 },
    { animal: "Snake", count: 180 },
    { animal: "Monkey", count: 300 },
];
  
export default function AnalyzerPage() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">
            Animal Activity Analyzer
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Activity Times</CardTitle>
                        <CardDescription>Hourly breakdown of wildlife sightings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer config={{}} className="w-full h-full">
                                <LineChart data={peakTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="hour" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="sightings" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Sighting Frequency Analysis</CardTitle>
                        <CardDescription>Most frequently sighted animals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ChartContainer config={{}} className="w-full h-full">
                                <BarChart data={sightingFrequencyData} accessibilityLayer>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="animal" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis />
                                    <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Common Corridors & Hotspots</CardTitle>
                    <CardDescription>Heatmap showing areas of high animal presence and movement.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Map of common corridors will be displayed here.</p>
                   </div>
                </CardContent>
            </Card>
        </div>
    );
}
