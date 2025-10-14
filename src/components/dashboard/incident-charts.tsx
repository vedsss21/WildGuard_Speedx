
"use client";

import { Bar, BarChart, Cell, Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
  ChartConfig
} from "@/components/ui/chart";
import { incidentTrendData, incidentTypeData } from "@/lib/data";
import { useTranslation } from "@/contexts/language-context";

const incidentTypeChartConfig = {
  "Crop Damage": { label: "Crop Damage", color: "hsl(var(--chart-1))" },
  "Property Damage": { label: "Property Damage", color: "hsl(var(--chart-2))" },
  "Animal Attack": { label: "Animal Attack", color: "hsl(var(--chart-3))" },
  "Sighting": { label: "Sighting", color: "hsl(var(--chart-4))" },
  "Other": { label: "Other", color: "hsl(var(--chart-5))" },
  incidents: {
    label: "Incidents",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const trendChartConfig = {
    incidents: {
      label: "Incidents",
      color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;


export default function IncidentCharts() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.byType.title')}</CardTitle>
          <CardDescription>{t('charts.byType.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={incidentTypeChartConfig} className="w-full h-full">
              <BarChart 
                data={incidentTypeData.map(d => ({...d, type: t(`incidentTypes.${d.type.toLowerCase().replace(/ /g, '')}` as any, d.type)}))} 
                accessibilityLayer 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false}/>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        indicator="dot"
                        labelKey="type"
                        formatter={(value, name, item) => [`${value}`, `${item.payload.type} Incidents`]}
                    />} 
                />
                <Bar dataKey="incidents" radius={[8, 8, 0, 0]}>
                    {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={incidentTypeChartConfig[entry.type as keyof typeof incidentTypeChartConfig]?.color || trendChartConfig.incidents.color} />
                    ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('charts.trend.title')}</CardTitle>
          <CardDescription>{t('charts.trend.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer config={trendChartConfig} className="w-full h-full">
              <AreaChart
                data={incidentTrendData.map(d => ({...d, month: t(`months.${d.month.toLowerCase()}` as any)}))}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                accessibilityLayer
              >
                <defs>
                    <linearGradient id="fillTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false}/>
                <YAxis tickLine={false} axisLine={false}/>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="hsl(var(--primary))"
                  fill="url(#fillTrend)"
                  strokeWidth={3}
                  dot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
