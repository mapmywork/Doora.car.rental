import { z } from "zod";

// ─── Shared Primitives ───────────────────────────────────────────

const uuid = z.string().uuid("Invalid ID format");
const isoDate = z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format. Use ISO 8601.");
const positiveInt = z.number().int().positive();

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

// ─── Auth (Admin Only) ───────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

// ─── Vehicle Validators ──────────────────────────────────────────

export const vehicleSearchSchema = z
  .object({
    brand: z.string().optional(),
    transmission: z.enum(["Automatic", "Manual"]).optional(),
    fuel: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"]).optional(),
    seats: z.coerce.number().int().min(1).optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    sort: z.enum(["price_asc", "price_desc", "newest"]).default("newest"),
  })
  .merge(paginationSchema)
  .refine(
    (data) => {
      if (data.minPrice && data.maxPrice) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    { message: "minPrice must be less than or equal to maxPrice" }
  );

export const createVehicleSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  brand: z.string().min(1).max(50).trim(),
  slug: z.string().min(1).max(100).trim(),
  price: positiveInt, // in paise
  description: z.string().min(10).max(2000).trim(),
  features: z.array(z.string()),
  seats: z.number().int().min(1).max(20),
  transmission: z.enum(["Automatic", "Manual"]),
  fuel: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"]),
  luggage: z.number().int().min(0).max(10),
  featured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  images: z.array(z.object({
    url: z.string().url(),
    isPrimary: z.boolean().default(false)
  })).min(1, "At least one image is required"),
});

export const updateVehicleSchema = createVehicleSchema.partial();

// ─── Enquiry Validators ─────────────────────────────────────────

export const createEnquirySchema = z.object({
  name: z.string().min(2, "Name is required").max(100).trim(),
  phone: z.string().min(5, "Valid phone number is required").max(20).trim(),
  email: z.string().email("Invalid email address").max(255).trim(),
  vehicle: z.string().min(1, "Vehicle of interest is required").max(100).trim(),
  message: z.string().max(1000).optional(),
});

export const updateEnquiryStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "CONVERTED"]),
});

export const enquiryFilterSchema = z
  .object({
    status: z.enum(["NEW", "READ", "REPLIED", "CONVERTED"]).optional(),
  })
  .merge(paginationSchema);

// ─── Order Validators ─────────────────────────────────────────

export const createOrderSchema = z
  .object({
    customerName: z.string().min(1).max(100).trim(),
    phone: z.string().min(5).max(20).trim(),
    vehicle: z.string().min(1).max(100).trim(),
    pickupDate: isoDate,
    dropDate: isoDate,
    notes: z.string().max(1000).optional(),
    pickupLocation: z.string().max(255).optional(),
    dropLocation: z.string().max(255).optional(),
  })
  .refine(
    (data) => new Date(data.dropDate) >= new Date(data.pickupDate),
    { message: "Drop date must be at or after pickup date", path: ["dropDate"] }
  );

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "RUNNING", "COMPLETED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIAL"]).optional(),
  assignedDriver: z.string().max(100).optional(),
});

export const orderFilterSchema = z
  .object({
    status: z.enum(["PENDING", "CONFIRMED", "RUNNING", "COMPLETED", "CANCELLED"]).optional(),
    paymentStatus: z.enum(["PENDING", "PAID", "PARTIAL"]).optional(),
  })
  .merge(paginationSchema);

// ─── Settings Validators ─────────────────────────────────────────

export const updateSettingsSchema = z.object({
  whatsappNumber: z.string().max(20).optional(),
  email: z.string().email().optional(),
  officeAddress: z.string().max(255).optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(255).optional(),
  ogImage: z.string().url().optional(),
  gaId: z.string().max(50).optional(),
  smtpSettings: z.any().optional(),
});

// ─── Type Exports ────────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type VehicleSearchInput = z.infer<typeof vehicleSearchSchema>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;
export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryStatusInput = z.infer<typeof updateEnquiryStatusSchema>;
export type EnquiryFilterInput = z.infer<typeof enquiryFilterSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderFilterInput = z.infer<typeof orderFilterSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
