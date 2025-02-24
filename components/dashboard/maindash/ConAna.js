"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart,Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shared/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../shared/ui/chart"

// Data for the pie chart
const chartData = [
  { name: 'Marketing', value: 27.16, fill: "var(--color-marketing)" },
  { name: 'Service', value: 21.80, fill: "var(--color-service)" },
  { name: 'Utility', value: 17.82, fill: "var(--color-utility)" },
  // More categories
]

const chartConfig = {
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-1))",
  },
  service: {
    label: "Service",
    color: "hsl(var(--chart-2))",
  },
  utility: {
    label: "Utility",
    color: "hsl(var(--chart-3))",
  },
  // More configurations for other categories
} 

export function ConversationAnalytics() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Conversation Analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="name">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total conversation categories for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
