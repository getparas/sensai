"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Briefcase, Building, FileText, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function CoverLetterGenerator() {
  const router = useRouter();
  const [formProgress, setFormProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    mode: "onChange",
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Watch form fields to calculate progress
  const watchAllFields = watch();

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter, router, reset]);

  // Calculate form progress
  useEffect(() => {
    const { companyName, jobTitle, jobDescription } = watchAllFields;
    let progress = 0;

    if (companyName) progress += 33;
    if (jobTitle) progress += 33;
    if (jobDescription && jobDescription.length > 50) progress += 34;

    setFormProgress(progress);
  }, [watchAllFields]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden border shadow-md">
        <CardHeader className="border-b bg-muted/40">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500/10 p-2">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle className="text-2xl">Job Details</CardTitle>
              <CardDescription>
                Provide information about the position you're applying for
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Form Progress</span>
                <span className="text-sm text-muted-foreground">
                  {formProgress}% Complete
                </span>
              </div>
              <Progress
                value={formProgress}
                className="h-2"
                indicatorClassName={`bg-gradient-to-r ${
                  formProgress === 100
                    ? "from-green-500 to-green-600"
                    : "from-blue-500 to-purple-600"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                  className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                  className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="jobDescription"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-48 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Tip: Include the full job description to help our AI create a
                more tailored cover letter
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={generating || !isValid || !isDirty}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
