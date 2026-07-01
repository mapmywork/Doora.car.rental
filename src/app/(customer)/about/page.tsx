export const metadata = {
  title: "About Us | DOORA MOBILITY",
  description: "Learn more about DOORA MOBILITY, the premier luxury car rental service.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="bg-foreground text-background pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            About <span className="text-primary">DOORA</span>
          </h1>
          <p className="font-inter text-background/80 text-xl max-w-2xl mx-auto mt-6">
            Redefining Corporate and Premium Mobility
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none font-inter text-foreground/80 space-y-6">
        <p>
          DOORA was established with a vision to redefine corporate and premium mobility by combining dependable service, modern technology, and customer-first experiences. We provide professional transportation solutions for businesses, travellers, and individuals, offering services ranging from airport transfers and corporate travel to outstation journeys and event transportation.
        </p>
        <p>
          Our focus is on delivering safe, punctual, and comfortable travel through a network of verified drivers, well-maintained vehicles, and transparent pricing. Every trip is supported by responsive customer service and technology-driven booking and trip management to ensure a seamless experience from reservation to destination.
        </p>
        <p>
          As a growing mobility brand, DOORA is committed to building long-term relationships based on trust, reliability, and service excellence. Our mission is to become the preferred transportation partner for corporate clients and individual travellers by consistently delivering quality, professionalism, and value.
        </p>
        
        <h2 className="font-space-grotesk text-3xl font-bold text-foreground mt-12 mb-4">Our Standard of Excellence</h2>
        <p>
          Every vehicle available through DOORA is carefully inspected and prepared to meet our quality and safety standards before every trip. We work with trusted fleet partners to ensure that our customers receive clean, well-maintained, and reliable vehicles for every journey.
        </p>
        <p>
          Whether your pickup location is an airport, hotel, office, or residence, our team coordinates timely vehicle dispatch and professional service to deliver a smooth and hassle-free experience. From booking confirmation to trip completion, DOORA is committed to providing dependable mobility with comfort, punctuality, and exceptional customer support.
        </p>

        <h2 className="font-space-grotesk text-3xl font-bold text-foreground mt-12 mb-4">Chauffeur Services</h2>
        <p>
          For customers who prefer a chauffeur-driven experience, DOORA offers professional and courteous drivers committed to delivering safe, comfortable, and dependable transportation. Our chauffeur partners are selected for their professionalism, punctuality, and customer service, ensuring every journey is smooth, stress-free, and enjoyable.
        </p>
        <p>
          Whether you're travelling for business meetings, airport transfers, corporate events, or personal occasions, our chauffeur-driven services are designed to provide convenience, reliability, and peace of mind from pickup to destination.
        </p>
      </div>
        </div>
      </section>
    </div>
  );
}
