"use client";

import { ProductStock } from "@/types/product";

interface SizeSelectorProps {
  stockData: ProductStock[];
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

export const SizeSelector = ({
  stockData,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) => {
  const handleSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSizeChange(Number(e.target.value));
  };

  return (
    <div className="flex border border-separate border-neutral-900 w-fit">
      {stockData.map((stock, i) => (
        <div key={`sz_${i}`}>
          <input
            type="radio"
            id={String(stock.size)}
            name="size"
            value={stock.size}
            className="hidden peer"
            onInput={handleSizeInput}
            defaultChecked={i === 0}
          />
          <label
            htmlFor={String(stock.size)}
            className="inline-flex px-2 py-2 w-fit cursor-pointer hover:text-neutral-300 border border-separate border-neutral-800 peer-checked:text-white text-neutral-400 hover:bg-neutral-900"
          >
            <p className="w-full uppercase font-bold">{stock.size}g</p>
          </label>
        </div>
      ))}
    </div>
  );
};


