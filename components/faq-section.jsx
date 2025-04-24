"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faqs";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const FaqSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[30%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-3xl"></div>

        {/* FAQ decorative elements */}
        <div className="absolute right-[5%] top-[20%] h-24 w-24 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
        <div className="absolute bottom-[15%] left-[10%] h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-4" variant="outline">
            Support
          </Badge>
          <h2 className="gradient-title gradient-premium mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore detailed answers to the most common questions about our
            career development tools and services.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Decorative icon */}
          <div className="absolute -left-12 -top-12 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md"></div>
              <div className="relative rounded-full border border-border bg-card p-4">
                <MessageCircleQuestion className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl border border-border bg-card/50 shadow-lg backdrop-blur-sm"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-border last:border-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AccordionTrigger className="group px-6 py-6 hover:no-underline">
                    <div className="flex items-center text-left">
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-lg font-medium transition-colors group-hover:text-primary">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2 text-muted-foreground">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-9"
                      >
                        {faq.answer}
                      </motion.div>
                    </AnimatePresence>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
