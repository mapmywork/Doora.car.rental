import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight, ShieldCheck, Clock, MapPin } from "lucide-react";

export default async function HomePage() {
  const featuredVehicles = await db.vehicle.findMany({
    where: { featured: true, isAvailable: true },
    include: { images: true },
    take: 6,
  });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0">
          {/* A cinematic road background. Since we don't have video, we use an image with an overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-pulse-slow blur-sm"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 uppercase">
            Drive The <br/><span className="text-primary">Extraordinary</span>
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mb-10">
            Premium chauffeur and self-drive luxury vehicles for those who demand the absolute best in comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/fleet" 
              className="bg-primary text-primary-foreground font-manrope font-bold text-lg px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Explore Fleet <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Search Book & Rent Section */}
      <section className="bg-white py-16 relative w-full overflow-visible border-b border-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-end">
            
            {/* Left Content */}
            <div className="w-full lg:w-5/12 space-y-6 pb-12">
              <div>
                <p className="text-primary font-bold uppercase text-sm tracking-wider mb-2">GET TO KNOW US</p>
                <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-[#111111] leading-[1.1]">
                  Search Book & <br/> Rent Vehicle Easily
                </h2>
              </div>
              <p className="text-[#111111]/60 font-inter leading-relaxed max-w-md">
                Lorem ipsum is simply ipun txns mane so dummy text of free available in market the printing and typesetting industry has been the industry's standard dummy text ever.
              </p>
              
              <div className="flex gap-10 pt-6">
                <div className="flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0047a5] flex items-center justify-center text-white shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  </div>
                  <h4 className="font-bold text-[#111111] leading-tight max-w-[140px] text-lg">Easier & Faster Bookings</h4>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0047a5] flex items-center justify-center text-white shadow-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h4 className="font-bold text-[#111111] leading-tight max-w-[140px] text-lg">Too Many Pickup Locations</h4>
                </div>
              </div>
            </div>

            {/* Middle Image */}
            <div className="w-full lg:w-3/12 flex justify-center lg:justify-end self-end -mb-16 z-0 relative">
               <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                 alt="Man with crossed arms" 
                 className="w-full max-w-[320px] object-cover rounded-t-2xl drop-shadow-2xl z-10 relative" 
                 style={{ WebkitMaskImage: 'linear-gradient(to top, transparent, black 15%)', maskImage: 'linear-gradient(to top, transparent, black 15%)' }} 
               />
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-4/12 relative z-20 mt-16 lg:mt-0">
              <div className="bg-[#ff3d2e] p-8 rounded-b-xl rounded-tr-xl rounded-tl-none relative shadow-2xl">
                 {/* The top tab */}
                 <div className="absolute top-0 left-0 -translate-y-full h-[50px] flex">
                    <div className="bg-[#4a5568] text-white px-8 flex items-center rounded-tl-xl font-bold text-sm tracking-wider uppercase z-10">
                      SEARCH ANY CAR
                    </div>
                    <div className="bg-[#ff3d2e] w-[40px] -ml-[20px] skew-x-[30deg] origin-bottom rounded-tr-md"></div>
                 </div>
                 
                 <form className="space-y-6 font-inter relative z-10">
                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">Pick-up Date</label>
                      <input type="datetime-local" className="w-full bg-white text-gray-900 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">Drop-off Date</label>
                      <input type="datetime-local" className="w-full bg-white text-gray-900 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">Car Type</label>
                      <select className="w-full bg-white text-gray-900 border-none rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option>Car Type</option>
                        <option>Luxury Sedan</option>
                        <option>SUV</option>
                        <option>Sports Car</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white font-semibold text-sm">Quantity</label>
                      <div className="flex bg-white rounded-lg p-1 items-center">
                         <input type="number" defaultValue={1} min={1} className="w-full bg-transparent text-gray-900 border-none px-4 py-2 outline-none text-left" />
                         <div className="flex gap-1 pr-2 shrink-0">
                           <button type="button" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200">-</button>
                           <button type="button" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200">+</button>
                         </div>
                      </div>
                    </div>

                    <button type="button" className="w-auto bg-[#0a192f] text-white font-bold py-4 px-8 rounded-lg hover:bg-black transition-colors shadow-lg mt-4">
                      Find a Car
                    </button>
                 </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4 uppercase">Featured <span className="text-primary">Models</span></h2>
              <p className="font-inter text-foreground/70 max-w-xl">
                Discover our hand-picked selection of luxury vehicles, maintained to the highest standards.
              </p>
            </div>
            <Link href="/fleet" className="text-primary font-manrope font-bold flex items-center gap-2 hover:underline mt-6 md:mt-0">
              View All Vehicles <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle: any) => (
              <div key={vehicle.id} className="group relative bg-secondary/30 rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <img 
                    src={vehicle.images.find((img: any) => img.isPrimary)?.url || vehicle.images[0]?.url || "https://placehold.co/800x600/111111/FFFFFF?text=DOORA+MOBILITY"} 
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4 uppercase">The DOORA <span className="text-primary">Difference</span></h2>
            <p className="font-inter text-background/70 max-w-2xl mx-auto">
              We don't just rent cars. We provide an unparalleled luxury experience tailored to your unique requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background text-primary flex items-center justify-center mb-6">
                <ShieldCheck size={40} />
              </div>
              <h3 className="font-space-grotesk text-2xl font-bold mb-4">Immaculate Condition</h3>
              <p className="font-inter text-background/70">
                Every vehicle undergoes a rigorous 50-point inspection and deep cleaning before every single rental.
              </p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background text-primary flex items-center justify-center mb-6">
                <Clock size={40} />
              </div>
              <h3 className="font-space-grotesk text-2xl font-bold mb-4">White-Glove Service</h3>
              <p className="font-inter text-background/70">
                24/7 dedicated concierge. We deliver the vehicle directly to your hotel, airport, or residence.
              </p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-background text-primary flex items-center justify-center mb-6">
                <MapPin size={40} />
              </div>
              <h3 className="font-space-grotesk text-2xl font-bold mb-4">Unlimited Freedom</h3>
              <p className="font-inter text-background/70">
                No hidden mileage limits on our premium models. Drive as far as your journey takes you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
