"use client";

import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";

type ProductEditorProps = {
  product: Product;
  onUpdate: (product: Product) => Promise<void>;
  isReadOnly?: boolean;
};

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function ProductEditor({
  product,
  onUpdate,
  isReadOnly = false,
}: ProductEditorProps) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    slug: product.slug || "",
    description: product.description || "",
    how_to_use: product.how_to_use || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      how_to_use: product.how_to_use || "",
    });
  }, [product.id]);

  const originalData = useMemo(
    () => ({
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      how_to_use: product.how_to_use || "",
    }),
    [
      product.id,
      product.name,
      product.slug,
      product.description,
      product.how_to_use,
    ]
  );

  const hasChanges = useMemo(() => {
    return (
      formData.name !== originalData.name ||
      formData.slug !== originalData.slug ||
      formData.description !== originalData.description ||
      formData.how_to_use !== originalData.how_to_use
    );
  }, [formData, originalData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({ ...prev, name: value, slug: generatedSlug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onUpdate({
        ...product,
        ...formData,
      });
    } catch (error) {
      // Error handled by parent component
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl  text-white">General Information</h3>
        <div className="h-[1px] flex-1 bg-white/10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              placeholder="Whey Isolate"
              disabled={isReadOnly}
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              pattern="[a-z0-9-]+"
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              placeholder="whey-isolate"
              disabled={isReadOnly}
            />
            <p className="mt-2 text-[10px] text-neutral-500 uppercase tracking-wide">
              Lowercase letters, numbers, and hyphens only.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
          >
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none resize-none"
            placeholder="Peak purity for maximum growth."
            disabled={isReadOnly}
          />
        </div>

        <div>
          <label
            htmlFor="how_to_use"
            className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
          >
            How to Use
          </label>
          <textarea
            id="how_to_use"
            name="how_to_use"
            value={formData.how_to_use}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none resize-none"
            placeholder="Mix 1 scoop..."
            disabled={isReadOnly}
          />
        </div>

        <div className="flex justify-end pt-4">
          {!isReadOnly && (
            <button
              type="submit"
              disabled={isSaving || !hasChanges}
              className="px-8 py-3 bg-obsidian-lighter text-black font-semibold uppercase tracking-wider text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
