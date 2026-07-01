import Link from "next/link";
import { db } from "@/lib/db";
import { SupplierEnquiryForm } from "@/components/home/SupplierEnquiryForm";
import { 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Car, 
  Cpu, 
  Headset, 
  Users, 
  PieChart,
  Star,
  Quote,
  ChevronDown,
  Check,
  Settings,
  Zap,
  Fuel
} from "lucide-react";
import { BookingModal } from "@/components/home/BookingModal";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SplashScreen } from "@/components/home/SplashScreen";
import { HeroContent } from "@/components/home/HeroContent";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ book?: string }> }) {
  await searchParams;
  const featuredVehicles = await db.vehicle.findMany({
    where: { featured: true, isAvailable: true },
    include: { images: true },
    take: 6,
  });

  const settings = await db.businessSettings.findFirst();
  const whatsappNumber = settings?.whatsappNumber || "1234567890";
  const cleanPhone = whatsappNumber.replace(/\D/g, "");

  const allVehicles = await db.vehicle.findMany({
    where: { isAvailable: true },
    select: { slug: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <SplashScreen />
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <HeroSlider />
        
        <HeroContent />
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-[#eef0f2]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-full md:w-1/2 space-y-6 pl-0 md:pl-4">
              <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111111] leading-tight">
                About <span className="text-[#ef4444]">DOORA Mobility</span>
              </h2>
              <p className="font-inter text-[#4a4a4a] leading-relaxed text-sm md:text-base">
                Founded with the goal of revolutionizing executive car rental services in India, DOORA brings
                together technology, luxury, and professionalism to create a smarter way to travel. For over a
                decade, we have served India's top corporate houses, government institutions, and global
                enterprises with an unwavering focus on quality, punctuality, and safety. Every booking with DOORA
                is backed by real-time tracking, transparent pricing, and a dedicated support team. Want to learn
                more about our story, leadership, and corporate values?
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-block bg-[#ef4444] text-white font-inter font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition-colors shadow-md">
                  Read More
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-0 md:pr-4">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80" 
                alt="Corporate Meeting" 
                className="w-full h-auto rounded-3xl shadow-xl object-cover aspect-[4/3] md:aspect-[3/2]"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Premium Services Section */}
      <section className="py-24 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white mb-4">
              Premium Services
            </h2>
            <p className="font-inter text-white/70 max-w-2xl mx-auto">
              Tailored travel solutions designed to elevate your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80" 
                alt="Airport Transportation Services" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-2">Airport Transportation Services</h3>
                <p className="text-white/80 text-sm font-inter mb-3 line-clamp-2">Premium airport transfers with dedicated meet & greet services</p>
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">Learn More &rarr;</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" 
                alt="Employee Transportation" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-2">Employee Transportation</h3>
                <p className="text-white/80 text-sm font-inter mb-3 line-clamp-2">Delivering seamless home-to-office and office-to-home commute solutions</p>
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">Learn More &rarr;</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80" 
                alt="Event Transportation Services" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-2">Event Transportation Services</h3>
                <p className="text-white/80 text-sm font-inter mb-3 line-clamp-2">Comprehensive workforce mobility solutions for enterprises</p>
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">Learn More &rarr;</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" 
                alt="Outstation Visit" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-2">Outstation Visit</h3>
                <p className="text-white/80 text-sm font-inter mb-3 line-clamp-2">Professional chauffeur-driven services for business excellence</p>
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">Learn More &rarr;</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80" 
                alt="Spot Rental" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-space-grotesk text-xl md:text-2xl font-bold text-white mb-2">Spot Rental</h3>
                <p className="text-white/80 text-sm font-inter mb-3 line-clamp-2">Extensive pan-India coverage across 180+ major cities</p>
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider group-hover:text-red-400 transition-colors">Learn More &rarr;</span>
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
                        <span className="font-semibold truncate">Sedan</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Users className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Seats:</span>
                        <span className="font-semibold truncate">{vehicle.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-sm text-[#111111]">
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-gray-500">Engine:</span>
                        <span className="font-semibold truncate">1248 cc</span>
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
        </div>
      </section>

      {/* Why Choose DOORA Mobility */}
      <section className="py-24 bg-white text-center border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-6 text-[#111111]">
            Why Choose DOORA Mobility?
          </h2>
          <div className="w-16 h-[1px] bg-red-500 mx-auto mb-8 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <p className="font-inter text-[#111111]/70 max-w-4xl mx-auto mb-16 text-sm md:text-base leading-relaxed">
            Trusted by Corporate Industry across India for delivering reliable, efficient, and safe transportation solutions.<br className="hidden md:block" />
            DOORA Mobility is trusted by leading corporations across India for delivering reliable, efficient,<br className="hidden md:block" />
            and safe transportation solutions. Here's why clients choose us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <MapPin size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Pan-India Presence</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Operations in 180+ cities, ensuring seamless service across the country.
              </p>
            </div>
            
            {/* 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Clock size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Experience & Expertise</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Over 13 years in the travel industry, specializing in corporate transport solutions.
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Car size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Own Fleet & Infrastructure</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                In-house fleet, 40,000 sq. ft. parking per branch, dedicated service and fuel stations for uninterrupted service.
              </p>
            </div>

            {/* 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Cpu size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Advanced Technology</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Booking Application, Real-time GPS tracking, client dashboards, and trip monitoring for safety and transparency.
              </p>
            </div>

            {/* 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Headset size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">24/7 Operations Support</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Round-the-clock assistance with a dedicated Key Account Manager and emergency response readiness.
              </p>
            </div>

            {/* 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Users size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Driver Excellence</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Well-trained chauffeurs with regular briefings, background checks, and on-site accommodations.
              </p>
            </div>

            {/* 7 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <ShieldCheck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Compliance & Security</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                ISO 27001 certified with full fleet and documentation compliance for peace of mind.
              </p>
            </div>

            {/* 8 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <PieChart size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Flexible Services</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                ETS, spot rentals, monthly, short-term, and long-term plans, customized & tailored to corporate needs.
              </p>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
             <p className="font-inter text-[#111111]/60 italic text-sm md:text-base">
                DOORA Mobility is trusted by leading corporations across India for delivering <br className="hidden md:block" />
                reliable, efficient, and safe transportation solutions.
             </p>
          </div>
        </div>
      </section>

      {/* Supplier Benefits / Enquiry Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <p className="font-bold text-[#111111] text-sm md:text-base mb-2">
                  Attach your vehicle with DOORA and start earning with every ride
                </p>
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#111111] mb-6">
                  Supplier Benefits
                </h2>
                <div className="inline-block bg-red-50 text-red-500 font-bold text-sm tracking-wider uppercase px-6 py-2 rounded-full mb-6 shadow-sm">
                  YOUR FLEET - OUR PLATFORM - UNLIMITED POSSIBILITIES..!
                </div>
                <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base">
                  By partnering with DOORA, unlock sustainable growth, steady business opportunities, and 
                  long-term success. As a trusted leader in car rental industry, DOORA values strong 
                  relationships with reliable suppliers, offering a platform where your fleet and services truly 
                  flourish.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Consistent Bookings</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Gain access to large and growing customer base that ensures regular demand for your fleets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Timely Payments & Transparent Terms</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Transparent billing and prompt payments help maintain healthy cash flow for your operations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Brand Association</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Work with a reputed brand and gain credibility and trust in the industry.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">24/7 Assistance</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Dedicated supplier support to address queries efficiently and maintain hassle-free coordination
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2">
              <SupplierEnquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              What Our Clients Say
            </h2>
            <div className="w-16 h-[1px] bg-red-500 mx-auto mb-6"></div>
            <p className="font-inter text-[#111111]/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here is what leading professionals and corporations have to say about DOORA Mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-100 w-12 h-12 rotate-180" />
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
              <p className="font-inter text-gray-600 mb-8 relative z-10 leading-relaxed">
                "DOORA Mobility has transformed our corporate travel. Their vehicles are always immaculate, and the chauffeurs are incredibly professional. Highly recommended for any business looking for reliable transport."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111]">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">VP of Operations, TechCorp India</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-100 w-12 h-12 rotate-180" />
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
              <p className="font-inter text-gray-600 mb-8 relative z-10 leading-relaxed">
                "We have been using DOORA for all our airport transfers and outstation trips for executives. The 24/7 support is outstanding and they always accommodate last-minute changes smoothly."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111]">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Event Manager, Global Solutions</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-100 w-12 h-12 rotate-180" />
              <div className="flex gap-1 text-yellow-400 mb-6">
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
                <Star className="fill-current w-5 h-5" />
              </div>
              <p className="font-inter text-gray-600 mb-8 relative z-10 leading-relaxed">
                "The self-drive rental experience was seamless. The booking process was fast, and the Range Rover I rented was in pristine condition. DOORA is my go-to for luxury weekends."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111]">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-[1px] bg-red-500 mx-auto mb-6"></div>
          </div>

          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden open:bg-gray-50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#111111] p-6 list-none [&::-webkit-details-marker]:hidden">
                How do I book a vehicle with DOORA Mobility?
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 font-inter">
                You can easily book a vehicle through our website's booking engine, or by contacting our 24/7 dedicated support team. We offer both chauffeur-driven and self-drive options.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden open:bg-gray-50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#111111] p-6 list-none [&::-webkit-details-marker]:hidden">
                What is included in the rental price?
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 font-inter">
                Our base rental prices include comprehensive insurance, maintenance, and 24/7 roadside assistance. For chauffeur-driven options, the driver's allowance is also included. Fuel policies depend on the rental agreement type.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden open:bg-gray-50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#111111] p-6 list-none [&::-webkit-details-marker]:hidden">
                Do you offer long-term corporate leases?
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 font-inter">
                Yes, we specialize in corporate transport solutions offering flexible ETS, spot rentals, monthly, and long-term lease plans tailored specifically to your organization's needs.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden open:bg-gray-50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#111111] p-6 list-none [&::-webkit-details-marker]:hidden">
                What are the requirements for self-drive rentals?
                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:-rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-gray-600 font-inter">
                For self-drive rentals, you must be at least 23 years old, possess a valid government-issued driver's license with at least 2 years of driving experience, and provide a valid ID and credit card for the security deposit.
              </div>
            </details>
          </div>
        </div>
      </section>
      <BookingModal vehicles={allVehicles} />
    </div>
  );
}
