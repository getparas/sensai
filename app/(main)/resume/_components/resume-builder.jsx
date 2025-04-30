"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  FileText,
  PenLine,
  Eye,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const formRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) {
      setActiveTab("preview");
    }
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!", {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  // Calculate completion percentage
  useEffect(() => {
    const {
      contactInfo = {},
      summary,
      skills,
      experience = [],
      education = [],
      projects = [],
    } = formValues;

    let totalFields = 0;
    let completedFields = 0;

    // Contact info (4 fields)
    totalFields += 4;
    if (contactInfo.email) completedFields++;
    if (contactInfo.mobile) completedFields++;
    if (contactInfo.linkedin) completedFields++;
    if (contactInfo.twitter) completedFields++;

    // Summary and skills (2 fields)
    totalFields += 2;
    if (summary) completedFields++;
    if (skills) completedFields++;

    // Experience, education, projects (at least 1 entry each)
    totalFields += 3;
    if (experience.length > 0) completedFields++;
    if (education.length > 0) completedFields++;
    if (projects.length > 0) completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  }, [formValues]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user?.fullName || "Your Name"}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: `${user?.fullName || "resume"}_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF generated successfully!", {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-color-mode="light" className="space-y-6" ref={formRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Resume Progress</h2>
                  <p className="text-sm text-muted-foreground">
                    Complete all sections for best results
                  </p>
                </div>
              </div>

              <div className="flex w-full max-w-md flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {completionPercentage}% Complete
                  </span>
                  <Badge
                    variant={
                      completionPercentage === 100 ? "default" : "outline"
                    }
                    className={
                      completionPercentage === 100
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }
                  >
                    {completionPercentage === 100
                      ? "Ready to Download"
                      : "In Progress"}
                  </Badge>
                </div>
                <Progress
                  value={completionPercentage}
                  className="h-2"
                  indicatorClassName={`bg-gradient-to-r ${
                    completionPercentage === 100
                      ? "from-green-500 to-green-600"
                      : "from-blue-500 to-purple-600"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center justify-between gap-4 md:flex-row"
      >
        <div className="flex items-center gap-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <PenLine className="h-4 w-4" />
                Form Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Markdown Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto">
          <Button
            variant="outline"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving || !isDirty}
            className="group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Resume
              </>
            )}
          </Button>

          <Button
            onClick={generatePDF}
            disabled={isGenerating || completionPercentage < 50}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "edit" ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-500/10 p-2">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-medium">
                        Contact Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          {...register("contactInfo.email")}
                          type="email"
                          placeholder="your@email.com"
                          error={errors.contactInfo?.email}
                          className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.contactInfo?.email && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Mobile Number
                        </label>
                        <Input
                          {...register("contactInfo.mobile")}
                          type="tel"
                          placeholder="+1 234 567 8900"
                          className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.contactInfo?.mobile && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.mobile.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          LinkedIn URL
                        </label>
                        <Input
                          {...register("contactInfo.linkedin")}
                          type="url"
                          placeholder="https://linkedin.com/in/your-profile"
                          className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.contactInfo?.linkedin && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.linkedin.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Twitter/X Profile
                        </label>
                        <Input
                          {...register("contactInfo.twitter")}
                          type="url"
                          placeholder="https://twitter.com/your-handle"
                          className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                        />
                        {errors.contactInfo?.twitter && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.twitter.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-500/10 p-2">
                        <FileText className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="text-xl font-medium">
                        Professional Summary
                      </h3>
                    </div>

                    <Controller
                      name="summary"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="h-32 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          placeholder="Write a compelling professional summary that highlights your expertise, experience, and career goals..."
                          error={errors.summary}
                        />
                      )}
                    />
                    {errors.summary && (
                      <p className="text-sm text-red-500">
                        {errors.summary.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-500/10 p-2">
                        <Sparkles className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="text-xl font-medium">Skills</h3>
                    </div>

                    <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="h-32 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                          placeholder="List your key technical and soft skills. You can format this as a paragraph or use bullet points with markdown (e.g., * Skill 1)..."
                          error={errors.skills}
                        />
                      )}
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-500">
                        {errors.skills.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-500/10 p-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-medium">Work Experience</h3>
                    </div>

                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) => (
                        <EntryForm
                          type="Experience"
                          entries={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.experience && (
                      <p className="text-sm text-red-500">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-500/10 p-2">
                        <FileText className="h-5 w-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-medium">Education</h3>
                    </div>

                    <Controller
                      name="education"
                      control={control}
                      render={({ field }) => (
                        <EntryForm
                          type="Education"
                          entries={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.education && (
                      <p className="text-sm text-red-500">
                        {errors.education.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-cyan-500/10 p-2">
                        <FileText className="h-5 w-5 text-cyan-500" />
                      </div>
                      <h3 className="text-xl font-medium">Projects</h3>
                    </div>

                    <Controller
                      name="projects"
                      control={control}
                      render={({ field }) => (
                        <EntryForm
                          type="Project"
                          entries={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    {errors.projects && (
                      <p className="text-sm text-red-500">
                        {errors.projects.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={isSaving || !isDirty}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Resume...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Resume
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() =>
                      setResumeMode(
                        resumeMode === "preview" ? "edit" : "preview",
                      )
                    }
                  >
                    {resumeMode === "preview" ? (
                      <>
                        <Edit className="h-4 w-4" />
                        Edit Markdown
                      </>
                    ) : (
                      <>
                        <Monitor className="h-4 w-4" />
                        Show Preview
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>

                {activeTab === "preview" && resumeMode !== "preview" && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border-2 border-amber-500 bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm">
                      You will lose edited markdown if you update the form data.
                    </span>
                  </div>
                )}

                <div className="rounded-lg border">
                  <MDEditor
                    value={previewContent}
                    onChange={setPreviewContent}
                    height={800}
                    preview={resumeMode}
                    className="bg-card"
                  />
                </div>

                <div className="hidden">
                  <div id="resume-pdf">
                    <MDEditor.Markdown
                      source={previewContent}
                      style={{
                        background: "white",
                        color: "black",
                        padding: "20px",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={scrollToTop}
                className="flex items-center gap-2"
              >
                Back to Form
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
