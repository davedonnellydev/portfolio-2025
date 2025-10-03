export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface GitHubActivity {
  sparkline: string;
  width: number;
  height: number;
}

export interface SocialProofProps {
  logos: Logo[];
  testimonial?: Testimonial;
  githubActivity?: GitHubActivity;
}
