export const metadata = {
  title: "Terms of Service | DOORA MOBILITY",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="bg-foreground text-background pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
        </div>
      </section>
      
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none font-inter text-foreground/80 space-y-6">
        <p>Last updated: June 2026</p>
        <h2 className="font-space-grotesk text-2xl font-bold text-foreground">1. Rental Requirements</h2>
        <p>
          To rent a vehicle from DOORA MOBILITY, drivers must be at least 25 years of age, hold a valid driver's license, and provide a major credit card for the security deposit.
        </p>
        <h2 className="font-space-grotesk text-2xl font-bold text-foreground">2. Insurance & Liability</h2>
        <p>
          All vehicles include comprehensive insurance. However, the renter remains responsible for the deductible amount in the event of damage or theft, unless an additional premium coverage waiver is purchased.
        </p>
      </div>
        </div>
      </section>
    </div>
  );
}
