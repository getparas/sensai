"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "../_components/quiz";
import { motion } from "framer-motion";

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-2 flex flex-col space-y-2"
      >
        <Link href={"/interview"}>
          <Button
            variant="ghost"
            className="group gap-2 pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="gradient-text">Back to Interview Preparation</span>
          </Button>
        </Link>

        <div className="space-y-3 py-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="gradient-title gradient-premium text-5xl font-bold md:text-6xl">
              Mock Interview
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Test your knowledge with industry-specific questions and receive
              instant feedback
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Quiz />
      </motion.div>
    </div>
  );
};

export default MockInterviewPage;
