"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as OrderStatus;

  if (!orderId || !status) {
    throw new Error("Missing required fields");
  }

  await db.order.update({
    where: { id: orderId },
    data: { status }
  });

  revalidatePath("/admin/orders");
}

export async function deleteOrder(formData: FormData) {
  await requireAdmin();
  
  const orderId = formData.get("orderId") as string;

  if (!orderId) {
    throw new Error("Missing required fields");
  }

  await db.order.delete({
    where: { id: orderId }
  });

  revalidatePath("/admin/orders");
}
