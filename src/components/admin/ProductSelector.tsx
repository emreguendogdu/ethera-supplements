import { Product } from "@/types/product";

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product) => void;
  isGridMode: boolean;
}

export default function ProductSelector({
  products,
  selectedProduct,
  onSelect,
  isGridMode,
}: ProductSelectorProps) {
  if (isGridMode) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelect(product)}
          className={`px-6 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border ${
            selectedProduct?.id === product.id
              ? "bg-obsidian-lighter/10 border-obsidian-lighter text-foreground-50 neon-border-cyan"
              : "bg-foreground/5 border-foreground/10 text-foreground/60 hover:bg-foreground/10 hover:border-foreground/20"
          }`}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
}
