import { cache } from "react";
import { supabase } from "./supabase";
import { Product } from "../types/product";

export const getAllProducts = cache(async (): Promise<Product[]> => {
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
    return [];
  }

  const mappedProducts = products.map((p: any) => {
    const glbUrl = getGlbUrl(p);
    return {
      ...p,
      glbUrl,
      product_reviews: p.product_reviews?.map((review: any) => ({
        ...review,
        date: review.created_at
          ? new Date(review.created_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      })),
      product_nutrition: p.product_nutrition || null,
    };
  });

  return mappedProducts;
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
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
);

function getGlbUrl(product: any): string {
  const getPublicUrl = (path: string) => {
    if (!path) {
      return "";
    }
    if (path.startsWith("http")) {
      return path;
    }
    const { data } = supabase.storage.from("products").getPublicUrl(path);
    return data.publicUrl;
  };

  if (product.product_media && product.product_media.length > 0) {
    const glbItem = product.product_media.find((m: any) =>
      m.storage_path.endsWith(".glb")
    );
    if (glbItem) {
      const url = getPublicUrl(glbItem.storage_path);
      return url;
    }
  }

  if (product.slug) {
    const autoPath = `${product.slug}/product.glb`;
    const url = getPublicUrl(autoPath);
    return url;
  }

  return "";
}
