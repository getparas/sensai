"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { ChevronDown, LineChartIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("area");
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
        questions: assessment.questions.length,
        timestamp: new Date(assessment.createdAt).getTime(),
      }));

      // Sort by date
      formattedData.sort((a, b) => a.timestamp - b.timestamp);

      // Filter by time range
      let filteredData = formattedData;
      if (timeRange === "month") {
        const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        filteredData = formattedData.filter(
          (item) => item.timestamp >= oneMonthAgo,
        );
      } else if (timeRange === "week") {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        filteredData = formattedData.filter(
          (item) => item.timestamp >= oneWeekAgo,
        );
      }

      setChartData(filteredData);
    }
  }, [assessments, timeRange]);

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // green-500
    if (score >= 60) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  const getAverageScore = () => {
    if (!chartData?.length) return 0;
    const total = chartData.reduce((sum, item) => sum + item.score, 0);
    return (total / chartData.length).toFixed(1);
  };

  const getScoreTrend = () => {
    if (chartData.length < 2) return "neutral";
    const firstScore = chartData[0].score;
    const lastScore = chartData[chartData.length - 1].score;
    if (lastScore > firstScore) return "positive";
    if (lastScore < firstScore) return "negative";
    return "neutral";
  };

  const getTrendColor = () => {
    const trend = getScoreTrend();
    if (trend === "positive") return "text-green-500";
    if (trend === "negative") return "text-red-500";
    return "text-amber-500";
  };

  const getTrendIcon = () => {
    const trend = getScoreTrend();
    if (trend === "positive")
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "negative")
      return <TrendingUp className="h-4 w-4 rotate-180 text-red-500" />;
    return <LineChartIcon className="h-4 w-4 text-amber-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader className="border-b bg-muted/40">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-primary" />
                <CardTitle className="gradient-title gradient-premium text-3xl md:text-4xl">
                  Performance Trend
                </CardTitle>
              </div>
              <CardDescription className="mt-1">
                Track your quiz scores over time to monitor your progress
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    {timeRange === "all"
                      ? "All Time"
                      : timeRange === "month"
                        ? "Last Month"
                        : "Last Week"}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTimeRange("all")}>
                    All Time
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("month")}>
                    Last Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTimeRange("week")}>
                    Last Week
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    {chartType === "area" ? "Area Chart" : "Line Chart"}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setChartType("area")}>
                    Area Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChartType("line")}>
                    Line Chart
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border bg-card/50 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold">{getAverageScore()}%</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <LineChartIcon className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card/50 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Trend
                  </p>
                  <p className={`text-2xl font-bold ${getTrendColor()}`}>
                    {getScoreTrend() === "positive"
                      ? "Improving"
                      : getScoreTrend() === "negative"
                        ? "Declining"
                        : "Stable"}
                  </p>
                </div>
                <div
                  className={`h-8 w-8 rounded-full bg-${getTrendColor().replace("text-", "")}/10 flex items-center justify-center`}
                >
                  {getTrendIcon()}
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-card/50 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Entries
                  </p>
                  <p className="text-2xl font-bold">{chartData.length}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="scoreGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--muted))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--muted))" }}
                      tickLine={{ stroke: "hsl(var(--muted))" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--muted))" }}
                      tickLine={{ stroke: "hsl(var(--muted))" }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <div className="rounded-lg border bg-card p-3 shadow-xl duration-200 animate-in fade-in-50 zoom-in-95">
                              <p className="mb-1 font-medium">
                                {payload[0].payload.date}
                              </p>
                              <div className="flex items-center gap-2 text-sm">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{
                                    backgroundColor: getScoreColor(
                                      payload[0].value,
                                    ),
                                  }}
                                ></div>
                                <span>
                                  Score:{" "}
                                  <span className="font-medium">
                                    {payload[0].value}%
                                  </span>
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-sm">
                                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                                <span>
                                  Questions:{" "}
                                  <span className="font-medium">
                                    {payload[0].payload.questions}
                                  </span>
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#scoreGradient)"
                      strokeWidth={2}
                      activeDot={{
                        r: 6,
                        strokeWidth: 0,
                        fill: "hsl(var(--primary))",
                      }}
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--muted))"
                      opacity={0.4}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--muted))" }}
                      tickLine={{ stroke: "hsl(var(--muted))" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      axisLine={{ stroke: "hsl(var(--muted))" }}
                      tickLine={{ stroke: "hsl(var(--muted))" }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <div className="rounded-lg border bg-card p-3 shadow-xl duration-200 animate-in fade-in-50 zoom-in-95">
                              <p className="mb-1 font-medium">
                                {payload[0].payload.date}
                              </p>
                              <div className="flex items-center gap-2 text-sm">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{
                                    backgroundColor: getScoreColor(
                                      payload[0].value,
                                    ),
                                  }}
                                ></div>
                                <span>
                                  Score:{" "}
                                  <span className="font-medium">
                                    {payload[0].value}%
                                  </span>
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-sm">
                                <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                                <span>
                                  Questions:{" "}
                                  <span className="font-medium">
                                    {payload[0].payload.questions}
                                  </span>
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 0,
                        fill: "hsl(var(--primary))",
                      }}
                      activeDot={{
                        r: 6,
                        strokeWidth: 0,
                        fill: "hsl(var(--primary))",
                      }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="text-muted-foreground">
                  No data available for the selected time range
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTimeRange("all")}
                >
                  View All Data
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
