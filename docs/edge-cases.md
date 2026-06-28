# Edge Cases & Corner Scenarios — DOORA MOBILITY Platform (LIVING DOCUMENT)

> This document catalogs all edge cases, corner scenarios, and boundary conditions that must be handled across the DOORA MOBILITY platform. Each scenario includes the expected behavior and recommended handling strategy. This is a living document and will be updated as the platform evolves.

---

## 1. WhatsApp Booking Edge Cases

### 1.1 Booking Initiation vs. Completion

| Scenario | Expected Behavior |
|----------|-------------------|
| **User clicks "Book on WhatsApp" but abandons the chat** | The system does not create an `Order` yet. The vehicle remains fully available. The Admin only creates an `Order` when they receive and confirm a manual message from the customer. |
| **Customer sends WhatsApp message from a different phone number** | The Admin must ask for the customer's name and manually map it to the generated text, ensuring the `Order` record reflects the correct contact details. |
| **Two users message the Admin simultaneously for the same vehicle/dates** | The Admin acts as the concurrency lock. The Admin decides which customer gets the booking, creates the `Order` in the dashboard, and manually informs the other customer that the vehicle is no longer available. |
| **WhatsApp App is not installed on the user's device** | The `wa.me` link natively handles this by falling back to WhatsApp Web on desktops, or prompting to download the app on mobile devices. |

### 1.2 Date & Time Boundaries

| Scenario | Expected Behavior |
|----------|-------------------|
| **Admin creates an Order with dates in the past** | Allow this. Admins may need to retroactively log a booking that happened over the phone or walk-in. |
| **Admin creates an Order that overlaps with an existing Order** | The dashboard should show a strict **Conflict Warning** ("This vehicle is already booked for these dates"). However, the system should *allow* the admin to override it in case they are upgrading the customer to a different car but haven't updated the old order yet. |
| **Booking spans across months/years (e.g., Dec 30 → Jan 5)** | The Admin dashboard calendar and availability filters must correctly query across month boundaries when displaying available vehicles. |

---

## 2. Enquiry Edge Cases

### 2.1 Spam & Rate Limiting

| Scenario | Expected Behavior |
|----------|-------------------|
| **Bot submits 100 enquiries in 1 minute** | Upstash Redis Rate Limiting intercepts requests at the Next.js Edge Middleware. Enforce a strict limit (e.g., 5 requests per IP per minute). Return `429 Too Many Requests`. |
| **User submits Enquiry form twice rapidly (double-click)** | React Hook Form disables the submit button immediately upon first click. |
| **Extremely long name/email/message input** | Enforce max lengths via Zod schema (name ≤ 100 chars, message ≤ 1000 chars). Truncate or reject safely to prevent database overflow. |

### 2.2 Nodemailer & SMTP Failures

| Scenario | Expected Behavior |
|----------|-------------------|
| **SMTP Server (Nodemailer) is down or credentials expire** | The `Enquiry` MUST still be saved to the Neon PostgreSQL database. Do not fail the user request. Log the SMTP error silently, and show a success toast to the user: "Your enquiry has been received." |
| **User's email address is malformed** | Zod catches invalid email formats client-side before the server action fires. |

---

## 3. Authentication & Admin Edge Cases

### 3.1 Admin Access

| Scenario | Expected Behavior |
|----------|-------------------|
| **Customer navigates to `/admin/dashboard` manually** | Next.js Middleware detects missing JWT session and instantly redirects to `/admin/login` with no flash of content. |
| **Admin session expires while they are creating a new Order** | Intercept the `401 Unauthorized` response from the Server Action. Store the draft order in `localStorage` or React State, redirect to login, and restore state upon successful re-login. |
| **Admin tries to delete the only Admin account in the database** | Prevent deletion. The API must check if `count(Admins) > 1` before allowing a deletion. Return: "Cannot delete the last remaining admin account." |

---

## 4. Vehicle & Fleet Edge Cases

### 4.1 Vehicle Data Visibility

| Scenario | Expected Behavior |
|----------|-------------------|
| **Admin marks a vehicle as `isAvailable = false` (Maintenance)** | The vehicle is hidden from the public `/fleet` page. However, existing `Orders` attached to this vehicle remain intact. |
| **Vehicle has no images uploaded** | The public website shows a branded placeholder (DOORA MOBILITY logo on a deep black background). Do not show broken image icons. |
| **Admin updates price while user is viewing the Vehicle Details page** | Since bookings are manual via WhatsApp, the user will send the old price in the pre-filled text. The Admin must manually inform the user of the price change during the chat. |

### 4.2 Caching & ISR (Incremental Static Regeneration)

| Scenario | Expected Behavior |
|----------|-------------------|
| **Admin updates a vehicle, but the public `/fleet` page shows old data** | The Next.js Route Handler for updating vehicles must call `revalidatePath('/fleet')` and `revalidatePath('/vehicle/[slug]')` to purge the static cache immediately. |
| **Upstash Redis goes down** | Rate limiting will fail open (allow requests) to prevent the site from breaking, but log the error heavily. |

---

## 5. Performance & Infrastructure Edge Cases

### 5.1 Image Optimization (Sharp)

| Scenario | Expected Behavior |
|----------|-------------------|
| **Admin uploads a massive 50MB RAW image** | Validate size client-side (max 5MB). Server-side, `next/image` handles WebP conversion and resizing. Large uploads are rejected before hitting the database. |
| **Image CDN is temporarily slow** | Use Next.js image `blurDataURL` (a tiny base64 placeholder) to ensure the UI structure holds while the high-res image loads. |

### 5.2 Server & Database

| Scenario | Expected Behavior |
|----------|-------------------|
| **Neon PostgreSQL connection pool exhausted** | Neon serverless Postgres handles pooling natively, but Prisma should be configured with a reasonable pool limit (`connection_limit=10`). |
| **Vercel Serverless Function cold start** | The customer website uses Server Components and ISR, meaning pages are served from the Edge CDN instantly. Cold starts only affect the Admin API routes, which is acceptable for back-office use. |

---

## 6. UI/UX & Design Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| **User zooms to 200%+** | The Tailwind layout must remain usable. Text must not overflow cards. The Navbar must still allow access to all links. |
| **Very long vehicle name (e.g. "Mercedes-Benz G-Class AMG G 63 4MATIC")** | Truncate the name with an ellipsis (`truncate` class) on the fleet grid cards, but show the full name on the vehicle detail page. |
| **Browser doesn't support modern CSS features** | Ensure fallbacks. If `backdrop-blur` fails, the Navbar must have a solid Deep Black (`#111111`) background to maintain readability. |

---

## Summary: Priority Matrix

| Priority | Category | Count |
|----------|----------|-------|
| 🔴 **Critical** | WhatsApp concurrency, Admin auth security, SMTP fallback | ~10 |
| 🟡 **High** | ISR revalidation, Rate Limiting, Order date conflicts | ~8 |
| 🟢 **Medium** | Form validation, Image sizes, Database connection | ~8 |
| 🔵 **Low** | UI edge cases (zoom, long names, CSS fallbacks) | ~5 |

> **Total: ~31 edge cases** cataloged across 6 categories.
