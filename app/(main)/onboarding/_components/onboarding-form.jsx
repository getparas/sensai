"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function OnBoardingForm({ industries }) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch("industry");

  const onSubmit = (data) => {
    console.log("FORM SUBMITTED ➞", data);
    // router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title gradient-premium text-4xl">
            Complete your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      resetField("subIndustry");
                    }}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && (
                <p className="text-sm text-red-300">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Sub‑Industry */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Controller
                  name="subIndustry"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="subIndustry">
                        <SelectValue placeholder="Select a sub‑industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries
                          .find((i) => i.id === watchIndustry)
                          ?.subIndustries.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subIndustry && (
                  <p className="text-sm text-red-300">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Years of Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <Input
                    id="experience"
                    type="number"
                    min={0}
                    max={50}
                    placeholder="Enter years of experience"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-300">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Input
                    id="skills"
                    placeholder="e.g., React, Node.js, etc."
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-300">{errors.skills.message}</p>
              )}
            </div>

            {/* Professional Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="bio"
                    className="h-32"
                    placeholder="Tell us about your professional background"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {errors.bio && (
                <p className="text-sm text-red-300">{errors.bio.message}</p>
              )}
            </div>

            <Button className="w-full" type="submit">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
