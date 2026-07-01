import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { db } from "@/lib/db";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | DOORA MOBILITY",
  description: "Get in touch with the DOORA MOBILITY concierge team.",
};

export default async function ContactPage() {
  const settings = await db.businessSettings.findFirst();
  const whatsappNumber = settings?.whatsappNumber || "919763497635";

  return (
    <div className="flex flex-col w-full min-h-screen">
      <section className="bg-foreground text-background pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="font-inter text-background/80 max-w-2xl mx-auto">
            Our dedicated team is available 24/7 to assist with your transportation needs, ensuring a smooth, safe, and comfortable travel experience.
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-background flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-space-grotesk text-3xl font-bold mb-8">Send an Enquiry</h2>
          <EnquiryForm whatsappNumber={whatsappNumber} />
        </div>

        <div>
          <h2 className="font-space-grotesk text-3xl font-bold mb-8">Get In Touch</h2>
          
          <div className="bg-secondary/30 border border-border/50 rounded-2xl p-8 space-y-8">
            <div className="flex gap-6">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-space-grotesk font-bold text-xl mb-2">Office Location</h3>
                <p className="font-inter text-foreground/80">Arjun Building, 1st Floor<br/>Naylor Road, Near Atur Park Gate No 5<br/>Koregaon Park Pune 411001</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-space-grotesk font-bold text-xl mb-2">Phone / WhatsApp</h3>
                <p className="font-inter text-foreground/80">+91 97634-97635</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-space-grotesk font-bold text-xl mb-2">Email Address</h3>
                <p className="font-inter text-foreground/80">sales@dooramobility.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </section>
    </div>
  );
}
