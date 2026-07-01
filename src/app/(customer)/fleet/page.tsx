import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight, Settings, Car, Users, Zap, Fuel } from "lucide-react";
import { BookingModal } from "@/components/home/BookingModal";

export const metadata = {
  title: "Our Fleet | DOORA MOBILITY",
  description: "Browse our exclusive collection of luxury and exotic vehicles available for rent.",
};

export default async function FleetPage({ searchParams }: { searchParams: Promise<{ book?: string }> }) {
  await searchParams; // next15 requires await but just getting the prop
  const vehicles = await db.vehicle.findMany({
    where: { isAvailable: true },
    include: { images: true },
    orderBy: { price: 'desc' },
  });

  const settings = await db.businessSettings.findFirst();
  const whatsappNumber = settings?.whatsappNumber || "1234567890";
  const cleanPhone = whatsappNumber.replace(/\D/g, "");

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Our <span className="text-primary">Fleet</span>
          </h1>
          <p className="font-inter text-background/80 max-w-2xl mx-auto">
            Choose from our extensive fleet of clean, well-maintained, and reliable vehicles, thoughtfully selected to meet every travel requirement.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle: any) => (
              <div key={vehicle.id} className="group relative bg-secondary/30 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <img 
                    src={vehicle.images.find((img: any) => img.isPrimary)?.url || vehicle.images[0]?.url || "https://placehold.co/800x600/111111/FFFFFF?text=DOORA+MOBILITY"} 
                    alt={vehicle.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-foreground/50 font-inter uppercase tracking-wider">{vehicle.brand}</p>
                      <h3 className="font-space-grotesk text-2xl font-bold mt-1">{vehicle.name}</h3>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-5 h-5 text-red-500" />
                      <h4 className="font-bold text-[#111111] text-lg">Specifications</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Car className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Body:</span>
                        <span className="font-semibold truncate">{vehicle.body}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Users className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Seats:</span>
                        <span className="font-semibold truncate">{vehicle.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Engine:</span>
                        <span className="font-semibold truncate">{vehicle.engine}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Fuel className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Fuel:</span>
                        <span className="font-semibold truncate">{vehicle.fuel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <Link 
                      href={`?book=${vehicle.slug}`} 
                      scroll={false}
                      className="inline-flex items-center justify-center gap-2 bg-white text-red-500 font-bold border-2 border-red-500 rounded-lg px-8 py-2.5 shadow-[0_4px_0_0_rgba(239,68,68,1)] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(239,68,68,1)] active:translate-y-[4px] active:shadow-none transition-all w-[80%]"
                    >
                      <Car className="w-5 h-5" /> Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {vehicles.length === 0 && (
            <div className="text-center py-20 text-foreground/50">
              <p className="font-inter text-lg">No vehicles are currently available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      {/* The DOORA Advantage Section */}
      <section className="py-20 bg-secondary/20 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mt-2 mb-6">The DOORA Advantage</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Timely & Reliable Service</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Consistent, on-time transportation you can depend on.</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Safety & Compliance</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Maintaining high safety standards and reliable service for every trip.</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Business-Centric Mobility</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Flexible transportation plans designed to suit your business, workforce, and operational needs.</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Connected Mobility</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Smart booking, GPS tracking, and trip monitoring for complete visibility.</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Value-Driven Pricing</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Competitive pricing with transparent billing and exceptional service.</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-space-grotesk text-xl font-bold mb-3 text-primary">Eco-Conscious Mobility</h3>
              <p className="font-inter text-foreground/70 leading-relaxed text-sm">Promoting efficient travel solutions with a focus on sustainability.</p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal vehicles={vehicles.map((v: any) => ({ slug: v.slug, name: v.name }))} />
    </div>
  );
}
