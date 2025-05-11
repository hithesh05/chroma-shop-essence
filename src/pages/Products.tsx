
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useParams } from 'react-router-dom';
import useStore, { Product } from '@/store/store';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const Products = () => {
  const { category } = useParams<{ category?: string }>();
  const { products } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    let result = [...products];
    
    // Filter by category if provided
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    // Apply filters
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }
    
    // Apply price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Apply sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: featured or newest
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredProducts(result);
  }, [products, category, priceRange, sortOption, inStockOnly]);

  const getCategoryName = () => {
    if (!category) return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">{getCategoryName()}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-64 space-y-8">
            <div>
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={!category ? 'default' : 'outline'}
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/products">All Products</a>
                </Button>
                
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={category === cat ? 'default' : 'outline'}
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`/products/${cat}`}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</a>
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 300]}
                max={300}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={() => setInStockOnly(!inStockOnly)}
                />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-shop-gray">{filteredProducts.length} products</p>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-shop-gray mb-4">No products found.</p>
                <Button asChild>
                  <a href="/products">View All Products</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Products;
