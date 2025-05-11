
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import useStore from '@/store/store';

const MobileMenu: React.FC = () => {
  const { isMenuOpen, toggleMenu, isLoggedIn } = useStore();

  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 w-full md:w-80 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation links */}
          <div className="flex-grow overflow-y-auto py-4">
            <nav className="space-y-1">
              <Link 
                to="/products" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                All Products
              </Link>
              <Link 
                to="/products/clothing" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                Clothing
              </Link>
              <Link 
                to="/products/accessories" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                Accessories
              </Link>
              <Link 
                to="/products/home" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                Home
              </Link>
              
              <Separator className="my-4" />
              
              <Link 
                to="/search" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                Search
              </Link>
              <Link 
                to="/wishlist" 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                Wishlist
              </Link>
              <Link 
                to={isLoggedIn ? "/account" : "/login"} 
                className="block px-4 py-3 hover:bg-shop-lightgray text-shop-charcoal"
                onClick={toggleMenu}
              >
                {isLoggedIn ? "My Account" : "Login / Register"}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default MobileMenu;
