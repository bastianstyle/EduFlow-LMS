# EduFlow — Production Learning Management System (LMS)

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-teal?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

EduFlow is an enterprise-grade, full-stack web Learning Management System (LMS) engineered with Next.js 14 App Router, TypeScript, Prisma ORM, and Tailwind CSS. The platform delivers specialized, role-specific experiences for **Students**, **Instructors**, and **Administrators**, featuring interactive video learning, quiz engines with countdown timers, assignment submission & grading suites, automated completion certificate issuance with public cryptographic verification, and governance dashboards.

---

## 📸 Key Interfaces & Visual Design

- **Student Portal**: Interactive video/document curriculum player, live learning progress tracking, quiz runners with timed assessments, assignment submissions, and downloadable/printable graduation certificates.
- **Instructor Suite**: Course creation studio, section & lesson builder, question bank authoring, student project evaluation & grading drawer with feedback.
- **Admin Governance**: Platform-wide telemetry, course quality moderation pipeline (Approval / Rejection / Archival), user role assignments, category taxonomy management, and immutable audit logs.
- **Public Credential Verification**: Real-time public verification system for issued certificates (`/verify/[code]`) with print & PDF export capabilities.

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | **Next.js 14 (App Router)** | Server Components, dynamic streaming, and client reactivity |
| **Language** | **TypeScript 5.6** | End-to-end static type safety and schema validation |
| **Styling & UI** | **Tailwind CSS + Shadcn UI patterns** | Responsive design system, custom palettes, soft shadows |
| **Icons** | **Lucide React** | Clean, accessible iconography |
| **Database & ORM** | **Prisma ORM + SQLite / PostgreSQL** | Relational data integrity, migrations, and automated seed scripts |
| **Authentication & RBAC** | **jose (Stateless JWT) + HTTP-only cookies** | Secure role-based access control (`STUDENT`, `INSTRUCTOR`, `ADMIN`) |
| **Validation** | **Zod** | Server-side and client-side input validation |
| **Testing** | **Node.js Native Test Runner** | Unit tests for grading, progress calculation, and certificate eligibility |

---

## 👥 Pre-Configured Demo Accounts

For demonstration and technical evaluation, one-click demo accounts are pre-seeded in the database:

| Role | Email | Password | Primary Purpose |
|---|---|---|---|
| **Admin** | `admin@eduflow.com` | `password123` | Platform governance, user role modification, course approval |
| **Instructor** | `sarah.jenkins@eduflow.com` | `password123` | Course authoring, curriculum building, grading submissions |
| **Student** | `alex@eduflow.com` | `password123` | Browsing catalog, taking lessons, submitting quizzes, earning certificates |

> *Tip: The navigation bar includes a quick Role Switcher allowing instant toggling between roles during evaluation without manually logging in and out.*

---

## 🏛 Database Architecture & Entity Relationships

The data model features 17 relational entities in `prisma/schema.prisma`:

```
User (id, email, password, role, streakDays, learningHours, xpPoints)
 ├── Enrollment ────────── Course (title, slug, level, status, thumbnail, price)
 │                           ├── Category (name, slug)
 │                           ├── CourseSection
 │                           │     └── Lesson (title, type, videoUrl, durationMinutes)
 │                           │           └── LessonProgress (completed, completedAt)
 │                           ├── Quiz
 │                           │     ├── Question (title, options, correctAnswer)
 │                           │     └── QuizAttempt (score, passed, completedAt)
 │                           └── Assignment
 │                                 └── Submission (content, score, feedback, status)
 ├── Certificate (certificateCode, issueDate, gradeScore)
 ├── Notification (title, message, isRead, link)
 └── ActivityLog (action, details, ipAddress, createdAt)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v25.9)
- **npm** or **pnpm** / **yarn**

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-with-a-random-secret"
NODE_ENV="development"
```

### 4. Database Setup & Seeding
Initialize SQLite schema and populate realistic demo courses, syllabus modules, quizzes, and enrollments:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Production Build

### Run Unit Tests
```bash
npm test
```
Executes test assertions covering:
- Lesson completion and progress percentage calculation
- Quiz scoring thresholds and automatic evaluation engine
- Certificate eligibility verification rules

### Compile Production Build
```bash
npm run build
```
Generates optimized static pages and server-rendered dynamic bundles with 0 compilation errors across all 23 application routes.

---

## 📂 Project Organization

```
eduflow-lms/
├── actions/              # Next.js Server Actions (Auth, Courses, Learning, Notifications, Users)
├── app/                  # Next.js App Router
│   ├── (auth)/           # Login and Register pages
│   ├── admin/            # Admin Portal (Dashboard, Courses, Users, Categories, Activity Logs)
│   ├── instructor/       # Instructor Suite (Dashboard, Courses, Builder, Submissions)
│   ├── student/          # Student Portal (Learn Player, Quizzes, Assignments, Catalog, Certificates)
│   ├── verify/           # Public Certificate Verification Portal
│   ├── globals.css       # Tailwind CSS design system styles
│   └── layout.tsx        # Root layout with Inter typography
├── components/           # Reusable UI Components
│   ├── dashboard/        # Analytics cards, charts, calendars, live classes widgets
│   ├── navigation/       # Role-aware Sidebar and Topbar with demo role switcher
│   ├── notifications/    # Real-time notification center drawer
│   └── ui/               # Atomic components (Button, Card, Badge, Progress, Avatar)
├── lib/                  # Singletons (Prisma client, JWT auth helpers, date utilities)
├── prisma/               # Schema definitions and comprehensive seeding script
├── schemas/              # Zod validation schemas
├── tests/                # Automated test suites
└── types/                # TypeScript interfaces and domain types
```

---

## 📄 License
Released under the [MIT License](LICENSE).
