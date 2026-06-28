"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xl border border-border p-8">
        <div className="mb-8 text-center">
          <h1 className="font-space-grotesk text-3xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-foreground/60 font-inter mt-2">Sign in to manage DOORA MOBILITY</p>
        </div>

        <form action={formAction} className="space-y-6 font-inter">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@dooramobility.com"
                required
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg text-destructive flex items-center">
              {errorMessage}
            </div>
          )}

          <SubmitButton />
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center justify-center gap-1">
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
}
