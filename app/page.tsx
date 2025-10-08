import { Hero } from '../components/home/Hero';
import { MicroBio } from '../components/home/MicroBio';
import { SignatureProjects } from '../components/home/SignatureProjects';
import { SocialProof } from '../components/home/SocialProof';
import { WhyHireMe } from '../components/home/WhyHireMe';
import { AnimatedBackground } from '../components/shared/AnimatedBackground';
import { microBioData } from '../data/microBio';
import { projects } from '../data/projects';
import { socialProofData } from '../data/socialProof';

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
