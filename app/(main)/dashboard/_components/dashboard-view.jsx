"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import {
  Brain,
  BriefcaseIcon,
  LineChart,
  TrendingDown,
  TrendingUp,
  Sparkles,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Lightbulb,
  Zap,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const DashboardView = ({ insights }) => {
  const [animateChart, setAnimateChart] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    // Trigger chart animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "from-green-500 to-green-600";
      case "medium":
        return "from-amber-400 to-amber-500";
      case "low":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getDemandLevelBg = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500/10";
      case "medium":
        return "bg-amber-500/10";
      case "low":
        return "bg-red-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {
          icon: TrendingUp,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          gradient: "from-green-500 to-green-600",
        };
      case "neutral":
        return {
          icon: LineChart,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          gradient: "from-amber-400 to-amber-500",
        };
      case "negative":
        return {
          icon: TrendingDown,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          gradient: "from-red-500 to-red-600",
        };
      default:
        return {
          icon: LineChart,
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;
  const outlookBgColor = getMarketOutlookInfo(insights.marketOutlook).bgColor;
  const outlookGradient = getMarketOutlookInfo(insights.marketOutlook).gradient;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd MMM yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true },
  );

  // Custom colors for the bar chart
  const barColors = ["#38bdf8", "#818cf8", "#c084fc"];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const barVariants = {
    hidden: { scaleY: 0 },
    visible: (i) => ({
      scaleY: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">
            Industry Insights
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis and trends for your industry
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card/60 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last Updated: </span>
          <Badge variant="outline" className="bg-background/50 font-medium">
            {lastUpdatedDate}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
        >
          <Card
            className="overflow-hidden border-t-4 transition-all duration-300 hover:shadow-lg"
            style={{
              borderTopColor: outlookColor.replace("text-", "var(--") + ")",
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Outlook
              </CardTitle>
              <div className={`rounded-full p-2 ${outlookBgColor}`}>
                <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {insights.marketOutlook}
                </div>
                <ArrowUpRight className={`h-4 w-4 ${outlookColor}`} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  Next Update {nextUpdateDistance}
                </p>
                <div
                  className={`h-1 w-16 rounded-full bg-gradient-to-r ${outlookGradient}`}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
        >
          <Card className="overflow-hidden border-t-4 border-t-blue-500 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Industry Growth
              </CardTitle>
              <div className="rounded-full bg-blue-500/10 p-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">
                  {insights.growthRate.toFixed(1)}%
                </div>
                <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-xs font-medium text-blue-500">
                  YoY
                </span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span>0%</span>
                  <span>Target: 10%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(insights.growthRate * 10, 100)}%`,
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
        >
          <Card
            className={`overflow-hidden border-t-4 transition-all duration-300 hover:shadow-lg`}
            style={{
              borderTopColor: `var(--${getDemandLevelColor(insights.demandLevel).split(" ")[0].replace("from-", "")})`,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Demand Level
              </CardTitle>
              <div
                className={`rounded-full p-2 ${getDemandLevelBg(insights.demandLevel)}`}
              >
                <BriefcaseIcon
                  className={`h-4 w-4 text-${getDemandLevelColor(insights.demandLevel).split(" ")[0].replace("from-", "")}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.demandLevel}</div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getDemandLevelColor(insights.demandLevel)}`}
                    style={{
                      width:
                        insights.demandLevel.toLowerCase() === "low"
                          ? "33%"
                          : insights.demandLevel.toLowerCase() === "medium"
                            ? "66%"
                            : "100%",
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
        >
          <Card className="overflow-hidden border-t-4 border-t-purple-500 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              <div className="rounded-full bg-purple-500/10 p-2">
                <Brain className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.topSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-purple-500/10 text-purple-700 transition-colors hover:bg-purple-500/20"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate={animateChart ? "visible" : "hidden"}
        variants={chartVariants}
      >
        <Card className="overflow-hidden border transition-all duration-300 hover:shadow-lg">
          <CardHeader className="border-b bg-muted/40">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Salary Ranges by Role</CardTitle>
                </div>
                <CardDescription className="mt-1">
                  Displaying minimum, median, and maximum salaries (in
                  thousands)
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {["Min", "Median", "Max"].map((type, i) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: barColors[i] }}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barGap={2}
                  onMouseMove={(data) => {
                    if (data.activeTooltipIndex !== undefined) {
                      setHoveredBar(data.activeTooltipIndex);
                    } else {
                      setHoveredBar(null);
                    }
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.2}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}K`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-card p-3 shadow-xl duration-200 animate-in fade-in-50 zoom-in-95">
                            <p className="mb-2 font-semibold">{label}</p>
                            {payload.map((item, index) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between gap-8 text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-3 w-3 rounded-sm"
                                    style={{
                                      backgroundColor: barColors[index],
                                    }}
                                  ></div>
                                  <span>
                                    {item.name === "min"
                                      ? "Minimum"
                                      : item.name === "median"
                                        ? "Median"
                                        : "Maximum"}
                                  </span>
                                </div>
                                <span className="font-medium">
                                  ${item.value}K
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="min"
                    fill={barColors[0]}
                    name="Min Salary"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  >
                    {salaryData.map((entry, index) => (
                      <motion.g
                        key={`cell-${index}`}
                        initial="hidden"
                        animate={animateChart ? "visible" : "hidden"}
                        custom={index}
                        variants={barVariants}
                        style={{ originY: "100%", originX: "50%" }}
                      >
                        <Cell
                          fill={
                            hoveredBar === index
                              ? `${barColors[0]}dd`
                              : barColors[0]
                          }
                          className="transition-colors duration-200"
                        />
                      </motion.g>
                    ))}
                  </Bar>
                  <Bar
                    dataKey="median"
                    fill={barColors[1]}
                    name="Median Salary"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={600}
                  >
                    {salaryData.map((entry, index) => (
                      <motion.g
                        key={`cell-${index}`}
                        initial="hidden"
                        animate={animateChart ? "visible" : "hidden"}
                        custom={index + salaryData.length}
                        variants={barVariants}
                        style={{ originY: "100%", originX: "50%" }}
                      >
                        <Cell
                          fill={
                            hoveredBar === index
                              ? `${barColors[1]}dd`
                              : barColors[1]
                          }
                          className="transition-colors duration-200"
                        />
                      </motion.g>
                    ))}
                  </Bar>
                  <Bar
                    dataKey="max"
                    fill={barColors[2]}
                    name="Max Salary"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={900}
                  >
                    {salaryData.map((entry, index) => (
                      <motion.g
                        key={`cell-${index}`}
                        initial="hidden"
                        animate={animateChart ? "visible" : "hidden"}
                        custom={index + salaryData.length * 2}
                        variants={barVariants}
                        style={{ originY: "100%", originX: "50%" }}
                      >
                        <Cell
                          fill={
                            hoveredBar === index
                              ? `${barColors[2]}dd`
                              : barColors[2]
                          }
                          className="transition-colors duration-200"
                        />
                      </motion.g>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={cardVariants}
        >
          <Card className="h-full overflow-hidden border transition-all duration-300 hover:shadow-lg">
            <CardHeader className="border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <CardTitle>Key Industry Trends</CardTitle>
              </div>
              <CardDescription>
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <motion.li
                    key={index}
                    className="group flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-transform duration-300 group-hover:scale-125"></div>
                    <span className="text-sm leading-relaxed">{trend}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={cardVariants}
        >
          <Card className="h-full overflow-hidden border transition-all duration-300 hover:shadow-lg">
            <CardHeader className="border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-500" />
                <CardTitle>Recommended Skills</CardTitle>
              </div>
              <CardDescription>Skills to consider developing</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-cyan-200/20 bg-cyan-500/10 text-cyan-700 transition-all duration-200 hover:bg-cyan-500/20"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;
