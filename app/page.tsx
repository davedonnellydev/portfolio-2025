import { Metadata } from 'next';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { Hero } from '../components/home/Hero';
import { MicroBio } from '../components/home/MicroBio';
import { WhyHireMe } from '../components/home/WhyHireMe';
import { AnimatedBackground } from '../components/shared/AnimatedBackground';
import { microBioData } from '../data/microBio';
import { projects } from '../data/projects';
import { generateMetadata as generateSEOMetadata } from '../lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Dave Donnelly - Web Developer',
  description:
    'Portfolio of Dave Donnelly, a web developer based in Sydney. Specialiing in Next.js, React, TypeScript, and accessible web applications with a focus on education technology.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />

      <main id="main-content">
        <Hero />

        <FeaturedProjects projects={projects} />

        <WhyHireMe />

        <MicroBio {...microBioData} />
      </main>
    </>
  );
}
