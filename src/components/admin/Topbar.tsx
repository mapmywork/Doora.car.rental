"use client";

import { usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { Admin } from "@prisma/client";

export default function Topbar({ user }: { user: Partial<Admin> }) {
  const pathname = usePathname();
  
  // Create a simple breadcrumb from the pathname
  const pathParts = pathname.split("/").filter(Boolean);
  const currentPage = pathParts.length > 1 
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1) 
    : "Overview";

  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-2 font-inter text-sm text-foreground/60">
        <span>Admin</span>
        <span>/</span>
        <span className="font-semibold text-foreground">{currentPage}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-inter text-sm font-medium hidden md:inline-block">
          {user.name}
        </span>
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground">
          <User size={20} />
        </div>
        <button 
          className="p-2 text-foreground/60 hover:text-destructive transition-colors ml-2" 
          onClick={() => signOut({ callbackUrl: '/admin/login' })} 
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
