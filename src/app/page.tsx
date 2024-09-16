'use client';
import Header from './components/Header'
import Bio from './components/Bio'
import Image from 'next/image'
import mobilerect from '@public/rectmobile.svg'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useEffect } from 'react';
import Sanskrit from './components/ui/p5_sanskrit';
import { HeroParallax } from './components/ui/hero-parallax';

export default function Home() {
  useEffect(() => {

    return () => {}
  })
  return (
    <>
    
      <main className='container max-w-[1400px] min-w-[350px] w-full mx-auto max-[1400px]:overflow-hidden'>
        <Sanskrit />
        <HeroParallax />
      </main>
      <Footer />
    </>
  )
}
