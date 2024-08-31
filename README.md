# Coding Diary - Learning Management System (LMS)

Coding Diary is a comprehensive Learning Management System (LMS) designed to streamline the learning process for both students and instructors. Built with modern web technologies like Next.js, TypeScript, and Tailwind CSS, and backed by Prisma ORM with a Supabase database, Coding Diary offers an intuitive and powerful platform for managing and delivering educational content.

## Features

### For Learners
- **Track Course Progress:** Stay on top of your learning journey by tracking your progress through various courses.
- **Access to Courses:** Browse and enroll in a wide range of courses, including both free and paid options.
- **Video Content & Attachments:** Learn through high-quality video content and additional resources attached to the courses.
- **Payments:** Securely pay for courses using integrated payment gateways.

### For Instructors
- **Course Creation:** Easily create and manage courses with an intuitive course builder.
- **Monetization:** Set prices for your courses and monetize your educational content.
- **Income Tracking:** Monitor the income generated from your courses in real-time.

## Tech Stack

- **Frontend:** 
  - [Next.js](https://nextjs.org/) - A powerful React framework for building server-side rendered and static web applications.
  - [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript, providing better tooling and scalability.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.

- **Backend & Database:** 
  - [Prisma](https://www.prisma.io/) - A modern ORM that simplifies database access and provides type-safe queries.
  - [Supabase](https://supabase.com/) - An open-source Firebase alternative that handles authentication, storage, and database management.

- **Authentication:**
  - [ClerkAuth](https://clerk.dev/) - A user management and authentication platform that provides seamless authentication flows, including user sign-up, sign-in, and management.

- **Deployment:**
  - [Vercel](https://vercel.com/) - A cloud platform for static sites and serverless functions, used for deploying the Coding Diary application.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Supabase account
- ClerkAuth account
- Vercel account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BeatriceWambuiMbugua/learning-management-system.git
   cd learning-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<Your Supabase URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your Supabase Anonymous Key>
   DATABASE_URL=<Your Prisma Database URL>
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Your Clerk Publishable Key>
   CLERK_SECRET_KEY=<Your Clerk Secret Key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application running.

### Deployment

Coding Diary is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. **Connect to Vercel:**
   - Sign up or log in to your Vercel account.
   - Connect your GitHub repository to Vercel.

2. **Set Environment Variables:**
   - Go to the Vercel dashboard, navigate to your project, and set the required environment variables in the settings.

3. **Deploy:**
   - Deploy the application directly from the Vercel dashboard.

### Database Migration

Ensure that the database is up-to-date with the latest schema:

```bash
npx prisma migrate dev
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

Coding Diary is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [ClerkAuth](https://clerk.dev/)
- [Vercel](https://vercel.com/)

---

This README now includes deployment instructions for Vercel, along with an overview of the project, tech stack, and setup instructions.
