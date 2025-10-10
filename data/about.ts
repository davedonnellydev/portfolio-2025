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
    'To build fast, accessible, and impactful web applications that solve real problems for users, while staying at the forefront of modern development practices and AI-assisted workflows.',

  background: [
    "I'm Dave, a front-end developer who has taken a bit of a non-traditional route into tech. For over 15 years, I worked in higher education — handling highly complex systems, working across multiple teams and stakeholders, and helping major projects come to life. I've led rollouts, worked with vendors, wrangled messy data, and made sure the tech side actually worked for the people using it.",

    "But over time, I found myself more and more drawn to coding — so I retrained through General Assembly and got stuck into HTML, CSS, JavaScript, React, and Git. Now I'm focused on building clean, accessible web apps that are easy to use and maintain. I enjoy figuring things out, improving workflows, and building interfaces that feel intuitive.",

    "I bring solid problem-solving skills, a collaborative mindset, and years of experience translating business needs into working systems. Outside of coding, you'll find me at the theatre, planning my next trip, or enjoying a glass of wine on the couch with my husband, Tyson and 3 year old spoodle, Alfie.",
  ],

  certificates: [
    {
      name: 'Intro to AI Engineering',
      issuer: 'Scrimba',
      date: '27 June 2025',
      link: 'https://scrimba.com/certificate-cert24zAwJ78oWAth624LLHpZyegUtHcinqm4Amji',
    },
    {
      name: 'Learn TypeScript',
      issuer: 'Scrimba',
      date: '27 June 2025',
      link: 'https://scrimba.com/certificate-cert24zAwJ78oWAth624LLHpZyrqE5T1Fyk1rDaA6',
    },
    {
      name: 'Introduction to Unit Testing',
      issuer: 'Scrimba',
      date: '16 June 2025',
      link: 'https://scrimba.com/certificate-cert24zAwJ78oWAth624LLHpZwhMf9jgmU2jGq43P',
    },
    {
      name: 'Software Engineering Immersive | 480 hours',
      issuer: 'General Assembly',
      date: '29 October 2022',
      link: 'https://drive.google.com/file/d/1HGxY15H-4iaBDHgLRezFXwmzvDR1nbM1/view',
    },
  ],
};
