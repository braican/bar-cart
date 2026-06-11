"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/pocketbase/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useMemo(() => getCurrentUser(), []);

  function handleLogout() {
    setIsLoggingOut(true);
    logout();
    router.replace("/login");
  }

  return (
    <section className="surface">
      <h2 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>
        Welcome back
      </h2>
      <p className="muted">
        Signed in as {user?.email || user?.username || "your Google account"}.
      </p>
      <button
        className="secondary-btn"
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "Signing out..." : "Log out"}
      </button>
    </section>
  );
}
