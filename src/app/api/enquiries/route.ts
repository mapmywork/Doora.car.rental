import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createEnquirySchema } from "@/lib/validators";
import { apiSuccess, apiError } from "@/lib/utils";
import { handleApiError, rateLimit, RATE_LIMITS } from "@/lib/api-middlewares";

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "enquiries_post", RATE_LIMITS.PUBLIC_API.limit, RATE_LIMITS.PUBLIC_API.window);
    if (!success) return apiError("Too many requests", "RATE_LIMIT_EXCEEDED", 429);

    const body = await req.json();
    const result = createEnquirySchema.safeParse(body);
    
    if (!result.success) {
      return apiError("Invalid enquiry data", "VALIDATION_ERROR", 400, result.error.flatten());
    }

    const enquiry = await db.enquiry.create({
      data: {
        ...result.data,
        message: result.data.message || "",
      }
    });

    // TODO: Trigger Nodemailer to send email to Admin and Customer

    return apiSuccess({ enquiry }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
