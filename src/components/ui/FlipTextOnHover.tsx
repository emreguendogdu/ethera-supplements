import { cn } from "@/utils/cn";
import { motion } from "motion/react";

const CONFIG = {
  duration: 0.25,
  ease: "easeInOut" as const,
  delay: 0.025,
};

interface FlipTextOnHoverProps {
  className?: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

const renderSplitText = (
  text: string,
  initialY: string | number,
  animatedY: string | number
) => {
  // Replace regular spaces with non-breaking spaces to preserve word separation
  const normalizedText = text.replace(/ /g, "\u00A0");
  return normalizedText.split("").map((l, i) => (
    <motion.span
      variants={{
        initial: { y: initialY },
        hovered: {
          y: animatedY,
          transition: {
            duration: CONFIG.duration,
            ease: CONFIG.ease,
            delay: CONFIG.delay * i,
          },
        },
      }}
      className="inline-block"
      key={i}
    >
      {l}
    </motion.span>
  ));
};

export const FlipTextOnHover = ({
  className,
  text,
  href,
  onClick,
}: FlipTextOnHoverProps) => {
  // Throw error if both href and onClick are provided
  if (href && onClick) {
    throw new Error(
      "FlipTextOnHover: Cannot use both `href` and `onClick` props. Use only one."
    );
  }

  // Throw error if neither href nor onClick is provided
  if (!href && !onClick) {
    throw new Error(
      "FlipTextOnHover: Must provide either `href` or `onClick` prop."
    );
  }

  const content = (
    <>
      <div>{renderSplitText(text, 0, "-100%")}</div>
      <div className="absolute inset-0">{renderSplitText(text, "100%", 0)}</div>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        initial="initial"
        whileHover="hovered"
        onClick={onClick}
        className={cn(
          "relative overflow-hidden leading-loose cursor-pointer focus:outline-none subheading text-current border border-current/50 px-5 rounded-full uppercase",
          className
        )}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={cn(
        "relative overflow-hidden leading-loose cursor-pointer focus:outline-none subheading text-current border border-current/50 px-5 rounded-full uppercase",
        className
      )}
    >
      {content}
    </motion.a>
  );
};
