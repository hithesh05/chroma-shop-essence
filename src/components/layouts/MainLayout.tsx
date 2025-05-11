
import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import CartSlider from '../ui/CartSlider';
import MobileMenu from '../ui/MobileMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartSlider />
      <MobileMenu />
    </div>
  );
};

export default MainLayout;
