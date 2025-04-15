"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-title gradient-premium">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the streamlined process designed to elevate your career
            journey from start to success.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="group border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full bg-card/50 backdrop-blur-sm hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-premium flex items-center justify-center text-white font-bold text-sm z-10">
                      {item.step}
                    </div>

                    {/* Icon with animated background */}
                    <div className="relative mb-6 mt-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-300"></div>
                      <div className="relative bg-card p-4 rounded-full border border-border flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors text-center">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-center">
                      {item.description}
                    </p>

                    {/* Arrow for desktop */}
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-primary/50 z-20">
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
