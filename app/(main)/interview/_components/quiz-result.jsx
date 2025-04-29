"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Trophy,
  XCircle,
  Lightbulb,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setProgressValue(result.quizScore);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [result]);

  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-amber-500 to-amber-600";
    return "from-red-500 to-red-600";
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Excellent! You're well-prepared!";
    if (score >= 80) return "Great job! You're on the right track!";
    if (score >= 70) return "Good work! Keep practicing!";
    if (score >= 60) return "Not bad! More practice will help!";
    return "Keep studying! You'll improve!";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-amber-500" />
          <h1 className="gradient-title gradient-premium text-3xl font-bold md:text-4xl">
            Quiz Results
          </h1>
        </div>
        <p className="text-muted-foreground">
          Completed on{" "}
          {format(new Date(result.createdAt), "MMMM dd, yyyy 'at' HH:mm")}
        </p>
      </motion.div>

      <CardContent className="space-y-8">
        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"></div>
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border bg-card p-4">
                  <span className="gradient-premium bg-clip-text text-3xl font-bold text-transparent">
                    {result.quizScore.toFixed(0)}%
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold">
                {getScoreMessage(result.quizScore)}
              </h3>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(result.quizScore)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-3">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-xl font-bold">{result.questions.length}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold">
                  {result.questions.filter((q) => q.isCorrect).length}
                </p>
              </div>
              <div className="col-span-2 rounded-lg bg-muted/50 p-3 text-center md:col-span-1">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-xl font-bold">
                  {(
                    (result.questions.filter((q) => q.isCorrect).length /
                      result.questions.length) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-amber-500/10 p-3">
                <Lightbulb className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Improvement Tip</h3>
                <p className="text-muted-foreground">{result.improvementTip}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Questions Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-medium">Question Review</h3>
          </div>

          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {result.questions.map((q, index) => (
              <motion.div key={index} variants={item}>
                <div className="space-y-3 rounded-lg border bg-card p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{q.question}</p>
                    {q.isCorrect ? (
                      <Badge className="border-green-200/30 bg-green-500/10 text-green-600">
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Correct
                      </Badge>
                    ) : (
                      <Badge className="border-red-200/30 bg-red-500/10 text-red-600">
                        <XCircle className="mr-1 h-4 w-4" /> Incorrect
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="mb-1 font-medium">Your answer:</p>
                      <p
                        className={
                          q.isCorrect ? "text-green-600" : "text-red-600"
                        }
                      >
                        {q.userAnswer}
                      </p>
                    </div>
                    {!q.isCorrect && (
                      <div className="rounded-lg bg-muted/50 p-3">
                        <p className="mb-1 font-medium">Correct answer:</p>
                        <p className="text-green-600">{q.answer}</p>
                      </div>
                    )}
                  </div>
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-3 text-sm">
                    <p className="mb-1 font-medium">Explanation:</p>
                    <p className="text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="pt-4">
          <Button
            onClick={onStartNew}
            className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            Start New Quiz
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
