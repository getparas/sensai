"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";
import { motion } from "framer-motion";

export default function NewCoverLetterPage() {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <Link href="/cover-letter">
            <Button
              variant="ghost"
              className="group gap-2 pl-0 hover:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="gradient-text">Back to Cover Letters</span>
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="gradient-title gradient-premium text-5xl font-bold md:text-6xl">
              Create Cover Letter
            </h1>
            <div className="hidden md:block">
              <Sparkles className="animate-pulse-slow h-8 w-8 text-amber-400" />
            </div>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Generate a tailored cover letter that highlights your skills and
            experience for the specific job
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 md:col-span-2"
        >
          <CoverLetterGenerator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1"
        >
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-2">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium">How It Works</h3>
            </div>
            <ol className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-600">
                  1
                </div>
                <span>
                  Enter the company name and job title you're applying for
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-600">
                  2
                </div>
                <span>
                  Paste the job description to help our AI understand the
                  requirements
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-600">
                  3
                </div>
                <span>
                  Our AI will generate a tailored cover letter highlighting your
                  relevant skills
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-medium text-blue-600">
                  4
                </div>
                <span>
                  Review, edit, and download your personalized cover letter
                </span>
              </li>
            </ol>
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="mb-1 flex items-center gap-2 font-medium text-amber-800">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Pro Tip</span>
              </div>
              <p className="text-xs text-amber-800">
                Include specific keywords from the job description to help your
                cover letter pass through Applicant Tracking Systems (ATS) that
                many companies use.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
