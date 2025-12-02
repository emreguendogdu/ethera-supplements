"use client";

import { useState, useEffect } from "react";
import { Product, ProductStock } from "@/types/product";
import { supabase } from "@/lib/supabase";

type StockManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
};

export default function StockManager({ product, onUpdate }: StockManagerProps) {
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
    } catch (error) {
      console.error("Error saving stock:", error);
      alert("Failed to save stock item");
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
    } catch (error) {
      console.error("Error deleting stock:", error);
      alert("Failed to delete stock item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Stock Management
        </h3>
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({ size: 0, price: 0, sale_price: 0, stock: 0 });
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Stock Item
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="sale_price"
                className="block text-sm font-medium text-gray-700 mb-1"
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
        {stockItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No stock items found</p>
        ) : (
          stockItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-500">Size</span>
                  <p className="font-medium">{item.size}g</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Price</span>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Sale Price</span>
                  <p className="font-medium">${item.sale_price.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Stock</span>
                  <p
                    className={`font-medium ${
                      item.stock === 0 ? "text-red-600" : ""
                    }`}
                  >
                    {item.stock}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() =>
                    handleEdit(item as ProductStock & { id: string })
                  }
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                {(() => {
                  const itemWithId = item as ProductStock & { id?: string };
                  if (!itemWithId.id) return null;
                  return (
                    <button
                      onClick={() => handleDelete(itemWithId.id!)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  );
                })()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
