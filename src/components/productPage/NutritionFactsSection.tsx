"use client";

import { ProductNutrition } from "@/types/product";
import { CollapsibleSection } from "./CollapsibleSection";

interface NutritionFactsSectionProps {
  nutrition: ProductNutrition;
  isOpen: boolean;
  onToggle: () => void;
}

export const NutritionFactsSection = ({
  nutrition,
  isOpen,
  onToggle,
}: NutritionFactsSectionProps) => {
  const formatNutritionKey = (key: string) => {
    return key
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <CollapsibleSection
      title="Nutrition Facts"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p>
        <strong>Serving Size:</strong> {nutrition.serving_description}
      </p>
      <p className="font-bold">Nutrition Facts (per one serving)</p>
      <table className="table-auto w-full">
        <tbody>
          {Object.entries(nutrition.amount).map(([key, value]) => (
            <tr
              key={key}
              className="border-b-[0.5px] border-neutral-500 text-neutral-200"
            >
              <th className="px-4 py-2 font-medium text-left">
                {formatNutritionKey(key)}
              </th>
              <td className="px-4 py-2 text-right">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-bold">Ingredients</p>
      <p>{nutrition.ingredients}</p>
    </CollapsibleSection>
  );
};



