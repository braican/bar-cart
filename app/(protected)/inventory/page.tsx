"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  createInventoryItem,
  deleteInventoryItem,
  InventoryInput,
  InventoryItem,
  listInventoryItems,
  updateInventoryItem,
} from "@/lib/pocketbase/inventory";

const emptyForm: InventoryInput = {
  name: "",
  category: "",
  brand: "",
  volume_ml: undefined,
  quantity: 1,
  notes: "",
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [form, setForm] = useState<InventoryInput>(emptyForm);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadInventory();
  }, []);

  async function loadInventory() {
    setError(null);
    setIsLoading(true);

    try {
      const records = await listInventoryItems();
      setItems(records);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load inventory.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingItemId(null);
  }

  function startEditing(item: InventoryItem) {
    setEditingItemId(item.id);
    setForm({
      name: item.name || "",
      category: item.category || "",
      brand: item.brand || "",
      volume_ml: item.volume_ml,
      quantity: item.quantity || 1,
      notes: item.notes || "",
    });
  }

  const submitLabel = useMemo(
    () => (editingItemId ? "Save changes" : "Add bottle"),
    [editingItemId],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.name?.trim()) {
      setError("Bottle name is required.");
      return;
    }

    if ((form.quantity || 0) < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    setIsSaving(true);

    try {
      const payload: InventoryInput = {
        name: form.name.trim(),
        category: form.category?.trim() || undefined,
        brand: form.brand?.trim() || undefined,
        volume_ml: form.volume_ml || undefined,
        quantity: form.quantity || 1,
        notes: form.notes?.trim() || undefined,
      };

      if (editingItemId) {
        await updateInventoryItem(editingItemId, payload);
      } else {
        await createInventoryItem(payload);
      }

      await loadInventory();
      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save inventory item.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Remove this bottle from your inventory?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError(null);

    try {
      await deleteInventoryItem(id);
      setItems((current) => current.filter((item) => item.id !== id));

      if (editingItemId === id) {
        resetForm();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete inventory item.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="inventory-grid">
      <article className="surface">
        <h2 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>
          Your inventory
        </h2>
        <p className="muted">
          Track what is in your bar and keep your recommendations accurate.
        </p>

        {isLoading ? <p className="muted">Loading inventory...</p> : null}

        {!isLoading && items.length === 0 ? (
          <p className="muted">
            No bottles yet. Add your first item to get started.
          </p>
        ) : null}

        {!isLoading && items.length > 0 ? (
          <ul className="inventory-list">
            {items.map((item) => (
              <li key={item.id} className="inventory-row">
                <div>
                  <h3>{item.name}</h3>
                  <p className="muted">
                    {[item.category, item.brand].filter(Boolean).join(" • ") ||
                      "Uncategorized"}
                  </p>
                  <p className="muted">
                    {item.quantity || 1} bottle
                    {(item.quantity || 1) > 1 ? "s" : ""}
                    {item.volume_ml ? ` • ${item.volume_ml}ml` : ""}
                  </p>
                </div>
                <div className="inventory-actions">
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => startEditing(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                  >
                    {deletingId === item.id ? "Removing..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </article>

      <article className="surface">
        <h2 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>
          {editingItemId ? "Edit bottle" : "Add bottle"}
        </h2>
        <form className="inventory-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name || ""}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="e.g. London Dry Gin"
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={form.category || ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
              placeholder="Gin, Rum, Whiskey..."
            />
          </label>

          <label>
            Brand
            <input
              type="text"
              value={form.brand || ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  brand: event.target.value,
                }))
              }
            />
          </label>

          <div className="inventory-inline-fields">
            <label>
              Volume (ml)
              <input
                type="number"
                min={0}
                step={1}
                value={form.volume_ml || ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    volume_ml: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  }))
                }
              />
            </label>

            <label>
              Quantity
              <input
                type="number"
                min={1}
                step={1}
                value={form.quantity || 1}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    quantity: Number(event.target.value || 1),
                  }))
                }
              />
            </label>
          </div>

          <label>
            Notes
            <textarea
              value={form.notes || ""}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  notes: event.target.value,
                }))
              }
              rows={3}
              placeholder="Optional tasting notes or details"
            />
          </label>

          <div className="inventory-actions">
            <button className="primary-btn" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : submitLabel}
            </button>
            {editingItemId ? (
              <button
                className="secondary-btn"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            ) : null}
          </div>

          {error ? (
            <p style={{ color: "#b84747", marginBottom: 0 }}>{error}</p>
          ) : null}
        </form>
      </article>
    </section>
  );
}
