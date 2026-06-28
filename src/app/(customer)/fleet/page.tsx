import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Our Fleet | DOORA MOBILITY",
  description: "Browse our exclusive collection of luxury and exotic vehicles available for rent.",
};

export default async function FleetPage() {
  const vehicles = await db.vehicle.findMany({
    where: { isAvailable: true },
    include: { images: true },
    orderBy: { price: 'desc' },
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <section className="bg-foreground text-background py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Our <span className="text-primary">Fleet</span>
          </h1>
          <p className="font-inter text-background/80 max-w-2xl mx-auto">
            Choose from our meticulously maintained selection of the world's most prestigious automotive brands.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="group relative bg-secondary/30 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <img 
                    src={vehicle.images.find(img => img.isPrimary)?.url || vehicle.images[0]?.url || "https://placehold.co/800x600/111111/FFFFFF?text=DOORA+MOBILITY"} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-foreground/50 font-inter uppercase tracking-wider">{vehicle.brand}</p>
                      <h3 className="font-space-grotesk text-2xl font-bold mt-1">{vehicle.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/50 font-inter">From</p>
                      <p className="font-space-grotesk text-xl font-bold text-primary">${(vehicle.price / 100).toFixed(0)}<span className="text-sm text-foreground/50">/day</span></p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm font-inter text-foreground/70 mb-6">
                    <span className="bg-background px-3 py-1 rounded-full border border-border">{vehicle.seats} Seats</span>
                    <span className="bg-background px-3 py-1 rounded-full border border-border">{vehicle.transmission}</span>
                  </div>
                  <Link 
                    href={`/vehicle/${vehicle.slug}`} 
                    className="block w-full text-center font-manrope font-bold py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
                  >
                    View Details
                  </Link>
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
    </div>
  );
}
