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

// Placeholder about data - to be replaced with real content
export const aboutContent: AboutContent = {
  mission: '',
  background: [],
  certificates: [],
};
