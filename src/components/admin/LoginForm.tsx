"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onCancel?: () => void;
}

export default function LoginForm({ onCancel }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      if (data.user) {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-svh flex items-center justify-center bg-obsidian text-white">
      <div className="max-w-md w-full glass-panel rounded-2xl p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-neon-purple blur-3xl translate-x-10 -translate-y-10"></div>
        </div>

        <div className="mb-12 relative z-10">
          <h1 className="text-3xl  text-white mb-3 tracking-wide">
            Access{" "}
            <span className="text-obsidian-lighter neon-text-cyan font-normal">
              Control
            </span>
          </h1>
          <p className="text-xs text-white/50 uppercase tracking-widest">
            Identity Verification Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-xs tracking-wide">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              placeholder="admin@ethera.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-obsidian-lighter text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50 disabled:shadow-none uppercase tracking-wider text-xs"
          >
            {isLoading ? "Authenticating..." : "Initialize Session"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full mt-2 px-4 py-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-wider"
            >
              Return to Preview
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
