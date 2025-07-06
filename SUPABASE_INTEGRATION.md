# Supabase Integration Guide

## Overview

This guide provides a complete step-by-step process to migrate your static data management from `src/data.ts` to a Supabase database. The migration will normalize your data structure, provide better scalability, and enable real-time features.

## Prerequisites

- Node.js 18+ and pnpm installed
- Supabase account (create at https://supabase.com)
- Basic understanding of SQL and database concepts

## Database Schema Design

### Normalized Table Structure

```sql
-- Products table (main product information)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  how_to_use TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product flavors
CREATE TABLE product_flavors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product stock data
CREATE TABLE product_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  author TEXT NOT NULL,
  review_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product benefits
CREATE TABLE product_benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  benefit TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nutrition facts
CREATE TABLE nutrition_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  serving_size_description TEXT NOT NULL,
  serving_size_amount INTEGER NOT NULL,
  calories INTEGER,
  total_fat TEXT,
  saturated_fat TEXT,
  cholesterol TEXT,
  sodium TEXT,
  total_carbohydrate TEXT,
  dietary_fiber TEXT,
  sugars TEXT,
  protein TEXT,
  ingredients TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discount codes
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount INTEGER NOT NULL CHECK (discount >= 0 AND discount <= 100),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

## Step-by-Step Migration Guide

### Step 1: Install Supabase CLI and Packages

```bash
# Install Supabase CLI globally
npm install -g supabase

# Install Supabase packages for Next.js
pnpm install @supabase/supabase-js @supabase/ssr

# Install additional dependencies for TypeScript support
pnpm install -D @types/node
```

### Step 2: Initialize Supabase Project

```bash
# Initialize Supabase in your project
pnpx supabase init

# Start local Supabase development environment
pnpx supabase start
```

### Step 3: Create Environment Variables

Create `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Step 4: Create Database Schema Migration

```bash
# Create initial schema migration
pnpx supabase migration new init_schema
```

Add the following content to `supabase/migrations/YYYYMMDDHHMMSS_init_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  how_to_use TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product flavors
CREATE TABLE product_flavors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product stock data
CREATE TABLE product_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews
CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  author TEXT NOT NULL,
  review_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product benefits
CREATE TABLE product_benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  benefit TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nutrition facts
CREATE TABLE nutrition_facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  serving_size_description TEXT NOT NULL,
  serving_size_amount INTEGER NOT NULL,
  calories INTEGER,
  total_fat TEXT,
  saturated_fat TEXT,
  cholesterol TEXT,
  sodium TEXT,
  total_carbohydrate TEXT,
  dietary_fiber TEXT,
  sugars TEXT,
  protein TEXT,
  ingredients TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discount codes
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount INTEGER NOT NULL CHECK (discount >= 0 AND discount <= 100),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_product_flavors_product_id ON product_flavors(product_id);
CREATE INDEX idx_product_stock_product_id ON product_stock(product_id);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_benefits_product_id ON product_benefits(product_id);
CREATE INDEX idx_nutrition_facts_product_id ON nutrition_facts(product_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_discount_codes_code ON discount_codes(code);
CREATE INDEX idx_discount_codes_active ON discount_codes(active);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_stock_updated_at BEFORE UPDATE ON product_stock
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 5: Create Data Seed Migration

```bash
# Create seed data migration
pnpx supabase migration new seed_data
```

Add the following content to `supabase/migrations/YYYYMMDDHHMMSS_seed_data.sql`:

```sql
-- Insert products
INSERT INTO products (slug, name, description, how_to_use) VALUES
('whey-isolate', 'Whey Isolate', 'The best protein for muscle growth.', 'Mix 1 scoop (30g) with 250ml of water or milk. Take 1-2 servings daily, ideally post-workout or between meals. For best results, consume within 30 minutes after exercise.'),
('creatine', 'Creatine', 'Boost strength and power.', 'Take 5g (1 scoop) daily with water or your favorite beverage. Can be taken at any time of day. During loading phase, take 20g daily divided into 4 servings for 5-7 days.'),
('pre-workout', 'Pre Workout', 'Recover faster and build more muscle.', 'Mix 1 scoop (10g) with 200ml of water 20-30 minutes before training. Start with ½ scoop to assess tolerance. Do not exceed 2 scoops in 24 hours.');

-- Insert product flavors
INSERT INTO product_flavors (product_id, name, color) VALUES
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'Vanilla', '#F3E5AB'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'Mocha', '#A0522D'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'Strawberry', '#FFC0CB'),
((SELECT id FROM products WHERE slug = 'creatine'), 'Unflavored', '#f7f7f7'),
((SELECT id FROM products WHERE slug = 'creatine'), 'Fruit Punch', '#FF5A5F'),
((SELECT id FROM products WHERE slug = 'creatine'), 'Blue Raspberry', '#007AFF'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'Fruit Punch', '#FF5A5F'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'Blue Raspberry', '#007AFF'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'Watermelon', '#FF3B30');

-- Insert product stock
INSERT INTO product_stock (product_id, size, price, sale_price, stock) VALUES
((SELECT id FROM products WHERE slug = 'whey-isolate'), 600, 34.99, 24.99, 10),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 900, 49.99, 39.99, 12),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 1200, 64.99, 54.99, 24),
((SELECT id FROM products WHERE slug = 'creatine'), 300, 24.99, 19.99, 15),
((SELECT id FROM products WHERE slug = 'creatine'), 600, 44.99, 34.99, 20),
((SELECT id FROM products WHERE slug = 'pre-workout'), 300, 39.99, 29.99, 18);

-- Insert product reviews
INSERT INTO product_reviews (product_id, rating, title, comment, author, review_date) VALUES
((SELECT id FROM products WHERE slug = 'whey-isolate'), 5.0, 'Amazing Results', 'Best whey protein I''ve ever tried. Mixes perfectly and tastes great. Seeing real muscle gains!', 'Michael T.', '2024-01-15'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 4.9, 'Great Quality', 'Zero bloating and digests easily. The vanilla flavor is excellent with almond milk.', 'Sarah K.', '2024-01-08'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 5.0, 'Worth Every Penny', 'High protein content and clean ingredients. Finally found my go-to protein powder.', 'James R.', '2023-12-28'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 4.8, 'Excellent Product', 'Dissolves instantly and tastes amazing. Really helps with post-workout recovery.', 'Emma L.', '2023-12-20'),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 5.0, 'Top Notch', 'Pure quality protein. No artificial aftertaste. Will definitely buy again!', 'David M.', '2023-12-15'),
((SELECT id FROM products WHERE slug = 'creatine'), 5.0, 'Essential Supplement', 'Noticed significant strength gains within weeks. Mixes easily with no grit.', 'Robert P.', '2024-01-18'),
((SELECT id FROM products WHERE slug = 'creatine'), 4.9, 'Quality Product', 'Pure creatine monohydrate that actually works. Great value for money.', 'Lisa M.', '2024-01-12'),
((SELECT id FROM products WHERE slug = 'creatine'), 5.0, 'Impressive Results', 'Helped improve my workout performance substantially. No stomach issues.', 'Chris B.', '2024-01-05'),
((SELECT id FROM products WHERE slug = 'creatine'), 4.8, 'Great Experience', 'Clean product, no fillers. The fruit punch flavor is delicious!', 'Amanda S.', '2023-12-22'),
((SELECT id FROM products WHERE slug = 'creatine'), 5.0, 'Reliable Results', 'Been using for 3 months. Noticed better recovery and strength gains.', 'Kevin H.', '2023-12-18'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 5.0, 'Amazing Energy', 'Clean energy without the crash. Perfect for morning workouts!', 'Tom W.', '2024-01-17'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 4.9, 'Great Focus', 'Provides excellent pump and focus. The watermelon flavor is fantastic.', 'Rachel D.', '2024-01-10'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 5.0, 'Best Pre-workout', 'No jitters, just sustained energy. Really helps push through tough sessions.', 'Mike P.', '2024-01-02'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 4.8, 'Solid Product', 'Perfect balance of ingredients. Not too strong but very effective.', 'Jessica L.', '2023-12-25'),
((SELECT id FROM products WHERE slug = 'pre-workout'), 5.0, 'Game Changer', 'Great pump and energy. No tingles or anxiety. Just clean performance.', 'Brian K.', '2023-12-19');

-- Insert product benefits
INSERT INTO product_benefits (product_id, benefit, order_index) VALUES
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'Our premium Whey Isolate delivers an exceptional 90% pure protein content per serving, making it one of the most efficient protein supplements available. This high-quality protein source is specifically designed to support your muscle-building goals while minimizing unnecessary calories from fats and carbohydrates.', 1),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'The advanced filtration process ensures maximum protein concentration while removing excess lactose and fat, making it easily digestible for most users. This fast-absorbing formula is engineered to deliver essential amino acids quickly to your muscles when they need it most, especially during the crucial post-workout window.', 2),
((SELECT id FROM products WHERE slug = 'whey-isolate'), 'Each serving is packed with a complete amino acid profile, including high levels of BCAAs (Branched-Chain Amino Acids), which are crucial for muscle protein synthesis and recovery. Regular consumption, combined with proper training, helps promote lean muscle growth, enhanced recovery, and improved body composition.', 3),
((SELECT id FROM products WHERE slug = 'creatine'), 'Our pharmaceutical-grade Creatine Monohydrate is scientifically proven to enhance strength and power output during high-intensity exercise. This pure formula works by increasing your body''s phosphocreatine stores, directly supporting ATP production - your muscles'' primary energy source during explosive movements.', 1),
((SELECT id FROM products WHERE slug = 'creatine'), 'Beyond its immediate performance benefits, our creatine helps improve recovery time between sets and workouts. This allows you to train harder and more frequently, leading to better results over time. Studies have shown that consistent creatine supplementation can increase muscle mass and strength gains when combined with resistance training.', 2),
((SELECT id FROM products WHERE slug = 'creatine'), 'Recent research has also revealed creatine''s positive effects on cognitive function and brain health. By supporting cellular energy production in the brain, our creatine supplement may help improve memory, focus, and mental clarity, making it beneficial for both athletic and mental performance.', 3),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'Our advanced Pre-Workout formula combines scientifically-dosed ingredients to deliver exceptional energy and focus for your training sessions. The carefully balanced blend of caffeine and nootropics provides a clean, sustained energy boost without the jitters or anxiety often associated with other pre-workout supplements.', 1),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'The formula includes specific compounds designed to enhance blood flow and oxygen delivery to working muscles, resulting in superior pumps and better performance during your workouts. These ingredients work synergistically to help you push through plateaus and achieve new personal bests.', 2),
((SELECT id FROM products WHERE slug = 'pre-workout'), 'Unlike many pre-workouts that rely on excessive stimulants, our formula focuses on supporting both physical and mental performance. It includes ingredients that help improve focus and mind-muscle connection, while also supporting endurance and reducing fatigue, allowing you to maintain high-intensity performance throughout your entire workout.', 3);

-- Insert nutrition facts
INSERT INTO nutrition_facts (product_id, serving_size_description, serving_size_amount, calories, total_fat, saturated_fat, cholesterol, sodium, total_carbohydrate, dietary_fiber, sugars, protein, ingredients) VALUES
((SELECT id FROM products WHERE slug = 'whey-isolate'), '30g (1 scoop)', 30, 120, '1g', '0.5g', '5mg', '50mg', '2g', '0g', '1g', '24g', 'Ultra-filtered Whey Protein Isolate (milk), Natural and Artificial Flavors, Sunflower Lecithin, Stevia Leaf Extract, Salt.'),
((SELECT id FROM products WHERE slug = 'creatine'), '5g (1 scoop)', 5, 0, '0g', '0g', '0mg', '0mg', '0g', '0g', '0g', '0g', '100% Pharmaceutical Grade Creatine Monohydrate'),
((SELECT id FROM products WHERE slug = 'pre-workout'), '10g (1 scoop)', 10, 5, '0g', '0g', '0mg', '150mg', '1g', '0g', '0g', '0g', 'L-Citrulline, Beta-Alanine, Caffeine Anhydrous, L-Theanine, Natural and Artificial Flavors, Citric Acid, Silicon Dioxide, Sucralose, Beet Root Extract (for color)');

-- Insert tools
INSERT INTO tools (slug, name) VALUES
('bmi-calculator', 'BMI Calculator'),
('body-fat-calculator', 'Body Fat Calculator'),
('daily-calorie-calculator', 'Daily Calorie Calculator');

-- Insert discount codes
INSERT INTO discount_codes (code, discount, active) VALUES
('ETHERA', 20, true);
```

### Step 6: Apply Migrations

```bash
# Apply migrations to local database
pnpx supabase db reset

# Verify tables were created
pnpx supabase db dump --data-only
```

### Step 7: Set Up Supabase Client Utilities

Create `src/utils/supabase/client.ts`:

```typescript
import { createBrowserClient } from "@supabase/ssr"

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `src/utils/supabase/server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

### Step 8: Generate TypeScript Types

```bash
# Generate TypeScript types from database schema
pnpx supabase gen types typescript --local > src/types/supabase.ts
```

### Step 9: Create Data Access Layer

Create `src/lib/supabase/products.ts`:

```typescript
import { createClient } from "@/utils/supabase/client"
import type { Database } from "@/types/supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]
type ProductFlavor = Database["public"]["Tables"]["product_flavors"]["Row"]
type ProductStock = Database["public"]["Tables"]["product_stock"]["Row"]
type ProductReview = Database["public"]["Tables"]["product_reviews"]["Row"]
type ProductBenefit = Database["public"]["Tables"]["product_benefits"]["Row"]
type NutritionFact = Database["public"]["Tables"]["nutrition_facts"]["Row"]

export interface ProductWithDetails extends Product {
  flavors: ProductFlavor[]
  stock: ProductStock[]
  reviews: ProductReview[]
  benefits: ProductBenefit[]
  nutrition: NutritionFact | null
}

export const getProducts = async (): Promise<ProductWithDetails[]> => {
  const supabase = createClient()

  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      *,
      flavors:product_flavors(*),
      stock:product_stock(*),
      reviews:product_reviews(*),
      benefits:product_benefits(*),
      nutrition:nutrition_facts(*)
    `
    )
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`)
  }

  return products.map((product) => ({
    ...product,
    nutrition: product.nutrition?.[0] || null,
  }))
}

export const getProductBySlug = async (
  slug: string
): Promise<ProductWithDetails | null> => {
  const supabase = createClient()

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      flavors:product_flavors(*),
      stock:product_stock(*),
      reviews:product_reviews(*),
      benefits:product_benefits(*),
      nutrition:nutrition_facts(*)
    `
    )
    .eq("slug", slug)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // Product not found
    }
    throw new Error(`Failed to fetch product: ${error.message}`)
  }

  return {
    ...product,
    nutrition: product.nutrition?.[0] || null,
  }
}
```

Create `src/lib/supabase/tools.ts`:

```typescript
import { createClient } from "@/utils/supabase/client"
import type { Database } from "@/types/supabase"

type Tool = Database["public"]["Tables"]["tools"]["Row"]

export const getTools = async (): Promise<Tool[]> => {
  const supabase = createClient()

  const { data: tools, error } = await supabase
    .from("tools")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch tools: ${error.message}`)
  }

  return tools
}
```

Create `src/lib/supabase/discounts.ts`:

```typescript
import { createClient } from "@/utils/supabase/client"
import type { Database } from "@/types/supabase"

type DiscountCode = Database["public"]["Tables"]["discount_codes"]["Row"]

export const getActiveDiscountCode = async (): Promise<DiscountCode | null> => {
  const supabase = createClient()

  const { data: discountCode, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("active", true)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No active discount code
    }
    throw new Error(`Failed to fetch discount code: ${error.message}`)
  }

  return discountCode
}

export const validateDiscountCode = async (
  code: string
): Promise<DiscountCode | null> => {
  const supabase = createClient()

  const { data: discountCode, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code.toUpperCase())
    .eq("active", true)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // Invalid or inactive code
    }
    throw new Error(`Failed to validate discount code: ${error.message}`)
  }

  // Check if code has expired
  if (
    discountCode.expires_at &&
    new Date(discountCode.expires_at) < new Date()
  ) {
    return null
  }

  return discountCode
}
```

### Step 10: Create Custom Hooks

Create `src/hooks/useProducts.ts`:

```typescript
import { useQuery } from "@tanstack/react-query"
import { getProducts, getProductBySlug } from "@/lib/supabase/products"

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

Create `src/hooks/useTools.ts`:

```typescript
import { useQuery } from "@tanstack/react-query"
import { getTools } from "@/lib/supabase/tools"

export const useTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: getTools,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
```

### Step 11: Update Data Usage

Replace static data imports with Supabase queries:

```typescript
// Before (static data)
import { products } from "@/data"

// After (Supabase)
import { useProducts } from "@/hooks/useProducts"

const MyComponent = () => {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Step 12: Set Up Row Level Security (RLS)

Create `supabase/migrations/YYYYMMDDHHMMSS_setup_rls.sql`:

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_flavors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_stock FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_benefits FOR SELECT USING (true);
CREATE POLICY "Public read access" ON nutrition_facts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tools FOR SELECT USING (true);
CREATE POLICY "Public read access" ON discount_codes FOR SELECT USING (active = true);

-- Apply RLS migration
```

```bash
pnpx supabase db reset
```

### Step 13: Deploy to Production

```bash
# Create a new Supabase project at https://supabase.com
# Get your project reference ID from the dashboard URL

# Link to your production project
pnpx supabase link --project-ref your-project-ref-id

# Push migrations to production
pnpx supabase db push

# Update your .env.local with production credentials
```

### Step 14: Performance Optimization

Create `supabase/migrations/YYYYMMDDHHMMSS_performance_optimization.sql`:

```sql
-- Add composite indexes for common queries
CREATE INDEX idx_product_reviews_rating ON product_reviews(product_id, rating DESC);
CREATE INDEX idx_product_stock_price ON product_stock(product_id, price);
CREATE INDEX idx_product_benefits_order ON product_benefits(product_id, order_index);

-- Add full-text search index
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Create materialized view for product statistics
CREATE MATERIALIZED VIEW product_stats AS
SELECT
  p.id,
  p.slug,
  p.name,
  AVG(pr.rating) as avg_rating,
  COUNT(pr.id) as review_count,
  MIN(ps.sale_price) as min_price,
  MAX(ps.sale_price) as max_price,
  SUM(ps.stock) as total_stock
FROM products p
LEFT JOIN product_reviews pr ON p.id = pr.product_id
LEFT JOIN product_stock ps ON p.id = ps.product_id
GROUP BY p.id, p.slug, p.name;

-- Create index on materialized view
CREATE UNIQUE INDEX idx_product_stats_id ON product_stats(id);
CREATE INDEX idx_product_stats_slug ON product_stats(slug);

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_product_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW product_stats;
END;
$$ LANGUAGE plpgsql;
```

### Step 15: Testing and Validation

Create test script `scripts/test-migration.ts`:

```typescript
import { createClient } from "@supabase/supabase-js"
import { products as staticProducts } from "../src/data"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function testMigration() {
  console.log("Testing Supabase migration...")

  // Test products fetch
  const { data: products, error } = await supabase.from("products").select(`
      *,
      flavors:product_flavors(*),
      stock:product_stock(*),
      reviews:product_reviews(*),
      benefits:product_benefits(*),
      nutrition:nutrition_facts(*)
    `)

  if (error) {
    console.error("Error fetching products:", error)
    return
  }

  console.log(`✅ Fetched ${products.length} products`)

  // Validate data integrity
  const staticProductCount = staticProducts.length
  if (products.length !== staticProductCount) {
    console.error(
      `❌ Product count mismatch: expected ${staticProductCount}, got ${products.length}`
    )
    return
  }

  console.log("✅ Product count matches static data")

  // Test individual product fetch
  const wheyProduct = await supabase
    .from("products")
    .select("*")
    .eq("slug", "whey-isolate")
    .single()

  if (wheyProduct.error) {
    console.error("Error fetching whey product:", wheyProduct.error)
    return
  }

  console.log("✅ Individual product fetch works")

  // Test tools
  const { data: tools, error: toolsError } = await supabase
    .from("tools")
    .select("*")

  if (toolsError) {
    console.error("Error fetching tools:", toolsError)
    return
  }

  console.log(`✅ Fetched ${tools.length} tools`)

  // Test discount codes
  const { data: discountCodes, error: discountError } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("active", true)

  if (discountError) {
    console.error("Error fetching discount codes:", discountError)
    return
  }

  console.log(`✅ Fetched ${discountCodes.length} active discount codes`)

  console.log("🎉 Migration test completed successfully!")
}

testMigration().catch(console.error)
```

Run the test:

```bash
pnpx tsx scripts/test-migration.ts
```

## Commands Summary

Here are all the commands you need to run in sequence:

```bash
# 1. Install dependencies
npm install -g supabase
pnpm install @supabase/supabase-js @supabase/ssr @tanstack/react-query
pnpm install -D @types/node tsx

# 2. Initialize Supabase
pnpx supabase init
pnpx supabase start

# 3. Create migrations
pnpx supabase migration new init_schema
pnpx supabase migration new seed_data
pnpx supabase migration new setup_rls
pnpx supabase migration new performance_optimization

# 4. Apply migrations
pnpx supabase db reset

# 5. Generate types
pnpx supabase gen types typescript --local > src/types/supabase.ts

# 6. Test migration
pnpx tsx scripts/test-migration.ts

# 7. Deploy to production
pnpx supabase link --project-ref your-project-ref-id
pnpx supabase db push
```

## Next Steps

1. **Remove Static Data**: Once migration is complete and tested, remove `src/data.ts`
2. **Update Components**: Replace all static data imports with Supabase hooks
3. **Add Error Handling**: Implement proper error boundaries and loading states
4. **Set Up Monitoring**: Add logging and monitoring for database queries
5. **Consider Caching**: Implement Redis or similar for frequently accessed data
6. **Add Admin Interface**: Create admin panels for managing products, reviews, etc.

## Troubleshooting

- **Migration fails**: Check SQL syntax and ensure all dependencies are installed
- **Types not generated**: Ensure local Supabase is running and migrations are applied
- **Connection issues**: Verify environment variables are set correctly
- **Performance issues**: Check if indexes are created and queries are optimized

This migration provides a solid foundation for scaling your supplement e-commerce platform with Supabase's powerful features including real-time updates, authentication, and file storage.
