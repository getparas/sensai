"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Trophy, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function StatsCards({ assessments }) {
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0,
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0,
    );
  };

  const getCompletedQuizzes = () => {
    return assessments?.length || 0;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden border-t-4 border-t-amber-500 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <div className="rounded-full bg-amber-500/10 p-2">
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{getAverageScore()}%</div>
              <Award
                className={`h-5 w-5 ${Number(getAverageScore()) > 80 ? "text-amber-500" : "text-muted-foreground"}`}
              />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: animateProgress ? `${getAverageScore()}%` : 0,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on {getCompletedQuizzes()} completed assessments
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden border-t-4 border-t-blue-500 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questions Practiced
            </CardTitle>
            <div className="rounded-full bg-blue-500/10 p-2">
              <Brain className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{getTotalQuestions()}</div>
              <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-xs font-medium text-blue-500">
                Total
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Knowledge expanding</span>
              </div>
              <div>{Math.min(getTotalQuestions() * 2, 100)}% coverage</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden border-t-4 border-t-green-500 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <div className="rounded-full bg-green-500/10 p-2">
              <Target className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">
              {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ width: 0 }}
                  animate={{
                    width: animateProgress
                      ? `${getLatestAssessment()?.quizScore || 0}%`
                      : 0,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                From your most recent assessment
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden border-t-4 border-t-purple-500 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Quizzes
            </CardTitle>
            <div className="rounded-full bg-purple-500/10 p-2">
              <CheckCircle2 className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{getCompletedQuizzes()}</div>
              <div className="rounded-full bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-500">
                {getCompletedQuizzes() > 0 ? "Great progress!" : "Start now!"}
              </div>
            </div>
            <Progress
              value={Math.min(getCompletedQuizzes() * 10, 100)}
              className="h-2"
              indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-600"
            />
            <p className="text-xs text-muted-foreground">
              {getCompletedQuizzes() > 0
                ? `You've completed ${getCompletedQuizzes()} ${getCompletedQuizzes() === 1 ? "quiz" : "quizzes"}`
                : "Take your first quiz to start tracking progress"}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
