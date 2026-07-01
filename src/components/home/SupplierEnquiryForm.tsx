"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Car, MapPin, ChevronDown } from "lucide-react";

export function SupplierEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      supplierName: formData.get("supplierName") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      noOfVehicles: formData.get("noOfVehicles") as string,
      vehicleTypes: formData.get("vehicleTypes") as string,
      city: formData.get("city") as string,
      address: formData.get("address") as string,
    };

    // Format message for WhatsApp
    const message = `*New Supplier Enquiry*
    
*Contact Details*
Name: ${data.contactPerson}
Supplier: ${data.supplierName || "N/A"}
Mobile: ${data.mobileNumber}
Email: ${data.email || "N/A"}

*Location*
City: ${data.city}
Address: ${data.address || "N/A"}

*Fleet Details*
Number of Vehicles: ${data.noOfVehicles || "N/A"}
Vehicle Types: ${data.vehicleTypes !== "Select vehicle types" ? data.vehicleTypes : "N/A"}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "918637743774"; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    
    // Optional: Reset form after brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="bg-[#f0f2f5] p-8 rounded-2xl border-t-[6px] border-red-500 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6 font-inter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Supplier Name</label>
            <div className="relative">
              <input 
                type="text" 
                name="supplierName"
                placeholder="Your Name" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Contact Person Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Contact Person Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <input 
                type="text" 
                name="contactPerson"
                required
                placeholder="Your Name" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <input 
                type="tel" 
                name="mobileNumber"
                required
                placeholder="+91" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* No. of vehicles */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">No. of vehicles</label>
            <div className="relative">
              <input 
                type="text" 
                name="noOfVehicles"
                placeholder="Vehicle Name" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Vehicle Types */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Vehicle Types</label>
            <div className="relative">
              <select 
                name="vehicleTypes"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow appearance-none text-gray-500"
              >
                <option>Select vehicle types</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Luxury</option>
                <option>MUV</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
            <div className="relative">
              <input 
                type="text" 
                name="city"
                required
                placeholder="Your City" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Address</label>
            <div className="relative">
              <input 
                type="text" 
                name="address"
                placeholder="Address" 
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 pl-4 pr-10 outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-center w-full">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-white text-red-500 font-bold border-2 border-red-500 rounded-lg px-8 py-2.5 shadow-[0_4px_0_0_rgba(239,68,68,1)] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(239,68,68,1)] active:translate-y-[4px] active:shadow-none transition-all"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
