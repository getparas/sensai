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
    <section className="w-full py-16 md:py-24 lg:py-32  relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>

        {/* FAQ decorative elements */}
        <div className="absolute top-[20%] right-[5%] w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-[15%] left-[10%] w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Support
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 gradient-title gradient-premium">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore detailed answers to the most common questions about our
            career development tools and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Decorative icon */}
          <div className="absolute -top-12 -left-12 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md"></div>
              <div className="relative bg-card p-4 rounded-full border border-border">
                <MessageCircleQuestion className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm rounded-xl border border-border shadow-lg overflow-hidden"
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
                  <AccordionTrigger className="py-6 px-6 hover:no-underline group">
                    <div className="flex items-center text-left">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-lg font-medium group-hover:text-primary transition-colors">
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
