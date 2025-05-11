
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import useStore, { Product } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const AdminProducts = () => {
  const { user, products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: 'clothing',
    image: '',
    rating: 0,
    reviewCount: 0,
    inStock: true,
    featured: false
  });
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  const filteredProducts = products.filter(
    product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewProduct = () => {
    setCurrentProduct(null);
    setFormData({
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: '',
      description: '',
      price: 0,
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop&auto=format',
      rating: 0,
      reviewCount: 0,
      inStock: true,
      featured: false
    });
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({ ...product });
    setShowProductDialog(true);
  };

  const handleDeleteProduct = (productId: number) => {
    // In a real app, you would make an API call to delete the product
    toast.success("Product deletion would be implemented with a real backend");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call to save the product
    toast.success(currentProduct ? "Product updated" : "Product created");
    setShowProductDialog(false);
  };

  return (
    <AdminLayout title="Products">
      {/* Header with search and add product */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-shop-gray" />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleNewProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      {/* Products table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100">
                      <img 
                        src={`${product.image}?w=40&h=40&fit=crop&auto=format`} 
                        alt={product.name}
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </TableCell>
                <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Product form dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => handleCheckboxChange("inStock", checked as boolean)}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowProductDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {currentProduct ? 'Update' : 'Create'} Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
