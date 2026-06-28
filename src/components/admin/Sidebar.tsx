"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { 
  LayoutDashboard, 
  CarFront, 
  ClipboardList, 
  MessageSquare, 
  Settings,
  Menu,
  ChevronLeft
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Vehicles", href: "/admin/vehicles", icon: CarFront },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={clsx(
      "bg-foreground text-background transition-all duration-300 flex flex-col border-r border-border",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-20 flex items-center justify-between px-4 border-b border-background/10">
        {!isCollapsed && (
          <Link href="/admin" className="font-space-grotesk font-bold text-xl tracking-tighter truncate">
            DOORA <span className="text-primary">ADMIN</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-background/70 hover:text-white transition-colors ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "text-background/70 hover:bg-background/10 hover:text-white"
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="font-inter text-sm whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
