
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductFeatured from '@/components/products/ProductFeatured';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero section */}
      <section className="relative bg-shop-lightgray">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                Modern design, <br />exceptional quality
              </h1>
              <p className="text-lg text-shop-gray mb-8 max-w-md">
                Discover our curated collection of minimalist products designed to elevate your everyday experience.
              </p>
              <div className="flex space-x-4">
                <Link to="/products">
                  <Button className="bg-shop-charcoal hover:bg-black text-white">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline">About Our Brand</Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-w-4 aspect-h-5 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1594968973184-9040a5a79963?q=80&w=1080&auto=format&fit=crop"
                  alt="Minimal design showcase" 
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products/clothing" className="group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=640&auto=format&fit=crop" 
                  alt="Clothing" 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Clothing</h3>
                    <p className="text-white/80 mb-4">Timeless essentials for your wardrobe</p>
                    <span className="text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                      Shop now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/products/accessories" className="group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=640&auto=format&fit=crop" 
                  alt="Accessories" 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Accessories</h3>
                    <p className="text-white/80 mb-4">Elegant complements to your style</p>
                    <span className="text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                      Shop now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/products/home" className="group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=640&auto=format&fit=crop" 
                  alt="Home" 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Home</h3>
                    <p className="text-white/80 mb-4">Refined objects for your space</p>
                    <span className="text-white border-b border-white pb-1 group-hover:pb-2 transition-all">
                      Shop now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products section */}
      <ProductFeatured />
      
      {/* Brand Story section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1604176424472-17cd740f74e9?q=80&w=1080&auto=format&fit=crop" 
                  alt="Our workshop" 
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-medium mb-6">Our Approach to Design</h2>
              <p className="text-shop-gray mb-4">
                At MINIMAL, we believe in the power of thoughtful design. Each product in our collection is carefully considered, from the materials we select to the production processes we employ.
              </p>
              <p className="text-shop-gray mb-6">
                Our dedication to craftsmanship means we partner with skilled artisans who share our vision for exceptional quality and attention to detail, resulting in products that are built to last.
              </p>
              <Link to="/about">
                <Button variant="outline">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="bg-shop-lightgray py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">Join Our Community</h2>
          <p className="text-shop-gray mb-8 max-w-md mx-auto">
            Subscribe to receive updates on new arrivals, special offers and our latest news.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-shop-charcoal"
              required
            />
            <Button type="submit" className="bg-shop-charcoal hover:bg-black text-white">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
