import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Product } from "../types/product";
import { Pencil, Trash2, Plus, Lock } from "lucide-react";

interface AdminPageProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export function AdminPage({ products, onUpdateProducts }: AdminPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Fetch products on load
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Products loaded from backend:", data);
        onUpdateProducts(data);
      })
      .catch((err) => console.error("❌ Failed to load products:", err));
  }, []);

  // Demo password (for local testing)
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
    }
  };

  // 🗑️ Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      console.log("🗑️ Attempting to delete:", id);

      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      console.log("✅ Product deleted on backend");

      // Refresh product list
      const updatedRes = await fetch("http://localhost:5000/api/products");
      const updatedProducts = await updatedRes.json();
      onUpdateProducts(updatedProducts);

      // ✅ Show success message
      setSuccessMessage("✅ Product deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("Failed to delete product. Check backend logs.");
    }
  };

  // 💾 Add or Edit product
  const handleSaveProduct = async (product: Product) => {
    try {
      const isEdit = !isAddingNew;
      const apiUrl = isAddingNew
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/${product._id || product.id}`;
      const method = isAddingNew ? "POST" : "PUT";

      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          detailedDescription: product.detailedDescription,
          price: product.price,
          mainImage: product.mainImage,
          images: product.images || [],
          highlights: product.highlights || [],
          specifications: {
            size: product.specifications?.size || "",
            material: product.specifications?.material || "",
            firmness: product.specifications?.firmness || "",
            warranty: product.specifications?.warranty || "",
            dimensions: product.specifications?.dimensions || "",
          },
          features: product.features || [],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const savedProduct = await response.json();
      console.log("✅ Product saved successfully:", savedProduct);

      if (isAddingNew) {
        onUpdateProducts([...products, savedProduct]);
      } else {
        onUpdateProducts(
          products.map((p) =>
            p._id === savedProduct._id || p.id === savedProduct.id
              ? savedProduct
              : p
          )
        );
      }

      setEditingProduct(null);
      setIsAddingNew(false);
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);

      // ✅ Success message
      setSuccessMessage(
        isEdit
          ? "✅ Product edited successfully!"
          : "✅ Product added successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert("Failed to save product. Check backend connection and console for details.");
    }
  };

  const handleAddNew = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      description: "",
      detailedDescription: "",
      price: 0,
      mainImage: "",
      images: [""],
      highlights: [],
      specifications: {
        size: "",
        material: "",
        firmness: "",
        warranty: "",
        dimensions: "",
      },
      features: [],
    };
    setEditingProduct(newProduct);
    setIsAddingNew(true);
    setIsAddDialogOpen(true);
  };

  // 🔒 Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2">Admin Login</h2>
            <p className="text-gray-600 text-sm">Enter password to access admin panel</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Demo password: admin123
            </p>
          </form>
        </Card>
      </div>
    );
  }

  // 🧩 Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your mattress products</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" /> Add New Product
            </Button>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm border border-green-300">
            {successMessage}
          </div>
        )}

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id || product.id}>
                  <TableCell>
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell className="max-w-md truncate">{product.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsAddingNew(false);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>Edit the details of this product.</DialogDescription>
                          </DialogHeader>
                          {editingProduct && (
                            <ProductForm
                              product={editingProduct}
                              onSave={(product) => {
                                handleSaveProduct(product);
                                setIsEditDialogOpen(false);
                              }}
                              onCancel={() => setIsEditDialogOpen(false)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product._id || product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Add New Product Dialog */}
        {isAddingNew && editingProduct && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to your inventory.</DialogDescription>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                onSave={(product) => {
                  handleSaveProduct(product);
                  setIsAddDialogOpen(false);
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    ...product,
    images: product.images || [""],
    highlights: product.highlights || [],
    specifications: product.specifications || {
      size: "",
      material: "",
      firmness: "",
      warranty: "",
      dimensions: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, mainImage: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...(formData.images || [])];
      updated[index] = reader.result as string;
      setFormData({ ...formData, images: updated });
    };
    reader.readAsDataURL(file);
  };

  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ""] });
  const removeImageField = (index: number) =>
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      </div>

      <div>
        <Label htmlFor="price">Price ($)</Label>
        <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required />
      </div>

      <div>
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      </div>

      <div>
        <Label htmlFor="detailedDescription">Detailed Description</Label>
        <Textarea id="detailedDescription" value={formData.detailedDescription} onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })} rows={4} required />
      </div>

      {/* ✅ Main Image */}
      <div>
        <Label htmlFor="mainImage">Main Image</Label>
        <div className="space-y-3">
          {formData.mainImage && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
              <img src={formData.mainImage} alt="Main preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-2">
            <Input id="mainImage" value={formData.mainImage} onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })} placeholder="Or enter image URL" />
            <div className="flex items-center gap-2">
              <Label htmlFor="mainImageFile" className="cursor-pointer">
                <div className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors border border-gray-300">
                  Choose File
                </div>
              </Label>
              <Input id="mainImageFile" type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Gallery Images */}
      <div>
        <Label>Gallery Images</Label>
        <div className="space-y-3">
          {(formData.images || []).map((image, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-2">
              {image && <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded" />}
              <Input value={image} onChange={(e) => {
                const newImages = [...formData.images];
                newImages[index] = e.target.value;
                setFormData({ ...formData, images: newImages });
              }} placeholder="Or enter image URL" />
              <div className="flex items-center gap-2">
                <Label htmlFor={`imageFile-${index}`} className="cursor-pointer">
                  <div className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors border border-gray-300">Choose File</div>
                </Label>
                <Input id={`imageFile-${index}`} type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} className="hidden" />
                <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addImageField} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Gallery Image
          </Button>
        </div>
      </div>

      {/* ✅ Highlights and Specs */}
      <div>
        <Label htmlFor="highlights">Highlights (comma-separated)</Label>
        <Input id="highlights" value={formData.highlights.join(", ")} onChange={(e) =>
          setFormData({ ...formData, highlights: e.target.value.split(",").map((h) => h.trim()) })
        } />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["size", "material", "firmness", "warranty", "dimensions"].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              value={formData.specifications[field as keyof typeof formData.specifications] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, [field]: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
