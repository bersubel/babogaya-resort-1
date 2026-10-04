import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import footerVideo from '../../assets/videos/babugayahero.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const innerRef = useRef(null);
  const magneticRef = useRef(null);
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current,
        { 
          scale: 0.85, 
          yPercent: 15, 
          filter: "brightness(0.2)"
        },
        {
          scale: 1,
          yPercent: 0,
          filter: "brightness(1)",
          ease: "none",
          scrollTrigger: {
            trigger: "main", 
            start: "bottom bottom", 
            end: "bottom top", 
            scrub: true,
          }
        }
      );

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none"
      });

    }, footerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = magneticRef.current;
    
    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      xTo(distX * 0.4);
      yTo(distY * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="w-full h-screen bg-[#D8E2DC] overflow-hidden flex items-end justify-center px-4 pb-4 md:px-8 md:pb-8 pt-24">
      <div 
        ref={innerRef} 
        className="relative w-full h-full bg-forest overflow-hidden flex flex-col justify-between origin-bottom will-change-transform rounded-t-[50vw] md:rounded-t-[35vw] rounded-b-2xl md:rounded-b-3xl shadow-2xl"
      >
        <div className="absolute inset-0 w-full h-full">
          <video 
            src={footerVideo} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          {/* Bottom gradient for the main BABOGAYA text */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent pointer-events-none" />
          {/* NEW: Top gradient specifically added to protect the contact information contrast! */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest/90 via-forest/20 to-transparent pointer-events-none" />
        </div>

        {/* Removed opacity-80 and added drop-shadow-lg to make the text pop */}
        <div className="relative z-10 w-full px-8 md:px-16 pt-16 md:pt-28 flex justify-between items-start text-sand drop-shadow-lg">
          <div className="flex flex-col gap-2 md:gap-4 uppercase tracking-[0.2em] text-xs font-bold">
            <span className="opacity-70 mb-2">Location</span>
            <p>Lake Babogaya</p>
            <p>Bishoftu, Ethiopia</p>
            <a href="mailto:escape@babogaya.com" className="mt-4 hover:text-white transition-colors">
              escape@babogaya.com
            </a>
          </div>
          
          <div className="flex flex-col gap-2 md:gap-4 text-right uppercase tracking-[0.2em] text-xs font-bold">
            <span className="opacity-70 mb-2">Socials</span>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between mt-auto mb-12 md:mb-16">
          <div className="cursor-none text-sand hover:opacity-70 transition-opacity">
            <h2 
              onClick={handleScroll}
              className="text-[15vw] md:text-[12vw] font-medium tracking-tighter leading-none m-0 p-0 drop-shadow-md"
            >
              BABOGAYA
            </h2>
          </div>

          <div className="mt-12 md:mt-0 p-12 -m-12"> 
            <div
              ref={magneticRef}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-sand/30 flex items-center justify-center cursor-none group hover:bg-sand transition-colors duration-500 will-change-transform backdrop-blur-sm"
            >
              <span className="text-sand group-hover:text-forest text-xs md:text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-500 text-center px-4">
                Book <br/> Escape
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full border-t border-sand/20 py-4 md:py-6 overflow-hidden flex items-center bg-forest/30 backdrop-blur-md">
          <div ref={marqueeRef} className="flex whitespace-nowrap text-sand opacity-60 text-xs md:text-sm tracking-[0.4em] uppercase font-bold w-max">
            <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
            <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
            <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
            <span>THE PREMIER CRATER LAKE RETREAT • BISHOFTU, ETHIOPIA • UNSEEN ARCHITECTURE • </span>
          </div>
        </div>

      </div>
    </footer>
  );
}