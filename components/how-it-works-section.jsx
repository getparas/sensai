"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";

const HowItWorksSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[30%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4" variant="outline">
            Process
          </Badge>
          <h2 className="gradient-title gradient-premium mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the streamlined process designed to elevate your career
            journey from start to success.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Connection line for desktop */}
          <div className="absolute left-0 top-1/2 z-0 hidden h-0.5 w-full -translate-y-1/2 transform bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 lg:block"></div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="group h-full overflow-hidden border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col items-center p-6">
                    {/* Step number */}
                    <div className="bg-gradient-premium absolute -top-4 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full text-sm font-bold text-white">
                      {item.step}
                    </div>

                    {/* Icon with animated background */}
                    <div className="relative mb-6 mt-4">
                      <div className="absolute inset-0 transform rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-md transition-transform duration-300 group-hover:scale-110"></div>
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card p-4 transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="mb-3 text-center text-xl font-bold transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-center text-muted-foreground">
                      {item.description}
                    </p>

                    {/* Arrow for desktop */}
                    {index < howItWorks.length - 1 && (
                      <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 transform text-primary/50 lg:block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-pulse"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
