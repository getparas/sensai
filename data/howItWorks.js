import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Professional Onboarding",
    description:
      "Submit your professional details, industry expertise, and skills to unlock tailored career guidance.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Craft Your Documents",
    description:
      "Generate ATS-friendly resumes and persuasive cover letters that showcase your unique professional profile.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Prepare for Interviews",
    description:
      "Engage in advanced, role-specific mock interview sessions designed to boost your confidence and hone your responses.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your development with comprehensive performance analytics and real-time progress tracking.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
