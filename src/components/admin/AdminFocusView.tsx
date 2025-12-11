import { motion } from "motion/react";
import { Product } from "@/types/product";
import { User } from "@supabase/supabase-js";
import ProductEditor from "./ProductEditor";
import StockManager from "./StockManager";
import FlavorManager from "./FlavorManager";
import ReviewsManager from "./ReviewsManager";
import BenefitsManager from "./BenefitsManager";
import NutritionManager from "./NutritionManager";

interface AdminFocusViewProps {
  product: Product;
  user: User | null;
  onUpdate: (product: Product) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export default function AdminFocusView({
  product,
  user,
  onUpdate,
  onRefresh,
}: AdminFocusViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-b from-neon-purple/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-12 relative z-10">
        <div>
          <h2 className="text-4xl text-white tracking-tight">{product.name}</h2>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <span className="w-2 h-2 rounded-full bg-obsidian-lighter animate-pulse"></span>
            Active Configuration
          </div>
        </div>
      </div>

      <div className="space-y-12 divide-y divide-white/5 relative z-10">
        <div className="pt-12 first:pt-0">
          <ProductEditor
            product={product}
            onUpdate={onUpdate}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-12">
          <StockManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-12">
          <FlavorManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-12">
          <ReviewsManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-12">
          <BenefitsManager
            product={product}
            onUpdate={onRefresh}
            isReadOnly={!user}
          />
        </div>
        <div className="pt-12">
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
