"use client";

import PocketBase from "pocketbase";

let pbInstance: PocketBase | null = null;

export function getPocketBaseClient(): PocketBase {
  if (!pbInstance) {
    const baseUrl =
      process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";
    pbInstance = new PocketBase(baseUrl);
  }

  return pbInstance;
}
