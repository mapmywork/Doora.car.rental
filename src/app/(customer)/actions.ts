"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitBookingEnquiry(formData: FormData) {
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

  const name = `${firstName} ${lastName}`.trim();

  // Find vehicle name from slug
  const vehicle = await db.vehicle.findUnique({
    where: { slug: vehicleSlug }
  });

  const vehicleName = vehicle ? vehicle.name : vehicleSlug;

  const message = `
**Booking Details**
From City: ${fromCity}
To City: ${toCity}
Pickup Location: ${pickupLocation}
Pickup Time: ${pickupTime}
Journey Start: ${journeyStart}
Journey End: ${journeyEnd}
  `.trim();

  await db.enquiry.create({
    data: {
      name,
      phone,
      email: email || "no-email@provided.com",
      vehicle: vehicleName,
      message,
      status: "NEW",
    }
  });

  // Also create a pending order so the admin can see it in orders too
  await db.order.create({
    data: {
      customerName: name,
      phone: phone,
      email: email || null,
      vehicle: vehicleName,
      pickupDate: new Date(journeyStart || new Date()),
      dropDate: new Date(journeyEnd || new Date()),
      status: "PENDING",
      pickupLocation: pickupLocation,
      dropLocation: toCity,
      notes: `From: ${fromCity}, Pickup Time: ${pickupTime}`,
    }
  });

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/orders");
}
