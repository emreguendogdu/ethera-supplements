import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/utils/cn";

const panchang = localFont({
  src: [
    {
      path: "../../../public/fonts/Panchang-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Panchang-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        panchang.variable,
        "min-h-svh text-neutral-900"
      )}
      style={{ background: "#f7f6f3" }}
    >
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b border-black/10"
        style={{ background: "rgba(247, 246, 243, 0.75)" }}
      >
        <div className="px-sectionX-m md:px-sectionX h-16 flex items-center justify-between">
          <Link
            href="/"
            className="uppercase font-bold tracking-widest text-sm"
          >
            Ethera
          </Link>
          <nav className="flex items-center gap-6 text-sm uppercase tracking-wider">
            <Link href="/tools" className="hover:opacity-60 transition">
              Tools
            </Link>
            <Link href="/" className="hover:opacity-60 transition">
              Shop
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative">{children}</div>

      <footer className="border-t border-black/10 mt-24 px-sectionX-m md:px-sectionX py-12 text-sm text-neutral-600">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <p>
            &copy; 2025 Ethera. Educational content only — not medical advice.
            Consult a clinician before starting supplements.
          </p>
          <Link
            href="/"
            className="uppercase tracking-widest font-bold text-neutral-900"
          >
            Back to store
          </Link>
        </div>
      </footer>
    </div>
  );
}

export const revalidate = 604800;
