# Sensai: Your AI-Powered Career Coach

![Sensai Banner](./public/banner.png)

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

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18.x or later)
-   npm, yarn, or pnpm
-   A PostgreSQL database (or any other database compatible with Prisma)
-   API keys for Clerk, Inngest, and an AI provider (e.g., OpenAI).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sensai.git
    cd sensai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables. You can use the `.env.example` file as a template.

    ```env
    # Prisma / Database
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Inngest
    INNGEST_EVENT_KEY=your_inngest_event_key

    # AI Provider (e.g., OpenAI)
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Run database migrations:**
    This will sync the Prisma schema with your database.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

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

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.