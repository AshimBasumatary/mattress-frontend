import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageLightbox } from "./ImageLightbox";
import { Product } from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import * as LucideIcons from "lucide-react";

const WHATSAPP_NUMBER = "1234567890"; // Replace with actual WhatsApp number

interface ProductDetailPageProps {
  products: Product[];
}

export function ProductDetailPage({ products }: ProductDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id || p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ✅ Handle product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Product Not Found</h2>
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </div>
      </div>
    );
  }

  // ✅ Safely handle missing images
  const hasImages = product.images && product.images.length > 0;
  const displayImage =
    (hasImages && product.images[selectedImage]) ||
    product.mainImage ||
    "https://via.placeholder.com/400x300?text=No+Image";

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to request a demo for the ${product.name}.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Section - Images */}
            <div>
              {/* ✅ Main Image with Safe Fallback */}
              <div
                className="aspect-[4/3] rounded-xl overflow-hidden mb-4 cursor-pointer"
                onClick={() => hasImages && openLightbox(selectedImage)}
              >
                <ImageWithFallback
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* ✅ Image Gallery (only if images exist) */}
              {hasImages ? (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 shadow-md"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No gallery images available
                </p>
              )}
            </div>

            {/* Right Section - Details */}
            <div>
              <h1 className="mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.detailedDescription}</p>

              <div className="mb-6">
                <span className="text-gray-900">${product.price}</span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.features?.map((feature, index) => {
                  const IconComponent = (LucideIcons as any)[feature.icon];
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      )}
                      <span className="text-sm">{feature.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="mb-3">Key Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {product.highlights?.length ? (
                    product.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">
                      No highlights available
                    </span>
                  )}
                </div>
              </div>

              <Button
                onClick={openWhatsApp}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Request a Demo on WhatsApp
              </Button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="px-8 pb-8">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2">Size Options</h4>
                    <p className="text-gray-600">
                      {product.specifications?.size || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Material</h4>
                    <p className="text-gray-600">
                      {product.specifications?.material || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Firmness Level</h4>
                    <p className="text-gray-600">
                      {product.specifications?.firmness || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Warranty</h4>
                    <p className="text-gray-600">
                      {product.specifications?.warranty || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2">Dimensions</h4>
                    <p className="text-gray-600">
                      {product.specifications?.dimensions || "N/A"}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <p className="text-gray-500 italic">
                  Reviews feature coming soon.
                </p>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <p className="text-gray-500 italic">
                  FAQs will be added shortly.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxOpen && hasImages && (
        <ImageLightbox
          images={product.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
