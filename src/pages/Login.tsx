
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useStore from '@/store/store';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useStore();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/account');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Successfully logged in');
        navigate('/account');
      } else {
        toast.error('Invalid email or password', {
          description: 'Try user@example.com / password or admin@example.com / admin'
        });
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-medium mb-8 text-center">Sign In</h1>
          
          <div className="bg-white p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-shop-charcoal hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-shop-charcoal hover:bg-black"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-shop-gray">
                Don't have an account?{' '}
                <Link to="/register" className="text-shop-charcoal hover:underline">
                  Create one
                </Link>
              </p>
            </div>
            
            <div className="mt-8 p-4 bg-shop-lightgray rounded">
              <p className="text-sm text-center mb-2">Demo accounts:</p>
              <p className="text-xs text-shop-gray text-center">Customer: user@example.com / password</p>
              <p className="text-xs text-shop-gray text-center">Admin: admin@example.com / admin</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
