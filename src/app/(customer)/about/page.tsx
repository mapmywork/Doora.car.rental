export const metadata = {
  title: "About Us | DOORA MOBILITY",
  description: "Learn more about DOORA MOBILITY, the premier luxury car rental service.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="font-space-grotesk text-5xl font-bold uppercase tracking-tighter mb-8 text-center">
        About <span className="text-primary">DOORA</span>
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none font-inter text-foreground/80 space-y-6">
        <p>
          Welcome to DOORA MOBILITY, where luxury meets the open road. We are more than just a car rental company; we are curators of extraordinary driving experiences.
        </p>
        <p>
          Founded on the principle that the journey is just as important as the destination, DOORA provides an exclusive fleet of the world's most prestigious vehicles. From high-performance sports cars that pulse with adrenaline to ultra-luxury sedans that glide in absolute silence, our collection is meticulously maintained to exceed the expectations of the most discerning clients.
        </p>
        
        <h2 className="font-space-grotesk text-3xl font-bold text-foreground mt-12 mb-4">Our Standard of Excellence</h2>
        <p>
          Every vehicle in our fleet undergoes a rigorous 50-point inspection before every rental. We guarantee that your chosen vehicle will arrive in immaculate, showroom condition. Our white-glove delivery service ensures that whether you're at the airport, your hotel, or your private residence, your vehicle is waiting for you exactly when you need it.
        </p>

        <h2 className="font-space-grotesk text-3xl font-bold text-foreground mt-12 mb-4">Chauffeur Services</h2>
        <p>
          For those who prefer to sit back and relax, our professional chauffeurs provide a discreet, reliable, and highly secure service. Trained in advanced driving techniques and absolute confidentiality, they are dedicated to ensuring your transit is smooth and completely undisturbed.
        </p>
      </div>
    </div>
  );
}
