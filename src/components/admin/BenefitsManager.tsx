"use client";

import { useState, useEffect } from "react";
import { Product, ProductBenefit } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type BenefitsManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
  isReadOnly?: boolean;
};

export default function BenefitsManager({
  product,
  onUpdate,
  isReadOnly = false,
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
    benefit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item: ProductBenefit & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      benefit: item.benefit || "",
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ benefit: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_benefits")
          .update({ benefit: formData.benefit })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("product_benefits").insert({
          product_id: product.id,
          benefit: formData.benefit,
        });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
      toast.success(
        editingId && editingId !== "new"
          ? "Benefit updated successfully"
          : "Benefit added successfully"
      );
    } catch (error) {
      toast.error("Failed to save benefit");
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
      toast.success("Benefit deleted successfully");
    } catch (error) {
      toast.error("Failed to delete benefit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl  text-white">Benefits Management</h3>
        {!showAddForm && !isReadOnly && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ benefit: "" });
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            Add Benefit
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="space-y-6 mb-6">
            <div>
              <label
                htmlFor="benefit"
                className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
              >
                Benefit
              </label>
              <textarea
                id="benefit"
                name="benefit"
                value={formData.benefit}
                onChange={handleChange}
                placeholder="Loaded with a complete amino profile..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none resize-none"
              />
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
                ? "Add Benefit"
                : "Update Benefit"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {benefits.length === 0 ? (
          <p className="text-white/30 text-center py-8 text-sm uppercase tracking-widest ">
            No benefits found
          </p>
        ) : (
          benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 glass-panel rounded-xl group hover:border-obsidian-lighter/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {benefit.benefit && (
                    <p className="text-white/80  leading-relaxed">
                      {benefit.benefit}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {!isReadOnly && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(benefit as ProductBenefit & { id: string })
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
                      {"id" in benefit && typeof benefit.id === "string" && (
                        <button
                          onClick={() => handleDelete(benefit.id as string)}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
