"use client";

import Link from "next/link";
import { FileText, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CoverLetterList from "./cover-letter-list";

export default function ClientCoverLetterSection({ coverLetters }) {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="gradient-title gradient-premium text-5xl font-bold md:text-6xl">
                Cover Letters
              </h1>
              <div className="hidden md:block">
                <Sparkles className="animate-pulse-slow h-8 w-8 text-amber-400" />
              </div>
            </div>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Create professional, tailored cover letters that complement your
              resume and impress employers
            </p>
          </div>
          <Link href="/cover-letter/new">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
              <Plus className="mr-2 h-4 w-4" />
              Create New Cover Letter
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-2"
          >
            <CoverLetterList coverLetters={coverLetters} />
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
                <h3 className="text-xl font-medium">Cover Letter Tips</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>
                    Customize each letter for the specific job and company
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Address the hiring manager by name if possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>
                    Highlight relevant skills and experiences from your resume
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Keep it concise - aim for 3-4 paragraphs maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>
                    Proofread carefully for grammar and spelling errors
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/cover-letter/new">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Cover Letter
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
