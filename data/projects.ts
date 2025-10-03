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
    screenshot: '/images/projects/learning-platform.svg',
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
      problem:
        'Teachers were spending too much time on administrative tasks instead of teaching. The existing system required manual grading, attendance tracking, and progress monitoring, leaving educators with little time for actual instruction.',
      approach:
        'Developed automated workflows and AI-powered grading to streamline processes. Implemented real-time collaboration tools and personalized learning paths using machine learning algorithms.',
      result:
        'Reduced admin time by 30% and increased student engagement through personalized learning paths.',
      architecture:
        'Built on Next.js with TypeScript for type safety. Used PostgreSQL for data persistence and Redis for caching. Implemented real-time features with WebSockets and deployed on Vercel with edge functions for global performance.',
      aiUsage:
        'Integrated OpenAI API for automated essay grading and feedback generation. Used machine learning to create personalized learning recommendations based on student performance patterns.',
      codeExcerpts: [
        {
          title: 'Real-time Collaboration Hook',
          language: 'typescript',
          code: `export function useRealTimeCollaboration(roomId: string) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.emit('join-room', roomId);

    socket.on('participant-joined', (participant) => {
      setParticipants(prev => [...prev, participant]);
    });

    return () => socket.disconnect();
  }, [roomId]);

  return { participants };
}`,
        },
        {
          title: 'AI Grading Service',
          language: 'typescript',
          code: `export async function gradeEssayWithAI(essay: string, rubric: Rubric) {
  const prompt = \`Grade this essay based on the rubric: \${JSON.stringify(rubric)}\`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt + essay }],
    temperature: 0.3,
  });

  return parseGradingResponse(response.choices[0].message.content);
}`,
        },
      ],
      nextSteps:
        'Implement advanced analytics dashboard for teachers, add mobile app for students, and integrate with popular LMS platforms like Canvas and Blackboard.',
    },
  },
  {
    slug: 'student-analytics-dashboard',
    title: 'Student Analytics Dashboard',
    description:
      'Real-time analytics dashboard for educators to track student progress and identify at-risk learners early.',
    outcome: 'Helped identify and support 200+ at-risk students, improving retention by 25%',
    metrics: ['200+ at-risk students identified', '25% retention improvement', '50+ schools using'],
    screenshot: '/images/projects/analytics-dashboard.svg',
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
      problem:
        "Teachers couldn't easily spot students who were falling behind. With hundreds of students across multiple classes, identifying at-risk learners required manual data analysis that was time-consuming and often too late.",
      approach:
        'Created visual dashboards with predictive analytics and early warning indicators. Built interactive charts using D3.js and implemented real-time data processing to flag students showing concerning patterns.',
      result: 'Improved student retention by 25% through early intervention.',
      architecture:
        'React frontend with TypeScript and D3.js for data visualization. Node.js backend with MongoDB for flexible data storage. Real-time updates via WebSocket connections.',
      aiUsage:
        'Used machine learning algorithms to predict student success probability based on engagement patterns, assignment completion rates, and grade trends.',
      codeExcerpts: [
        {
          title: 'Risk Assessment Algorithm',
          language: 'javascript',
          code: `function calculateRiskScore(student) {
  const factors = {
    attendance: student.attendanceRate * 0.3,
    grades: (student.averageGrade / 100) * 0.4,
    engagement: student.engagementScore * 0.2,
    assignments: student.completionRate * 0.1
  };

  const riskScore = Object.values(factors).reduce((sum, factor) => sum + factor, 0);
  return Math.max(0, Math.min(100, (1 - riskScore) * 100));
}`,
        },
      ],
      nextSteps:
        'Add predictive modeling for course recommendations, implement automated intervention workflows, and create mobile alerts for teachers.',
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
    screenshot: '/images/projects/course-builder.svg',
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
      problem:
        'Existing tools made it difficult to create accessible course content. Course creators had to manually check for accessibility issues, often discovering problems after content was already published.',
      approach:
        'Built real-time accessibility checking and remediation tools into the authoring workflow. Integrated axe-core for automated testing and provided inline suggestions for fixing accessibility issues.',
      result: 'Achieved 100% WCAG AAA compliance with zero accessibility complaints.',
      architecture:
        'Next.js with TypeScript and MDX for content authoring. Integrated axe-core for accessibility testing and built custom components that enforce accessibility standards.',
      aiUsage:
        'Used AI to automatically generate alt text for images and suggest accessible color combinations based on WCAG contrast requirements.',
      codeExcerpts: [
        {
          title: 'Accessibility Checker Hook',
          language: 'typescript',
          code: `export function useAccessibilityChecker() {
  const [violations, setViolations] = useState<AxeViolation[]>([]);

  const checkAccessibility = useCallback(async (element: HTMLElement) => {
    const results = await axe.run(element, {
      rules: {
        'color-contrast': { enabled: true },
        'alt-text': { enabled: true },
        'keyboard-navigation': { enabled: true }
      }
    });

    setViolations(results.violations);
  }, []);

  return { violations, checkAccessibility };
}`,
        },
        {
          title: 'Accessible Button Component',
          language: 'tsx',
          code: `interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function AccessibleButton({ children, onClick, variant = 'primary' }: AccessibleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
      aria-label={typeof children === 'string' ? children : 'Button'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}`,
        },
      ],
      nextSteps:
        'Add support for screen reader testing, implement automated accessibility reports, and create templates for common accessible content patterns.',
    },
  },
];
