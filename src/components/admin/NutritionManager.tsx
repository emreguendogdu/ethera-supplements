"use client";

import { useState, useEffect } from "react";
import { Product, ProductNutrition } from "@/types/product";
import { supabase } from "@/lib/supabase";

type NutritionManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
};

export default function NutritionManager({
  product,
  onUpdate,
}: NutritionManagerProps) {
  const [nutritionItems, setNutritionItems] = useState<ProductNutrition[]>(
    product.product_nutrition || []
  );

  useEffect(() => {
    setNutritionItems(product.product_nutrition || []);
  }, [product.product_nutrition]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    serving_size_description: "",
    serving_size: 0,
    amount: "{}",
    ingredients: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "serving_size" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleEdit = (item: ProductNutrition & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      serving_size_description: item.serving_size_description,
      serving_size: item.serving_size,
      amount:
        typeof item.amount === "string"
          ? item.amount
          : JSON.stringify(item.amount),
      ingredients: item.ingredients,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      serving_size_description: "",
      serving_size: 0,
      amount: "{}",
      ingredients: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let parsedAmount;
      try {
        parsedAmount = JSON.parse(formData.amount);
      } catch {
        parsedAmount = {};
      }

      const dataToSave = {
        ...formData,
        amount: parsedAmount,
      };

      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_nutrition")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("product_nutrition").insert({
          product_id: product.id,
          ...dataToSave,
        });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
    } catch (error) {
      console.error("Error saving nutrition:", error);
      alert("Failed to save nutrition data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this nutrition data?"))
      return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("product_nutrition")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await onUpdate();
    } catch (error) {
      console.error("Error deleting nutrition:", error);
      alert("Failed to delete nutrition data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Nutrition Management
        </h3>
        {!showAddForm && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({
                serving_size_description: "",
                serving_size: 0,
                amount: "{}",
                ingredients: "",
              });
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Nutrition Data
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="serving_size_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Serving Size Description
                </label>
                <input
                  type="text"
                  id="serving_size_description"
                  name="serving_size_description"
                  value={formData.serving_size_description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="serving_size"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Serving Size (g)
                </label>
                <input
                  type="number"
                  id="serving_size"
                  name="serving_size"
                  value={formData.serving_size}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount (JSON)
              </label>
              <textarea
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                placeholder='{"calories": 100, "protein": 25, "carbs": 5}'
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter nutrition amounts as JSON object
              </p>
            </div>

            <div>
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
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
        {nutritionItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No nutrition data found
          </p>
        ) : (
          nutritionItems.map((nutrition, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <span className="text-xs text-gray-500">
                        Serving Size
                      </span>
                      <p className="font-medium">
                        {nutrition.serving_size_description} (
                        {nutrition.serving_size}g)
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Amount</span>
                      <p className="font-mono text-sm">
                        {typeof nutrition.amount === "string"
                          ? nutrition.amount
                          : JSON.stringify(nutrition.amount)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Ingredients</span>
                    <p className="text-gray-700">{nutrition.ingredients}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() =>
                      handleEdit(nutrition as ProductNutrition & { id: string })
                    }
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  {"id" in nutrition && typeof nutrition.id === "string" && (
                    <button
                      onClick={() => handleDelete(nutrition.id as string)}
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
