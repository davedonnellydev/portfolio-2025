import { Metadata } from 'next';
import { Hero } from '../components/home/Hero';
import { MicroBio } from '../components/home/MicroBio';
import { SignatureProjects } from '../components/home/SignatureProjects';
import { SocialProof } from '../components/home/SocialProof';
import { WhyHireMe } from '../components/home/WhyHireMe';
import { AnimatedBackground } from '../components/shared/AnimatedBackground';
import { microBioData } from '../data/microBio';
import { projects } from '../data/projects';
import { socialProofData } from '../data/socialProof';
import { generateMetadata as generateSEOMetadata } from '../lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Dave Donnelly - Web Developer',
  description:
    'Portfolio of Dave Donnelly, a junior web developer based in Sydney. Specializing in Next.js, React, TypeScript, and accessible web applications with a focus on education technology.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      {/* Animated background with floating colored clouds
          - Set mouseAttraction={true} to make clouds follow cursor
          - Adjust cloudSpeed={5-10} to change movement speed
          - See ANIMATED_BACKGROUND_FEATURES.md for all options */}
      <AnimatedBackground />

      <Hero />

      <SignatureProjects projects={projects} />

      <WhyHireMe />

      <SocialProof {...socialProofData} />

      <MicroBio {...microBioData} />
    </>
  );
}
