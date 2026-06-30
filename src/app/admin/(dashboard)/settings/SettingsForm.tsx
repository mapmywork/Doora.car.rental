"use client";

import { Save } from "lucide-react";
import { useTransition } from "react";
import { saveBusinessSettings } from "./actions";

export function SettingsForm({ settings }: { settings: any }) {
  const [isPending, startTransition] = useTransition();

  const action = (formData: FormData) => {
    startTransition(async () => {
      await saveBusinessSettings(formData);
      alert("Settings saved successfully!");
    });
  };

  return (
    <form action={action} className="space-y-8">
      <div>
        <h2 className="font-space-grotesk text-xl font-bold mb-4 border-b border-border/50 pb-2">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">WhatsApp Number (For Bookings)</label>
            <input 
              type="text" 
              name="whatsappNumber"
              defaultValue={settings?.whatsappNumber || ""}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter focus:border-primary outline-none" 
              placeholder="e.g. 1234567890"
            />
            <p className="text-xs text-foreground/50">Include country code without the '+' symbol.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">Business Email</label>
            <input 
              type="email" 
              name="email"
              defaultValue={settings?.email || ""}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter focus:border-primary outline-none" 
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-inter text-foreground/80">Office Address</label>
            <input 
              type="text" 
              name="officeAddress"
              defaultValue={settings?.officeAddress || ""}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter focus:border-primary outline-none" 
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-space-grotesk text-xl font-bold mb-4 border-b border-border/50 pb-2">SEO Meta Tags</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">Global Meta Title</label>
            <input 
              type="text" 
              name="metaTitle"
              defaultValue={settings?.metaTitle || ""}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter focus:border-primary outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">Global Meta Description</label>
            <textarea 
              name="metaDescription"
              rows={3}
              defaultValue={settings?.metaDescription || ""}
              className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter focus:border-primary outline-none resize-none" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border/50">
        <button 
          type="submit" 
          disabled={isPending}
          className="flex items-center gap-2 bg-primary text-primary-foreground font-manrope font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={20} /> {isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
