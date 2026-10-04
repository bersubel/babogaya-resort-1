import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Animate the percentage counter from 0 to 100
    const countObj = { value: 0 };
    
    gsap.to(countObj, {
      value: 100,
      duration: 2.5, // 2.5 seconds of loading anticipation
      ease: "power2.out",
      onUpdate: () => {
        setCounter(Math.round(countObj.value));
      },
      onComplete: () => {
        // 2. The Reveal Animation (Splitting the screen)
        const tl = gsap.timeline({
          onComplete: onComplete // Tells App.jsx the loading is done
        });

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        })
        .to(topPanelRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut"
        }, "+=0.1")
        .to(bottomPanelRef.current, {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut"
        }, "<")
        .set(containerRef.current, { display: "none" }); // Hide completely after animation
      }
    });
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none cursor-none"
    >
      {/* Top Half of the Curtain */}
      <div 
        ref={topPanelRef} 
        className="absolute top-0 left-0 w-full h-1/2 bg-forest origin-top"
      />
      
      {/* Bottom Half of the Curtain */}
      <div 
        ref={bottomPanelRef} 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-forest origin-bottom"
      />

      {/* Loading Typography */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-sand">
        <span className="text-sm tracking-[0.6em] uppercase font-bold mb-4">
          Lake Babogaya
        </span>
        <div className="text-[10vw] font-medium tracking-tighter leading-none">
          {counter}%
        </div>
      </div>
    </div>
  );
}