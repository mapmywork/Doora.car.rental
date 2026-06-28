"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteVehicle(vehicleId: string) {
  await requireAdmin();

  await db.vehicle.delete({
    where: {
      id: vehicleId,
    },
  });

  revalidatePath("/admin/vehicles");
  revalidatePath("/");
  revalidatePath("/fleet");
}

export async function updateVehicle(vehicleId: string, formData: FormData) {
  await requireAdmin();

  const brand = formData.get("brand") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const priceStr = formData.get("price") as string;
  const price = parseInt(priceStr, 10);
  const priceInCents = price * 100;
  
  const seats = parseInt(formData.get("seats") as string, 10) || 4;
  const luggage = parseInt(formData.get("luggage") as string, 10) || 2;
  const transmission = formData.get("transmission") as string;
  const fuel = formData.get("fuel") as string;
  const featuresStr = formData.get("features") as string;
  const features = featuresStr ? featuresStr.split(",").map(f => f.trim()) : [];
  
  const isAvailable = formData.get("isAvailable") === "on";
  const featured = formData.get("featured") === "on";
  const imageUrl = formData.get("imageUrl") as string;

  if (!brand || !name || !slug || !description || isNaN(priceInCents)) {
    throw new Error("Missing required fields");
  }

  const updateData: any = {
    brand,
    name,
    slug,
    description,
    price: priceInCents,
    seats,
    luggage,
    transmission,
    fuel,
    features,
    isAvailable,
    featured,
  };

  // If a new image URL is provided, we'll replace the existing primary image
  // In a full implementation, you might want to manage multiple images separately
  if (imageUrl) {
    updateData.images = {
      deleteMany: {},
      create: [{ url: imageUrl, isPrimary: true }]
    };
  }

  await db.vehicle.update({
    where: { id: vehicleId },
    data: updateData,
  });

  revalidatePath("/admin/vehicles");
  revalidatePath("/");
  revalidatePath("/fleet");
  revalidatePath(`/vehicle/${slug}`);
  
  redirect("/admin/vehicles");
}
