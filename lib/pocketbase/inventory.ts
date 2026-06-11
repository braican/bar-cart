"use client";

import type { RecordModel } from "pocketbase";
import { getCurrentUser } from "@/lib/pocketbase/auth";
import { getPocketBaseClient } from "@/lib/pocketbase/client";

export type InventoryItem = RecordModel & {
  owner: string;
  name: string;
  category?: string;
  brand?: string;
  volume_ml?: number;
  quantity?: number;
  notes?: string;
};

export type InventoryInput = {
  name: string;
  category?: string;
  brand?: string;
  volume_ml?: number;
  quantity?: number;
  notes?: string;
};

function requireUserId(): string {
  const user = getCurrentUser();
  if (!user?.id) {
    throw new Error("You must be signed in to manage inventory.");
  }
  return user.id;
}

export async function listInventoryItems(): Promise<InventoryItem[]> {
  const pb = getPocketBaseClient();
  return pb.collection("inventory_items").getFullList<InventoryItem>({
    sort: "-updated",
  });
}

export async function createInventoryItem(
  input: InventoryInput,
): Promise<InventoryItem> {
  const pb = getPocketBaseClient();
  const owner = requireUserId();

  return pb.collection("inventory_items").create<InventoryItem>({
    owner,
    ...input,
  });
}

export async function updateInventoryItem(
  id: string,
  input: InventoryInput,
): Promise<InventoryItem> {
  const pb = getPocketBaseClient();

  return pb.collection("inventory_items").update<InventoryItem>(id, input);
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const pb = getPocketBaseClient();
  await pb.collection("inventory_items").delete(id);
}
