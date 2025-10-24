"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { region: "North America", ambassadors: 342, percentage: 26.6 },
  { region: "Europe", ambassadors: 298, percentage: 23.2 },
  { region: "Asia", ambassadors: 256, percentage: 19.9 },
  { region: "South America", ambassadors: 178, percentage: 13.9 },
  { region: "Africa", ambassadors: 134, percentage: 10.4 },
  { region: "Oceania", ambassadors: 76, percentage: 5.9 },
]

const chartConfig = {
  ambassadors: {
    label: "Ambassadors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RegionalDistribution() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="region"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 10)}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="ambassadors" fill="gray" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
