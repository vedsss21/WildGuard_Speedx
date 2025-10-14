"use client";

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const incidentTypeChartConfig = {
  incidents: {
    label: "Incidents",
  },
  crop: {
    label: "Crop Damage",
    color: "hsl(var(--chart-1))",
  },
  property: {
    label: "Property Damage",
    color: "hsl(var(--chart-2))",
  },
  attack: {
    label: "Animal Attack",
    color: "hsl(var(--chart-3))",
  },
  sighting: {
    label: "Sighting",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const incidentTrendChartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function IncidentCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Reporting</CardTitle>
        <CardDescription>Visualizing incident data and trends.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="type">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="type">Incidents by Type</TabsTrigger>
            <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="type">
            <div className="h-[300px] w-full pt-4">
              <ChartContainer config={incidentTypeChartConfig} className="w-full h-full">
                <BarChart data={incidentTypeData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="type"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis />
                   <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="incidents" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="trend">
            <div className="h-[300px] w-full pt-4">
              <ChartContainer config={incidentTrendChartConfig} className="w-full h-full">
                <LineChart
                  data={incidentTrendData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
                  accessibilityLayer
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="var(--color-incidents)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
