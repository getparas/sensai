"use client";

import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ClientInterviewPrep({ assessments }) {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center gap-3">
          <h1 className="gradient-title gradient-premium text-5xl font-bold md:text-6xl">
            Interview Preparation
          </h1>
          <div className="hidden md:block">
            <Sparkles className="animate-pulse-slow h-8 w-8 text-amber-400" />
          </div>
        </div>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Enhance your interview skills with personalized practice sessions and
          track your progress over time.
        </p>
      </motion.div>

      <div className="space-y-8">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
