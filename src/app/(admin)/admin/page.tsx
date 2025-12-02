"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getAllProducts } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import ProductEditor from "@/components/admin/ProductEditor";
import StockManager from "@/components/admin/StockManager";
import FlavorManager from "@/components/admin/FlavorManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import BenefitsManager from "@/components/admin/BenefitsManager";
import NutritionManager from "@/components/admin/NutritionManager";
import LoginForm from "@/components/admin/LoginForm";

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
      <div className="min-h-svh flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isLoginOpen && !user) {
    return <LoginForm onCancel={() => setIsLoginOpen(false)} />;
  }

  return (
    <section
      id="admin-panel"
      className="relative min-h-svh bg-gray-50 z-999 text-black"
    >
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ethera Admin</h1>
            </div>
            <div className="flex items-center gap-3">
              {!user && (
                <span className="hidden sm:inline-block px-3 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full font-medium border border-yellow-200">
                  Read Only Mode
                </span>
              )}
              <button
                onClick={user ? handleSignOut : () => setIsLoginOpen(true)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                {user ? "Sign Out" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="flex-1">
          {selectedProduct ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {!isGridMode &&
                    products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedProduct.id === product.id
                            ? "bg-black text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {product.name}
                      </button>
                    ))}
                </div>
                <button
                  onClick={() => setIsGridMode(!isGridMode)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shrink-0"
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
                      Single View
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
              </div>

              {isGridMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {product.name}{" "}
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-8 first:pt-0">
                          <ProductEditor
                            product={product}
                            onUpdate={handleProductUpdate}
                            isReadOnly={!user}
                          />
                        </div>
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedProduct.name}{" "}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-8 divide-y divide-gray-200">
                    <div className="pt-8 first:pt-0">
                      <ProductEditor
                        product={selectedProduct}
                        onUpdate={handleProductUpdate}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-8">
                      <StockManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-8">
                      <FlavorManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-8">
                      <ReviewsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-8">
                      <BenefitsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                    <div className="pt-8">
                      <NutritionManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                        isReadOnly={!user}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
