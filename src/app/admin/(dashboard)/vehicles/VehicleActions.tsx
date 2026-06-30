"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteVehicle } from "./actions";

export default function VehicleActions({ vehicleId }: { vehicleId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    setIsOpen(false);
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
    <div className="relative inline-block text-left" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground/50 hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-10">
          <div className="py-1">
            <Link 
              href={`/admin/vehicles/${vehicleId}/edit`}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors font-medium"
            >
              <Edit size={16} /> Edit
            </Link>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left font-medium transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed text-red-600' : 'text-red-600 hover:bg-red-50'}`}
            >
              <Trash2 size={16} /> {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
