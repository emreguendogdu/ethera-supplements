import { supabase } from "./supabase";

export interface DiscountCode {
  id: string;
  code: string;
  discount: number;
  expires_at?: string;
  created_at: string;
}

export async function getDiscountByCode(code: string): Promise<DiscountCode | null> {
  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error) {
    return null;
  }

  if (data && data.expires_at && new Date(data.expires_at) < new Date()) {
    return null; // Expired
  }

  return data;
}

export async function getPublicDiscountCode(): Promise<DiscountCode | null> {
  // Fetch a default public code, e.g., "ETHERA" or just the first valid one
  // For now, let's assume we want the one with code "ETHERA" or any active one
  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", "ETHERA") // Or logic to find 'featured' code
    .maybeSingle();
    
  if (error || !data) return null;
  return data;
}

