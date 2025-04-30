"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Eye, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="overflow-hidden border shadow-md">
        <CardHeader className="border-b bg-muted/40">
          <CardTitle className="text-xl">No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-blue-500/10 p-4">
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              Create Your First Cover Letter
            </h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Generate a professional cover letter tailored to the specific job
              you're applying for
            </p>
            <Button
              onClick={() => router.push("/cover-letter/new")}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter, index) => (
        <motion.div
          key={letter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="group overflow-hidden border transition-all duration-300 hover:shadow-md">
            <CardHeader className="border-b bg-muted/40 pb-3">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/10 p-1.5">
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <CardTitle className="gradient-text text-xl font-semibold">
                      {letter.jobTitle} at {letter.companyName}
                    </CardTitle>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <CardDescription>
                      {format(new Date(letter.createdAt), "MMMM dd, yyyy")}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    Ready to Use
                  </Badge>
                  <div className="flex space-x-2">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => router.push(`/cover-letter/${letter.id}`)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">View</span>
                    </Button> */}
                    <Link href={`/cover-letter/${letter.id}`} passHref>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete Cover Letter?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your cover letter for {letter.jobTitle} at{" "}
                            {letter.companyName}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(letter.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div
                className="line-clamp-3 cursor-pointer text-sm text-muted-foreground"
                onClick={() => router.push(`/cover-letter/${letter.id}`)}
              >
                {letter.jobDescription}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
