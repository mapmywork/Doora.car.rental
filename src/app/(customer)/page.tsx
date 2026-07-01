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
              <div className="space-y-4 font-inter text-[#4a4a4a] leading-relaxed text-sm md:text-base">
                <p>
                  DOORA was established with a vision to redefine corporate and premium mobility by combining dependable service, modern technology, and customer-first experiences. We provide professional transportation solutions for businesses, travellers, and individuals, offering services ranging from airport transfers and corporate travel to outstation journeys and event transportation.
                </p>
                <p>
                  Our focus is on delivering safe, punctual, and comfortable travel through a network of verified drivers, well-maintained vehicles, and transparent pricing. Every trip is supported by responsive customer service and technology-driven booking and trip management to ensure a seamless experience from reservation to destination.
                </p>
                <p>
                  As a growing mobility brand, DOORA is committed to building long-term relationships based on trust, reliability, and service excellence. Our mission is to become the preferred transportation partner for corporate clients and individual travellers by consistently delivering quality, professionalism, and value.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/about" className="inline-block bg-[#ef4444] text-white font-inter font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition-colors shadow-md">
                  Read More
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-0 md:pr-4">
              <img 
                src="/22.jpeg" 
                alt="About Doora Mobility" 
                className="w-full h-auto rounded-3xl shadow-xl object-cover aspect-[4/3] md:aspect-[3/2]"
              />
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
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Multi-City Operations</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Reliable transportation services across multiple cities through our growing network of trusted fleet partners, ensuring consistent, safe, and seamless travel experiences.
              </p>
            </div>
            
            {/* 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Car size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Reliable Mobility Network & Infrastructure</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                A well-managed fleet network backed by efficient infrastructure and dedicated support
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Cpu size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Smart Technology</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Smart booking platform with real-time GPS tracking, trip monitoring, and client dashboards for a seamless, secure, and transparent travel experience.
              </p>
            </div>

            {/* 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Headset size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Round-the-Clock Support</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Our dedicated support team is available day and night to assist with bookings, trip updates, and travel assistance whenever you need us.
              </p>
            </div>

            {/* 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <Users size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Professional Driving Team</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Trusted and professional drivers dedicated to providing safe, punctual, and customer-focused transportation services.
              </p>
            </div>

            {/* 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <ShieldCheck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Committed to Quality Standards</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                ISO 27001 certified with full fleet and documentation compliance for peace of mind.
              </p>
            </div>

            {/* 7 */}
            <div className="flex flex-col items-center text-center">
              <div className="text-red-500 mb-4">
                <PieChart size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#111111] mb-3 text-lg">Flexible Mobility Solutions</h3>
              <p className="text-[#111111]/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Tailored corporate mobility solutions including Employee Transportation Services (ETS), spot rentals, and flexible short-term, monthly, and long-term plans.
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
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <p className="font-bold text-[#111111] text-sm md:text-base mb-2">
                  Attach your vehicle with DOORA and start earning with every ride
                </p>
                <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#111111] mb-6">
                  Grow Together with DOORA
                </h2>
                <div className="inline-block bg-red-50 text-red-500 font-bold text-sm tracking-wider uppercase px-6 py-2 rounded-full mb-6 shadow-sm">
                  Partner with DOORA and Grow Your Business
                </div>
                <p className="font-inter text-gray-600 leading-relaxed text-sm md:text-base">
                  Join DOORA's trusted partner network and unlock new business opportunities with a steady flow of ride requests. We are committed to building long-term relationships with professional fleet owners and travel partners through transparency, reliability, and mutual growth.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Regular Business Opportunities</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Receive consistent trip requests from corporate, airport, local, and outstation travel requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Transparent Payments</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Benefit from clear pricing, timely settlements, and a simple payment process that supports your business.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Business Growth</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Expand your reach by serving a wider customer base while strengthening your brand through a trusted mobility platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Dedicated Partner Support</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Our partner support team is available to assist with trip coordination, operational queries, and ongoing business needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Easy Onboarding</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      Join our growing network with a straightforward registration process and start accepting trips quickly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 text-red-500">
                    <Check strokeWidth={3} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111111] mb-1">Long-Term Partnership</h4>
                    <p className="text-sm text-gray-500 font-inter leading-relaxed">
                      We believe in building lasting relationships that create value for both our partners and customers.
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
