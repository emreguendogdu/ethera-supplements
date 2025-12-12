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
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl  text-white">Nutrition Management</h3>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-xl">
        <div className="space-y-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="serving_description"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
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
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
                placeholder="30g (1 scoop)"
                disabled={isReadOnly}
              />
            </div>

            <div>
              <label
                htmlFor="serving_size"
                className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
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
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
                placeholder="30"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
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
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none font-mono text-sm leading-relaxed text-white/80"
              placeholder='{"calories": 100, "protein": 25, "carbs": 5}'
              disabled={isReadOnly}
            />
            <p className="mt-2 text-[10px] text-neutral-500 uppercase tracking-wide">
              Format: JSON object (e.g., "calories": 120)
            </p>
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Ultra-filtered Whey Protein Isolate (milk)..."
              required
              rows={4}
              disabled={isReadOnly}
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          {!isReadOnly && (
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-obsidian-lighter text-black font-semibold uppercase tracking-wider text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : nutrition && (nutrition as any).id
                ? "Update Nutrition"
                : "Save Nutrition"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
