"use client";

import Link from "next/link";
import { ArrowLeft, Download, Edit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterPreview from "../_components/cover-letter-preview";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function ClientCoverLetterDetail({ coverLetter }) {
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
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="gradient-title gradient-premium text-4xl font-bold md:text-5xl">
                {coverLetter.jobTitle} at {coverLetter.companyName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>
                    Created{" "}
                    {format(new Date(coverLetter.createdAt), "MMMM dd, yyyy")}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  Ready to Use
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CoverLetterPreview content={coverLetter.content} />
      </motion.div>
    </div>
  );
}
