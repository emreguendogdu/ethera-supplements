"use client";

import { useState, useEffect } from "react";
import { Product, ProductBenefit } from "@/types/product";
import { supabase } from "@/lib/supabase";

type BenefitsManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
};

export default function BenefitsManager({
  product,
  onUpdate,
}: BenefitsManagerProps) {
  const [benefits, setBenefits] = useState<ProductBenefit[]>(
    product.product_benefits || []
  );

  useEffect(() => {
    setBenefits(product.product_benefits || []);
  }, [product.product_benefits]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    text: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: ProductBenefit & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      description: item.description || "",
      text: item.text || "",
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ description: "", text: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_benefits")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("product_benefits").insert({
          product_id: product.id,
          ...formData,
        });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
    } catch (error) {
      console.error("Error saving benefit:", error);
      alert("Failed to save benefit");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this benefit?")) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("product_benefits")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await onUpdate();
    } catch (error) {
      console.error("Error deleting benefit:", error);
      alert("Failed to delete benefit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Benefits Management
        </h3>
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ description: "", text: "" });
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Benefit
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="space-y-4 mb-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Text
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : editingId === "new" ? "Add" : "Update"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {benefits.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No benefits found</p>
        ) : (
          benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {benefit.description && (
                    <p className="font-medium text-gray-900 mb-1">
                      {benefit.description}
                    </p>
                  )}
                  {benefit.text && (
                    <p className="text-gray-700">{benefit.text}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() =>
                      handleEdit(benefit as ProductBenefit & { id: string })
                    }
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  {"id" in benefit && typeof benefit.id === "string" && (
                    <button
                      onClick={() => handleDelete(benefit.id as string)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
