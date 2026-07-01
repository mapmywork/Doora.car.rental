"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm text-foreground" 
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="DOORA Mobility Logo" className="h-12 w-12 rounded-full object-cover shadow-sm border-2 border-white/20" />
          <span className="font-space-grotesk text-2xl font-bold tracking-tighter hidden sm:inline-block">
            DOORA <span className="text-primary">MOBILITY</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-8 font-inter text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link>
          <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex">
          <Link 
            href="/contact" 
            className="font-manrope bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button className={isScrolled ? "text-foreground md:hidden" : "text-white md:hidden"}>
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
