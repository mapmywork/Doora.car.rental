import { requireAdmin } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";

export const metadata = {
  title: "Admin Dashboard | DOORA MOBILITY",
  description: "Internal management dashboard for DOORA MOBILITY",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect all /admin routes
  const admin = await requireAdmin();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar user={admin} />
        <main className="flex-1 overflow-y-auto p-6 bg-secondary/30">
          {children}
        </main>
      </div>
    </div>
  );
}
