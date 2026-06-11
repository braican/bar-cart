"use client";

import { getPocketBaseClient } from "@/lib/pocketbase/client";

export default function DashboardPage() {
  function handleLogout() {
    const pb = getPocketBaseClient();
    pb.authStore.clear();
    window.location.href = "/login";
  }

  return (
    <section className="surface">
      <h2 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>
        Slice A foundation is ready
      </h2>
      <p className="muted">
        Next up is Slice B: complete auth edge states and add inventory
        navigation/routes.
      </p>
      <button className="secondary-btn" type="button" onClick={handleLogout}>
        Log out
      </button>
    </section>
  );
}
