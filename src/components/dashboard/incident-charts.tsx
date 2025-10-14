"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Incidents by Type</CardTitle>
          <CardDescription>A breakdown of incidents by category.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>Monthly incident trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
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
        </CardContent>
      </Card>
    </div>
  );
}
