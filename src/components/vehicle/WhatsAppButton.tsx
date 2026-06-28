"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  vehicleName: string;
  pricePerDay: number;
}

export function WhatsAppButton({ phoneNumber, vehicleName, pricePerDay }: WhatsAppButtonProps) {
  const handleBooking = () => {
    const formattedPrice = (pricePerDay / 100).toLocaleString();
    const text = encodeURIComponent(
      `Hello DOORA MOBILITY, I am interested in booking the ${vehicleName} (listed at $${formattedPrice}/day). Please let me know the availability.`
    );
    // Remove non-numeric characters from the phone number
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <button 
      onClick={handleBooking}
      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-manrope font-bold text-lg py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      <MessageCircle size={24} /> Book via WhatsApp
    </button>
  );
}
