
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, Heart, LogOut } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import useStore from '@/store/store';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const Account = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, wishlist } = useStore();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  const handleLogout = () => {
    logout();
    toast.success('You have been logged out');
    navigate('/');
  };

  if (!user) {
    return null; // Redirect will happen due to useEffect
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Account sidebar */}
          <div className="w-full md:w-64 bg-white shadow-sm p-6">
            <div className="mb-6">
              <h2 className="font-medium text-lg">My Account</h2>
              <p className="text-shop-gray">{user.name}</p>
              <p className="text-shop-gray text-sm">{user.email}</p>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            
            {user.isAdmin && (
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate('/admin')}
              >
                Admin Dashboard
              </Button>
            )}
          </div>
          
          {/* Account content */}
          <div className="flex-grow">
            <Tabs defaultValue="profile">
              <TabsList className="mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className="bg-white p-6 shadow-sm">
                  <h3 className="font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-shop-gray text-sm mb-1">Name</label>
                      <input 
                        type="text" 
                        value={user.name} 
                        className="border border-gray-200 p-2 w-full"
                        readOnly 
                      />
                    </div>
                    <div>
                      <label className="block text-shop-gray text-sm mb-1">Email</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        className="border border-gray-200 p-2 w-full"
                        readOnly 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 shadow-sm">
                  <h3 className="font-medium mb-4">Shipping Address</h3>
                  <p className="text-shop-gray">No addresses saved yet.</p>
                  <Button variant="outline" className="mt-4">
                    Add New Address
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="bg-white p-6 shadow-sm">
                  <h3 className="font-medium mb-4">Order History</h3>
                  <p className="text-shop-gray">You haven't placed any orders yet.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/products')}
                  >
                    Start Shopping
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist">
                <div className="bg-white p-6 shadow-sm">
                  <h3 className="font-medium mb-4">My Wishlist</h3>
                  
                  {wishlist.length === 0 ? (
                    <>
                      <p className="text-shop-gray">Your wishlist is empty.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/products')}
                      >
                        Discover Products
                      </Button>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
