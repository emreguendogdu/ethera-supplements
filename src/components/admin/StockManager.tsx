"use client";

import { useState, useEffect } from "react";
import { Product, ProductStock } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type StockManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
  isReadOnly?: boolean;
};

export default function StockManager({
  product,
  onUpdate,
  isReadOnly = false,
}: StockManagerProps) {
  const [stockItems, setStockItems] = useState<ProductStock[]>(
    product.product_stock || []
  );

  useEffect(() => {
    setStockItems(product.product_stock || []);
  }, [product.product_stock]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    size: 0,
    price: 0,
    sale_price: 0,
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleEdit = (item: ProductStock & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      size: item.size,
      price: item.price,
      sale_price: item.sale_price,
      stock: item.stock,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ size: 0, price: 0, sale_price: 0, stock: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_stock")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("product_stock").insert({
          product_id: product.id,
          ...formData,
        });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
      toast.success(
        editingId && editingId !== "new"
          ? "Stock item updated successfully"
          : "Stock item added successfully"
      );
    } catch (error) {
      toast.error("Failed to save stock item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this stock item?")) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("product_stock")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await onUpdate();
      toast.success("Stock item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete stock item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl  text-white">Stock Management</h3>
        {!showAddForm && !isReadOnly && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ size: 0, price: 0, sale_price: 0, stock: 0 });
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            Add Stock Item
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
                htmlFor="size"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Size (g)
              </label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="sale_price"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
              >
                Sale Price ($)
              </label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
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
                ? "Add Item"
                : "Update Item"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {stockItems.length === 0 ? (
          <p className="text-white/30 text-center py-8 text-sm uppercase tracking-widest ">
            No stock items configured
          </p>
        ) : (
          stockItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 glass-panel rounded-xl group hover:border-obsidian-lighter/30 transition-colors"
            >
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                    Size
                  </span>
                  <p className="text-sm  text-white">{item.size}g</p>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                    Price
                  </span>
                  <p className="text-sm  text-white">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                    Sale Price
                  </span>
                  <p className="text-sm  text-white-50">
                    ${item.sale_price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
                    Stock
                  </span>
                  <p
                    className={`text-sm  ${
                      item.stock === 0 ? "text-red-500" : "text-white"
                    }`}
                  >
                    {item.stock} units
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                {!isReadOnly && (
                  <>
                    <button
                      onClick={() =>
                        handleEdit(item as ProductStock & { id: string })
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
                    {"id" in item && typeof item.id === "string" && (
                      <button
                        onClick={() => handleDelete(item.id as string)}
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
