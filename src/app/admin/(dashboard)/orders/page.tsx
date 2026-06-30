import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, MessageCircle, MoreVertical } from "lucide-react";
import { generateWhatsAppConfirmationLink } from "@/lib/whatsapp";
import { updateOrderStatus, deleteOrder } from "./actions";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Orders</h1>
        <Link 
          href="/admin/orders/new" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} /> Create Manual Order
        </Link>
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
                  <td className="p-4 text-right flex justify-end gap-2 items-center">
                    <a
                      href={generateWhatsAppConfirmationLink(o)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-green-600 bg-green-500/10 rounded border border-green-500/20 hover:bg-green-500/20 transition-colors"
                      title="Send WhatsApp Confirmation"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                    </a>
                    <details className="relative group">
                      <summary className="list-none cursor-pointer p-1.5 rounded hover:bg-secondary text-foreground/70 transition-colors [&::-webkit-details-marker]:hidden">
                        <MoreVertical size={18} />
                      </summary>
                      <div className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-md shadow-xl z-50 flex flex-col py-1">
                        <form action={updateOrderStatus}>
                          <input type="hidden" name="orderId" value={o.id} />
                          <button name="status" value="CONFIRMED" className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors">Confirm</button>
                          <button name="status" value="RUNNING" className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors">Mark Running</button>
                          <button name="status" value="COMPLETED" className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors">Complete</button>
                          <button name="status" value="CANCELLED" className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors">Cancel</button>
                        </form>
                        <hr className="my-1 border-border" />
                        <form action={deleteOrder}>
                          <input type="hidden" name="orderId" value={o.id} />
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 transition-colors">Delete</button>
                        </form>
                      </div>
                    </details>
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
