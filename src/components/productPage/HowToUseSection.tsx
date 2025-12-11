"use client";

import { motion } from "motion/react";
import { CollapsibleSection } from "./CollapsibleSection";

interface HowToUseSectionProps {
  howToUse: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const HowToUseSection = ({
  howToUse,
  isOpen,
  onToggle,
}: HowToUseSectionProps) => {
  return (
    <CollapsibleSection title="How to Use" isOpen={isOpen} onToggle={onToggle}>
      <motion.p>{howToUse}</motion.p>
    </CollapsibleSection>
  );
};






