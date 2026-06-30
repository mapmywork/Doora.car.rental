"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useRef } from "react";
import { X, Car } from "lucide-react";

interface Vehicle {
  slug: string;
  name: string;
}

export function BookingModal({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const selectedSlug = searchParams.get("book");

  if (!selectedSlug) return null;

  const close = () => {
    startTransition(() => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("book");
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  };

  const action = (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const fromCity = formData.get("fromCity") as string;
    const toCity = formData.get("toCity") as string;
    const pickupLocation = formData.get("pickupLocation") as string;
    const vehicleSlug = formData.get("vehicleSlug") as string;
    const pickupTime = formData.get("pickupTime") as string;
    const journeyStart = formData.get("journeyStart") as string;
    const journeyEnd = formData.get("journeyEnd") as string;

    const vehicleName = vehicles.find(v => v.slug === vehicleSlug)?.name || vehicleSlug;

    const message = `*New Booking Enquiry*
Name: ${firstName} ${lastName}
Mobile: ${phone}
Email: ${email}
From: ${fromCity}
To: ${toCity}
Pickup Location: ${pickupLocation}
Vehicle: ${vehicleName}
Pickup Time: ${pickupTime}
Journey Start: ${journeyStart}
Journey End: ${journeyEnd}`;

    const whatsappUrl = `https://wa.me/919763497635?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={close}
          className="absolute -top-3 -right-3 md:top-4 md:right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-red-600 text-white p-3 rounded-2xl shadow-lg">
            <Car size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-space-grotesk">Book a Ride</h2>
            <p className="text-gray-500 text-sm font-inter">Economical | Efficient | Dependable</p>
          </div>
        </div>

        {/* Form */}
        <form ref={formRef} action={action} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Guest Name</label>
              <input required name="firstName" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Surname</label>
              <input required name="lastName" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Mobile Number</label>
              <input required name="phone" type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email ID</label>
              <input required name="email" type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">From City</label>
              <input required name="fromCity" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">To City</label>
              <input required name="toCity" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Pickup Location</label>
              <input required name="pickupLocation" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
              <select required name="vehicleSlug" defaultValue={selectedSlug} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer">
                <option value="" className="text-gray-500">Select Vehicle</option>
                {vehicles.map(v => (
                  <option key={v.slug} value={v.slug} className="text-gray-900">{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Pickup Time</label>
              <input required name="pickupTime" type="time" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Journey Start Date</label>
              <input required name="journeyStart" type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Journey End Date</label>
              <input required name="journeyEnd" type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <button 
              type="submit" 
              className="bg-red-600 text-white font-bold text-lg px-10 py-3 rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
