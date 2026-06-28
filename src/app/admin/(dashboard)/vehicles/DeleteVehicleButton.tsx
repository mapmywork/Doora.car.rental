"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteVehicle } from "./actions";

export default function DeleteVehicleButton({ vehicleId }: { vehicleId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await deleteVehicle(vehicleId);
      } catch (error) {
        console.error("Failed to delete vehicle:", error);
        alert("Failed to delete vehicle.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 text-foreground/50 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:text-destructive'}`} 
      title="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
}
