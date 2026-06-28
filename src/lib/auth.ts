import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/auth";

// ─── Auth Helpers — DOORA MOBILITY ───────────────────────────────

/**
 * Get the current server session.
 * Returns null if not authenticated.
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current session admin.
 * Returns null if not authenticated.
 */
export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session?.user?.email) return null;

  const admin = await db.admin.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return admin;
}

/**
 * Require admin authentication. Redirects to login if not authenticated.
 * Use in admin route handlers and server components.
 */
export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}

/**
 * Check if the current user is an admin (non-throwing).
 */
export async function isAdmin(): Promise<boolean> {
  const admin = await getCurrentAdmin();
  return !!admin;
}
