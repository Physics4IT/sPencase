"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function DataLineChart({
    title = "Line chart",
    desc = "Description",
    styles = "",
    data = [] as Record<string, any>[],
    config = {} as ChartConfig
}) {
    const key = data.length > 0 ? Object.keys(data[0]) : []
    const newStyles = " " + styles

    return (
        <Card className={newStyles}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={config}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey={key[0]}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel className="bg-slate-50"/>}
                        />
                        <Line
                            dataKey={key[1]}
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DataLineChart