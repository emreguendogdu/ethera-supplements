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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:opacity-50"
          placeholder="Whey Isolate"
          disabled={isReadOnly}
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700 mb-2"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:opacity-50"
          placeholder="whey-isolate"
          disabled={isReadOnly}
        />
        <p className="mt-1 text-xs text-gray-500">
          Lowercase letters, numbers, and hyphens only. (e.g: whey-isolate)
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Short Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:opacity-50"
          placeholder="Peak purity for maximum growth."
          disabled={isReadOnly}
        />
      </div>

      <div>
        <label
          htmlFor="how_to_use"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          How to Use
        </label>
        <textarea
          id="how_to_use"
          name="how_to_use"
          value={formData.how_to_use}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:opacity-50"
          placeholder="Mix 1 scoop (30g) with 250ml of cold water or milk. Consume 1-2 servings daily. Ideally taken immediately post-workout to kickstart recovery, or between meals to hit protein targets."
          disabled={isReadOnly}
        />
      </div>

      <div className="flex justify-end">
        {!isReadOnly && (
          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </form>
  );
}
