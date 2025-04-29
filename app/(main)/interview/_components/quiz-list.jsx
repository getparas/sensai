"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./quiz-result";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ListChecks,
  PlusCircle,
  TrendingUp,
} from "lucide-react";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 80)
      return "bg-green-500/10 text-green-600 border-green-200/30";
    if (score >= 60)
      return "bg-amber-500/10 text-amber-600 border-amber-200/30";
    return "bg-red-500/10 text-red-600 border-red-200/30";
  };

  const getScoreEmoji = (score) => {
    if (score >= 80) return "🏆";
    if (score >= 60) return "👍";
    return "📚";
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
          <CardHeader className="border-b bg-muted/40">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <CardTitle className="gradient-title gradient-premium text-3xl md:text-4xl">
                    Recent Quizzes
                  </CardTitle>
                </div>
                <CardDescription className="mt-1">
                  Review your past quiz performance and track your progress
                </CardDescription>
              </div>
              <Button
                onClick={() => router.push("/interview/mock")}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
                <PlusCircle className="mr-2 h-4 w-4" />
                Start New Quiz
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {assessments?.length > 0 ? (
              <motion.div
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {assessments?.map((assessment, i) => (
                  <motion.div key={assessment.id} variants={item}>
                    <Card
                      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                      onClick={() => setSelectedQuiz(assessment)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                              {i + 1}
                            </div>
                            <CardTitle className="gradient-text text-xl md:text-2xl">
                              Quiz {i + 1}
                            </CardTitle>
                          </div>
                          <Badge
                            className={`${getScoreColor(assessment.quizScore)} px-3 py-1 text-sm font-medium`}
                          >
                            {getScoreEmoji(assessment.quizScore)} Score:{" "}
                            {assessment.quizScore.toFixed(1)}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(
                                new Date(assessment.createdAt),
                                "MMMM dd, yyyy",
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              {format(new Date(assessment.createdAt), "HH:mm")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{assessment.questions.length} questions</span>
                          </div>
                        </div>

                        {assessment.improvementTip && (
                          <div className="mt-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Tip:
                              </span>{" "}
                              {assessment.improvementTip}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="transition-colors group-hover:bg-primary/10"
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-medium">
                  No quizzes completed yet
                </h3>
                <p className="mb-6 max-w-md text-muted-foreground">
                  Take your first quiz to start tracking your interview
                  preparation progress
                </p>
                <Button
                  onClick={() => router.push("/interview/mock")}
                  className="bg-gradient-premium transition-all duration-300 hover:shadow-lg"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Start Your First Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
