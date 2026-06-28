import { db } from "@/lib/db";
import { CarFront, ClipboardList, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    totalVehicles,
    availableVehicles,
    pendingOrders,
    newEnquiries,
    recentOrders,
  ] = await Promise.all([
    db.vehicle.count(),
    db.vehicle.count({ where: { isAvailable: true } }),
    db.order.count({ where: { status: "PENDING" } }),
    db.enquiry.count({ where: { status: "NEW" } }),
    db.order.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Dashboard</h1>
        <Link 
          href="/admin/orders/new" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} /> New Order
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg text-foreground/70">
              <CarFront size={24} />
            </div>
            <div>
              <p className="text-sm text-foreground/50 font-inter">Total Vehicles</p>
              <h3 className="text-2xl font-bold font-space-grotesk">{totalVehicles}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg text-foreground/70">
              <CarFront size={24} />
            </div>
            <div>
              <p className="text-sm text-foreground/50 font-inter">Available Vehicles</p>
              <h3 className="text-2xl font-bold font-space-grotesk text-[#25D366]">{availableVehicles}</h3>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-sm text-foreground/50 font-inter">Pending Orders</p>
              <h3 className="text-2xl font-bold font-space-grotesk">{pendingOrders}</h3>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg text-foreground/70">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm text-foreground/50 font-inter">New Enquiries</p>
              <h3 className="text-2xl font-bold font-space-grotesk">{newEnquiries}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-space-grotesk text-xl font-bold">Recent Orders</h2>
        </div>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead className="bg-secondary/50 text-foreground/60 text-sm">
                <tr>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Vehicle</th>
                  <th className="p-4 font-medium">Dates</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-xs text-foreground/50">{order.phone}</p>
                    </td>
                    <td className="p-4 text-sm">{order.vehicle}</td>
                    <td className="p-4 text-sm text-foreground/70">
                      {new Date(order.pickupDate).toLocaleDateString()} - {new Date(order.dropDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-foreground/50 font-inter">
            No recent orders found.
          </div>
        )}
      </div>
    </div>
  );
}
