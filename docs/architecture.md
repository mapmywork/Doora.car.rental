# Architecture — DOORA MOBILITY Platform

> Derived from [context.md](file:///Users/iamprince/Desktop/doora%20car%20rental/docs/context.md)

---

## 1. Overview

**DOORA MOBILITY** is a premium, enterprise-grade car rental management platform designed as a SaaS-style application. It features a luxury public-facing customer website optimized for SEO and performance, paired with a secure admin dashboard for managing fleet, enquiries, and orders. Instead of an automated checkout process, it provides a white-glove, high-touch booking experience where reservations are initiated via WhatsApp or email, and subsequently managed manually by admins.

---

## 2. High-Level Architecture

```mermaid
graph TB
    subgraph Client["Frontend (Next.js App Router)"]
        HP[Customer Site]
        FP[Fleet / Details]
        CF[Contact / Enquiries]
        WA[WhatsApp Redirects]
        AD[Admin Dashboard]
    end

    subgraph API["Backend API (Next.js Route Handlers)"]
        VA[Vehicle API]
        EA[Enquiry API]
        OA[Order API]
        AA[Admin Auth API]
    end

    subgraph Data["Data Layer"]
        DB[(Neon PostgreSQL)]
        CACHE[(Upstash Redis)]
    end

    subgraph External["External Services"]
        SMTP[Nodemailer SMTP]
        WA_APP[WhatsApp API/Client]
    end

    Client -->|REST / Server Actions| API
    Client -->|External Link| WA_APP
    API --> DB
    API --> CACHE
    API --> SMTP
```

---

## 3. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Server Components, SEO optimization, ISR |
| **Language** | TypeScript | Full-stack type safety |
| **UI & Styling** | Tailwind CSS, Shadcn UI | Utility-first, accessible, premium design system |
| **Animations** | Framer Motion | Fluid, cinematic micro-interactions (page transitions, hover lifts) |
| **Database** | Neon PostgreSQL | Serverless, scalable relational database |
| **ORM** | Prisma | Schema management, migrations, type-safe queries |
| **Caching & Rate Limit** | Upstash Redis | API rate limiting and edge caching |
| **Auth** | NextAuth.js (Auth.js) | JWT session management for Admin |
| **Forms & Validation**| React Hook Form, Zod | Client and server-side validation |
| **Email** | Nodemailer | Sending enquiry confirmations via custom SMTP |
| **Image Optimization**| Sharp | High-performance image processing |

---

## 4. Project Structure

```text
doora-mobility/
├── docs/                          # Documentation
│   ├── context.md
│   └── architecture.md
├── public/                        # Static assets (Logos, icons)
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (customer)/            # Public Pages (No Auth)
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── fleet/page.tsx     # Fleet grid
│   │   │   ├── vehicle/
│   │   │   │   └── [slug]/page.tsx# Vehicle details
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── faq/page.tsx
│   │   ├── admin/                 # Secure Admin Pages
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── vehicles/page.tsx
│   │   │   ├── enquiries/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── login/page.tsx
│   │   ├── api/                   # Route Handlers
│   │   │   ├── vehicles/route.ts
│   │   │   ├── enquiries/route.ts
│   │   │   └── orders/route.ts
│   │   └── middleware.ts          # Edge middleware (Auth & Rate limiting)
│   ├── actions/                   # Next.js Server Actions
│   ├── components/                # React Components
│   │   ├── ui/                    # Shadcn primitives
│   │   ├── customer/              # Customer-facing blocks (Hero, Navbar)
│   │   └── admin/                 # Admin dashboard blocks (Sidebar, Charts)
│   ├── lib/                       # Utility clients (Prisma, Redis, Nodemailer)
│   ├── hooks/                     # Custom React Hooks
│   ├── prisma/                    # Schema and Migrations
│   ├── schemas/                   # Zod validation schemas
│   ├── types/                     # Shared TypeScript types
│   └── emails/                    # Email templates
```

---

## 5. Data Model

```mermaid
erDiagram
    ADMIN {
        uuid id PK
        string email UK
        string name
        string passwordHash
        datetime createdAt
    }

    VEHICLE {
        uuid id PK
        string name
        string brand
        string slug UK
        decimal price
        string description
        json features
        int seats
        string transmission
        string fuel
        int luggage
        boolean featured
        boolean isAvailable
        datetime createdAt
    }

    VEHICLE_IMAGE {
        uuid id PK
        uuid vehicleId FK
        string url
        boolean isPrimary
    }

    ENQUIRY {
        uuid id PK
        string name
        string phone
        string email
        string vehicle
        string message
        enum status "NEW | READ | REPLIED | CONVERTED"
        datetime createdAt
    }

    ORDER {
        uuid id PK
        string customerName
        string phone
        string vehicle
        datetime pickupDate
        datetime dropDate
        enum status "PENDING | CONFIRMED | RUNNING | COMPLETED | CANCELLED"
        string notes
        enum paymentStatus "PENDING | PAID | PARTIAL"
        string assignedDriver
        string pickupLocation
        string dropLocation
        datetime createdAt
    }

    BUSINESS_SETTINGS {
        int id PK
        string whatsappNumber
        string email
        string officeAddress
        string metaTitle
        string metaDescription
        string ogImage
        string gaId
        json smtpSettings
    }

    VEHICLE ||--o{ VEHICLE_IMAGE : has
```

---

## 6. Core User Flows

### 6.1 WhatsApp Booking Flow (Customer)

```mermaid
flowchart LR
    A[Vehicle Details Page] --> B[Click 'Book on WhatsApp']
    B --> C[Generate Pre-filled Message]
    C --> D[Redirect to WhatsApp App/Web]
    D --> E[Customer Sends Message]
    E --> F[Admin Receives & Creates Order]
```

### 6.2 Enquiry Flow (Customer)

```mermaid
flowchart LR
    A[Contact / Vehicle Page] --> B[Fill Enquiry Form]
    B --> C[Server Action Validates Zod Schema]
    C --> D[Save Enquiry to DB]
    D --> E[Send Email via Nodemailer]
    E --> F[Show Success Toast]
```

### 6.3 Order Management (Admin)

```mermaid
flowchart LR
    A[Admin Dashboard] --> B[View New WhatsApp Message / Enquiry]
    B --> C[Negotiate / Confirm with Customer]
    C --> D[Create Manual Order in System]
    D --> E[Update Order Status to 'Confirmed']
    E --> F[Assign Driver & Locations]
```

---

## 7. Design & UI/UX Goal

The design system enforces a **premium automotive SaaS** aesthetic mimicking brands like Tesla, Audi, and SIXT.

- **Theme Colors:** Deep Black (`#111111`), Premium Red (`#E31B23`), Crisp White (`#FFFFFF`).
- **Typography:** Space Grotesk (Headings), Inter (Body), Manrope (Buttons).
- **Animations:** High-end motion design via Framer Motion (lazy-loaded cinematic road animations, soft card elevations, page transitions).
- **SEO & Performance:** Heavily relies on React Server Components, ISR (Incremental Static Regeneration) for the fleet pages, lazy-loaded images (`next/image` + Sharp), and dynamic JSON-LD metadata for optimal Core Web Vitals.
