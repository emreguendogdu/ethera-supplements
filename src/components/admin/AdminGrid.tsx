import { Product } from "@/types/product";
import { User } from "@supabase/supabase-js";
import AdminProductCard from "./AdminProductCard";

interface AdminGridProps {
  products: Product[];
  user: User | null;
  onUpdate: (product: Product) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export default function AdminGrid({
  products,
  user,
  onUpdate,
  onRefresh,
}: AdminGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <AdminProductCard
          key={product.id}
          product={product}
          user={user}
          index={index}
          onUpdate={onUpdate}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}


