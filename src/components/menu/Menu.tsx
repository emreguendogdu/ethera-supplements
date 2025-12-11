import { AnimatePresence } from "motion/react";
import React from "react";
import Logo from "../ui/Logo";

interface MenuProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function Menu({ visible, setVisible }: MenuProps) {
  if (!visible) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-999999 bg-black w-full h-full">
        <div className="flex justify-between items-center px-sectionX-m md:px-sectionX py-4">
          <Logo className="text-white" />
          <button
            className="uppercase tracking-widest cursor-pointer text-white"
            onClick={() => setVisible(false)}
          >
            Close
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}
