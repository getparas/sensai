"use client";

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import QuizResult from "./quiz-result";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  HelpCircle,
  Lightbulb,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
      setTimerActive(true);
    }
  }, [quizData]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && !resultData) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, resultData]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    setTimerActive(false);
    const score = calculateScore();
    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save quiz results");
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setTimeSpent(0);
    generateQuizFn();
    setResultData(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (generatingQuiz) {
    return (
      <Card className="mx-2 border shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-md"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-card p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-medium">Generating Your Quiz</h3>
          <p className="mb-6 max-w-md text-center text-muted-foreground">
            We're creating personalized questions based on industry standards
            and best practices...
          </p>
          <BarLoader
            className="mt-4"
            width={"200px"}
            color="hsl(var(--primary))"
          />
        </CardContent>
      </Card>
    );
  }

  // Show results if quiz is completed
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (!quizData) {
    return (
      <Card className="mx-2 overflow-hidden border shadow-md">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">
            Ready to Test Your Knowledge?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              This quiz contains 10 questions specific to your industry and
              skills. Take your time and choose the best answer for each
              question.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Industry-Specific</p>
                  <p className="text-sm text-muted-foreground">
                    Tailored questions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Detailed Explanations</p>
                  <p className="text-sm text-muted-foreground">
                    Learn as you go
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Performance Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Monitor progress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            onClick={generateQuizFn}
            className="group h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div>
      <Card className="mx-2 overflow-hidden border shadow-md">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500"></div>
        <CardHeader className="border-b pb-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <CardTitle className="text-xl">
              Question {currentQuestion + 1} of {quizData.length}
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5 bg-primary/5">
                <Clock className="h-3.5 w-3.5" />
                {formatTime(timeSpent)}
              </Badge>
              <div className="w-32">
                <Progress
                  value={((currentQuestion + 1) / quizData.length) * 100}
                  className="h-2"
                  indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-medium">{question.question}</p>
              </div>

              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestion]}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex cursor-pointer items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-muted/50">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 rounded-lg border border-primary/10 bg-primary/5 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-amber-500/10 p-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="mb-1 font-medium">Explanation:</p>
                  <p className="text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          {!showExplanation && (
            <Button
              onClick={() => setShowExplanation(true)}
              variant="outline"
              disabled={!answers[currentQuestion]}
              className="gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              Show Explanation
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion] || savingResult}
            className={`ml-auto gap-2 transition-all duration-300 ${
              currentQuestion < quizData.length - 1
                ? "bg-primary hover:bg-primary/90"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {savingResult ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {currentQuestion < quizData.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
