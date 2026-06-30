import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-20 border-t border-border/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-2">
            <img src="/logo.png" alt="DOORA Mobility Logo" className="h-12 w-12 rounded-full object-cover shadow-sm border border-gray-600" />
            <span className="font-space-grotesk text-2xl font-bold tracking-tighter">DOORA <span className="text-primary">MOBILITY</span></span>
          </Link>
          <p className="mt-4 font-inter text-sm text-background/70">
            Premium car rental services providing luxury, comfort, and reliability for all your journeys.
          </p>
        </div>
        
        <div>
          <h4 className="font-space-grotesk font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 font-inter text-sm text-background/70">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-space-grotesk font-semibold text-lg mb-4">Contact</h4>
          <ul className="space-y-2 font-inter text-sm text-background/70">
            <li>Email: contact@dooramobility.com</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Address: 123 Premium Way, Luxury City</li>
          </ul>
        </div>

        <div>
          <h4 className="font-space-grotesk font-semibold text-lg mb-4">Legal</h4>
          <ul className="space-y-2 font-inter text-sm text-background/70">
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-background/10 text-center font-inter text-sm text-background/50">
        &copy; {new Date().getFullYear()} DOORA MOBILITY. All rights reserved.
      </div>
    </footer>
  );
}
