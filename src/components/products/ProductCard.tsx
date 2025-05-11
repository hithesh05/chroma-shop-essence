
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useStore, { Product } from '@/store/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 relative overflow-hidden bg-gray-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <img 
            src={`${product.image}?w=400&h=400&fit=crop&auto=format`}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-0 right-0 p-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full ${isInWishlist ? 'bg-shop-charcoal text-white' : 'bg-white/80 backdrop-blur-sm'} shadow-sm hover:scale-110 transition-all`}
            onClick={() => toggleWishlist(product)}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-white' : ''}`} />
          </Button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <Button 
            className="w-full bg-white text-shop-charcoal hover:bg-shop-charcoal hover:text-white transition-colors"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Link to={`/product/${product.id}`} className="block">
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-shop-gray mb-1">${product.price.toFixed(2)}</p>
        {product.reviewCount > 0 && (
          <div className="flex items-center">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-shop-gray ml-1">
              {product.reviewCount} reviews
            </span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
