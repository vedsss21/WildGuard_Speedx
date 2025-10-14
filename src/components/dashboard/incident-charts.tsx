
"use client";

import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-1))",
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
                <Bar 
                  dataKey="incidents" 
                  radius={[8, 8, 0, 0]} 
                  fill="hsl(var(--chart-1))"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
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
                  fill="hsl(var(--primary))"
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
