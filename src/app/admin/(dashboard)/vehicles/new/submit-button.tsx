"use client";

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-manrope font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save size={20} /> Create Vehicle
        </>
      )}
    </button>
  );
}
