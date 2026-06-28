import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteVehicleButton from "./DeleteVehicleButton";

export default async function AdminVehiclesPage() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Vehicles</h1>
        <Link 
          href="/admin/vehicles/new" 
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} /> Add Vehicle
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter">
            <thead className="bg-secondary/50 text-foreground/60 text-sm">
              <tr>
                <th className="p-4 font-medium w-16">Image</th>
                <th className="p-4 font-medium">Details</th>
                <th className="p-4 font-medium">Price/Day</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {vehicles.map((v: any) => (
                <tr key={v.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded bg-secondary overflow-hidden shrink-0">
                      <img 
                        src={v.images[0]?.url || "https://placehold.co/100"} 
                        alt={v.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{v.name}</p>
                    <p className="text-xs text-foreground/50">{v.brand} • {v.slug}</p>
                  </td>
                  <td className="p-4 text-sm font-semibold">${(v.price / 100).toFixed(0)}</td>
                  <td className="p-4">
                    {v.isAvailable ? (
                      <span className="bg-[#25D366]/10 text-[#25D366] px-3 py-1 rounded-full text-xs font-semibold">Available</span>
                    ) : (
                      <span className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-xs font-semibold">Hidden</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/vehicles/${v.id}/edit`}
                        className="p-2 text-foreground/50 hover:text-foreground transition-colors" 
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteVehicleButton vehicleId={v.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
