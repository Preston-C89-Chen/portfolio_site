'use client';
import { useState } from 'react';
import { HeroCityMap } from './components/ui/HeroCityMap/HeroCityMap';
import { SkillsTicker } from './components/ui/SkillsTicker';
import { WorkAccordion } from './components/ui/WorkAccordion';
import { Footer } from './components/ui/Footer';
import { CurrentlyBuilding } from './components/ui/CurrentlyBuilding';
import { GridStaggerReveal } from './components/ui/GridStaggerReveal';

export default function Home() {
  const [gridRevealComplete, setGridRevealComplete] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">
      <GridStaggerReveal onComplete={() => setGridRevealComplete(true)} />
      <HeroCityMap revealReady={gridRevealComplete} />
      <SkillsTicker />
      <WorkAccordion />
      <CurrentlyBuilding />
      <Footer />
    </main>
  )
}
