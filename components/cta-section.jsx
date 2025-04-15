"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
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
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-premium opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-gradient-modern opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-premium"></div>
            <div className="absolute -top-6 -right-6 text-primary/20 rotate-12">
              <Sparkles className="w-20 h-20" />
            </div>
            <div className="absolute -bottom-6 -left-6 text-primary/10 -rotate-12">
              <Star className="w-16 h-16" />
            </div>

            <div className="text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 gradient-title gradient-premium"
              >
                Take the Next Step in Your Career Journey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
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
                <div className="absolute -inset-1 bg-gradient-premium rounded-lg blur-md opacity-70"></div>
                <Link href="/dashboard" passHref>
                  <Button
                    size="lg"
                    className="relative h-14 px-8 bg-background hover:bg-background/80 text-foreground border-2 border-transparent hover:border-primary/50 shadow-lg group animate-bounce"
                  >
                    <span className="mr-2 gradient-premium text-transparent bg-clip-text font-bold">
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
                      <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
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
