"use client";

import { ProductFlavor } from "@/types/product";

interface FlavorSelectorProps {
  flavors: ProductFlavor[];
  selectedFlavor: string;
  onFlavorChange: (flavorName: string) => void;
}

export const FlavorSelector = ({
  flavors,
  selectedFlavor,
  onFlavorChange,
}: FlavorSelectorProps) => {
  return (
    <div className="flex flex-col">
      {flavors.map((flavor, i) => (
        <div key={`flvr_${i}`}>
          <input
            type="radio"
            id={flavor.name}
            name="flavor"
            value={flavor.name}
            className="hidden peer"
            onInput={(e) =>
              onFlavorChange((e.target as HTMLInputElement).value)
            }
            defaultChecked={i === 0}
          />
          <label
            htmlFor={flavor.name}
            className="inline-flex items-center gap-2 justify-between pr-2 w-fit rounded-lg cursor-pointer hover:text-[var(--color)] peer-checked:text-[var(--color)] text-neutral-500 hover:bg-neutral-900"
            style={{ "--color": flavor.color } as React.CSSProperties}
          >
            <div
              className="w-3 h-3"
              style={{ backgroundColor: flavor.color }}
            />
            <p className="w-full uppercase font-bold">{flavor.name}</p>
          </label>
        </div>
      ))}
    </div>
  );
};







