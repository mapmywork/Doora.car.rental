import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createOrder } from "./actions";
import { SubmitButton } from "./submit-button";
import { db } from "@/lib/db";

export default async function NewOrderPage() {
  const vehicles = await db.vehicle.findMany({
    where: { isAvailable: true },
    select: { id: true, name: true, brand: true }
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/orders" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-space-grotesk text-3xl font-bold">Create Manual Order</h1>
      </div>

      <form action={createOrder} className="bg-background rounded-xl border border-border p-6 md:p-8 shadow-sm space-y-8">
        
        <div className="space-y-6">
          <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Customer Name *</label>
              <input name="customerName" type="text" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Phone Number *</label>
              <input name="phone" type="text" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Email Address</label>
              <input name="email" type="email" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="john@example.com" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Vehicle & Schedule</h2>
          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">Vehicle *</label>
            <select name="vehicle" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all appearance-none cursor-pointer">
              <option value="">Select a vehicle...</option>
              {vehicles.map(v => (
                <option key={v.id} value={`${v.brand} ${v.name}`}>{v.brand} {v.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Pickup Date & Time *</label>
              <input name="pickupDate" type="datetime-local" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Drop-off Date & Time *</label>
              <input name="dropDate" type="datetime-local" required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Location & Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Pickup Location</label>
              <input name="pickupLocation" type="text" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="e.g. Airport Terminal 1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Drop-off Location</label>
              <input name="dropLocation" type="text" className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="e.g. Downtown Hotel" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-inter text-foreground/80">Notes / Special Instructions</label>
            <textarea name="notes" rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 font-inter resize-none focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="Any special requests from the customer..."></textarea>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex justify-end">
           <SubmitButton />
        </div>

      </form>
    </div>
  );
}
