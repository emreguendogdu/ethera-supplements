"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import ProductEditor from "@/components/admin/ProductEditor";
import StockManager from "@/components/admin/StockManager";
import FlavorManager from "@/components/admin/FlavorManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import BenefitsManager from "@/components/admin/BenefitsManager";
import NutritionManager from "@/components/admin/NutritionManager";
import LoginForm from "@/components/admin/LoginForm";
import "@/app/index.css";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridMode, setIsGridMode] = useState(false);

  useEffect(() => {
    checkAuth();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsLoginOpen(false);
      }
      loadProducts();
    });
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    } catch (error) {
      // Error handled silently
    } finally {
      setIsCheckingAuth(false);
      loadProducts();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSelectedProduct(null);
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      if (data.length > 0 && !selectedProduct) {
        // Select the last product by default if no product is selected
        const lastProduct = data[data.length - 1];
        setSelectedProduct(lastProduct);
      } else if (selectedProduct) {
        const updatedProduct = data.find((p) => p.id === selectedProduct.id);
        if (updatedProduct) {
          setSelectedProduct(updatedProduct);
        }
      }
    } catch (error) {
      // Error handled silently
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: updatedProduct.name,
          slug: updatedProduct.slug,
          description: updatedProduct.description,
          how_to_use: updatedProduct.how_to_use,
        })
        .eq("id", updatedProduct.id);

      if (error) throw error;

      await loadProducts();
      setSelectedProduct(updatedProduct);
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save product. Please try again."
      );
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-obsidian">
        <div className="text-white/50 animate-pulse">Loading System...</div>
      </div>
    );
  }

  if (isLoginOpen && !user) {
    return <LoginForm onCancel={() => setIsLoginOpen(false)} />;
  }

  return (
    <section
      id="admin-panel"
      className="relative min-h-svh bg-obsidian z-999 text-white font-(family-name:--font-inter)  selection:bg-obsidian-lighter selection:text-black"
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-0 z-10 border-b-0 mb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl  tracking-wider uppercase">Ethera </h1>
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
                onClick={user ? handleSignOut : () => setIsLoginOpen(true)}
                className="px-6 py-2 border border-obsidian-lighter/30 rounded-full hover:bg-obsidian-lighter/10 hover:border-obsidian-lighter transition-all text-xs uppercase tracking-widest text-obsidian-lighter"
              >
                {user ? "Sign Out" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <main className="flex-1">
          {selectedProduct ? (
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between gap-4 pb-4 border-b border-white/5"
              >
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                  {!isGridMode &&
                    products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className={`px-6 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border ${
                          selectedProduct.id === product.id
                            ? "bg-obsidian-lighter/10 border-obsidian-lighter text-obsidian-lighter neon-border-cyan"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        {product.name}
                      </button>
                    ))}
                </div>
                <button
                  onClick={() => setIsGridMode(!isGridMode)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 shrink-0 uppercase tracking-wide"
                >
                  {isGridMode ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 2H14V14H2V2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Focus View
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="5"
                          height="5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="9"
                          y="2"
                          width="5"
                          height="5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="2"
                          y="9"
                          width="5"
                          height="5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="9"
                          y="9"
                          width="5"
                          height="5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Grid View
                    </>
                  )}
                </button>
              </motion.div>

              {isGridMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
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
                          <h2 className="text-2xl  text-white tracking-wide">
                            {product.name}
                          </h2>
                          <div className="h-1 w-10 bg-obsidian-lighter mt-2 rounded-full neon-border-cyan"></div>
                        </div>
                      </div>

                      <div className="space-y-8 divide-y divide-white/5 relative z-10">
                        <div className="pt-8 first:pt-0">
                          <ProductEditor
                            product={product}
                            onUpdate={handleProductUpdate}
                            isReadOnly={!user}
                          />
                        </div>
                        {/* Other managers can be collapsed or simplified in grid view if needed, but keeping as is for now */}
                        <div className="pt-8">
                          <StockManager
                            product={product}
                            onUpdate={loadProducts}
                            isReadOnly={!user}
                          />
                        </div>
                        <div className="pt-8">
                          <FlavorManager
                            product={product}
                            onUpdate={loadProducts}
                            isReadOnly={!user}
                          />
                        </div>
                        <div className="pt-8">
                          <ReviewsManager
                            product={product}
                            onUpdate={loadProducts}
                            isReadOnly={!user}
                          />
                        </div>
                        <div className="pt-8">
                          <BenefitsManager
                            product={product}
                            onUpdate={loadProducts}
                            isReadOnly={!user}
                          />
                        </div>
                        <div className="pt-8">
                          <NutritionManager
                            product={product}
                            onUpdate={loadProducts}
                            isReadOnly={!user}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-neon-purple/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div>
                      <h2 className="text-4xl  text-white tracking-tight">
                        {selectedProduct.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
                        <span className="w-2 h-2 rounded-full bg-obsidian-lighter animate-pulse"></span>
                        Active Configuration
                      </div>
                    </div>
                  </div>

                  <div className="space-y-12 divide-y divide-white/5 relative z-10">
                    <div className="pt-12 first:pt-0">
                      <ProductEditor
                        product={selectedProduct}
                        onUpdate={handleProductUpdate}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-12">
                      <StockManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-12">
                      <FlavorManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-12">
                      <ReviewsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-12">
                      <BenefitsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-12">
                      <NutritionManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-white/50">
              <p className="text-lg  tracking-widest uppercase">
                Loading products...
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
