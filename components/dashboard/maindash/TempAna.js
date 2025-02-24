"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

const chartData = [
  { name: 'Anniversary Wish', sent: 600, delivered: 540, read: 480 },
  { name: 'Diwali Wish', sent: 100, delivered: 90, read: 80 },
  { name: 'Holi Wish', sent: 200, delivered: 180, read: 160 },
  { name: 'Birthday Wish', sent: 500, delivered: 450, read: 400 },
  { name: 'New Year Wish', sent: 300, delivered: 270, read: 240 },
  { name: 'Christmas Wish', sent: 400, delivered: 360, read: 320 },
]

const chartConfig = {
  sent: {
    label: "Sent",
    color: "hsl(var(--chart-1))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-2))",
  },
  read: {
    label: "Read",
    color: "hsl(var(--chart-3))",
  },
}

export function TemplateAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
            <Bar dataKey="delivered" fill="var(--color-delivered)" radius={4} />
            <Bar dataKey="read" fill="var(--color-read)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total data for all templates
        </div>
      </CardFooter>
    </Card>
  )
}
