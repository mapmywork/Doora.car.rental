# DOORA MOBILITY — Full Stack Next.js Car Rental Platform Prompt

## Project Overview

Build a **production-ready, enterprise-grade full stack car rental management platform** for **DOORA MOBILITY**.

This is **not a simple brochure website**.

It should be a complete SaaS-style application with:

* Public Customer Website
* Secure Admin Dashboard
* Backend APIs
* Authentication
* Database
* File Uploads
* Email Enquiries
* WhatsApp Bookings
* Vehicle Management
* Order Management
* Inquiry Management
* SEO Optimized
* Mobile First

Think like a **Senior Product Designer, Senior UI/UX Designer, Senior Full Stack Next.js Engineer, and SaaS Architect.**

---

# Tech Stack

Use only these technologies.

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Shadcn UI
* Lucide Icons
* React Hook Form
* Zod
* SwiperJS

---

## Backend

* Next.js Route Handlers
* Server Actions
* Prisma ORM
* Neon PostgreSQL
* Upstash Redis
* Upstash Rate Limiting
* Nodemailer SMTP
* Sharp (Image Optimization)

---

## Authentication

* Auth.js (NextAuth)
* Credentials Login
* JWT Session

Admin only login.

No customer authentication required.

---

# Folder Structure

```text
app/
│
├── (customer)/
│   ├── page.tsx
│   ├── fleet/
│   ├── vehicle/
│   ├── about/
│   ├── contact/
│   ├── faq/
│
├── admin/
│   ├── dashboard/
│   ├── vehicles/
│   ├── enquiries/
│   ├── orders/
│   ├── settings/
│   ├── login/
│
├── api/
│
├── actions/
│
├── lib/
│
├── components/
│
├── hooks/
│
├── prisma/
│
├── types/
│
├── utils/
│
├── emails/
│
├── schemas/
│
└── middleware.ts
```

---

# Brand Theme

Use the uploaded DOORA MOBILITY logo as the design foundation.

## Theme Colors

Primary

Deep Black

```
#111111
```

Accent

Premium Red

```
#E31B23
```

White

```
#FFFFFF
```

Light Grey

```
#F6F6F6
```

Dark Grey

```
#2A2A2A
```

---

The entire customer website should match the logo perfectly.

Inspired by

* Tesla
* Audi
* Porsche
* BMW
* SIXT
* Hertz
* Enterprise
* Uber Black

Minimal

Luxury

Premium

Fast

Modern

Corporate

---

# Typography

Heading

Space Grotesk

Body

Inter

Buttons

Manrope

---

# Customer Website

The customer website is mostly static.

All vehicle data comes from the backend.

No customer login.

Everything should be optimized for SEO.

---

# Pages

Home

Fleet

Vehicle Details

About

Contact

FAQs

Privacy Policy

Terms

---

# Navbar

Logo

Fleet

About

Contact

FAQs

Book Now

Sticky while scrolling.

Transparent initially.

Glass effect on scroll.

---

# Hero Section

Luxury cinematic background.

Black luxury vehicle.

Road animation.

Motion blur.

Headline

## Your Door To Every Destination

Subheading

Premium self-drive and chauffeur-driven vehicles for business trips, airport transfers, family vacations, weddings, and outstation journeys.

Buttons

Explore Fleet

Book on WhatsApp

---

# Fleet Section

Fetch dynamically from backend.

Each card includes

Vehicle Image

Vehicle Name

Brand

Transmission

Fuel Type

Seats

Luggage

Price Per Day

Availability

Book Now

View Details

Hover animation

Smooth elevation

Premium shadows

---

# Vehicle Details Page

Large gallery

Specifications

Features

Pricing

Description

Included

Excluded

Book via WhatsApp

Send Enquiry

Related Vehicles

---

# Why Choose Us

Premium Fleet

Verified Vehicles

24×7 Support

Fast Booking

Transparent Pricing

Well Maintained Cars

Professional Service

Doorstep Delivery

---

# Booking Flow

No payment gateway.

Clicking Book Now

Opens WhatsApp with vehicle information automatically.

Example

Vehicle

Pickup Date

Drop Date

Customer Name

Phone

Message

Generate the WhatsApp message dynamically.

---

# Contact Form

Customer submits

Name

Phone

Email

Vehicle

Message

Send email using SMTP.

Also save enquiry in database.

Show success toast.

---

# Footer

Quick Links

Fleet

Contact

WhatsApp

Email

Social Links

Copyright

---

# Admin Dashboard

Secure login only.

Dashboard Overview

Vehicles

Orders

Enquiries

Settings

Logout

---

# Dashboard Home

Statistics Cards

Total Vehicles

Available

Booked

Orders

Pending Enquiries

Monthly Enquiries

Charts

Latest Orders

Recent Enquiries

---

# Vehicle Management

CRUD

Add Vehicle

Edit Vehicle

Delete Vehicle

Upload Images

Status

Available

Booked

Maintenance

Fields

Name

Brand

Slug

Price

Description

Features

Seats

Transmission

Fuel

Luggage

Images

Featured

Availability

---

# Orders

Bookings happen manually through WhatsApp.

Admin creates order manually after customer confirms.

Order fields

Customer Name

Phone

Vehicle

Pickup Date

Drop Date

Status

Notes

Payment Status

Assigned Driver

Pickup Location

Drop Location

---

Status

Pending

Confirmed

Running

Completed

Cancelled

---

# Enquiry Management

Every enquiry from website gets stored.

Admin can

View

Reply

Delete

Convert enquiry to order

Search

Filter

Export CSV

---

# Settings

Business Information

WhatsApp Number

Email

Office Address

SEO

Meta Title

Meta Description

OG Image

Google Analytics

SMTP Settings

---

# Database Models

Admin

Vehicle

VehicleImage

Enquiry

Order

Settings

---

# Prisma Models

Vehicle

VehicleImage

Enquiry

Order

Admin

BusinessSettings

---

# API Routes

GET Vehicles

GET Vehicle

POST Vehicle

PATCH Vehicle

DELETE Vehicle

POST Enquiry

POST Order

Dashboard Stats

---

# Search

Global Search

Vehicle Search

Brand

Fuel

Transmission

Seats

Price

---

# SEO

Dynamic Metadata

Open Graph

Twitter Cards

Robots

Sitemap

JSON-LD

Lazy Images

Image Optimization

ISR

---

# Animations

Framer Motion

Page transitions

Fade Up

Stagger

Hover lift

Card zoom

Image reveal

Counters

Parallax

Smooth scrolling

Loading skeletons

---

# Responsive

Desktop

Laptop

Tablet

Mobile

Everything pixel-perfect.

---

# Environment Variables

Create a `.env.example` file with placeholders.

```env
# Database
DATABASE_URL=

# Auth
AUTH_SECRET=
AUTH_URL=

# SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=

# Cloud Storage (optional)
BLOB_READ_WRITE_TOKEN=

# App
NEXT_PUBLIC_APP_URL=

# Analytics
NEXT_PUBLIC_GA_ID=
```

---

# Performance

* Server Components where possible
* Client Components only when required
* Image optimization
* Lazy loading
* Code splitting
* Dynamic imports
* ISR for fleet pages
* Edge Middleware
* Redis caching
* Optimized Prisma queries

---

# UI/UX Goal

The finished product should feel like a premium automotive SaaS platform rather than a template. The customer-facing website should reflect the DOORA MOBILITY logo with a bold black, white, and red identity, using clean typography, large cinematic imagery, smooth microinteractions, and luxury spacing. The admin dashboard should be modern, efficient, and intuitive, enabling fast management of vehicles, enquiries, and manually created WhatsApp orders with an excellent user experience.
