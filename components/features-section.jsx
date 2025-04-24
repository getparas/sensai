"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { features } from "@/data/features";

// Wrap components with motion for animations
const MotionCard = motion(Card);

const FeaturesSection = () => {
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
            Features
          </Badge>
          <h2 className="gradient-title gradient-premium mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Explore Career-Boosting Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed to elevate your professional journey and help you stand out
            in today's competitive landscape
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            return (
              <MotionCard
                key={index}
                className="group overflow-hidden border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <div className="mb-5 rounded-full bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
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
