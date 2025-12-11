import Link from "next/link";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "subheading text-center uppercase hover:text-neutral-200 text-neutral-500 transition-all tracking-[0.2em]",
        className
      )}
    >
      Ethera<sup>®</sup>
    </Link>
  );
}
