import type { NextAuthConfig } from "next-auth";

/**
 * NextAuth Configuration (Edge Compatible).
 * This file doesn't import any Node.js APIs or Database adapters.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    // Determine if the user is allowed to access a given route
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginRoute = nextUrl.pathname === "/admin/login";

      // If trying to access login page while logged in, redirect to dashboard
      if (isLoginRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      // Secure all other /admin routes
      if (isAdminRoute) {
        if (!isLoggedIn) return false; // Redirects to login
        return true;
      }

      // Public routes are always accessible
      return true;
    },
    // Add user ID to the JWT token
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      // Handle session updates
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },
    // Expose the added token fields to the client session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
