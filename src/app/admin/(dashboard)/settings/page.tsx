import { db } from "@/lib/db";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await db.businessSettings.findFirst();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="font-space-grotesk text-3xl font-bold">Business Settings</h1>
      </div>

      <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden p-6">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
