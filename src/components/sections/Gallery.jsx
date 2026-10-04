import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

import l1 from '../../assets/images/l1.png';
import l2 from '../../assets/images/l2.png';
import l3 from '../../assets/images/l3.png';
import l4 from '../../assets/images/l4.png';
import l5 from '../../assets/images/l5.png';
import l6 from '../../assets/images/l6.png';
import l7 from '../../assets/images/l7.png';
import l8 from '../../assets/images/l8.png';
import l9 from '../../assets/images/l9.png';
import l10 from '../../assets/images/l10.png';
import l11 from '../../assets/images/l11.png';
import l12 from '../../assets/images/l12.png';
import l13 from '../../assets/images/l13.png';

const images = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef([]);
  const centerRefs = useRef([]);
  const progressRef = useRef(null);

  // The 4-Second Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Highly Optimized GSAP Animations
  useEffect(() => {
    
    // 1. Orbit Math (No heavy filters, just transform and opacity)
    thumbRefs.current.forEach((thumb, i) => {
      if (!thumb) return;
      
      const angle = ((i - activeIndex) * (360 / images.length));
      const rad = angle * (Math.PI / 180);
      
      const y = Math.sin(rad) * 35; 
      const x = Math.cos(rad) * 20; 
      const z = Math.cos(rad); 
      
      const scale = 0.5 + (z * 0.5); 
      const opacity = 0.1 + (z + 1) * 0.45; 
      const zIndex = Math.round(z * 100);

      // force3D pushes the animation strictly to the GPU for zero lag
      gsap.to(thumb, {
        x: `${x}vw`,
        y: `${y}vh`,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 1.2,
        ease: "power2.out",
        force3D: true 
      });
    });

    // 2. Center Display (The Performance Fix)
    centerRefs.current.forEach((img, i) => {
      if (!img) return;
      
      if (i === activeIndex) {
        // Active image: Fade in, scale to normal. 
        // autoAlpha handles both opacity and visibility (display) for better performance.
        gsap.to(img, {
          autoAlpha: 1, 
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          zIndex: 10,
          force3D: true
        });
      } else {
        // Inactive images: Fade out, scale up slightly, hide completely when done
        gsap.to(img, {
          autoAlpha: 0, 
          scale: 1.05,
          duration: 1.2,
          ease: "power2.out",
          zIndex: 0,
          force3D: true
        });
      }
    });

    // 3. Progress Bar Reset
    gsap.fromTo(progressRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 2, ease: "none", transformOrigin: "left" }
    );

  }, [activeIndex]);

  return (
    <section 
      id="gallery" 
      className="relative w-full h-screen bg-forest overflow-hidden flex items-center"
    >
      
      {/* Intro Typography */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 z-50 pointer-events-none">
        <span className="text-xs tracking-[0.4em] uppercase font-bold text-sand/70 mb-4 block">
          The Archives
        </span>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-sand leading-none">
          Unseen <br/> Babogaya
        </h2>
      </div>

      {/* LEFT-SIDE "EARTH" OVAL */}
      <div className="absolute top-1/2 left-[-10vw] md:left-0 -translate-y-1/2 w-0 h-0 z-20">
        {images.map((src, i) => (
          <div 
            key={`thumb-${i}`}
            ref={(el) => (thumbRefs.current[i] = el)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] md:w-[15vw] aspect-[4/3] rounded-lg overflow-hidden border-2 border-sand shadow-xl bg-black will-change-transform"
          >
            <img 
              src={src} 
              alt={`Thumbnail ${i}`} 
              className="w-full h-full object-cover"
            />
            {/* Swapped blur for a simple dark overlay on inactive thumbnails (much cheaper) */}
            <div className={`absolute inset-0 bg-black/60 transition-opacity duration-700 ${i === activeIndex ? 'opacity-0' : 'opacity-100'}`} />
          </div>
        ))}
      </div>

      {/* CENTER PRESENTATION DISPLAY */}
      <div className="absolute top-1/2 right-[5vw] md:right-[10vw] -translate-y-1/2 w-[85vw] md:w-[55vw] h-[60vh] md:h-[75vh] z-10">
        
        <div className="absolute inset-0 bg-sand p-2 md:p-4 rounded-xl shadow-2xl">
          <div className="relative w-full h-full overflow-hidden rounded-md bg-black">
            
            {images.map((src, i) => (
              <img 
                key={`main-${i}`}
                ref={(el) => (centerRefs.current[i] = el)}
                src={src} 
                alt={`Archive ${i}`}
                // Images start invisible (opacity 0, visibility hidden)
                className="absolute inset-0 w-full h-full object-cover will-change-transform invisible opacity-0"
              />
            ))}
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
              <div ref={progressRef} className="h-full bg-sand w-full" />
            </div>

          </div>
        </div>

        {/* Dynamic Image Counter */}
        <div className="absolute -bottom-10 right-0 text-sand flex items-center gap-4">
          <span className="text-xl font-medium tracking-tighter">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <div className="w-12 h-[1px] bg-sand/50" />
          <span className="text-xs font-light tracking-[0.2em] opacity-70">
            13
          </span>
        </div>

      </div>
    </section>
  );
}