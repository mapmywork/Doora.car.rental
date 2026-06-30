"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveBusinessSettings(formData: FormData) {
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const email = formData.get("email") as string;
  const officeAddress = formData.get("officeAddress") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;

  await db.businessSettings.upsert({
    where: { id: 1 },
    update: {
      whatsappNumber,
      email,
      officeAddress,
      metaTitle,
      metaDescription,
    },
    create: {
      id: 1,
      whatsappNumber,
      email,
      officeAddress,
      metaTitle,
      metaDescription,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
