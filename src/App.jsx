import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';
import Navbar from './components/common/Navbar';
import Hero from './components/sections/Hero';
import GalleryScroll from './components/sections/GalleryScroll';
import Amenities from './components/sections/Amenities';
import Gallery from './components/sections/Gallery';
import Footer from './components/common/Footer';
import Journey from './components/sections/Journey';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {}, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={appRef} 
      // We lock the screen height and hide overflow while loading, unlocking it once complete
      className={`relative w-full bg-sand text-forest min-h-screen ${isLoading ? 'overflow-hidden h-screen' : ''}`}
    >
      {/* The Preloader runs first. When it finishes, it sets isLoading to false */}
      <Preloader onComplete={() => setIsLoading(false)} />
      
      <CustomCursor /> 
      
      {/* 
        We use GSAP to delay the Navbar's entry until the preloader finishes, 
        giving it a clean fade-in effect. 
      */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
      </div>
      
      <main className="relative z-10 bg-sand mb-[100vh]">
        <Hero />
        <GalleryScroll />
        <Amenities />
        <Gallery />
         <Journey/>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-screen z-0">
        <Footer />
      </div>

    </div>
  );
}