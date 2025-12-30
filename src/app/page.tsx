'use client';
import { HeroMinimal } from './components/ui/hero-minimal';
import { GalleryScroll } from './components/ui/gallery-scroll';

// Import project images
import Sfport1 from "@public/sf-port1.jpg";
import Be1 from "@public/be-port1.png";
import Bli1 from "@public/bli-port1.png";
import VF1 from "@public/vf-port1.jpg";

const projects = [
  {
    title: "Design System & Component Library",
    company: "Synapsefi",
    description: "Architected React component library with design system principles, ensuring consistent UI/UX across banking products.",
    image: Sfport1,
    url: "https://dashboard.synapsefi.com/v3/auth/signin",
  },
  {
    title: "SEO Optimization Platform",
    company: "BrightEdge",
    description: "Built enterprise design system components for customer experience platform with scalable architecture.",
    image: Be1,
    url: "https://www.brightedge.com/",
  },
  {
    title: "Interactive Multimedia Experiences",
    company: "BriteLite Immersive",
    description: "Created immersive web experiences combining sound design, video, and interactive animations.",
    image: Bli1,
    url: "http://www.briteliteimmersive.com/",
  },
  {
    title: "Autonomous Vehicle Data Visualization",
    company: "Personal Project",
    description: "Real-time ROS data visualization dashboard with 3D vehicle positioning and sensor data display.",
    image: VF1,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <HeroMinimal />
      <GalleryScroll projects={projects} />
    </main>
  )
}
