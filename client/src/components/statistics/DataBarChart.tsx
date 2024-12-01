"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function DataBarChart({
    title = "Bar chart",
    desc = "Description",
    styles = "",
    data = [] as Record<string, any>[],
    config = {} as ChartConfig
}) {
    const key = data.length > 0 ? Object.keys(data[0]) : []
    const newStyles = " " + styles

    return (
        <Card className={newStyles}>
            <CardHeader className="h-[20%] flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                </div>
            </CardHeader>
            
            <CardContent className="h-[80%] px-2 sm:p-6">
                <ChartContainer config={config} className="aspect-auto h-full w-full">
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={key[0]}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px] bg-slate-50"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={key[1]} fill={`var(--color-${key[1]})`}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DataBarChart