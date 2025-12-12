"use client";

import { motion } from "motion/react";

interface DiscountInputProps {
  isVisible: boolean;
  discountCode: string;
  onShow: () => void;
  onHide: () => void;
  onCodeChange: (value: string) => void;
}

export const DiscountInput = ({
  isVisible,
  discountCode,
  onShow,
  onHide,
  onCodeChange,
}: DiscountInputProps) => {
  return (
    <div className="relative flex-1 h-full flex items-end justify-start">
      <motion.button
        className="absolute text-neutral-500 cursor-pointer"
        animate={{
          opacity: isVisible ? 0 : 1,
          display: isVisible ? "none" : "block",
        }}
        onClick={onShow}
        aria-label="Enter promotion code"
      >
        Use promotion code...
      </motion.button>
      <div className="flex gap-2 items-center absolute bottom-0">
        <motion.input
          className="text-neutral-200 p-2 rounded-lg focus:border-none focus:outline-none bg-transparent"
          animate={{
            opacity: isVisible ? 1 : 0,
            display: isVisible ? "block" : "none",
          }}
          type="text"
          placeholder="Enter code..."
          value={discountCode}
          onChange={(e) => onCodeChange(e.target.value)}
          disabled
          aria-label="Promotion code input"
        />
        <div className="flex items-end gap-2">
          <motion.button
            onClick={onHide}
            animate={{
              opacity: isVisible ? 1 : 0,
              display: isVisible ? "block" : "none",
            }}
            aria-label="Cancel promotion code"
          >
            ×
          </motion.button>
          <motion.button
            animate={{
              opacity: isVisible ? 1 : 0,
              display: isVisible ? "block" : "none",
            }}
            className="text-neutral-500"
            aria-label="Apply promotion code"
          >
            ✓
          </motion.button>
        </div>
      </div>
    </div>
  );
};








