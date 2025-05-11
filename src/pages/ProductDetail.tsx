
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import useStore, { Product } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heart, Package, RotateCcw, Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import ProductFeatured from '@/components/products/ProductFeatured';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    wishlist, 
    toggleWishlist 
  } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isInWishlist = product ? wishlist.some(item => item.id === product.id) : false;

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/products');
      }
    }
  }, [productId, products, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
      if (isInWishlist) {
        toast.info(`${product.name} removed from wishlist`);
      } else {
        toast.success(`${product.name} added to wishlist`);
      }
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center">Loading product...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-shop-lightgray">
        <div className="container mx-auto px-4 py-3 text-sm">
          <div className="flex items-center text-shop-gray">
            <a href="/" className="hover:text-shop-charcoal">Home</a>
            <ChevronRight className="h-3 w-3 mx-1" />
            <a href="/products" className="hover:text-shop-charcoal">Products</a>
            <ChevronRight className="h-3 w-3 mx-1" />
            <a 
              href={`/products/${product.category}`} 
              className="hover:text-shop-charcoal"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </a>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span className="truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product images */}
          <div className="bg-gray-100">
            <img 
              src={`${product.image}?w=800&h=800&fit=crop&auto=format`} 
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          
          {/* Product details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
            <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
            
            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center mb-6">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-shop-gray">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}
            
            <p className="text-shop-gray mb-8">{product.description}</p>
            
            {/* Availability */}
            <div className="flex items-center mb-8">
              <span className={`flex items-center ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    In Stock
                  </>
                ) : (
                  'Out of Stock'
                )}
              </span>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <p className="text-shop-gray mb-2">Quantity</p>
              <div className="flex">
                <button 
                  className="border border-gray-200 px-4 py-2"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="border-t border-b border-gray-200 px-4 py-2 w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  className="border border-gray-200 px-4 py-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-shop-charcoal hover:bg-black"
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                onClick={handleToggleWishlist}
                className={`flex-1 ${isInWishlist ? 'bg-shop-charcoal text-white hover:bg-shop-charcoal/90' : ''}`}
              >
                <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? 'fill-white' : ''}`} />
                {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start">
                <Package className="h-5 w-5 mr-3 text-shop-gray mt-0.5" />
                <p className="text-shop-gray">Free shipping on orders over $50</p>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 mr-3 text-shop-gray mt-0.5" />
                <p className="text-shop-gray">Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-6">
              <p className="text-shop-gray">{product.description}</p>
              <p className="mt-4 text-shop-gray">
                Our commitment to quality means that each product is made to last. This {product.name.toLowerCase()} is crafted with attention to detail and premium materials, designed to integrate seamlessly into your daily life.
              </p>
            </TabsContent>
            
            <TabsContent value="details" className="py-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <p className="text-shop-gray">Premium materials selected for quality and longevity.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Dimensions</h4>
                    <p className="text-shop-gray">Please refer to product images for detailed dimensions.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Care Instructions</h4>
                    <p className="text-shop-gray">Follow product-specific care instructions for best results.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Origin</h4>
                    <p className="text-shop-gray">Designed in-house and responsibly manufactured.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{product.rating} out of 5</span>
                </div>
                <p className="text-shop-gray">{product.reviewCount} customer reviews</p>
                
                <Separator />
                
                {/* Sample review */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">Great quality and design</span>
                  </div>
                  <p className="text-xs text-shop-gray mb-2">By Sarah K. on May 4, 2023</p>
                  <p className="text-shop-gray">
                    This product exceeded my expectations. The quality is excellent, and the design is exactly what I was looking for. Would highly recommend!
                  </p>
                </div>
                
                <Separator />
                
                {/* Sample review */}
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">Well made and functional</span>
                  </div>
                  <p className="text-xs text-shop-gray mb-2">By Michael T. on April 18, 2023</p>
                  <p className="text-shop-gray">
                    Very pleased with this purchase. The product is well-made and functions perfectly. The minimalist design fits well with my home decor.
                  </p>
                </div>
                
                <Button className="mt-4">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        <div className="mt-16">
          <ProductFeatured />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
