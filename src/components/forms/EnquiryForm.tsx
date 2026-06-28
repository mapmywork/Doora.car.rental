"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      vehicle: formData.get("vehicle"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "success" && (
        <div className="bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/50 p-4 rounded-xl font-inter text-sm mb-6">
          Thank you! Your enquiry has been received. Our concierge will contact you shortly.
        </div>
      )}
      {status === "error" && (
        <div className="bg-destructive/10 text-destructive border border-destructive/50 p-4 rounded-xl font-inter text-sm mb-6">
          Failed to send your enquiry. Please try again later or contact us directly.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-inter text-foreground/80">Full Name *</label>
          <input required type="text" id="name" name="name" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-inter focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-inter text-foreground/80">Phone Number *</label>
          <input required type="tel" id="phone" name="phone" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-inter focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-inter text-foreground/80">Email Address *</label>
        <input required type="email" id="email" name="email" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-inter focus:outline-none focus:border-primary transition-colors" />
      </div>

      <div className="space-y-2">
        <label htmlFor="vehicle" className="text-sm font-inter text-foreground/80">Vehicle of Interest *</label>
        <input required type="text" id="vehicle" name="vehicle" placeholder="e.g. Porsche 911 Carrera" className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-inter focus:outline-none focus:border-primary transition-colors" />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-inter text-foreground/80">Additional Details</label>
        <textarea id="message" name="message" rows={4} className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 font-inter focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-manrope font-bold text-lg py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"} <Send size={20} />
      </button>
    </form>
  );
}
