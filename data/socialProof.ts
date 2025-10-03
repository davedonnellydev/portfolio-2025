import { SocialProofProps } from '../components/home/SocialProof/types';

export const socialProofData: SocialProofProps = {
  logos: [
    {
      src: '/images/logos/education-logo-1.svg',
      alt: 'Education Academy Logo',
      width: 120,
      height: 40,
    },
    {
      src: '/images/logos/education-logo-2.svg',
      alt: 'Learn Institute Logo',
      width: 120,
      height: 40,
    },
    {
      src: '/images/logos/education-logo-3.svg',
      alt: 'Tech University Logo',
      width: 120,
      height: 40,
    },
  ],
  testimonial: {
    quote:
      'David delivered exceptional results on our learning platform project. His attention to accessibility and performance made a real difference for our students.',
    author: 'Sarah Johnson',
    role: 'Head of Technology, Education Solutions',
  },
  githubActivity: {
    sparkline: '/images/github-activity.svg',
    width: 400,
    height: 100,
  },
};
