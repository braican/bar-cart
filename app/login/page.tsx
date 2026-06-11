"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  isAuthenticated,
  loginWithGoogle,
  subscribeToAuthChanges,
} from "@/lib/pocketbase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
      return;
    }

    const unsubscribe = subscribeToAuthChanges((hasSession) => {
      if (hasSession) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, [router]);

  async function handleGoogleLogin() {
    setError(null);
    setIsLoading(true);

    try {
      await loginWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : null;
      setError(
        message ||
          "Unable to start Google sign-in. Confirm PocketBase URL and OAuth settings.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="app-header">
        <div>
          <h1 className="brand">Bar Cart</h1>
          <p className="tagline">Your fancy bartender companion.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="surface">
        <h2 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>
          Sign in
        </h2>
        <p className="muted">
          Use Google to access your private bar inventory and personalized
          assistant.
        </p>
        <button
          className="primary-btn"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Continue with Google"}
        </button>
        {error ? <p style={{ color: "#b84747" }}>{error}</p> : null}
      </section>
    </main>
  );
}
