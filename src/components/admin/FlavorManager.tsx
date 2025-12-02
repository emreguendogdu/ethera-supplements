"use client";

import { useState, useEffect } from "react";
import { Product, ProductFlavor } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type FlavorManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
};

export default function FlavorManager({ product, onUpdate }: FlavorManagerProps) {
  const [flavors, setFlavors] = useState<ProductFlavor[]>(
    product.product_flavors || []
  );

  useEffect(() => {
    setFlavors(product.product_flavors || []);
  }, [product.product_flavors]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    color: "#000000",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: ProductFlavor & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      name: item.name,
      color: item.color,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ name: "", color: "#000000" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_flavors")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("product_flavors")
          .insert({
            product_id: product.id,
            ...formData,
          });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
      toast.success(
        editingId && editingId !== "new"
          ? "Flavor updated successfully"
          : "Flavor added successfully"
      );
    } catch (error) {
      toast.error("Failed to save flavor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flavor?")) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("product_flavors")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await onUpdate();
      toast.success("Flavor deleted successfully");
    } catch (error) {
      toast.error("Failed to delete flavor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Flavor Management</h3>
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ name: "", color: "#000000" });
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Flavor
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Flavor Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={handleChange}
                  name="color"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
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
        {flavors.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No flavors found</p>
        ) : (
          flavors.map((flavor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-md border border-gray-300"
                  style={{ backgroundColor: flavor.color }}
                />
                <div>
                  <p className="font-medium text-gray-900">{flavor.name}</p>
                  <p className="text-xs text-gray-500">{flavor.color}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(flavor as ProductFlavor & { id: string })}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                {"id" in flavor && typeof flavor.id === "string" && (
                  <button
                    onClick={() => handleDelete(flavor.id as string)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

