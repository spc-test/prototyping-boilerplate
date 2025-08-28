import { ProductCard, type Product } from "@/components/product-card"
import { ModeToggle } from "@/components/mode-toggle"

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Coffee Beans",
    description: "Rich, aromatic coffee beans sourced from sustainable farms in Colombia. Perfect for your morning brew.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    basePrice: 12.99,
    currency: "USD",
    category: "Coffee",
    inStock: true,
  },
  {
    id: "2",
    name: "Organic Green Tea",
    description: "Premium organic green tea leaves with a delicate flavor and natural antioxidants.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    basePrice: 8.50,
    currency: "USD",
    category: "Tea",
    inStock: true,
  },
  {
    id: "3",
    name: "Artisan Chocolate Bar",
    description: "Handcrafted dark chocolate made with ethically sourced cocoa beans. 70% cacao content.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop",
    basePrice: 15.99,
    currency: "USD",
    category: "Chocolate",
    inStock: false,
  },
]

export default function Home() {
  const handleAddToCart = (product: Product, packSize: number, totalPrice: number) => {
    console.log(`Added ${packSize}x ${product.name} to cart for ${totalPrice}`)
    // Here you would typically dispatch to a cart store or call an API
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Store</h1>
          <ModeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">
            Discover our premium selection with flexible pack sizes and great discounts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
