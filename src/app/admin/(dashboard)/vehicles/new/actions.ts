"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createVehicle(formData: FormData) {
  // 1. Authenticate user
  await requireAdmin();

  // 2. Parse form data
  const brand = formData.get("brand") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const priceStr = formData.get("price") as string;
  const price = parseInt(priceStr, 10); // Price should ideally be in cents, or multiplied by 100 depending on the logic. The list view divides by 100, so we multiply by 100 here.
  const priceInCents = price * 100;
  
  const seats = parseInt(formData.get("seats") as string, 10) || 4;
  const luggage = parseInt(formData.get("luggage") as string, 10) || 2;
  const transmission = formData.get("transmission") as string;
  const fuel = formData.get("fuel") as string;
  const body = formData.get("body") as string;
  const engine = formData.get("engine") as string;
  const featuresStr = formData.get("features") as string;
  const features = featuresStr ? featuresStr.split(",").map(f => f.trim()) : [];
  
  const isAvailable = formData.get("isAvailable") === "on";
  const featured = formData.get("featured") === "on";
  const imageUrl = formData.get("imageUrl") as string;

  // 3. Validation
  if (!brand || !name || !slug || !description || isNaN(priceInCents)) {
    throw new Error("Missing required fields");
  }

  // 4. Create in DB
  await db.vehicle.create({
    data: {
      brand,
      name,
      slug,
      description,
      price: priceInCents,
      seats,
      luggage,
      transmission,
      fuel,
      body,
      engine,
      features,
      isAvailable,
      featured,
      images: imageUrl ? {
        create: [
          { url: imageUrl, isPrimary: true }
        ]
      } : undefined
    }
  });

  // 5. Revalidate and redirect
  revalidatePath("/admin/vehicles");
  revalidatePath("/");
  redirect("/admin/vehicles");
}
