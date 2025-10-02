export interface Project {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  metrics?: string[];
  screenshot: string;
  techStack: string[];
  links: {
    live?: string;
    repo?: string;
    caseStudy: string;
  };
  featured: boolean;
  content?: {
    tldr: string;
    role: string;
    timeframe: string;
    problem: string;
    approach: string;
    result: string;
    architecture?: string;
    aiUsage?: string;
    codeExcerpts?: Array<{
      title: string;
      code: string;
      language: string;
    }>;
    nextSteps?: string;
  };
}

// Placeholder project data - to be replaced with real projects
export const projects: Project[] = [
  {
    slug: 'learning-platform',
    title: 'Interactive Learning Platform',
    description:
      'A comprehensive e-learning platform with real-time collaboration, progress tracking, and AI-powered recommendations.',
    outcome: 'Increased student engagement by 45% and reduced teacher admin time by 30%',
    metrics: ['45% increase in engagement', '30% reduction in admin time', '10,000+ active users'],
    screenshot: '/images/projects/learning-platform.jpg',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'OpenAI'],
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/example/learning-platform',
      caseStudy: '/projects/learning-platform',
    },
    featured: true,
    content: {
      tldr: 'Built a scalable learning platform that serves 10,000+ students with AI-powered features.',
      role: 'Full-stack Developer',
      timeframe: '6 months',
      problem: 'Teachers were spending too much time on administrative tasks instead of teaching.',
      approach: 'Developed automated workflows and AI-powered grading to streamline processes.',
      result:
        'Reduced admin time by 30% and increased student engagement through personalized learning paths.',
    },
  },
  {
    slug: 'student-analytics-dashboard',
    title: 'Student Analytics Dashboard',
    description:
      'Real-time analytics dashboard for educators to track student progress and identify at-risk learners early.',
    outcome: 'Helped identify and support 200+ at-risk students, improving retention by 25%',
    metrics: ['200+ at-risk students identified', '25% retention improvement', '50+ schools using'],
    screenshot: '/images/projects/analytics-dashboard.jpg',
    techStack: ['React', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
    links: {
      live: 'https://example.com',
      caseStudy: '/projects/student-analytics-dashboard',
    },
    featured: true,
    content: {
      tldr: "Analytics platform that helps educators identify struggling students before it's too late.",
      role: 'Frontend Developer',
      timeframe: '4 months',
      problem: "Teachers couldn't easily spot students who were falling behind.",
      approach: 'Created visual dashboards with predictive analytics and early warning indicators.',
      result: 'Improved student retention by 25% through early intervention.',
    },
  },
  {
    slug: 'accessible-course-builder',
    title: 'Accessible Course Builder',
    description:
      'WCAG AAA compliant course authoring tool with built-in accessibility checks and screen reader support.',
    outcome: 'Enabled 100% accessible course creation, serving 5,000+ students with disabilities',
    metrics: [
      '100% WCAG AAA compliance',
      '5,000+ students with disabilities served',
      '0 accessibility complaints',
    ],
    screenshot: '/images/projects/course-builder.jpg',
    techStack: ['Next.js', 'TypeScript', 'MDX', 'Jest', 'Testing Library'],
    links: {
      repo: 'https://github.com/example/course-builder',
      caseStudy: '/projects/accessible-course-builder',
    },
    featured: true,
    content: {
      tldr: 'Course builder with accessibility built in from the ground up.',
      role: 'Full-stack Developer',
      timeframe: '5 months',
      problem: 'Existing tools made it difficult to create accessible course content.',
      approach:
        'Built real-time accessibility checking and remediation tools into the authoring workflow.',
      result: 'Achieved 100% WCAG AAA compliance with zero accessibility complaints.',
    },
  },
];
