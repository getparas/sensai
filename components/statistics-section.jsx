"use client";

import { motion } from "framer-motion";
import { statistics } from "@/data/statistics";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";

const StatisticsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32  relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Statistics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-title gradient-premium">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg">
            Measurable results that demonstrate our commitment to your career
            success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="stat-circle mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md"></div>
                    <div className="relative bg-card p-6 rounded-full border border-border flex items-center justify-center w-24 h-24">
                      <span className="text-3xl font-bold gradient-premium text-transparent bg-clip-text">
                        <CountUp value={stat.value} />
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm">
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
