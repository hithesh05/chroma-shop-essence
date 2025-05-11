
import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useStore from '@/store/store';
import { Link } from 'react-router-dom';

const CartSlider: React.FC = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    cart, 
    removeFromCart, 
    updateCartItemQuantity,
    getCartTotal
  } = useStore();

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Cart items */}
        <div className="flex-grow overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-shop-gray p-4">
              <p className="mb-4">Your cart is empty</p>
              <Button onClick={toggleCart}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex space-x-4">
                  <div className="w-20 h-20 bg-gray-100 relative overflow-hidden">
                    <img 
                      src={`${item.product.image}?w=80&h=80&fit=crop&auto=format`} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-shop-gray text-sm">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-shop-gray"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-shop-gray">Subtotal</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-shop-gray">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Separator className="mb-4" />
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full bg-shop-charcoal hover:bg-black" onClick={toggleCart}>
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:block hidden"
          onClick={toggleCart}
        />
      )}
    </div>
  );
};

export default CartSlider;
