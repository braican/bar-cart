"use client";

import type { RecordModel } from "pocketbase";
import { getPocketBaseClient } from "@/lib/pocketbase/client";

export type AuthChangeListener = (isAuthenticated: boolean) => void;

export function isAuthenticated(): boolean {
  const pb = getPocketBaseClient();
  return pb.authStore.isValid;
}

export function getCurrentUser(): RecordModel | null {
  const pb = getPocketBaseClient();
  return pb.authStore.record;
}

export function subscribeToAuthChanges(
  listener: AuthChangeListener,
): () => void {
  const pb = getPocketBaseClient();
  return pb.authStore.onChange(() => listener(pb.authStore.isValid));
}

export async function loginWithGoogle(): Promise<void> {
  const pb = getPocketBaseClient();
  await pb.collection("users").authWithOAuth2({
    provider: "google",
  });
}

export function logout(): void {
  const pb = getPocketBaseClient();
  pb.authStore.clear();
}
