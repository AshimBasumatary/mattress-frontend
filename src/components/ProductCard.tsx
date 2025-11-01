import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Product } from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const WHATSAPP_NUMBER = "1234567890"; // Replace with actual WhatsApp number

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to request a demo for the ${product.name}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product._id || product.id}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/product/${product._id || product.id}`}>
          <h3 className="mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="mb-4">
          <span className="text-gray-900">${product.price}</span>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={openWhatsApp}
            className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            Request Demo
          </Button>
          <Link to={`/product/${product._id || product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
