import { User } from "@supabase/supabase-js";
import { motion } from "motion/react";
import Link from "next/link";

interface AdminHeaderProps {
  user: User | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

export default function AdminHeader({
  user,
  onSignOut,
  onSignIn,
}: AdminHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel sticky top-0 z-10 border-b-0 mb-8"
    >
      <div className="*max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-2xl tracking-wider uppercase">
                Ethera{" "}
                <span className="text-foreground/60 font-normal">
                  Supplements
                </span>
              </h1>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-12">
            <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
              {!user && (
                <span className="inline-block px-3 py-1 bg-foreground/10 text-foreground/50 text-xs rounded-full border border-foreground/20 backdrop-blur-sm">
                  Read Only Mode
                </span>
              )}
              <button
                onClick={user ? onSignOut : onSignIn}
                className="px-6 py-2 border border-foreground/30 rounded-full hover:bg-foreground/10 hover:border-foreground transition-all text-xs uppercase tracking-widest text-foreground/50 cursor-pointer"
              >
                {user ? "Sign Out" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
