const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting EduFlow database seeding...");

  // Clean existing records in safe order
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.quizAnswer.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.courseSection.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Users
  console.log("Creating Users...");
  const admin = await prisma.user.create({
    data: {
      name: "Eleanor Vance (Admin)",
      email: "admin@eduflow.com",
      password: hashedPassword,
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      headline: "Chief Academic Officer & Platform Administrator",
      bio: "Managing quality assurance, academic governance, and instructor standards on EduFlow.",
    },
  });

  const sarah = await prisma.user.create({
    data: {
      name: "Sarah Jenkins",
      email: "sarah.jenkins@eduflow.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      headline: "Principal Product Designer at Stripe • Ex-Airbnb",
      bio: "Over 12 years of experience designing enterprise software and mentoring 10,000+ designers globally.",
    },
  });

  const david = await prisma.user.create({
    data: {
      name: "David Chan",
      email: "david.chan@eduflow.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      headline: "Staff Software Architect • Core Web Vitals Specialist",
      bio: "Building distributed systems and modern web applications with React, Next.js, and TypeScript.",
    },
  });

  const emily = await prisma.user.create({
    data: {
      name: "Emily Watson",
      email: "emily.watson@eduflow.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
      headline: "Director of Content & Technical Communications",
      bio: "Specializing in technical storytelling, documentation architecture, and product education.",
    },
  });

  // Students
  // Alex Hernandez (featured in user UI screenshot)
  const alex = await prisma.user.create({
    data: {
      name: "Alex Hernandez",
      email: "alex@eduflow.com",
      password: hashedPassword,
      role: "STUDENT",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250",
      headline: "Aspiring Product Engineer & Lifelong Learner",
      bio: "Dedicated to mastering UI/UX engineering, modern frontend frameworks, and product design.",
      streakDays: 32,
      learningHours: 126.0,
      xpPoints: 3600,
    },
  });

  const otherStudentsData = [
    { name: "Jessica Miller", email: "jessica@eduflow.com", streakDays: 14, learningHours: 52.0, xpPoints: 1820 },
    { name: "Michael Tan", email: "michael@eduflow.com", streakDays: 21, learningHours: 88.5, xpPoints: 2450 },
    { name: "Priya Sharma", email: "priya@eduflow.com", streakDays: 9, learningHours: 34.0, xpPoints: 950 },
    { name: "Lucas Silva", email: "lucas@eduflow.com", streakDays: 5, learningHours: 18.0, xpPoints: 600 },
    { name: "Emma Davis", email: "emma@eduflow.com", streakDays: 28, learningHours: 110.0, xpPoints: 3100 },
    { name: "Liam Johnson", email: "liam@eduflow.com", streakDays: 12, learningHours: 46.0, xpPoints: 1420 },
    { name: "Sophia Martinez", email: "sophia@eduflow.com", streakDays: 19, learningHours: 74.0, xpPoints: 2150 },
    { name: "Noah Williams", email: "noah@eduflow.com", streakDays: 3, learningHours: 12.0, xpPoints: 400 },
    { name: "Olivia Brown", email: "olivia@eduflow.com", streakDays: 16, learningHours: 65.0, xpPoints: 1900 },
  ];

  const students = [alex];
  for (const s of otherStudentsData) {
    const created = await prisma.user.create({
      data: {
        name: s.name,
        email: s.email,
        password: hashedPassword,
        role: "STUDENT",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name.replace(" ", "")}`,
        streakDays: s.streakDays,
        learningHours: s.learningHours,
        xpPoints: s.xpPoints,
      },
    });
    students.push(created);
  }

  // 2. Categories
  console.log("Creating Categories...");
  const catDesign = await prisma.category.create({
    data: {
      name: "Design & Creative",
      slug: "design",
      description: "UI/UX, visual design systems, prototyping, and user research methodologies.",
      icon: "Palette",
    },
  });

  const catDev = await prisma.category.create({
    data: {
      name: "Development",
      slug: "development",
      description: "Frontend, backend, TypeScript, React, Next.js, and modern full-stack engineering.",
      icon: "Code",
    },
  });

  const catBusiness = await prisma.category.create({
    data: {
      name: "Business & Strategy",
      slug: "business",
      description: "Product management, entrepreneurship, SaaS metrics, and growth leadership.",
      icon: "Briefcase",
    },
  });

  const catAI = await prisma.category.create({
    data: {
      name: "Data & AI",
      slug: "data-ai",
      description: "Machine learning, AI applications, data engineering, and modern analytics.",
      icon: "Cpu",
    },
  });

  const catMarketing = await prisma.category.create({
    data: {
      name: "Communication & Marketing",
      slug: "marketing",
      description: "Content strategy, technical writing, brand storytelling, and public communication.",
      icon: "Megaphone",
    },
  });

  // 3. Courses
  console.log("Creating Courses...");

  // Course 1: UI/UX Design Masterclass (from screenshot)
  const course1 = await prisma.course.create({
    data: {
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      subtitle: "Learn modern user experience principles, Figma workflows, and design systems.",
      description: "Comprehensive end-to-end masterclass covering user research, wireframing, high-fidelity UI design in Figma, usability testing, and design system tokenization. Perfect for aspiring product designers and engineers.",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      categoryId: catDesign.id,
      instructorId: sarah.id,
      level: "INTERMEDIATE",
      durationMinutes: 480,
      price: 89.99,
      status: "PUBLISHED",
      learningObjectives: "Master Figma auto-layout and components\nConduct effective user interviews and synthesis\nBuild accessible, WCAG-compliant color palettes and typography\nExport production-ready specs for developers",
      requirements: "Basic computer familiarity\nFree Figma account\nPassion for creating intuitive interfaces",
    },
  });

  // Course 2: React Development (from screenshot)
  const course2 = await prisma.course.create({
    data: {
      title: "React Development",
      slug: "react-development",
      subtitle: "Modern React with Hooks, TypeScript, state management, and production architecture.",
      description: "Step into modern React 18+. You will learn hooks in depth, state lifting, component lifecycle, context API, data fetching patterns with React Query, and performance profiling.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      categoryId: catDev.id,
      instructorId: david.id,
      level: "BEGINNER",
      durationMinutes: 720,
      price: 99.99,
      status: "PUBLISHED",
      learningObjectives: "Build interactive SPAs with React and TypeScript\nMaster useState, useEffect, useMemo, and custom hooks\nManage complex application state cleanly\nDeploy optimized applications with modern CI/CD",
      requirements: "Basic JavaScript (ES6+) knowledge\nNode.js installed on your machine",
    },
  });

  // Course 3: Advanced Prototyping
  const course3 = await prisma.course.create({
    data: {
      title: "Advanced Prototyping in Figma",
      slug: "advanced-prototyping-figma",
      subtitle: "Micro-interactions, smart animations, variables, and interactive mockups.",
      description: "Take your static designs and bring them to life with Figma variables, interactive components, condition-based interactions, and mobile device testing.",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      categoryId: catDesign.id,
      instructorId: sarah.id,
      level: "ADVANCED",
      durationMinutes: 320,
      price: 69.99,
      status: "PUBLISHED",
      learningObjectives: "Create fluid micro-interactions with Smart Animate\nUse Figma variables to create realistic input fields\nTest usability with interactive prototypes\nPresent designs convincingly to stakeholders",
      requirements: "Intermediate Figma proficiency",
    },
  });

  // Course 4: Redux State Mgmt
  const course4 = await prisma.course.create({
    data: {
      title: "Redux State Mgmt & Architecture",
      slug: "redux-state-management",
      subtitle: "Redux Toolkit, RTK Query, normalized cache, and middleware design.",
      description: "Tackle large-scale enterprise state management without boilerplate fatigue. Learn RTK, entity adapters, asynchronous thunks, and predictable data flow.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      categoryId: catDev.id,
      instructorId: david.id,
      level: "ADVANCED",
      durationMinutes: 300,
      price: 79.99,
      status: "PUBLISHED",
      learningObjectives: "Configure Redux Toolkit in real-world TypeScript apps\nUse RTK Query for automatic cache invalidation\nDebug states with Redux DevTools\nRefactor legacy Redux codebases cleanly",
      requirements: "Working knowledge of React and TypeScript",
    },
  });

  // Course 5: Content Strategy 101
  const course5 = await prisma.course.create({
    data: {
      title: "Content Strategy 101",
      slug: "content-strategy-101",
      subtitle: "Editorial frameworks, UX copywriting, brand voice, and audience engagement.",
      description: "Learn how words shape product experiences. Discover information architecture, voice and tone guidelines, microcopy, and multi-channel content roadmaps.",
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      categoryId: catMarketing.id,
      instructorId: emily.id,
      level: "BEGINNER",
      durationMinutes: 240,
      price: 49.99,
      status: "PUBLISHED",
      learningObjectives: "Formulate strategic voice & tone principles\nWrite persuasive UX microcopy and empty state text\nAudit existing content for clarity and SEO impact\nMeasure content effectiveness with engagement metrics",
      requirements: "No prior writing background required",
    },
  });

  // Course 6: Full-Stack Next.js 14 & Prisma
  const course6 = await prisma.course.create({
    data: {
      title: "Full-Stack Next.js 14 & Prisma",
      slug: "fullstack-nextjs-prisma",
      subtitle: "App Router, Server Actions, PostgreSQL, Auth, and Cloud Deployment.",
      description: "Build production-ready, full-stack applications with Next.js App Router, React Server Components, Prisma ORM, and secure authentication.",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      categoryId: catDev.id,
      instructorId: david.id,
      level: "INTERMEDIATE",
      durationMinutes: 600,
      price: 119.99,
      status: "PUBLISHED",
      learningObjectives: "Architect production SaaS apps with Next.js App Router\nWrite secure Server Actions with Zod validation\nModel relational schemas and run migrations with Prisma\nDeploy scalable applications on cloud infrastructure",
      requirements: "Solid JavaScript and React experience",
    },
  });

  // Course 7: Design Systems at Scale
  const course7 = await prisma.course.create({
    data: {
      title: "Design Systems at Scale",
      slug: "design-systems-scale",
      subtitle: "Building cross-platform tokens, accessible components, and governance workflows.",
      description: "A guide for teams building multi-brand, accessible design systems. Covers token pipelines, Storybook documentation, and versioning.",
      thumbnail: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=800",
      categoryId: catDesign.id,
      instructorId: sarah.id,
      level: "ADVANCED",
      durationMinutes: 380,
      price: 94.99,
      status: "PENDING", // Good for testing admin course approval!
      learningObjectives: "Structure design tokens for web and mobile\nAutomate sync between Figma and code repositories\nImplement WCAG AA accessibility standards",
      requirements: "Figma and basic CSS understanding",
    },
  });

  // Course 8: Technical Writing for Developers
  const course8 = await prisma.course.create({
    data: {
      title: "Technical Writing for Developers",
      slug: "technical-writing-developers",
      subtitle: "Write clear documentation, RFCs, API references, and open-source guides.",
      description: "Turn technical complexity into developer delight. Learn how to write compelling READMEs, concise OpenAPI docs, and architecture decision records.",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
      categoryId: catMarketing.id,
      instructorId: emily.id,
      level: "BEGINNER",
      durationMinutes: 210,
      price: 39.99,
      status: "DRAFT", // Good for instructor draft testing!
      learningObjectives: "Write developer-friendly API references\nDraft persuasive RFCs and technical proposals\nDocument complex algorithms with clear diagrams",
      requirements: "Basic coding experience",
    },
  });

  // 4. Sections & Lessons for Course 1 (UI/UX Design Masterclass - 20 lessons total)
  console.log("Creating Sections and Lessons for Course 1...");
  
  // Section 1
  const sec1_1 = await prisma.courseSection.create({
    data: {
      title: "Module 1: Foundations of User-Centered Design",
      order: 1,
      courseId: course1.id,
    },
  });

  const sec1_2 = await prisma.courseSection.create({
    data: {
      title: "Module 2: User Research and Information Architecture",
      order: 2,
      courseId: course1.id,
    },
  });

  const sec1_3 = await prisma.courseSection.create({
    data: {
      title: "Module 3: Wireframing and Prototyping in Figma",
      order: 3,
      courseId: course1.id,
    },
  });

  const sec1_4 = await prisma.courseSection.create({
    data: {
      title: "Module 4: Design Systems, Tokens, and Handoff",
      order: 4,
      courseId: course1.id,
    },
  });

  const c1_lessons = [];
  const lessonsData1 = [
    // Module 1
    { sec: sec1_1.id, title: "1.1 Introduction to Modern Product Design", order: 1, duration: 15, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", free: true },
    { sec: sec1_1.id, title: "1.2 The UX Double Diamond Process", order: 2, duration: 20, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", free: true },
    { sec: sec1_1.id, title: "1.3 Understanding Cognitive Load and Mental Models", order: 3, duration: 25, type: "DOCUMENT", doc: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { sec: sec1_1.id, title: "1.4 Nielsen's 10 Usability Heuristics in Practice", order: 4, duration: 30, type: "TEXT", content: "# Nielsen's 10 Usability Heuristics\n\n1. **Visibility of system status**: Always keep users informed through appropriate feedback.\n2. **Match between system and real world**: Speak the user's language.\n3. **User control and freedom**: Support undo and redo.\n4. **Consistency and standards**: Follow platform conventions." },
    { sec: sec1_1.id, title: "1.5 Module 1 Summary & Reflection", order: 5, duration: 10, type: "TEXT", content: "Review your notes and prepare for the user research module." },

    // Module 2
    { sec: sec1_2.id, title: "2.1 Planning and Conducting User Interviews", order: 1, duration: 25, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_2.id, title: "2.2 Synthesizing Findings with Affinity Mapping", order: 2, duration: 25, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_2.id, title: "2.3 Creating Actionable User Personas", order: 3, duration: 20, type: "DOCUMENT", doc: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { sec: sec1_2.id, title: "2.4 User Journey Mapping & Pain Point Identification", order: 4, duration: 30, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_2.id, title: "2.5 Information Architecture & Sitemap Tree Structuring", order: 5, duration: 30, type: "TEXT", content: "Organize multi-tier application navigation with card sorting methods." },

    // Module 3
    { sec: sec1_3.id, title: "3.1 Low-Fidelity Sketching and Crazy Eights", order: 1, duration: 20, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_3.id, title: "3.2 Setting Up Your Figma Workspace & Grid Systems", order: 2, duration: 25, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_3.id, title: "3.3 Figma Auto-Layout Fundamentals and Best Practices", order: 3, duration: 35, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_3.id, title: "3.4 Responsive Components and Component Properties", order: 4, duration: 30, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_3.id, title: "3.5 Interactive Prototyping: Overlays, Modals, and Transitions", order: 5, duration: 35, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_3.id, title: "3.6 Usability Testing Your Interactive Prototype", order: 6, duration: 25, type: "DOCUMENT", doc: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },

    // Module 4 (Lessons 17-20: Alex has done 16, so 17-20 are uncompleted!)
    { sec: sec1_4.id, title: "4.1 Color Palettes, Accessibility, and WCAG Contrast", order: 1, duration: 25, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_4.id, title: "4.2 Modular Typography Scales and Vertical Rhythm", order: 2, duration: 25, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_4.id, title: "4.3 Design Tokens for Engineering Collaboration", order: 3, duration: 30, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { sec: sec1_4.id, title: "4.4 Design QA, Developer Handoff, and Documentation", order: 4, duration: 30, type: "VIDEO", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  for (const item of lessonsData1) {
    const l = await prisma.lesson.create({
      data: {
        title: item.title,
        order: item.order,
        durationMinutes: item.duration,
        sectionId: item.sec,
        type: item.type,
        videoUrl: item.video || null,
        documentUrl: item.doc || null,
        content: item.content || "Comprehensive guide and code notes for this lesson.",
        isFreePreview: item.free || false,
      },
    });
    c1_lessons.push(l);
  }

  // Sections & Lessons for Course 2 (React Development)
  const sec2_1 = await prisma.courseSection.create({
    data: {
      title: "Section 1: Modern JavaScript & React Fundamentals",
      order: 1,
      courseId: course2.id,
    },
  });

  const sec2_2 = await prisma.courseSection.create({
    data: {
      title: "Section 2: Deep Dive into React Hooks & Custom Hooks",
      order: 2,
      courseId: course2.id,
    },
  });

  const c2_lessons = [];
  for (let i = 1; i <= 10; i++) {
    const l = await prisma.lesson.create({
      data: {
        title: `Lesson 1.${i}: Core React Patterns Part ${i}`,
        order: i,
        durationMinutes: 15,
        sectionId: sec2_1.id,
        type: "VIDEO",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: `Detailed lecture notes for Lesson 1.${i}.`,
        isFreePreview: i === 1,
      },
    });
    c2_lessons.push(l);
  }

  for (let i = 1; i <= 10; i++) {
    const l = await prisma.lesson.create({
      data: {
        title: `Lesson 2.${i}: Custom Hooks and Performance ${i}`,
        order: i,
        durationMinutes: 20,
        sectionId: sec2_2.id,
        type: "VIDEO",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: `Detailed lecture notes for Lesson 2.${i}.`,
      },
    });
    c2_lessons.push(l);
  }

  // Also add basic sections for other courses
  const otherCourses = [course3, course4, course5, course6, course7, course8];
  for (const c of otherCourses) {
    const sec = await prisma.courseSection.create({
      data: {
        title: `Section 1: Getting Started with ${c.title}`,
        order: 1,
        courseId: c.id,
      },
    });
    for (let i = 1; i <= 3; i++) {
      await prisma.lesson.create({
        data: {
          title: `Introductory Topic ${i} for ${c.title}`,
          order: i,
          durationMinutes: 15,
          sectionId: sec.id,
          type: "VIDEO",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          content: `Content for ${c.title} topic ${i}.`,
          isFreePreview: i === 1,
        },
      });
    }
  }

  // 5. Enrollments
  console.log("Creating Enrollments...");
  // Alex is enrolled in Course 1 and Course 2 (as seen in screenshot!)
  const enrollAlex1 = await prisma.enrollment.create({
    data: {
      studentId: alex.id,
      courseId: course1.id,
      status: "ACTIVE",
      enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  });

  const enrollAlex2 = await prisma.enrollment.create({
    data: {
      studentId: alex.id,
      courseId: course2.id,
      status: "ACTIVE",
      enrolledAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
  });

  // Alex completed 16 out of 20 lessons in Course 1 (80% progress as in the screenshot!)
  console.log("Setting up Alex's Lesson Progress (16/20 lessons = 80%)...");
  for (let i = 0; i < 16; i++) {
    await prisma.lessonProgress.create({
      data: {
        studentId: alex.id,
        lessonId: c1_lessons[i].id,
        isCompleted: true,
        completedAt: new Date(Date.now() - (16 - i) * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Alex completed 10 out of 20 lessons in Course 2 (50% progress as in the screenshot!)
  for (let i = 0; i < 10; i++) {
    await prisma.lessonProgress.create({
      data: {
        studentId: alex.id,
        lessonId: c2_lessons[i].id,
        isCompleted: true,
        completedAt: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000),
      },
    });
  }

  // Other student enrollments
  for (let i = 1; i < students.length; i++) {
    const st = students[i];
    await prisma.enrollment.create({
      data: {
        studentId: st.id,
        courseId: i % 2 === 0 ? course1.id : course2.id,
        status: "ACTIVE",
      },
    });
  }

  // 6. Quizzes & Questions
  console.log("Creating Quizzes & Questions...");
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "UI/UX Heuristics and Wireframing Knowledge Check",
      description: "Test your understanding of Nielsen's heuristics, visual hierarchy, and basic Figma shortcuts.",
      timeLimitMinutes: 15,
      passingScore: 75,
      courseId: course1.id,
    },
  });

  const q1 = await prisma.question.create({
    data: {
      quizId: quiz1.id,
      text: "Which of Nielsen's Usability Heuristics advises providing feedback on user actions within a reasonable time?",
      type: "MULTIPLE_CHOICE",
      optionsJson: JSON.stringify([
        "Consistency and standards",
        "Visibility of system status",
        "Flexibility and efficiency of use",
        "Error prevention",
      ]),
      correctAnswer: "Visibility of system status",
      explanation: "Visibility of system status ensures the user is constantly informed about what is happening with appropriate feedback.",
      points: 25,
    },
  });

  const q2 = await prisma.question.create({
    data: {
      quizId: quiz1.id,
      text: "True or False: WCAG AA standards require a minimum contrast ratio of 4.5:1 for normal body text against its background.",
      type: "TRUE_FALSE",
      optionsJson: JSON.stringify(["True", "False"]),
      correctAnswer: "True",
      explanation: "WCAG 2.1 Level AA requires at least 4.5:1 for regular text and 3:1 for large text (18pt or 14pt bold).",
      points: 25,
    },
  });

  const q3 = await prisma.question.create({
    data: {
      quizId: quiz1.id,
      text: "What key feature in Figma allows layouts to adapt automatically when padding or content changes?",
      type: "MULTIPLE_CHOICE",
      optionsJson: JSON.stringify([
        "Smart Animate",
        "Auto Layout",
        "Component Variants",
        "Vector Networks",
      ]),
      correctAnswer: "Auto Layout",
      explanation: "Auto Layout applies flexbox-like dynamic spacing, padding, and alignment inside frames.",
      points: 25,
    },
  });

  const q4 = await prisma.question.create({
    data: {
      quizId: quiz1.id,
      text: "In user research, what is the primary goal of an Affinity Diagram?",
      type: "MULTIPLE_CHOICE",
      optionsJson: JSON.stringify([
        "Calculate statistical standard deviation",
        "Cluster qualitative observations into meaningful themes",
        "Export vector CSS styles",
        "Build 3D prototype models",
      ]),
      correctAnswer: "Cluster qualitative observations into meaningful themes",
      explanation: "Affinity diagramming is a collaborative method for organizing qualitative interview data into insight clusters.",
      points: 25,
    },
  });

  // Quiz for React Course
  const quiz2 = await prisma.quiz.create({
    data: {
      title: "React Hooks and Component Lifecycle Assessment",
      description: "Verify your mastery of React 18 hooks, memoization, and reconciliation.",
      timeLimitMinutes: 20,
      passingScore: 70,
      courseId: course2.id,
    },
  });

  await prisma.question.create({
    data: {
      quizId: quiz2.id,
      text: "Which hook should you use to preserve a mutable value across renders without triggering a re-render?",
      type: "MULTIPLE_CHOICE",
      optionsJson: JSON.stringify(["useState", "useMemo", "useRef", "useCallback"]),
      correctAnswer: "useRef",
      explanation: "useRef holds a mutable .current property that persists across renders without causing DOM re-renders.",
      points: 50,
    },
  });

  await prisma.question.create({
    data: {
      quizId: quiz2.id,
      text: "True or False: React Server Components can run hooks like useState and useEffect on the server.",
      type: "TRUE_FALSE",
      optionsJson: JSON.stringify(["True", "False"]),
      correctAnswer: "False",
      explanation: "React Server Components run only on the server and cannot hold interactive browser state hooks like useState or useEffect.",
      points: 50,
    },
  });

  // Alex Quiz Attempt
  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId: quiz1.id,
      studentId: alex.id,
      score: 100,
      totalQuestions: 4,
      correctAnswers: 4,
      isPassed: true,
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
  });

  await prisma.quizAnswer.create({
    data: {
      attemptId: attempt.id,
      questionId: q1.id,
      selectedAnswer: "Visibility of system status",
      isCorrect: true,
    },
  });

  // 7. Assignments & Submissions
  console.log("Creating Assignments & Submissions...");
  const assign1 = await prisma.assignment.create({
    data: {
      title: "Design a High-Fidelity Mobile Onboarding Flow in Figma",
      description: "Create a 3-screen onboarding flow for a fintech or healthcare application. Include auto-layout, WCAG compliant colors, and submit your Figma view link along with a 200-word design rationale.",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      courseId: course1.id,
    },
  });

  const assign2 = await prisma.assignment.create({
    data: {
      title: "Interactive E-Commerce Product Card with React & Tailwind",
      description: "Build an accessible, responsive product card component with variant selectors, quantity stepper, and cart animation.",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      courseId: course2.id,
    },
  });

  // Alex submitted Assignment 1
  await prisma.submission.create({
    data: {
      assignmentId: assign1.id,
      studentId: alex.id,
      content: "Here is my Figma project submission: https://figma.com/@alex/fintech-onboarding\n\nDesign Rationale: The onboarding flow prioritizes trust and psychological safety. Screen 1 welcomes the user with a micro-illustration, Screen 2 explains 2FA biometric security, and Screen 3 collects user preferences using accessible 48px touch targets.",
      attachmentUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800",
      status: "GRADED",
      score: 95.0,
      feedback: "Outstanding work, Alex! Your typography scale is well-balanced and the touch target contrast adheres cleanly to WCAG AA guidelines. Next time, consider adding micro-animations for keyboard interactions.",
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      gradedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  // 8. Sample Certificate
  console.log("Creating Sample Certificate...");
  await prisma.certificate.create({
    data: {
      certificateCode: "EDU-2026-ALX994",
      studentId: alex.id,
      courseId: course3.id, // Advanced Prototyping
      issuedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  });

  // 9. Course Reviews
  console.log("Creating Reviews...");
  await prisma.review.create({
    data: {
      studentId: alex.id,
      courseId: course1.id,
      rating: 5,
      comment: "Sarah is hands down one of the best instructors in the design space. The auto-layout breakdown alone made this course worth 10x the price!",
    },
  });

  await prisma.review.create({
    data: {
      studentId: students[1].id,
      courseId: course1.id,
      rating: 5,
      comment: "Incredible curriculum! Practical, modern, and completely up to date with Figma's latest features.",
    },
  });

  await prisma.review.create({
    data: {
      studentId: alex.id,
      courseId: course2.id,
      rating: 5,
      comment: "David's explanations of custom hooks and React 18 rendering model are crystal clear.",
    },
  });

  // 10. Notifications
  console.log("Creating In-App Notifications for Alex...");
  await prisma.notification.create({
    data: {
      userId: alex.id,
      title: "Assignment Graded!",
      message: "Sarah Jenkins graded your submission for 'Design a High-Fidelity Mobile Onboarding Flow': 95/100.",
      type: "SUCCESS",
      link: "/student/assignments",
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: alex.id,
      title: "Upcoming Live Class Reminder",
      message: "Sarah Jenkins is hosting 'Advanced Prototyping' live session right now!",
      type: "INFO",
      link: "/student/live-classes",
      isRead: false,
    },
  });

  await prisma.notification.create({
    data: {
      userId: alex.id,
      title: "Streak Milestone Achieved 🔥",
      message: "Congratulations! You have maintained an active 32-day learning streak.",
      type: "SUCCESS",
      link: "/student/dashboard",
      isRead: true,
    },
  });

  // 11. Activity Logs
  console.log("Creating Activity Logs...");
  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: "PLATFORM_AUDIT",
      details: "Admin initiated global compliance and course catalog check.",
    },
  });

  await prisma.activityLog.create({
    data: {
      userId: alex.id,
      action: "LESSON_COMPLETED",
      details: "Completed Lesson 3.6: Usability Testing Your Interactive Prototype.",
    },
  });

  console.log("✅ EduFlow database seeding finished successfully!");
  console.log("--------------------------------------------------");
  console.log("Demo Accounts Created:");
  console.log("👑 ADMIN:       admin@eduflow.com       / password123");
  console.log("👨‍🏫 INSTRUCTOR:  sarah.jenkins@eduflow.com / password123");
  console.log("👨‍🏫 INSTRUCTOR:  david.chan@eduflow.com    / password123");
  console.log("🎓 STUDENT:     alex@eduflow.com        / password123  (Featured in Dashboard screenshot)");
  console.log("🎓 STUDENT:     jessica@eduflow.com     / password123");
  console.log("--------------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
