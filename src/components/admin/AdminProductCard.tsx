import { motion } from "motion/react";
import { Product } from "@/types/product";
import { User } from "@supabase/supabase-js";
import ProductEditor from "./ProductEditor";
import StockManager from "./StockManager";
import FlavorManager from "./FlavorManager";
import ReviewsManager from "./ReviewsManager";
import BenefitsManager from "./BenefitsManager";
import NutritionManager from "./NutritionManager";

interface AdminProductCardProps {
  product: Product;
  user: User | null;
  index: number;
  onUpdate: (product: Product) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export default function AdminProductCard({
  product,
  user,
  index,
  onUpdate,
  onRefresh,
}: AdminProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel rounded-2xl p-8 h-fit relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="w-20 h-20 rounded-full bg-obsidian-lighter blur-2xl"></div>
      </div>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-2xl text-white tracking-wide">{product.name}</h2>
          <div className="h-1 w-10 bg-obsidian-lighter mt-2 rounded-full neon-border-cyan"></div>
        </div>
      </div>

      <div className="space-y-8 divide-y divide-white/5 relative z-10">
        <div className="pt-8 first:pt-0">
          <ProductEditor
            product={product}
            onUpdate={onUpdate}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-8">
          <StockManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-8">
          <FlavorManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-8">
          <ReviewsManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-8">
          <BenefitsManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-8">
          <NutritionManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
      </div>
    </motion.div>
  );
}
