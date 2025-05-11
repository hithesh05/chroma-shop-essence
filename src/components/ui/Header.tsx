
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Heart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useStore from '@/store/store';

const Header: React.FC = () => {
  const { isLoggedIn, user, getCartCount, toggleCart, toggleMenu } = useStore();
  const cartCount = getCartCount();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link to="/" className="text-xl font-semibold tracking-tight text-shop-charcoal">
              MINIMAL
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-shop-charcoal hover:text-black transition-colors">
              All Products
            </Link>
            <Link to="/products/clothing" className="text-shop-charcoal hover:text-black transition-colors">
              Clothing
            </Link>
            <Link to="/products/accessories" className="text-shop-charcoal hover:text-black transition-colors">
              Accessories
            </Link>
            <Link to="/products/home" className="text-shop-charcoal hover:text-black transition-colors">
              Home
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to={isLoggedIn ? "/account" : "/login"}>
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-shop-charcoal text-white text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
