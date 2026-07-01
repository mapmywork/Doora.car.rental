
import { 
  Plane, 
  Briefcase, 
  Building, 
  UserCircle, 
  Map, 
  Clock, 
  Key, 
  Gem, 
  Bus, 
  Crown, 
  Calendar, 
  Hotel,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Premium Services | DOORA MOBILITY",
  description: "Explore our comprehensive range of premium transportation services tailored for corporate and personal needs.",
};

const services = [
  {
    title: "Airport Transfers",
    description: "Comfortable and punctual airport pickup and drop services. Dedicated meet & greet included.",
    icon: Plane,
    color: "bg-blue-50 text-blue-500",
    delay: "delay-[100ms]",
  },
  {
    title: "Employee Transportation (ETS)",
    description: "Safe and efficient daily commute solutions for corporate employees with real-time tracking.",
    icon: Briefcase,
    color: "bg-emerald-50 text-emerald-500",
    delay: "delay-[150ms]",
  },
  {
    title: "Corporate Car Rental",
    description: "Dedicated transportation for meetings, executives, and business travel ensuring complete professionalism.",
    icon: Building,
    color: "bg-purple-50 text-purple-500",
    delay: "delay-[200ms]",
  },
  {
    title: "Chauffeur-Driven Cars",
    description: "Professional drivers for business, leisure, and special occasions. Travel in ultimate comfort.",
    icon: UserCircle,
    color: "bg-red-50 text-red-500",
    delay: "delay-[250ms]",
  },
  {
    title: "Outstation Travel",
    description: "Reliable intercity travel with flexible booking options and comfortable, well-maintained vehicles.",
    icon: Map,
    color: "bg-orange-50 text-orange-500",
    delay: "delay-[300ms]",
  },
  {
    title: "Local Rentals",
    description: "Hourly, half-day, and full-day rental packages for city travel, shopping, or local meetings.",
    icon: Clock,
    color: "bg-teal-50 text-teal-500",
    delay: "delay-[350ms]",
  },
  {
    title: "Self-Drive Cars",
    description: "Freedom to drive with a wide selection of self-drive vehicles for weekend getaways or road trips.",
    icon: Key,
    color: "bg-indigo-50 text-indigo-500",
    delay: "delay-[400ms]",
  },
  {
    title: "Wedding & Event Transport",
    description: "Premium vehicles for weddings, conferences, and special events to make a grand entrance.",
    icon: Gem,
    color: "bg-pink-50 text-pink-500",
    delay: "delay-[450ms]",
  },
  {
    title: "Group Transportation",
    description: "Tempo Travellers, minibuses, and buses for groups, family outings, and corporate events.",
    icon: Bus,
    color: "bg-yellow-50 text-yellow-600",
    delay: "delay-[500ms]",
  },
  {
    title: "VIP & Executive Mobility",
    description: "Luxury transportation for executives, dignitaries, and guests. Absolute discretion and premium comfort.",
    icon: Crown,
    color: "bg-amber-50 text-amber-500",
    delay: "delay-[550ms]",
  },
  {
    title: "Long-Term & Monthly Rentals",
    description: "Flexible rental plans for businesses and individual customers. A cost-effective alternative to ownership.",
    icon: Calendar,
    color: "bg-cyan-50 text-cyan-500",
    delay: "delay-[600ms]",
  },
  {
    title: "Hotel & Hospitality Transfers",
    description: "Reliable transportation for hotels, travel agencies, and hospitality partners to serve esteemed guests.",
    icon: Hotel,
    color: "bg-rose-50 text-rose-500",
    delay: "delay-[650ms]",
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <section className="relative bg-[#111111] text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600&q=80" 
              alt="Premium Services Background" 
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Elevate Your Journey</span>
          <h1 className="font-space-grotesk text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Services</span>
          </h1>
          <p className="font-inter text-white/80 max-w-2xl mx-auto text-lg md:text-xl">
            From seamless airport transfers to bespoke VIP mobility, we offer a comprehensive suite of premium transportation solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  
                  <h3 className="font-space-grotesk text-xl font-bold text-[#111111] mb-3 group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-inter text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-500">
                     <ArrowRight size={20} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </div>
  );
}
