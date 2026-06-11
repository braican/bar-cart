"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getPocketBaseClient } from "@/lib/pocketbase/client";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleLogin() {
    setError(null);
    setIsLoading(true);

    try {
      const pb = getPocketBaseClient();
      const redirectURL = `${window.location.origin}/`;

      await pb.collection("users").authWithOAuth2({
        provider: "google",
        urlCallback: (url) => {
          window.location.href = url;
        },
        redirectURL,
      });
    } catch {
      setError(
        "Unable to start Google sign-in. Confirm PocketBase URL and OAuth settings.",
      );
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
