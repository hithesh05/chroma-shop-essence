
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const banners = [
  {
    id: 1,
    title: "Modern design, exceptional quality",
    description: "Discover our curated collection of minimalist products designed to elevate your everyday experience.",
    image: "https://images.unsplash.com/photo-1594968973184-9040a5a79963?q=80&w=1080&auto=format&fit=crop",
    buttonText: "Shop Now",
    buttonLink: "/products"
  },
  {
    id: 2,
    title: "New Collection",
    description: "Explore our latest arrivals featuring timeless designs and premium materials.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1080&auto=format&fit=crop",
    buttonText: "Discover More",
    buttonLink: "/products/clothing"
  },
  {
    id: 3,
    title: "Home Essentials",
    description: "Transform your space with thoughtfully designed objects for modern living.",
    image: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1080&auto=format&fit=crop",
    buttonText: "View Collection",
    buttonLink: "/products/home"
  },
  {
    id: 4,
    title: "Premium Accessories",
    description: "Elevate your everyday with our collection of meticulously crafted accessories.",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1080&auto=format&fit=crop",
    buttonText: "Shop Accessories",
    buttonLink: "/products/accessories"
  }
];

const HomeBanner = () => {
  return (
    <section className="relative bg-shop-lightgray">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="container mx-auto px-4 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-lg text-shop-gray mb-8 max-w-md">
                      {banner.description}
                    </p>
                    <div className="flex space-x-4">
                      <Link to={banner.buttonLink}>
                        <Button className="bg-shop-charcoal hover:bg-black text-white">
                          {banner.buttonText}
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
                        src={banner.image}
                        alt="Banner image" 
                        className="object-cover w-full h-full" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="lg:-left-4 left-2" />
        <CarouselNext className="lg:-right-4 right-2" />
      </Carousel>
    </section>
  );
};

export default HomeBanner;
