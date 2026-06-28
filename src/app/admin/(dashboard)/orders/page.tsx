import { db } from "@/lib/db";
import { Plus } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Orders</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          <Plus size={20} /> Create Manual Order
        </button>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter">
            <thead className="bg-secondary/50 text-foreground/60 text-sm">
              <tr>
                <th className="p-4 font-medium">ID / Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Vehicle & Schedule</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4">
                    <p className="text-xs font-mono text-foreground/50">{o.id.slice(0, 8)}</p>
                    <p className="text-sm">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{o.customerName}</p>
                    <p className="text-xs text-foreground/50">{o.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground text-sm">{o.vehicle}</p>
                    <p className="text-xs text-foreground/70">
                      {new Date(o.pickupDate).toLocaleDateString()} to {new Date(o.dropDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select className="bg-secondary border border-border rounded p-1 text-sm outline-none focus:border-primary">
                      <option>Update Status...</option>
                      <option value="CONFIRMED">Confirm</option>
                      <option value="RUNNING">Mark Running</option>
                      <option value="COMPLETED">Complete</option>
                      <option value="CANCELLED">Cancel</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-12 text-center text-foreground/50 font-inter">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
