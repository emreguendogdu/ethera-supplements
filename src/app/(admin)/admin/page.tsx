"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { motion } from "motion/react";
import LoginForm from "@/components/admin/LoginForm";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductSelector from "@/components/admin/ProductSelector";
import ViewToggle from "@/components/admin/ViewToggle";
import AdminGrid from "@/components/admin/AdminGrid";
import AdminFocusView from "@/components/admin/AdminFocusView";
import "@/app/index.css";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridMode, setIsGridMode] = useState(false);
  const { isMobile } = useDeviceSize();
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

  useEffect(() => {
    if (!isMobile) {
      setIsGridMode(true);
    } else {
      setIsGridMode(false);
    }
  }, [isMobile]);

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
      className="relative min-h-svh bg-obsidian z-999 text-white font-(family-name:--font-inter) selection:bg-obsidian-lighter selection:text-black"
    >
      <AdminHeader
        user={user}
        onSignOut={handleSignOut}
        onSignIn={() => setIsLoginOpen(true)}
      />

      <div className="*max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <main className="flex-1">
          {selectedProduct ? (
            <div className="space-y-2 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between gap-4 pb-4 border-b border-white/5"
              >
                <ProductSelector
                  products={products}
                  selectedProduct={selectedProduct}
                  onSelect={handleProductSelect}
                  isGridMode={isGridMode}
                />
                <ViewToggle
                  isGridMode={isGridMode}
                  onToggle={() => setIsGridMode(!isGridMode)}
                />
              </motion.div>

              {isGridMode ? (
                <AdminGrid
                  products={products}
                  user={user}
                  onUpdate={handleProductUpdate}
                  onRefresh={loadProducts}
                />
              ) : (
                <AdminFocusView
                  product={selectedProduct}
                  user={user}
                  onUpdate={handleProductUpdate}
                  onRefresh={loadProducts}
                />
              )}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center text-white/50">
              <p className="text-lg tracking-widest uppercase">
                Loading products...
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
