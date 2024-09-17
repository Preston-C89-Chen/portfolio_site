'use client';
import Footer from './components/Footer'
import { useEffect, useState } from 'react';
import Sanskrit from './components/ui/p5_sanskrit';
import { HeroParallax } from './components/ui/hero-parallax';

export default function Home() {
  useEffect(() => {
  }, []);
  return (
    <>
   
      <main className='container max-w-[1400px] min-w-[350px] w-full mx-auto max-[1400px]:overflow-hidden'>
          <>
            <Sanskrit />
            <HeroParallax />
          </>
      </main>
      <Footer />
    </>
  )
}
