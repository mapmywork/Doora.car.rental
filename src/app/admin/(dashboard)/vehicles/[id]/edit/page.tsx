import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { updateVehicle } from "../../actions";
import { SubmitButton } from "../../new/submit-button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const vehicle = await db.vehicle.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!vehicle) {
    notFound();
  }

  // Need to bind the vehicle id to the server action
  const updateVehicleWithId = updateVehicle.bind(null, vehicle.id);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/vehicles" className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-space-grotesk text-3xl font-bold">Edit Vehicle</h1>
      </div>

      <form action={updateVehicleWithId} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Brand *</label>
                <input name="brand" type="text" defaultValue={vehicle.brand} required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" placeholder="e.g. Porsche" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Model Name *</label>
                <input name="name" type="text" defaultValue={vehicle.name} required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" placeholder="e.g. 911 Carrera" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">URL Slug *</label>
              <input name="slug" type="text" defaultValue={vehicle.slug} required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" placeholder="porsche-911-carrera" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Description *</label>
              <textarea name="description" defaultValue={vehicle.description} required rows={4} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter resize-none" placeholder="Vehicle description..."></textarea>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Specifications</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Body Type</label>
                <input name="body" type="text" defaultValue={vehicle.body} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Seats</label>
                <input name="seats" type="number" defaultValue={vehicle.seats} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Luggage</label>
                <input name="luggage" type="number" defaultValue={vehicle.luggage} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Engine</label>
                <input name="engine" type="text" defaultValue={vehicle.engine} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Transmission</label>
                <select name="transmission" defaultValue={vehicle.transmission} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-inter text-foreground/80">Fuel</label>
                <select name="fuel" defaultValue={vehicle.fuel} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 font-inter">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Features (Comma separated)</label>
              <input name="features" type="text" defaultValue={Array.isArray(vehicle.features) ? vehicle.features.join(", ") : ""} className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 font-inter" placeholder="e.g. Leather Seats, Navigation, Sunroof" />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Pricing & Status</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Price Per Day ($) *</label>
              <input name="price" type="number" defaultValue={vehicle.price / 100} required className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2 text-xl font-space-grotesk font-bold text-primary" placeholder="250" />
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input name="isAvailable" type="checkbox" defaultChecked={vehicle.isAvailable} className="w-5 h-5 accent-primary" />
                <span className="font-inter">Available for Rent</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input name="featured" type="checkbox" defaultChecked={vehicle.featured} className="w-5 h-5 accent-primary" />
                <span className="font-inter">Featured on Home Page</span>
              </label>
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-space-grotesk text-xl font-bold border-b border-border/50 pb-2">Image URL</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-inter text-foreground/80">Vehicle Image (URL)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-foreground/40" />
                <input 
                  name="imageUrl" 
                  type="url" 
                  defaultValue={vehicle.images[0]?.url || ""}
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 font-inter" 
                  placeholder="https://example.com/car.jpg" 
                />
              </div>
              <p className="text-xs text-foreground/50 mt-1">Provide a direct link to an image. Leave blank to keep existing image.</p>
            </div>
          </div>

          <SubmitButton />
        </div>

      </form>
    </div>
  );
}
