import React from 'react';
import { Menu } from 'lucide-react';
import logo from '../../assets/images/babogayalogo.png';

export default function Navbar() {
  
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    // Changed py-8 to py-2 md:py-4 to bring the entire navbar flush with the top edge
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-2 md:py-4 grid grid-cols-3 items-center pointer-events-none">
      
      {/* 1. LEFT SIDE (The Retreat, Experience) */}
      <div className="hidden md:flex gap-8 md:gap-10 text-sm md:text-base font-medium tracking-[0.2em] uppercase mix-blend-difference text-sand pointer-events-auto items-center">
        <a 
          href="#retreat" 
          onClick={(e) => handleScroll(e, 'retreat')} 
          className="hover:opacity-60 transition-opacity duration-300 cursor-none"
        >
          The Retreat
        </a>
        <a 
          href="#experience" 
          onClick={(e) => handleScroll(e, 'experience')} 
          className="hover:opacity-60 transition-opacity duration-300 cursor-none"
        >
          Experience
        </a>
      </div>

      {/* 2. CENTER SIDE (Solid, Huge Logo right at the top) */}
      <div 
        onClick={(e) => handleScroll(e, 'top')}
        // Set to h-28 for massive size without pushing the page down too much
        className="justify-self-center cursor-none hover:scale-105 transition-transform duration-300 flex items-center h-20 md:h-28 pointer-events-auto"
      >
        <img 
          src={logo} 
          alt="Babogaya Resort Logo" 
          className="h-full w-auto object-contain drop-shadow-xl"
        />
      </div>
      
      {/* 3. RIGHT SIDE (Gallery, Menu) */}
      <div className="flex justify-end items-center gap-6 md:gap-10 text-sm md:text-base font-medium tracking-[0.2em] uppercase mix-blend-difference text-sand pointer-events-auto">
        <a 
          href="#gallery" 
          onClick={(e) => handleScroll(e, 'gallery')} 
          className="hidden md:block hover:opacity-60 transition-opacity duration-300 cursor-none"
        >
          Gallery
        </a>
        <button className="flex items-center gap-3 hover:opacity-60 transition-opacity duration-300 cursor-none">
          <span className="hidden md:block">Menu</span>
          <Menu size={32} strokeWidth={1.5} />
        </button>
      </div>
      
    </nav>
  );
}