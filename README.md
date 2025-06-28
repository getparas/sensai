# Sensai: Your AI-Powered Career Coach


Sensai is a comprehensive, AI-driven platform designed to empower job seekers in their career journey. From crafting the perfect resume to acing the interview, Sensai provides a suite of tools to help users land their dream job.

## ✨ Key Features

-   **🤖 AI Resume Builder**: Create professional, ATS-friendly resumes tailored to specific job descriptions.
-   **✍️ Cover Letter Generator**: Generate compelling and personalized cover letters in minutes.
-   **🎙️ Mock Interview Prep**: Practice with AI-driven mock interviews, receive performance feedback, and track your progress.
-   **📈 Performance Analytics**: A personalized dashboard to visualize your interview performance, strengths, and areas for improvement.
-   **🔍 Personalized Job Recommendations**: Discover job opportunities that match your skills and career goals.
-   **🔐 Secure User Authentication**: Managed by Clerk for robust and secure user sign-up and sign-in.
-   **⚡ Background Job Processing**: Powered by Inngest for reliable and scalable asynchronous tasks.

## 🛠️ Tech Stack

| Category              | Technology                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| **Framework**         | [Next.js](https://nextjs.org/) (App Router)                                                            |
| **Database / ORM**    | [Prisma](https://www.prisma.io/)                                                                       |
| **Authentication**    | [Clerk](https://clerk.com/)                                                                            |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)                           |
| **Background Jobs**   | [Inngest](https://www.inngest.com/)                                                                    |
| **Linting/Formatting**| [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)                                         |
| **Deployment**        | Vercel (Recommended)                                                                                   |


## 📂 Project Structure

The project uses the Next.js App Router, organizing the codebase feature-wise.

```
/
├── app/                    # Main application code
│   ├── (auth)/             # Authentication routes (Clerk)
│   ├── (main)/             # Core protected routes (dashboard, resume, etc.)
│   │   ├── dashboard/
│   │   ├── resume/
│   │   ├── cover-letter/
│   │   └── interview/
│   ├── api/                # API routes (Inngest, recommendations)
│   └── lib/                # Shared libraries and helper functions
├── actions/                # Server Actions for data mutation
├── components/             # Shared UI components (shadcn/ui)
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── ...                     # Config files
```
