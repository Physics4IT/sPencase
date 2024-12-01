import { ChartConfig } from "../ui/chart"

export const chartData2 : Record<string, any>[] = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

export const chartConfig2 = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig