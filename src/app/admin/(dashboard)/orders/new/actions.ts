"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendBookingConfirmation } from "@/lib/email";

export async function createOrder(formData: FormData) {
  await requireAdmin();

  const customerName = formData.get("customerName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string | null;
  const vehicle = formData.get("vehicle") as string;
  
  const pickupDateStr = formData.get("pickupDate") as string;
  const dropDateStr = formData.get("dropDate") as string;
  
  const pickupLocation = formData.get("pickupLocation") as string;
  const dropLocation = formData.get("dropLocation") as string;
  
  const notes = formData.get("notes") as string;

  if (!customerName || !phone || !vehicle || !pickupDateStr || !dropDateStr) {
    throw new Error("Missing required fields");
  }

  const pickupDate = new Date(pickupDateStr);
  const dropDate = new Date(dropDateStr);

  const order = await db.order.create({
    data: {
      customerName,
      phone,
      email,
      vehicle,
      pickupDate,
      dropDate,
      pickupLocation,
      dropLocation,
      notes,
      status: "PENDING",
      paymentStatus: "PENDING"
    }
  });

  if (email) {
    await sendBookingConfirmation(email, {
      customerName,
      confirmationCode: order.id.slice(0, 8).toUpperCase(),
      vehicleName: vehicle,
      pickupDate: pickupDate.toLocaleString(),
      dropoffDate: dropDate.toLocaleString(),
      pickupLocation: pickupLocation || "N/A",
      dropoffLocation: dropLocation || "N/A",
      totalPrice: "To be determined", // Or fetch vehicle price and calculate
    });
  }

  revalidatePath("/admin/orders");
  redirect("/admin/orders");
}
