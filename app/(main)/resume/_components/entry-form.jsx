"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import {
  Sparkles,
  PlusCircle,
  X,
  Pencil,
  Save,
  Loader2,
  Calendar,
  Building,
  Briefcase,
} from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const current = watch("current");

  const handleAdd = handleValidation((data) => {
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "Present" : formatDisplayDate(data.endDate),
    };

    if (editingIndex !== null) {
      const newEntries = [...entries];
      newEntries[editingIndex] = formattedEntry;
      onChange(newEntries);
      setEditingIndex(null);
    } else {
      onChange([...entries, formattedEntry]);
    }

    reset();
    setIsAdding(false);
    toast.success(
      `${type} ${editingIndex !== null ? "updated" : "added"} successfully!`,
    );
  });

  const handleEdit = (index) => {
    const entry = entries[index];

    // Parse display dates back to yyyy-MM format for the input
    const parseBackDate = (displayDate) => {
      if (!displayDate || displayDate === "Present") return "";
      try {
        const date = parse(displayDate, "MMM yyyy", new Date());
        return format(date, "yyyy-MM");
      } catch (e) {
        return "";
      }
    };

    setValue("title", entry.title);
    setValue("organization", entry.organization);
    setValue("startDate", parseBackDate(entry.startDate));
    setValue("current", entry.endDate === "Present");
    setValue(
      "endDate",
      entry.endDate === "Present" ? "" : parseBackDate(entry.endDate),
    );
    setValue("description", entry.description);

    setEditingIndex(index);
    setIsAdding(true);
  };

  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
    toast.success(`${type} removed successfully!`);
  };

  const handleCancel = () => {
    reset();
    setIsAdding(false);
    setEditingIndex(null);
  };

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  // Add this effect to handle the improvement result
  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  // Replace handleImproveDescription with this
  const handleImproveDescription = async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    await improveWithAIFn({
      current: description,
      type: type.toLowerCase(), // 'experience', 'education', or 'project'
    });
  };

  const getTypeIcon = () => {
    switch (type) {
      case "Experience":
        return <Briefcase className="h-4 w-4" />;
      case "Education":
        return <Building className="h-4 w-4" />;
      case "Project":
        return <PlusCircle className="h-4 w-4" />;
      default:
        return <PlusCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {entries.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group overflow-hidden border transition-all duration-300 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        {getTypeIcon()}
                      </div>
                      <CardTitle className="text-base font-medium">
                        {item.title} @ {item.organization}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => handleEdit(index)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {item.startDate} - {item.endDate}
                      </p>
                      {item.endDate === "Present" && (
                        <Badge
                          variant="outline"
                          className="border-green-200 bg-green-50 text-xs text-green-700"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingIndex !== null ? `Edit ${type}` : `Add ${type}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Title/Position
                    </label>
                    <Input
                      placeholder="Title/Position"
                      {...register("title")}
                      error={errors.title}
                      className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Organization/Company
                    </label>
                    <Input
                      placeholder="Organization/Company"
                      {...register("organization")}
                      error={errors.organization}
                      className="transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.organization && (
                      <p className="text-sm text-red-500">
                        {errors.organization.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <div className="relative">
                      <Input
                        type="month"
                        {...register("startDate")}
                        error={errors.startDate}
                        className="pl-10 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        MM/YYYY
                      </div>
                    </div>
                    {errors.startDate && (
                      <p className="text-sm text-red-500">
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <div className="relative">
                      <Input
                        type="month"
                        {...register("endDate")}
                        disabled={current}
                        error={errors.endDate}
                        className="pl-10 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        MM/YYYY
                      </div>
                    </div>
                    {errors.endDate && (
                      <p className="text-sm text-red-500">
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="current"
                    {...register("current")}
                    onChange={(e) => {
                      setValue("current", e.target.checked);
                      if (e.target.checked) {
                        setValue("endDate", "");
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/25"
                  />
                  <label htmlFor="current" className="text-sm font-medium">
                    Current {type}
                  </label>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Click on the date fields to open a month/year selector
                </p>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder={`Description of your ${type.toLowerCase()}`}
                    className="h-32 transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    {...register("description")}
                    error={errors.description}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleImproveDescription}
                  disabled={isImproving || !watch("description")}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  {isImproving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                      Improve with AI
                    </>
                  )}
                </Button>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t bg-muted/20 p-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  {editingIndex !== null ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update {type}
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add {type}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setIsAdding(true)}
            >
              <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add {type}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
