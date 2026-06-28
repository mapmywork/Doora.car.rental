# DOORA MOBILITY Phase-Wise Implementation Plan

This plan outlines the systematic transformation of the codebase to meet the **DOORA MOBILITY** specifications. The implementation is broken down into 5 sequential phases to ensure a stable, enterprise-grade transition.

---

## Phase 1: Database & Backend Foundation
**Status:** ✅ COMPLETED

- [x] **Delete Obsolete Models:** Remove `User`, `Booking`, `Payment`, `Location`, and `Availability` from `schema.prisma`.
- [x] **Create New Schema:** Added `Admin`, `Vehicle`, `VehicleImage`, `Enquiry`, `Order`, and `BusinessSettings`. Updated `Order` to include `email`.
- [x] **Database Migration:** Ran `prisma db push` to initialize the new schema and generate the Prisma Client.
- [x] **Auth & API Cleansing:** 
   - Restricted NextAuth strictly to the `/admin` routes.
   - Deleted Razorpay/Stripe API endpoints.
   - Set up foundational Route Handlers for the new schema.
- [x] **Seed Data:** Created a default Admin user and seeded sample vehicles and dummy orders to facilitate frontend development.

---

## Phase 2: Design System & UI Architecture
**Status:** ✅ COMPLETED

- [x] **Global Styling:**
   - Updated `tailwind.config.ts` with brand colors (Deep Black, Premium Red, White, Light Grey).
   - Configured global fonts (Space Grotesk, Inter, Manrope).
- [x] **Component Library Setup:**
   - Initialized Shadcn UI (Buttons, Cards, Inputs).
   - Set up Framer Motion for global page transitions.
- [x] **Layout Overhaul:**
   - Built the Customer root layout (`app/(customer)/layout.tsx`) featuring a sticky, glass-effect Navbar and Footer.
   - Built the Admin root layout (`app/admin/layout.tsx`) with sidebar and topbar.

---

## Phase 3: Public Customer Website
**Status:** 🟡 IN PROGRESS

- [x] **Home Page (`/`):**
   - Cinematic Hero Section with road animation and motion blur.
   - Search/Filter section added.
   - Dynamic Fleet display.
- [x] **Fleet Page (`/fleet`):**
   - Grid layout of all vehicles.
- [ ] **Vehicle Details Page (`/vehicle/[slug]`):**
   - Large image gallery using SwiperJS.
   - Detailed specifications and features list.
   - Integration of the **"Book on WhatsApp"** button.
- [ ] **Static Pages:**
   - Build `/about`, `/contact` (with a functioning Nodemailer enquiry form), `/faq`, `/privacy-policy`, and `/terms`.

---

## Phase 4: Admin Dashboard
**Status:** 🟡 IN PROGRESS

- [x] **Dashboard Home:** KPI Statistics Cards and recent activity lists.
- [x] **Vehicle Management:**
   - Complete CRUD interfaces to Add/Edit/Delete vehicles.
- [x] **Order Management:**
   - Interface to manually create Orders.
   - Order listings and statuses.
   - Configured **SMTP Email Confirmations** via Nodemailer.
- [ ] **Enquiries & Settings:**
   - Data tables to view and reply to customer enquiries.
   - Settings page to manage global WhatsApp number and SEO meta tags dynamically.

---

## Phase 5: Polish, Animations & SEO
**Status:** ⏳ PENDING

- [ ] **Framer Motion Integration:**
   - Add staggered fade-ups for fleet grids.
   - Add hover lift effects to vehicle cards.
   - Implement loading skeletons during data fetches.
- [ ] **Performance Optimization:**
   - Enforce proper React Server Components vs Client Components separation.
   - Configure Incremental Static Regeneration (ISR) for public vehicle pages.
   - Set up `next/image` with Sharp for high-performance asset loading.
- [ ] **SEO Implementation:**
   - Generate dynamic `metadata` for Open Graph and Twitter Cards.
   - Add structured JSON-LD data for vehicles.
   - Automatically generate `sitemap.xml` and `robots.txt`.
- [ ] **Rate Limiting:**
   - Implement Upstash Redis rate limiting on the `/api/enquiries` route to prevent spam.
