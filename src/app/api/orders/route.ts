import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createOrderSchema } from "@/lib/validators";
import { apiSuccess, apiError } from "@/lib/utils";
import { handleApiError } from "@/lib/api-middlewares";
import { isAdmin } from "@/lib/auth";

// Only Admins can create orders (via Dashboard, after receiving WhatsApp)
export async function POST(req: NextRequest) {
  try {
    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
      return apiError("Unauthorized access", "FORBIDDEN", 403);
    }

    const body = await req.json();
    const result = createOrderSchema.safeParse(body);
    
    if (!result.success) {
      return apiError("Invalid order data", "VALIDATION_ERROR", 400, result.error.flatten());
    }

    const order = await db.order.create({
      data: result.data,
    });

    return apiSuccess({ order }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
