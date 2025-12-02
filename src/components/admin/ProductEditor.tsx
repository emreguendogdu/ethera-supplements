"use client";

import { useState } from "react";
import { Product } from "@/types/product";

type ProductEditorProps = {
  product: Product;
  onUpdate: (product: Product) => Promise<void>;
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
}: ProductEditorProps) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    slug: product.slug || "",
    description: product.description || "",
    how_to_use: product.how_to_use || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const isNewProduct = product.id === "new";

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
      console.error("Error saving product:", error);
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
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:opacity-50"
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
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving
            ? "Saving..."
            : isNewProduct
            ? "Create Product"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
