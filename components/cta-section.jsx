"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="bg-gradient-premium absolute -left-[10%] -top-[20%] h-[40%] w-[40%] rounded-full opacity-10 blur-3xl"></div>
        <div className="bg-gradient-modern absolute -bottom-[20%] -right-[10%] h-[40%] w-[40%] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-card/40 p-8 shadow-xl backdrop-blur-md md:p-12">
            {/* Decorative elements */}
            <div className="bg-gradient-premium absolute left-0 top-0 h-1 w-full"></div>
            <div className="absolute -right-6 -top-6 rotate-12 text-primary/20">
              <Sparkles className="h-20 w-20" />
            </div>
            <div className="absolute -bottom-6 -left-6 -rotate-12 text-primary/10">
              <Star className="h-16 w-16" />
            </div>

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="gradient-title gradient-premium mb-6 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl"
              >
                Take the Next Step in Your Career Journey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
              >
                Join thousands of ambitious professionals transforming their
                careers with our intelligent tools, expert insights, and
                powerful resources.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative inline-block"
              >
                <div className="bg-gradient-premium absolute -inset-1 rounded-lg opacity-70 blur-md"></div>
                <Link href="/dashboard" passHref>
                  <Button
                    size="lg"
                    className="group relative h-14 animate-bounce border-2 border-transparent bg-background px-8 text-foreground shadow-lg hover:border-primary/50 hover:bg-background/80"
                  >
                    <span className="gradient-premium mr-2 bg-clip-text font-bold text-transparent">
                      Start Your Journey Today
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="h-5 w-5 text-primary transition-colors group-hover:text-primary/80" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-6 text-sm text-muted-foreground/80"
              >
                No credit card required • Free to get started
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
