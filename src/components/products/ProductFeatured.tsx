
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import useStore from '@/store/store';
import ProductCard from './ProductCard';

const ProductFeatured: React.FC = () => {
  const { products } = useStore();
  
  // Get featured products or just take first 4 if none are marked as featured
  const featuredProducts = products.filter(p => p.featured) || products.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium mb-2">Featured Products</h2>
            <p className="text-shop-gray">Our selection of products that are trending right now.</p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatured;
