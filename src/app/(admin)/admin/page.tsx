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

type ActiveTab =
  | "products"
  | "stock"
  | "flavors"
  | "reviews"
  | "benefits"
  | "nutrition";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkAuth();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProducts();
      }
    });
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProducts();
      }
    } catch (error) {
      // Error handled silently
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProducts([]);
    setSelectedProduct(null);
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
      if (selectedProduct) {
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isCheckingAuth) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
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
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading products...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No products found
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedProduct?.id === product.id
                          ? "bg-black text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="font-medium">{product.name}</div>
                      <div
                        className={`text-xs mt-1 ${
                          selectedProduct?.id === product.id
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {product.slug}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {selectedProduct ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedProduct.name}{" "}
                        <span className="text-xs text-gray-600 font-normal ml-2">
                          {selectedProduct.id}
                        </span>
                      </h2>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-1 overflow-x-auto">
                      {(
                        [
                          { id: "products", label: "Product Info" },
                          { id: "stock", label: "Stock" },
                          { id: "flavors", label: "Flavors" },
                          { id: "reviews", label: "Reviews" },
                          { id: "benefits", label: "Benefits" },
                          { id: "nutrition", label: "Nutrition" },
                        ] as { id: ActiveTab; label: string }[]
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.id
                              ? "border-black text-black"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div>
                    {activeTab === "products" && (
                      <ProductEditor
                        product={selectedProduct}
                        onUpdate={handleProductUpdate}
                      />
                    )}
                    {activeTab === "stock" && (
                      <StockManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                      />
                    )}
                    {activeTab === "flavors" && (
                      <FlavorManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                      />
                    )}
                    {activeTab === "reviews" && (
                      <ReviewsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                      />
                    )}
                    {activeTab === "benefits" && (
                      <BenefitsManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                      />
                    )}
                    {activeTab === "nutrition" && (
                      <NutritionManager
                        product={selectedProduct}
                        onUpdate={loadProducts}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Select a product from the sidebar to get started
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
