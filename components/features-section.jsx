"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { features } from "@/data/features";

// Wrap components with motion for animations
const MotionCard = motion(Card);

const FeaturesSection = () => {
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
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-title gradient-premium">
            Explore Career-Boosting Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Designed to elevate your professional journey and help you stand out
            in today's competitive landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            return (
              <MotionCard
                key={index}
                className="group border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <CardContent className="p-6 text-center flex flex-col items-center h-full">
                  <div className="mb-5 p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
