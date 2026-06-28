# DOORA MOBILITY Phase-Wise Implementation Plan

This plan outlines the systematic transformation of the codebase to meet the **DOORA MOBILITY** specifications. The implementation is broken down into 5 sequential phases to ensure a stable, enterprise-grade transition.

---

## Phase 1: Database & Backend Foundation
**Goal:** Restructure the data layer to remove customer authentication, strip out payment gateways, and establish the new business models.

1. **Delete Obsolete Models:** Remove `User`, `Booking`, `Payment`, `Location`, and `Availability` from `schema.prisma`.
2. **Create New Schema:**
   - Add `Admin` (Credentials login).
   - Add `Vehicle` and `VehicleImage` (Rich specs and media).
   - Add `Enquiry` (Contact/Quote requests).
   - Add `Order` (Manual WhatsApp bookings).
   - Add `BusinessSettings` (SEO, WhatsApp numbers, SMTP).
3. **Database Migration:** Run `prisma db push` to initialize the new schema and generate the Prisma Client.
4. **Auth & API Cleansing:** 
   - Restrict NextAuth strictly to the `/admin` routes.
   - Delete Razorpay/Stripe API endpoints.
   - Set up foundational Route Handlers for the new schema (`/api/vehicles`, `/api/enquiries`, `/api/orders`).
5. **Seed Data:** Create a default Admin user and sample luxury vehicles to facilitate frontend development.

---

## Phase 2: Design System & UI Architecture
**Goal:** Establish the luxury brand identity, typography, and component library.

1. **Global Styling:**
   - Update `tailwind.config.ts` with brand colors: Deep Black (`#111111`), Premium Red (`#E31B23`), White (`#FFFFFF`), Light Grey (`#F6F6F6`).
   - Configure global fonts: Space Grotesk (Headings), Inter (Body), Manrope (Buttons).
2. **Component Library Setup:**
   - Initialize Shadcn UI and integrate required primitives (Buttons, Cards, Inputs, Toasts, Dialogs).
   - Set up Framer Motion for global page transitions and micro-interactions.
3. **Layout Overhaul:**
   - Build the Customer root layout (`app/(customer)/layout.tsx`) featuring a sticky, glass-effect Navbar and a comprehensive Footer.
   - Build the Admin root layout (`app/admin/layout.tsx`) featuring a sidebar and topbar.

---

## Phase 3: Public Customer Website
**Goal:** Build the high-performance, SEO-optimized public-facing pages.

1. **Home Page (`/`):**
   - Cinematic Hero Section with road animation and motion blur.
   - Dynamic Fleet Carousel (fetching from DB).
   - "Why Choose Us" section.
2. **Fleet Page (`/fleet`):**
   - Grid layout of all vehicles.
   - Hover animations, premium shadows, and clear pricing/specs.
3. **Vehicle Details Page (`/vehicle/[slug]`):**
   - Large image gallery using SwiperJS.
   - Detailed specifications and features list.
   - Integration of the **"Book on WhatsApp"** button (client-side generation of the WhatsApp URL).
4. **Static Pages:**
   - Build `/about`, `/contact` (with a functioning Nodemailer enquiry form), `/faq`, `/privacy-policy`, and `/terms`.

---

## Phase 4: Admin Dashboard
**Goal:** Provide a secure interface for business owners to manage the platform.

1. **Dashboard Home:**
   - KPI Statistics Cards (Total Vehicles, Available, Orders, Pending Enquiries).
   - Recent activity lists.
2. **Vehicle Management:**
   - Complete CRUD interfaces to Add/Edit/Delete vehicles.
   - Image upload handling.
3. **Order Management:**
   - Interface to manually create and track Orders resulting from WhatsApp bookings.
   - Status toggles (Pending, Confirmed, Running, Completed, Cancelled).
4. **Enquiries & Settings:**
   - Data tables to view and reply to customer enquiries.
   - Settings page to manage the global WhatsApp number, SMTP credentials, and SEO meta tags.

---

## Phase 5: Polish, Animations & SEO
**Goal:** Elevate the application to a "SaaS-architected" premium standard.

1. **Framer Motion Integration:**
   - Add staggered fade-ups for fleet grids.
   - Add hover lift effects to vehicle cards.
   - Implement loading skeletons during data fetches.
2. **Performance Optimization:**
   - Enforce proper React Server Components vs Client Components separation.
   - Configure Incremental Static Regeneration (ISR) for public vehicle pages.
   - Set up `next/image` with Sharp for high-performance asset loading.
3. **SEO Implementation:**
   - Generate dynamic `metadata` for Open Graph and Twitter Cards.
   - Add structured JSON-LD data for vehicles.
   - Automatically generate `sitemap.xml` and `robots.txt`.
4. **Rate Limiting:**
   - Implement Upstash Redis rate limiting on the `/api/enquiries` route to prevent spam.
