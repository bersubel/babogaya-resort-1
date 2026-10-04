import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your local images directly
import img10 from '../../assets/images/l10.png';
import img5 from '../../assets/images/l5.png';
import img13 from '../../assets/images/l13.png';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryScroll() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const slides = [
    {
      id: 1,
      number: "01",
      title: "The Crater Lake",
      description: "Wake up to misty mornings and the absolute stillness of Bishoftu's most pristine waters. Nature undisturbed.",
      src: img10, // Using l10.png
    },
    {
      id: 2,
      number: "02",
      title: "Earthy Luxury",
      description: "Architecture that respects the landscape. Our rooms are built seamlessly into the hillside overlooking the caldera.",
      src: img5, // Using l5.png
    },
    {
      id: 3,
      number: "03",
      title: "The Wildlife",
      description: "Share the grounds with free-roaming giant tortoises, indigenous birds, and the quiet rhythm of the forest.",
      src: img13, // Using l13.png
    }
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const totalSlides = slides.length;

      // 1. The Main Horizontal Track
      gsap.to(trackRef.current, {
        xPercent: -100 * ((totalSlides - 1) / totalSlides), 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          snap: 1 / (totalSlides - 1),
          end: () => `+=${window.innerWidth * totalSlides}`,
          invalidateOnRefresh: true,
        }
      });

      // 2. The Internal Image Parallax 
      gsap.utils.toArray('.gallery-media').forEach((img) => {
        gsap.fromTo(img, 
          { xPercent: -15 }, 
          { 
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${window.innerWidth * totalSlides}`,
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, [slides.length]);

  return (
    <section ref={containerRef} className="w-full h-screen bg-forest overflow-hidden">
      <div 
        ref={trackRef} 
        className="h-full flex"
        style={{ width: `${slides.length * 100}vw` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="w-screen h-screen flex items-center justify-center p-6 md:p-16 flex-shrink-0"
          >
            <div className="w-full h-full bg-sand rounded-xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
              
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black">
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  className="gallery-media absolute top-0 left-[-15%] w-[130%] h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-20 text-forest relative">
                <span className="absolute top-10 right-10 md:top-20 md:right-20 text-7xl md:text-9xl font-bold opacity-5 pointer-events-none">
                  {slide.number}
                </span>

                <span className="text-sm tracking-[0.4em] uppercase mb-4 opacity-70">
                  // {slide.number} Experience
                </span>
                
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 leading-tight">
                  {slide.title}
                </h2>
                
                <p className="text-lg md:text-xl font-light opacity-80 max-w-md leading-relaxed">
                  {slide.description}
                </p>

                <div className="mt-12">
                  <button className="group flex items-center gap-4 text-xs tracking-[0.3em] uppercase overflow-hidden">
                    <span className="relative">
                      Explore More
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-forest transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                    </span>
                    <div className="w-8 h-[1px] bg-forest transform transition-transform duration-500 group-hover:translate-x-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}