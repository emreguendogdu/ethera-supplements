"use client";

interface CartOverlayProps {
  onClose: () => void;
}

export const CartOverlay = ({ onClose }: CartOverlayProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="hidden md:block fixed w-full h-full bg-black opacity-75 z-40"
      onClick={onClose}
      aria-label="Close cart overlay"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  );
};


