import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { VehicleGallery } from "@/components/vehicle/VehicleGallery";
import { WhatsAppButton } from "@/components/vehicle/WhatsAppButton";
import { Check, ShieldCheck, Clock, Navigation } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await db.vehicle.findUnique({ where: { slug } });
  if (!vehicle) return { title: "Not Found" };
  return {
    title: `${vehicle.name} | DOORA MOBILITY`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await db.vehicle.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!vehicle || !vehicle.isAvailable) {
    notFound();
  }

  // Fallback if no settings exist
  const settings = await db.businessSettings.findFirst();
  const defaultWhatsApp = "1234567890";
  const whatsappNumber = settings?.whatsappNumber || defaultWhatsApp;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: Gallery & Specs */}
        <div className="lg:col-span-2 space-y-12">
          <VehicleGallery images={vehicle.images} />
          
          <div className="space-y-6">
            <div>
              <p className="text-primary font-inter uppercase tracking-widest font-bold mb-2">{vehicle.brand}</p>
              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold uppercase">{vehicle.name}</h1>
            </div>
            
            <p className="font-inter text-foreground/80 leading-relaxed text-lg">
              {vehicle.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-border/50">
              <div className="text-center">
                <p className="text-foreground/50 font-inter text-sm mb-1">Seats</p>
                <p className="font-space-grotesk font-bold text-xl">{vehicle.seats}</p>
              </div>
              <div className="text-center border-l border-border/50">
                <p className="text-foreground/50 font-inter text-sm mb-1">Transmission</p>
                <p className="font-space-grotesk font-bold text-xl">{vehicle.transmission}</p>
              </div>
              <div className="text-center border-l border-border/50">
                <p className="text-foreground/50 font-inter text-sm mb-1">Fuel</p>
                <p className="font-space-grotesk font-bold text-xl">{vehicle.fuel}</p>
              </div>
              <div className="text-center border-l border-border/50">
                <p className="text-foreground/50 font-inter text-sm mb-1">Luggage</p>
                <p className="font-space-grotesk font-bold text-xl">{vehicle.luggage} Bags</p>
              </div>
            </div>

            <div>
              <h3 className="font-space-grotesk text-2xl font-bold mb-6">Premium Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(vehicle.features as string[]).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary rounded-full p-1">
                      <Check size={16} />
                    </div>
                    <span className="font-inter">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-secondary/50 rounded-2xl p-8 border border-border/50">
            <p className="font-inter text-foreground/60 mb-2">Daily Rate</p>
            <div className="flex items-end gap-2 mb-8">
              <span className="font-space-grotesk text-5xl font-bold text-primary">
                ${(vehicle.price / 100).toFixed(0)}
              </span>
              <span className="font-inter text-foreground/60 pb-1">/ day</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="font-inter text-sm text-foreground/80">Fully insured & inspected before every rental.</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="font-inter text-sm text-foreground/80">24/7 Concierge Support included.</p>
              </div>
              <div className="flex items-start gap-3">
                <Navigation className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="font-inter text-sm text-foreground/80">Free delivery within 50 miles.</p>
              </div>
            </div>

            <WhatsAppButton 
              phoneNumber={whatsappNumber} 
              vehicleName={vehicle.name} 
              pricePerDay={vehicle.price} 
            />
            
            <p className="text-center font-inter text-xs text-foreground/50 mt-4">
              Clicking the button will open WhatsApp with a pre-filled message.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
