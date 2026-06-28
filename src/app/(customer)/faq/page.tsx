export const metadata = {
  title: "FAQ | DOORA MOBILITY",
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="font-space-grotesk text-5xl font-bold uppercase tracking-tighter mb-8 text-center">
        Frequently Asked <span className="text-primary">Questions</span>
      </h1>
      
      <div className="space-y-8 font-inter">
        <div>
          <h3 className="font-space-grotesk text-2xl font-bold text-foreground mb-2">How do I book a vehicle?</h3>
          <p className="text-foreground/80">
            Booking is exclusively handled via our white-glove WhatsApp service. Simply browse our fleet, click "Book via WhatsApp" on your desired vehicle, and our concierge will finalize your dates, delivery location, and requirements.
          </p>
        </div>
        <div>
          <h3 className="font-space-grotesk text-2xl font-bold text-foreground mb-2">Do you deliver the car to my location?</h3>
          <p className="text-foreground/80">
            Yes. We offer complimentary delivery and pickup within a 50-mile radius of our headquarters, including all major local airports and luxury hotels.
          </p>
        </div>
        <div>
          <h3 className="font-space-grotesk text-2xl font-bold text-foreground mb-2">Is a security deposit required?</h3>
          <p className="text-foreground/80">
            Yes, a pre-authorization security deposit is required on a major credit card prior to the release of any luxury vehicle. The amount varies depending on the specific model requested.
          </p>
        </div>
      </div>
    </div>
  );
}
