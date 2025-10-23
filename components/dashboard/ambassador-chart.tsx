"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", ambassadors: 186, active: 120 },
  { month: "Feb", ambassadors: 305, active: 240 },
  { month: "Mar", ambassadors: 437, active: 380 },
  { month: "Apr", ambassadors: 573, active: 490 },
  { month: "May", ambassadors: 709, active: 620 },
  { month: "Jun", ambassadors: 814, active: 710 },
  { month: "Jul", ambassadors: 914, active: 800 },
  { month: "Aug", ambassadors: 1025, active: 890 },
  { month: "Sep", ambassadors: 1134, active: 980 },
  { month: "Oct", ambassadors: 1284, active: 1089 },
]

const chartConfig = {
  ambassadors: {
    label: "Total Ambassadors",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active Members",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AmbassadorChart() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
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
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillAmbassadors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="white" stopOpacity={0.8} />
            <stop offset="95%" stopColor="white" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="green" stopOpacity={0.8} />
            <stop offset="95%" stopColor="green" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="active"
          type="natural"
          fill="url(#fillActive)"
          fillOpacity={0.4}
          stroke="green"
          stackId="a"
        />
        <Area
          dataKey="ambassadors"
          type="natural"
          fill="url(#fillAmbassadors)"
          fillOpacity={0.4}
          stroke="white"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
