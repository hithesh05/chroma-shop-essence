
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStore from '@/store/store';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const Admin = () => {
  const { user } = useStore();
  
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  // Sample data for charts
  const salesData = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 1900 },
    { name: 'Mar', total: 2800 },
    { name: 'Apr', total: 2400 },
    { name: 'May', total: 3100 },
    { name: 'Jun', total: 3800 },
    { name: 'Jul', total: 3500 },
  ];

  const categoryData = [
    { name: 'Clothing', total: 4600 },
    { name: 'Accessories', total: 3200 },
    { name: 'Home', total: 5700 },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,835</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+768</div>
            <p className="text-xs text-muted-foreground">
              +12.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              +5.3% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +18.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Additional Charts */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Order</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">#8562</td>
                  <td className="py-3">John Doe</td>
                  <td className="py-3 text-right">$125.99</td>
                  <td className="py-3 text-right">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">#8561</td>
                  <td className="py-3">Jane Smith</td>
                  <td className="py-3 text-right">$89.99</td>
                  <td className="py-3 text-right">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">#8560</td>
                  <td className="py-3">Robert Brown</td>
                  <td className="py-3 text-right">$249.99</td>
                  <td className="py-3 text-right">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3">#8559</td>
                  <td className="py-3">Emily White</td>
                  <td className="py-3 text-right">$175.50</td>
                  <td className="py-3 text-right">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Admin;
