
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, LayoutDashboard, Package, Users, FileText, Settings } from 'lucide-react';
import useStore from '@/store/store';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const { user, logout } = useStore();
  
  if (!user || !user.isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-shop-lightgray">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm hidden md:block">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        </div>
        <Separator />
        <nav className="p-4 space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/admin')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/admin/products')}
          >
            <Package className="mr-2 h-4 w-4" />
            Products
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/admin/customers')}
          >
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/admin/orders')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/admin/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
        <Separator />
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Top navbar */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">{user?.name}</Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              View Store
            </Button>
          </div>
        </div>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
