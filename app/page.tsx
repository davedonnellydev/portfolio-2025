import { Hero } from '../components/home/Hero';
import { MicroBio } from '../components/home/MicroBio';
import { SignatureProjects } from '../components/home/SignatureProjects';
import { SocialProof } from '../components/home/SocialProof';
import { WhyHireMe } from '../components/home/WhyHireMe';
import { microBioData } from '../data/microBio';
import { projects } from '../data/projects';
import { socialProofData } from '../data/socialProof';

export default function HomePage() {
  return (
    <>
      <Hero />

      <SignatureProjects projects={projects} />

      <WhyHireMe />

      <SocialProof {...socialProofData} />

      <MicroBio {...microBioData} />
    </>
  );
}
