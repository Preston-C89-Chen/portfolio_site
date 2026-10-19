'use client';
import { useCallback, useState } from 'react';
import { HeroCityMap } from './components/ui/HeroCityMap/HeroCityMap';
import { SkillsTicker } from './components/ui/SkillsTicker';
import { WorkAccordion } from './components/ui/WorkAccordion';
import { Projects } from './components/ui/Projects';
import { Footer } from './components/ui/Footer';
import { CurrentlyBuilding } from './components/ui/CurrentlyBuilding';
import { SceneLoading } from './components/ui/SceneLoading';

export default function Home() {
  const [gridRevealComplete, setGridRevealComplete] = useState(false);
  const completeLoading = useCallback(() => setGridRevealComplete(true), []);

  return (
    <main className="min-h-screen bg-white text-black">
      <SceneLoading onComplete={completeLoading} />
      <HeroCityMap revealReady={gridRevealComplete} />
      <SkillsTicker />
      <WorkAccordion />
      <Projects />
      <CurrentlyBuilding />
      <Footer />
    </main>
  )
}
