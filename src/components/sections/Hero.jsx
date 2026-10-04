import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../../assets/videos/babugayahero.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(titleRef.current, 
        { y: "120%" }, 
        { y: "0%", duration: 1.8, delay: 0.2 }
      )
      .fromTo(subtitleRef.current, 
        { y: "120%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1.5 }, 
        "-=1.4"
      )
      .fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, transformOrigin: "top" },
        "-=1.2"
      );

      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-forest"
    >
      {/* Parallax Video Background */}
      <div className="absolute inset-0 w-full h-full md:scale-110">
        <video 
          ref={videoRef}
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Vignette: Dark at the bottom for text, completely clear in the middle */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-forest/90 via-black/10 to-transparent z-10 pointer-events-none" />
      
      {/* Text Container - Moved to Bottom Left */}
      <div className="absolute bottom-12 left-8 md:left-16 z-20 text-sand flex flex-col items-start">
        
        <div className="overflow-hidden pb-2">
          <h1 
            ref={titleRef} 
            className="text-6xl md:text-[8rem] font-medium tracking-tighter leading-none"
          >
            Babogaya
          </h1>
        </div>
        
        <div className="overflow-hidden mt-1 md:mt-2 pl-1 md:pl-2">
          <p 
            ref={subtitleRef} 
            className="text-xs md:text-lg tracking-[0.4em] uppercase font-light opacity-90"
          >
            The Crater Lake Retreat
          </p>
        </div>
      </div>

      {/* Animated Scroll Indicator - Moved to Bottom Right */}
      <div className="absolute bottom-12 right-8 md:right-16 z-20 flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 md:h-24 bg-sand/30 overflow-hidden">
          <div ref={lineRef} className="w-full h-full bg-sand" />
        </div>
        <span className="text-[9px] md:text-[10px] text-sand tracking-[0.3em] uppercase opacity-70" style={{ writingMode: 'vertical-rl' }}>
          Explore
        </span>
      </div>
    </section>
  );
}