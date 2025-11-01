import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductsPageProps {
  products: Product[];
}

export function ProductsPage({ products }: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="mb-4">Our Premium Mattress Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of mattresses. Each one is designed with 
            premium materials and expert craftsmanship to deliver the sleep you deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
