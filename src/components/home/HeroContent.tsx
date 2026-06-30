"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HeroContent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Wait for splash screen to finish (2.3s) then stagger in
    const timer = setTimeout(() => {
      setShow(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
      {/* "DRIVE THE" */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0s" }}
      >
        <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white uppercase">
          Drive The
        </h1>
      </div>

      {/* "EXTRAORDINARY" */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.15s" }}
      >
        <span className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary uppercase block">
          Extraordinary
        </span>
      </div>

      {/* Subtitle */}
      <div
        className={`transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.4s" }}
      >
        <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mb-10 mt-6">
          Premium chauffeur and self-drive luxury vehicles for those who demand the
          absolute best in comfort and style.
        </p>
      </div>

      {/* CTA Button */}
      <div
        className={`transition-all duration-700 ease-out ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
        style={{ transitionDelay: "0.6s" }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/fleet"
            className="bg-primary text-primary-foreground font-manrope font-bold text-lg px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Explore Fleet <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
