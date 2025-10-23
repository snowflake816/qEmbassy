"use client"

import { Line, LineChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "May", score: 12400 },
  { month: "Jun", score: 18900 },
  { month: "Jul", score: 24300 },
  { month: "Aug", score: 31200 },
  { month: "Sep", score: 38700 },
  { month: "Oct", score: 47500 },
]

const chartConfig = {
  score: {
    label: "Activity Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TeamPerformanceChart() {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="score" type="natural" stroke="var(--color-score)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
