import { supabase } from "./supabase";
import { Product } from "../types/product";

export async function getAllProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("products").select(`
      *,
      product_flavors (*),
      product_stock (*),
      product_reviews (*),
      product_benefits (*),
      product_nutrition (*),
      product_media (*)
    `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products.map((p: any) => ({
    ...p,
    glbUrl: getGlbUrl(p),
    product_reviews: p.product_reviews?.map((review: any) => ({
      ...review,
      date: review.created_at
        ? new Date(review.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    })),
    product_nutrition: p.product_nutrition || null,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_flavors (*),
      product_stock (*),
      product_reviews (*),
      product_benefits (*),
      product_nutrition (*),
      product_media (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }

  return {
    ...product,
    glbUrl: getGlbUrl(product),
    product_reviews: product.product_reviews?.map((review: any) => ({
      ...review,
      date: review.created_at
        ? new Date(review.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    })),
    product_nutrition: product.product_nutrition || null,
  };
}

function getGlbUrl(product: any): string {
  const getPublicUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const { data } = supabase.storage.from("products").getPublicUrl(path);
    return data.publicUrl;
  };

  if (product.product_media && product.product_media.length > 0) {
    const glbItem = product.product_media.find((m: any) =>
      m.storage_path.endsWith(".glb")
    );
    if (glbItem) {
      return getPublicUrl(glbItem.storage_path);
    }
  }

  if (product.slug) {
    const autoPath = `${product.slug}/product.glb`;
    return getPublicUrl(autoPath);
  }

  return "";
}
