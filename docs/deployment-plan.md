# Deployment Plan — DOORA MOBILITY Platform

This document outlines the step-by-step strategy for deploying the DOORA MOBILITY platform to a production environment. The platform utilizes a modern, serverless architecture optimized for high performance, SEO, and scalability.

---

## 1. Production Infrastructure Stack

| Component | Provider | Purpose |
|-----------|----------|---------|
| **Hosting (Frontend & API)** | Vercel | Next.js Server Components, Edge Middleware, ISR Cache |
| **Database** | Neon | Serverless PostgreSQL with connection pooling |
| **Caching & Rate Limiting**| Upstash Redis | API rate limiting for Enquiries, caching |
| **Image Storage** | Vercel Blob (or AWS S3)| Storing high-res vehicle images |
| **Email Delivery** | Custom SMTP (e.g., Resend, SendGrid) | Routing Nodemailer Enquiry emails |

---

## 2. Environment Variables Preparation

Before deploying, the production environment requires the following variables configured in Vercel:

```env
# Database (Neon PostgreSQL - Production Connection String)
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require"

# Auth (NextAuth Production Settings)
AUTH_SECRET="generate-a-strong-32-byte-secret"
AUTH_URL="https://www.dooramobility.com"

# SMTP (Production Mail Server)
SMTP_HOST="smtp.provider.com"
SMTP_PORT="465"
SMTP_USER="apikey"
SMTP_PASS="your-smtp-password"
SMTP_FROM="noreply@dooramobility.com"

# Upstash Redis (Production Instance)
UPSTASH_REDIS_REST_URL="https://your-upstash-endpoint.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="1234567890"

# Cloud Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# App & Analytics
NEXT_PUBLIC_APP_URL="https://www.dooramobility.com"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## 3. Pre-Deployment Checklist

1. **Database Migrations:** Ensure the production database is spun up in Neon and run `npx prisma db push` or `npx prisma migrate deploy` targeting the production `DATABASE_URL`.
2. **Seed Admin User:** Run a secure script to create the initial production Admin account, or manually inject the Admin credentials into the Neon database.
3. **TypeScript & Linting Check:** Run `npm run type-check` and `npm run lint` locally to ensure the build won't fail on Vercel.
4. **Environment Audit:** Double-check that no test API keys are present in the production environment variables.

---

## 4. Deployment Steps

### Step 1: Connect Repository to Vercel
1. Push the local `doora car rental` codebase to a GitHub/GitLab repository.
2. In the Vercel Dashboard, select **Add New Project** and import the repository.
3. Vercel will automatically detect the Next.js framework.

### Step 2: Configure Environment Variables
1. Before triggering the first build, paste the production environment variables (from Section 2) into the Vercel Environment Variables UI.
2. Ensure `DATABASE_URL` is set correctly for Prisma.

### Step 3: Build and Deploy
1. Click **Deploy**. Vercel will run:
   - `npm install`
   - `npx prisma generate` (via postinstall script in `package.json`)
   - `npm run build`
2. Wait for the build to complete. Verify that all Static and Server (SSR/ISR) pages compiled successfully.

### Step 4: Post-Deployment Verification
1. **Verify Public Site:** Visit the production URL. Ensure the Hero cinematic background loads, fonts are correct, and the fleet grid fetches empty (or seeded) data from Neon.
2. **Verify Admin Access:** Navigate to `/admin/login` and log in with the production Admin credentials.
3. **Verify Uploads:** Add a new vehicle from the dashboard and upload an image to test Vercel Blob integration.
4. **Verify Emails & Redis:** Submit a test enquiry on the Contact page. Ensure you receive an email (testing SMTP) and try submitting 10 times to ensure Upstash Rate Limiting blocks spam.

---

## 5. Ongoing Maintenance & CI/CD

- **Automated Deployments:** Vercel automatically deploys every push to the `main` branch.
- **Preview Environments:** Any Pull Request opened on GitHub will automatically generate a Vercel Preview URL. Use these to test UI updates before merging to `main`.
- **Database Migrations:** When updating `schema.prisma` in the future, use `npx prisma migrate dev` locally, commit the `prisma/migrations` folder, and Vercel will automatically run `npx prisma migrate deploy` during the production build (ensure the build script is configured as `"build": "prisma generate && prisma migrate deploy && next build"`).
