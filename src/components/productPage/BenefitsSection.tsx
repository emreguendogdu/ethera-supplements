"use client";

import { ProductBenefit } from "@/types/product";
import { CollapsibleSection } from "./CollapsibleSection";

interface BenefitsSectionProps {
  benefits: ProductBenefit[];
  isOpen: boolean;
  onToggle: () => void;
}

export const BenefitsSection = ({
  benefits,
  isOpen,
  onToggle,
}: BenefitsSectionProps) => {
  return (
    <CollapsibleSection title="Benefits" isOpen={isOpen} onToggle={onToggle}>
      {benefits.map((benefit, i) => (
        <p key={`bnf__${i}`}>{benefit.benefit || ""}</p>
      ))}
    </CollapsibleSection>
  );
};

