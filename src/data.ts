export interface ProductProps {
  id?: string
  slug: string
  name: string
  description: string
  flavor: {
    name: string
    color: string
  }[]
  stockData: {
    size: number
    price: number
    salePrice: number
    stock: number
  }[]
  reviews: {
    rating: number
    title: string
    comment: string
    author: string
    date: string
  }[]
  benefits: string[]
  nutritionFacts: {
    servingSize: {
      description: string
      size: number
    }
    amount: { [key: string]: string | number }
    ingredients: string
  }
  howToUse: string
}

export const products: ProductProps[] = [
  {
    slug: "whey-isolate",
    name: "Whey Isolate",
    description: "The best protein for muscle growth.",
    flavor: [
      {
        name: "Vanilla",
        color: "#F3E5AB",
      },
      {
        name: "Mocha",
        color: "#A0522D",
      },
      {
        name: "Strawberry",
        color: "#FFC0CB",
      },
    ],
    stockData: [
      {
        size: 600,
        price: 29.99,
        salePrice: 19.99,
        stock: 10,
      },
      {
        size: 900,
        price: 39.99,
        salePrice: 29.99,
        stock: 12,
      },
      {
        size: 1200,
        price: 49.99,
        salePrice: 39.99,
        stock: 24,
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Amazing Results",
        comment:
          "Best whey protein I've ever tried. Mixes perfectly and tastes great. Seeing real muscle gains!",
        author: "Michael T.",
        date: "2024-01-15",
      },
      {
        rating: 4.9,
        title: "Great Quality",
        comment:
          "Zero bloating and digests easily. The vanilla flavor is excellent with almond milk.",
        author: "Sarah K.",
        date: "2024-01-08",
      },
      {
        rating: 5,
        title: "Worth Every Penny",
        comment:
          "High protein content and clean ingredients. Finally found my go-to protein powder.",
        author: "James R.",
        date: "2023-12-28",
      },
      {
        rating: 4.8,
        title: "Excellent Product",
        comment:
          "Dissolves instantly and tastes amazing. Really helps with post-workout recovery.",
        author: "Emma L.",
        date: "2023-12-20",
      },
      {
        rating: 5,
        title: "Top Notch",
        comment:
          "Pure quality protein. No artificial aftertaste. Will definitely buy again!",
        author: "David M.",
        date: "2023-12-15",
      },
    ],
    benefits: [
      "Our premium Whey Isolate delivers an exceptional 90% pure protein content per serving, making it one of the most efficient protein supplements available. This high-quality protein source is specifically designed to support your muscle-building goals while minimizing unnecessary calories from fats and carbohydrates.",
      "The advanced filtration process ensures maximum protein concentration while removing excess lactose and fat, making it easily digestible for most users. This fast-absorbing formula is engineered to deliver essential amino acids quickly to your muscles when they need it most, especially during the crucial post-workout window.",
      "Each serving is packed with a complete amino acid profile, including high levels of BCAAs (Branched-Chain Amino Acids), which are crucial for muscle protein synthesis and recovery. Regular consumption, combined with proper training, helps promote lean muscle growth, enhanced recovery, and improved body composition.",
    ],
    howToUse:
      "Mix 1 scoop (30g) with 250ml of water or milk. Take 1-2 servings daily, ideally post-workout or between meals. For best results, consume within 30 minutes after exercise.",
    nutritionFacts: {
      servingSize: {
        description: "30g (1 scoop)",
        size: 30,
      },
      amount: {
        calories: 120,
        totalFat: "1g",
        saturatedFat: "0.5g",
        cholesterol: "5mg",
        sodium: "50mg",
        totalCarbohydrate: "2g",
        dietaryFiber: "0g",
        sugars: "1g",
        protein: "24g",
      },
      ingredients:
        "Ultra-filtered Whey Protein Isolate (milk), Natural and Artificial Flavors, Sunflower Lecithin, Stevia Leaf Extract, Salt.",
    },
  },
  {
    slug: "creatine",
    name: "Creatine",
    description: "Boost strength and power.",
    flavor: [
      {
        name: "Unflavored",
        color: "#f7f7f7",
      },
      {
        name: "Fruit Punch",
        color: "#FF5A5F",
      },
      {
        name: "Blue Raspberry",
        color: "#007AFF",
      },
    ],
    stockData: [
      {
        size: 300,
        price: 19.99,
        salePrice: 14.99,
        stock: 15,
      },
      {
        size: 600,
        price: 39.99,
        salePrice: 23.99,
        stock: 20,
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Essential Supplement",
        comment:
          "Noticed significant strength gains within weeks. Mixes easily with no grit.",
        author: "Robert P.",
        date: "2024-01-18",
      },
      {
        rating: 4.9,
        title: "Quality Product",
        comment:
          "Pure creatine monohydrate that actually works. Great value for money.",
        author: "Lisa M.",
        date: "2024-01-12",
      },
      {
        rating: 5,
        title: "Impressive Results",
        comment:
          "Helped improve my workout performance substantially. No stomach issues.",
        author: "Chris B.",
        date: "2024-01-05",
      },
      {
        rating: 4.8,
        title: "Great Experience",
        comment:
          "Clean product, no fillers. The fruit punch flavor is delicious!",
        author: "Amanda S.",
        date: "2023-12-22",
      },
      {
        rating: 5,
        title: "Reliable Results",
        comment:
          "Been using for 3 months. Noticed better recovery and strength gains.",
        author: "Kevin H.",
        date: "2023-12-18",
      },
    ],
    benefits: [
      "Our pharmaceutical-grade Creatine Monohydrate is scientifically proven to enhance strength and power output during high-intensity exercise. This pure formula works by increasing your body's phosphocreatine stores, directly supporting ATP production - your muscles' primary energy source during explosive movements.",
      "Beyond its immediate performance benefits, our creatine helps improve recovery time between sets and workouts. This allows you to train harder and more frequently, leading to better results over time. Studies have shown that consistent creatine supplementation can increase muscle mass and strength gains when combined with resistance training.",
      "Recent research has also revealed creatine's positive effects on cognitive function and brain health. By supporting cellular energy production in the brain, our creatine supplement may help improve memory, focus, and mental clarity, making it beneficial for both athletic and mental performance.",
    ],
    howToUse:
      "Take 5g (1 scoop) daily with water or your favorite beverage. Can be taken at any time of day. During loading phase, take 20g daily divided into 4 servings for 5-7 days.",
    nutritionFacts: {
      servingSize: {
        description: "5g (1 scoop)",
        size: 5,
      },
      amount: {
        calories: 0,
        totalFat: "0g",
        saturatedFat: "0g",
        cholesterol: "0mg",
        sodium: "0mg",
        totalCarbohydrate: "0g",
        dietaryFiber: "0g",
        sugars: "0g",
        protein: "0g",
      },
      ingredients: "100% Pharmaceutical Grade Creatine Monohydrate",
    },
  },
  {
    slug: "pre-workout",
    name: "Pre Workout",
    description: "Recover faster and build more muscle.",
    flavor: [
      {
        name: "Fruit Punch",
        color: "#FF5A5F",
      },
      {
        name: "Blue Raspberry",
        color: "#007AFF",
      },
      {
        name: "Watermelon",
        color: "#FF3B30",
      },
    ],
    stockData: [
      {
        size: 300,
        price: 24.99,
        salePrice: 18.99,
        stock: 18,
      },
    ],
    reviews: [
      {
        rating: 5,
        title: "Amazing Energy",
        comment:
          "Clean energy without the crash. Perfect for morning workouts!",
        author: "Tom W.",
        date: "2024-01-17",
      },
      {
        rating: 4.9,
        title: "Great Focus",
        comment:
          "Provides excellent pump and focus. The watermelon flavor is fantastic.",
        author: "Rachel D.",
        date: "2024-01-10",
      },
      {
        rating: 5,
        title: "Best Pre-workout",
        comment:
          "No jitters, just sustained energy. Really helps push through tough sessions.",
        author: "Mike P.",
        date: "2024-01-02",
      },
      {
        rating: 4.8,
        title: "Solid Product",
        comment:
          "Perfect balance of ingredients. Not too strong but very effective.",
        author: "Jessica L.",
        date: "2023-12-25",
      },
      {
        rating: 5,
        title: "Game Changer",
        comment:
          "Great pump and energy. No tingles or anxiety. Just clean performance.",
        author: "Brian K.",
        date: "2023-12-19",
      },
    ],
    benefits: [
      "Our advanced Pre-Workout formula combines scientifically-dosed ingredients to deliver exceptional energy and focus for your training sessions. The carefully balanced blend of caffeine and nootropics provides a clean, sustained energy boost without the jitters or anxiety often associated with other pre-workout supplements.",
      "The formula includes specific compounds designed to enhance blood flow and oxygen delivery to working muscles, resulting in superior pumps and better performance during your workouts. These ingredients work synergistically to help you push through plateaus and achieve new personal bests.",
      "Unlike many pre-workouts that rely on excessive stimulants, our formula focuses on supporting both physical and mental performance. It includes ingredients that help improve focus and mind-muscle connection, while also supporting endurance and reducing fatigue, allowing you to maintain high-intensity performance throughout your entire workout.",
    ],
    howToUse:
      "Mix 1 scoop (10g) with 200ml of water 20-30 minutes before training. Start with ½ scoop to assess tolerance. Do not exceed 2 scoops in 24 hours.",
    nutritionFacts: {
      servingSize: {
        description: "10g (1 scoop)",
        size: 10,
      },
      amount: {
        calories: 5,
        totalFat: "0g",
        saturatedFat: "0g",
        cholesterol: "0mg",
        sodium: "150mg",
        totalCarbohydrate: "1g",
        dietaryFiber: "0g",
        sugars: "0g",
        protein: "0g",
      },
      ingredients:
        "L-Citrulline, Beta-Alanine, Caffeine Anhydrous, L-Theanine, Natural and Artificial Flavors, Citric Acid, Silicon Dioxide, Sucralose, Beet Root Extract (for color)",
    },
  },
]

export const tools = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
  },
  {
    slug: "daily-calorie-calculator",
    name: "Daily Calorie Calculator",
  },
]

export const discountCode = { code: "ETHERA", discount: 20 }
