"use client";

import { useState, useEffect } from "react";

export function SplashScreen() {
  const [phase, setPhase] = useState<"logo" | "exit" | "done">("logo");

  useEffect(() => {
    // Phase 1: Show logo for 1.5 seconds
    const logoTimer = setTimeout(() => {
      setPhase("exit");
    }, 1500);

    // Phase 2: Exit animation takes 0.8s, then remove from DOM
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 2300);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-all duration-700 ease-in-out ${
        phase === "exit" ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[300px] h-[300px] rounded-full border border-white/5 animate-[ping_2s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[500px] h-[500px] rounded-full border border-white/5 animate-[ping_2s_ease-in-out_infinite]"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Logo and text */}
      <div className="flex flex-col items-center gap-6 z-10">
        <div
          className={`transition-all duration-700 ease-out ${
            phase === "logo"
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4"
          }`}
          style={{ transitionDelay: phase === "logo" ? "0.2s" : "0s" }}
        >
          <img
            src="/logo.png"
            alt="DOORA Mobility"
            className="w-24 h-24 rounded-full object-cover shadow-2xl border-2 border-white/10"
          />
        </div>

        <div
          className={`flex flex-col items-center gap-2 transition-all duration-700 ease-out ${
            phase === "logo"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: phase === "logo" ? "0.5s" : "0s" }}
        >
          <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold tracking-tighter text-white">
            DOORA <span className="text-primary">MOBILITY</span>
          </h1>
          <div className="w-16 h-0.5 bg-primary rounded-full mt-2" />
          <p className="text-white/40 text-sm font-inter tracking-[0.3em] uppercase mt-2">
            Premium Mobility Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
