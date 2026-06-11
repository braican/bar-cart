"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { isAuthenticated, subscribeToAuthChanges } from "@/lib/pocketbase/auth";

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(isAuthenticated());

    const removeListener = subscribeToAuthChanges((nextIsAuthenticated) => {
      setHasSession(nextIsAuthenticated);
    });

    setIsReady(true);
    return removeListener;
  }, []);

  useEffect(() => {
    if (isReady && !hasSession && pathname !== "/login") {
      router.replace("/login");
    }
  }, [hasSession, isReady, pathname, router]);

  if (!isReady) {
    return <div className="page-shell">Loading your bar cart...</div>;
  }

  if (!hasSession) {
    return null;
  }

  return <>{children}</>;
}
