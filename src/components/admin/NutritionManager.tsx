"use client";

import { useState, useEffect } from "react";
import { Product, ProductNutrition } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type NutritionManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
  isReadOnly?: boolean;
};

export default function NutritionManager({
  product,
  onUpdate,
  isReadOnly = false,
}: NutritionManagerProps) {
  const nutrition = product.product_nutrition;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    serving_description: nutrition?.serving_description || "",
    serving_size: nutrition?.serving_size || 0,
    amount:
      nutrition && typeof nutrition.amount === "string"
        ? nutrition.amount
        : nutrition && typeof nutrition.amount === "object"
        ? JSON.stringify(nutrition.amount)
        : "{}",
    ingredients: nutrition?.ingredients || "",
  });

  useEffect(() => {
    if (nutrition) {
      setFormData({
        serving_description: nutrition.serving_description,
        serving_size: nutrition.serving_size,
        amount:
          typeof nutrition.amount === "string"
            ? nutrition.amount
            : JSON.stringify(nutrition.amount),
        ingredients: nutrition.ingredients,
      });
    } else {
      setFormData({
        serving_description: "",
        serving_size: 0,
        amount: "{}",
        ingredients: "",
      });
    }
  }, [nutrition]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "serving_size" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const parseAmount = (value: string): Record<string, string | number> => {
    if (!value.trim()) return {};

    try {
      return JSON.parse(value);
    } catch {
      try {
        const cleaned = value
          .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]");
        return JSON.parse(cleaned);
      } catch (error) {
        throw new Error(
          'Invalid JSON format. Please use valid JSON syntax with quoted keys, e.g., {"calories": 120, "protein": "24g"}'
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const parsedAmount = parseAmount(formData.amount);

      const dataToSave = {
        ...formData,
        amount: parsedAmount,
      };

      if (nutrition && (nutrition as any).id) {
        const { error } = await supabase
          .from("product_nutrition")
          .update(dataToSave)
          .eq("id", (nutrition as any).id);

        if (error) throw error;
        toast.success("Nutrition data updated successfully");
      } else {
        const { error } = await supabase.from("product_nutrition").insert({
          product_id: product.id,
          ...dataToSave,
        });

        if (error) throw error;
        toast.success("Nutrition data added successfully");
      }

      await onUpdate();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save nutrition data";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Nutrition Management
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
      >
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="serving_description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Serving Description
              </label>
              <input
                type="text"
                id="serving_description"
                name="serving_description"
                value={formData.serving_description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="30g (1 scoop)"
                disabled={isReadOnly}
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
                placeholder="30"
                disabled={isReadOnly}
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
              disabled={isReadOnly}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter nutrition amounts as JSON object (keys can be unquoted,
              e.g., calories: 120 or "calories": 120)
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
              placeholder="Ultra-filtered Whey Protein Isolate (milk), Natural and Artificial Flavors, Sunflower Lecithin, Stevia Leaf Extract, Salt."
              required
              rows={4}
              disabled={isReadOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end">
          {!isReadOnly && (
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading
                ? "Saving..."
                : nutrition && (nutrition as any).id
                ? "Update"
                : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
