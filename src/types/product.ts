export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  price: number;
  mainImage: string;
  images: string[];
  highlights: string[];
  specifications: {
    size: string;
    material: string;
    firmness: string;
    warranty: string;
    dimensions: string;
  };
  features: {
    icon: string;
    label: string;
  }[];
}
