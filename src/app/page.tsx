'use client';
import FooterSwiss from './components/FooterSwiss'
import { HeroSwiss } from './components/ui/hero-swiss';
import { WorkSwiss } from './components/ui/work-swiss';
import { SkillsSwiss } from './components/ui/skills-swiss';

// Import project images
import Sfport1 from "@public/sf-port1.jpg";
import Be1 from "@public/be-port1.png";
import Bli1 from "@public/bli-port1.png";
import VF1 from "@public/vf-port1.jpg";

const projects = [
  {
    number: "01",
    title: "Design System & Component Library",
    company: "Synapsefi",
    description: "Architected React component library with design system principles for banking products",
    tags: ["React", "TypeScript", "Design System"],
    image: Sfport1,
    url: "https://dashboard.synapsefi.com/v3/auth/signin",
  },
  {
    number: "02",
    title: "SEO Optimization Platform",
    company: "BrightEdge",
    description: "Built enterprise design system components for customer experience platform",
    tags: ["React", "UI Components", "Enterprise"],
    image: Be1,
    url: "https://www.brightedge.com/",
  },
  {
    number: "03",
    title: "Interactive Multimedia Experiences",
    company: "BriteLite Immersive",
    description: "Created immersive web experiences with sound design, video, and animations",
    tags: ["React", "Multimedia", "Animation"],
    image: Bli1,
    url: "http://www.briteliteimmersive.com/",
  },
  {
    number: "04",
    title: "Autonomous Vehicle Data Visualization",
    company: "Personal Project",
    description: "Real-time ROS data visualization dashboard with 3D vehicle positioning",
    tags: ["React", "Three.js", "Data Viz"],
    image: VF1,
  },
];

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSwiss />
        <WorkSwiss projects={projects} />
        <SkillsSwiss />
      </main>
      <FooterSwiss />
    </>
  )
}
