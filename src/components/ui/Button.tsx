"use client";

import { motion, useTransform, useTime } from "motion/react";
import Link from "next/link";

type ButtonProps = {
  text?: string;
  href?: string;
  className?: string;
  wrapperClassName?: string;
  type?: "link" | "button";
  onClick?: () => void;
  style?: "animated" | "static";
};

export default function Button({
  text = "Shop Now",
  href = "/products/",
  className = "",
  wrapperClassName = "",
  type = "link",
  onClick = () => {},
  style = "animated",
}: ButtonProps) {
  const time = useTime();

  const rotate = useTransform(time, [0, 4500], [0, 360], {
    clamp: false,
  });
  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, #ffffff, #000000, #000000, #000000, #ffffff)`;
  });

  return (
    <div className={`relative w-full ${wrapperClassName}`}>
      {type === "link" ? (
        <Link className={`button ${className}`} href={href}>
          {text}
        </Link>
      ) : (
        <button
          className={`button focus:outline-none ${className}`}
          onClick={onClick}
        >
          {text}
        </button>
      )}
      <motion.div
        className="absolute -inset-[1px] rounded-md"
        style={{
          background:
            style === "animated"
              ? rotatingBg
              : "conic-gradient(#ffffff, #000000, #ffffff, #000000, #ffffff)",
        }}
      />
    </div>
  );
}
