
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingBag, Star, Minus, Plus, Check } from 'lucide-react';
import useStore, { Product } from '@/store/store';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const isInWishlist = wishlist.some(item => item.id === product?.id);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId, products]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAddedToCart(true);
      toast.success('Added to cart!');
      
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    }
  };
  
  const handleToggleWishlist = () => {
    if (product) {
      toggleWishlist(product);
      toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center">Product not found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-shop-gray">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:underline">Products</Link>
            <span className="mx-2">/</span>
            <Link to={`/products/${product.category}`} className="hover:underline capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-shop-charcoal">{product.name}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-100">
              <img 
                src={`${product.image}?q=80&w=1080&auto=format&fit=crop`}
                alt={product.name}
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-shop-gray text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            
            <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>
            
            <div className="prose prose-sm text-shop-gray mb-6">
              <p>{product.description}</p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <p className="text-sm mb-2">Quantity</p>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity}
                  className="h-10 w-10"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center text-lg">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <Button 
                className="flex-1 bg-shop-charcoal hover:bg-black text-white"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                className={`h-12 w-12 ${isInWishlist ? 'text-red-500' : ''}`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500' : ''}`} />
              </Button>
            </div>
            
            <div className="text-sm text-shop-gray">
              <div className="flex items-center mb-2">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>In stock and ready to ship</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <span>Free shipping on orders over $100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
