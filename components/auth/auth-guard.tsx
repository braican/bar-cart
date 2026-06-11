"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { getPocketBaseClient } from "@/lib/pocketbase/client";

export function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const pb = getPocketBaseClient();

    setIsAuthenticated(pb.authStore.isValid);

    const removeListener = pb.authStore.onChange(() => {
      setIsAuthenticated(pb.authStore.isValid);
    });

    setIsReady(true);
    return removeListener;
  }, []);

  useEffect(() => {
    if (isReady && !isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, pathname, router]);

  if (!isReady) {
    return <div className="page-shell">Loading your bar cart...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
