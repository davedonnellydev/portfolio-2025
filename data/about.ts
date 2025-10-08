export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link: string;
  badgeImage?: string;
}

export interface AboutContent {
  mission: string;
  background: string[];
  certificates: Certificate[];
}

// About page content
export const aboutContent: AboutContent = {
  mission:
    'To build fast, accessible, and impactful web applications that solve real problems for users—while staying at the forefront of modern development practices and AI-assisted workflows.',

  background: [
    "After spending years in education—teaching, curriculum design, and educational leadership—I discovered my passion for solving problems through code. The transition from classroom to codebase wasn't accidental: both require breaking down complex challenges, communicating clearly, and iterating based on feedback.",

    "Since making the shift to web development, I've focused on building production-ready applications with modern frameworks like Next.js, TypeScript, and React. I'm particularly interested in developer experience, accessibility, and leveraging AI tools to ship faster without sacrificing quality. Whether it's implementing responsive design systems, optimizing performance, or writing comprehensive tests, I approach every project with the same rigor I brought to education—attention to detail, clear documentation, and a commitment to continuous improvement.",
  ],

  certificates: [
    {
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta (via Coursera)',
      date: 'October 2024',
      link: 'https://www.coursera.org/account/accomplishments/professional-cert/placeholder',
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'September 2024',
      link: 'https://www.freecodecamp.org/certification/placeholder/javascript-algorithms-and-data-structures',
    },
    {
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: 'August 2024',
      link: 'https://www.freecodecamp.org/certification/placeholder/responsive-web-design',
    },
    {
      name: 'Advanced React',
      issuer: 'Meta (via Coursera)',
      date: 'July 2024',
      link: 'https://www.coursera.org/account/accomplishments/verify/placeholder',
    },
    {
      name: 'React Basics',
      issuer: 'Meta (via Coursera)',
      date: 'June 2024',
      link: 'https://www.coursera.org/account/accomplishments/verify/placeholder',
    },
    {
      name: 'Programming with JavaScript',
      issuer: 'Meta (via Coursera)',
      date: 'May 2024',
      link: 'https://www.coursera.org/account/accomplishments/verify/placeholder',
    },
  ],
};
