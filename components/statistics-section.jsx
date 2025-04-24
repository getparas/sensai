"use client";

import { motion } from "framer-motion";
import { statistics } from "@/data/statistics";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";

const StatisticsSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[30%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4" variant="outline">
            Statistics
          </Badge>
          <h2 className="gradient-title gradient-premium mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted-foreground">
            Measurable results that demonstrate our commitment to your career
            success
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border border-border transition-all duration-300 hover:border-primary/50">
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div className="stat-circle relative mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md"></div>
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card p-6">
                      <span className="gradient-premium bg-clip-text text-3xl font-bold text-transparent">
                        <CountUp value={stat.value} />
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
