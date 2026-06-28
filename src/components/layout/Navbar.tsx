import Link from "next/link";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="font-space-grotesk text-2xl font-bold tracking-tighter">
          DOORA <span className="text-primary">MOBILITY</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 font-inter text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex">
          <Link 
            href="/contact" 
            className="font-manrope bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button className="md:hidden text-foreground">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}
