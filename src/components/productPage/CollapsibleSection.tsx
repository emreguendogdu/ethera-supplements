"use client";

import { CaretDown } from "@/components/ui/Icons";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) => {
  return (
    <li className="w-full">
      <div
        className="w-full flex justify-between items-start cursor-pointer mb-2"
        onClick={onToggle}
      >
        <p className="font-bold uppercase">{title}</p>
        <CaretDown
          className={`text-xl transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && <div className="flex flex-col gap-2">{children}</div>}
    </li>
  );
};







