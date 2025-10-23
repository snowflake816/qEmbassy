"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { region: "North America", ambassadors: 342 },
  { region: "Europe", ambassadors: 289 },
  { region: "Asia", ambassadors: 401 },
  { region: "South America", ambassadors: 127 },
  { region: "Africa", ambassadors: 85 },
  { region: "Oceania", ambassadors: 40 },
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
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="region"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="ambassadors" fill="var(--color-ambassadors)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
