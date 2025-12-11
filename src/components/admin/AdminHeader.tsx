import { User } from "@supabase/supabase-js";
import { motion } from "motion/react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl tracking-wider uppercase">Ethera</h1>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-xs text-white/50 tracking-[0.2em] uppercase">
              Control Panel v2.0
            </span>
          </div>
          <div className="flex items-center gap-4">
            {!user && (
              <span className="hidden sm:inline-block px-3 py-1 bg-obsidian-lighter/10 text-obsidian-lighter text-xs rounded-full border border-obsidian-lighter/20 backdrop-blur-sm">
                Read Only Mode
              </span>
            )}
            <button
              onClick={user ? onSignOut : onSignIn}
              className="px-6 py-2 border border-obsidian-lighter/30 rounded-full hover:bg-obsidian-lighter/10 hover:border-obsidian-lighter transition-all text-xs uppercase tracking-widest text-obsidian-lighter"
            >
              {user ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
