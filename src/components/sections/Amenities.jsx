import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../../assets/images/l1.png';
import img2 from '../../assets/images/l2.png';
import img7 from '../../assets/images/l7.png';
import img3 from '../../assets/images/l3.png';
import img5 from '../../assets/images/l5.png'; // Added the Penthouse image

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const containerRef = useRef(null);

  const amenities = [
    {
      id: 1,
      title: "The Crater View",
      subtitle: "01 // Panoramic Vistas",
      description: "Start your morning with the absolute stillness of the crater waters right outside your window.",
      src: img1,
    },
    {
      id: 2,
      title: "Culinary Excellence",
      subtitle: "02 // Master Chefs",
      description: "Premium food service blending international standards with rich, locally sourced Ethiopian flavors.",
      src: img2,
    },
    {
      id: 3,
      title: "Earthy Luxury",
      subtitle: "03 // Bespoke Suites",
      description: "Rest in ultimate comfort. Natural tones seamlessly blend the indoors with the surrounding landscape.",
      src: img7,
    },
    {
      id: 4,
      title: "Treehouse Dining",
      subtitle: "04 // Elevated Experience",
      description: "Enjoy locally sourced cuisine and fresh coffee elevated in our open-air wooden dining pavilions.",
      src: img3,
    },
    {
      id: 5, // The New Penthouse Section
      title: "The Grand Penthouse",
      subtitle: "05 // The Pinnacle",
      description: "Our crown jewel. Expansive private terraces, exclusive amenities, and an unrivaled 360-degree view of Lake Babogaya.",
      src: img5,
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.fullscreen-panel');

      // Setup initial layering
      gsap.set(panels, { zIndex: (i) => i });
      
      // Hide all panels except the first one by pushing their clip-path to the very bottom
      gsap.set(panels.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // Dynamically scale the scroll length so adding the 5th item doesn't break the pacing
          end: () => `+=${window.innerHeight * (panels.length - 1)}`, 
          pin: true,
          scrub: 1.2, 
          invalidateOnRefresh: true,
        }
      });

      // Animate each panel coming in
      panels.forEach((panel, i) => {
        if (i === 0) return; // Skip the first one

        const img = panel.querySelector('img');
        const content = panel.querySelector('.panel-content');

        // 1. The Screen Wipe
        tl.to(panel, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: 1
        })
        // 2. The Internal Zoom & Brighten
        .fromTo(img,
          { scale: 1.6, filter: "brightness(0.3)" },
          { scale: 1, filter: "brightness(0.8)", ease: "none", duration: 1 },
          "<"
        )
        // 3. Typography Snap
        .fromTo(content,
          { y: 150, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
          "-=0.4" 
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      
      {amenities.map((item) => (
        <div 
          key={item.id} 
          className="fullscreen-panel absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-full object-cover origin-center"
              style={{ filter: item.id === 1 ? 'brightness(0.8)' : 'brightness(1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          </div>

          <div className="panel-content relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-24 text-sand">
            <div className="max-w-5xl">
              <div className="overflow-hidden mb-6">
                <span className="block text-sm md:text-base tracking-[0.4em] uppercase font-bold text-sand/70">
                  {item.subtitle}
                </span>
              </div>
              
              <div className="overflow-hidden">
                <h2 className="text-6xl md:text-[8rem] font-medium tracking-tighter leading-[0.9] mb-8">
                  {item.title}
                </h2>
              </div>
              
              <div className="overflow-hidden max-w-xl">
                <p className="text-lg md:text-2xl font-light opacity-90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      ))}

    </section>
  );
}