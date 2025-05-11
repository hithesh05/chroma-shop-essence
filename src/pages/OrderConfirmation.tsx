
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-medium mb-4">Thank You For Your Order!</h1>
          <p className="text-shop-gray mb-8">
            Your order has been received and is now being processed.
            You will receive an order confirmation email shortly.
          </p>
          
          <div className="bg-white p-8 mb-8 shadow-sm border border-gray-100">
            <p className="text-lg mb-2">Order Number:</p>
            <p className="text-2xl font-medium mb-6">{orderNumber}</p>
            
            <div className="space-y-2 text-left max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-shop-gray">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-shop-gray">Estimated Delivery:</span>
                <span>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account">View Order History</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
