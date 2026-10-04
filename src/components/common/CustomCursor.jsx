import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // gsap.quickTo is highly optimized for tying DOM elements to mouse coordinates
    const xMove = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yMove = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xMove(e.clientX);
      yMove(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if the mouse is hovering over an interactive element or image
      const target = e.target.tagName.toLowerCase();
      if (target === 'img' || target === 'button' || target === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Handle the expansion animation when hovering
  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, { 
        scale: 4, 
        backgroundColor: "rgba(245, 245, 220, 0.2)", // Translucent Sand color
        border: "1px solid #F5F5DC",
        duration: 0.3 
      });
    } else {
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: "#F5F5DC", // Solid Sand color
        border: "none",
        duration: 0.3 
      });
    }
  }, [isHovering]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-sand rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
    />
  );
}