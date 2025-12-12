"use client";

import { useState, useEffect } from "react";
import { Product, ProductFlavor } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type FlavorManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
  isReadOnly?: boolean;
};

export default function FlavorManager({
  product,
  onUpdate,
  isReadOnly = false,
}: FlavorManagerProps) {
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
        const { error } = await supabase.from("product_flavors").insert({
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
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl  text-white">Flavor Management</h3>
        {!showAddForm && !isReadOnly && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ name: "", color: "#000000" });
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            Add Flavor
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Flavor Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
                placeholder="Chocolate"
              />
            </div>

            <div>
              <label
                htmlFor="color"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Color
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="h-12 w-12 border-none p-0 rounded-lg overflow-hidden cursor-pointer bg-transparent"
                  />
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                </div>
                <input
                  type="text"
                  value={formData.color}
                  onChange={handleChange}
                  name="color"
                  className="flex-1 px-4 py-3 rounded-lg glass-input focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-obsidian-lighter text-black font-semibold uppercase tracking-wider text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : editingId === "new"
                ? "Add Flavor"
                : "Update Flavor"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {flavors.length === 0 ? (
          <p className="text-white/30 text-center py-8 text-sm uppercase tracking-widest ">
            No flavors configured
          </p>
        ) : (
          flavors.map((flavor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 glass-panel rounded-xl group hover:border-obsidian-lighter/30 transition-colors"
            >
              <div className="flex items-center space-x-6">
                <div
                  className="w-12 h-12 rounded-lg border border-white/10 shadow-lg"
                  style={{ backgroundColor: flavor.color }}
                />
                <div>
                  <p className=" text-white text-lg tracking-wide">
                    {flavor.name}
                  </p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {flavor.color}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {!isReadOnly && (
                  <>
                    <button
                      onClick={() =>
                        handleEdit(flavor as ProductFlavor & { id: string })
                      }
                      className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70"
                      title="Edit"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                    {"id" in flavor && typeof flavor.id === "string" && (
                      <button
                        onClick={() => handleDelete(flavor.id as string)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                        title="Delete"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
