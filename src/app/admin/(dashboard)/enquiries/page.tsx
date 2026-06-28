import { db } from "@/lib/db";
import { Mail, Phone } from "lucide-react";

export default async function AdminEnquiriesPage() {
  const enquiries = await db.enquiry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Enquiries</h1>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter">
            <thead className="bg-secondary/50 text-foreground/60 text-sm">
              <tr>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer Details</th>
                <th className="p-4 font-medium">Vehicle Interest</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 text-sm whitespace-nowrap">
                    {new Date(e.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{e.name}</p>
                    <div className="flex flex-col gap-1 mt-1">
                      <a href={`mailto:${e.email}`} className="text-xs text-primary flex items-center gap-1 hover:underline">
                        <Mail size={12} /> {e.email}
                      </a>
                      <a href={`tel:${e.phone}`} className="text-xs text-primary flex items-center gap-1 hover:underline">
                        <Phone size={12} /> {e.phone}
                      </a>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium">{e.vehicle}</td>
                  <td className="p-4 text-sm max-w-xs truncate" title={e.message}>
                    {e.message || <span className="text-foreground/30 italic">No message</span>}
                  </td>
                  <td className="p-4">
                    <select 
                      className="bg-secondary border border-border rounded p-1 text-sm outline-none focus:border-primary uppercase text-xs font-semibold"
                      defaultValue={e.status}
                    >
                      <option value="NEW">New</option>
                      <option value="READ">Read</option>
                      <option value="REPLIED">Replied</option>
                      <option value="CONVERTED">Converted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {enquiries.length === 0 && (
            <div className="p-12 text-center text-foreground/50 font-inter">
              No enquiries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
