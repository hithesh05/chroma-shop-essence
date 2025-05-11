import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

type StoreState = {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  isLoggedIn: boolean;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleMenu: () => void;
  toggleWishlist: (product: Product) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

// Mock product data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Minimalist Leather Backpack",
    description: "Crafted from premium full-grain leather with clean lines and a sleek silhouette. Features multiple compartments and adjustable straps for comfort.",
    price: 249.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Essential Cotton T-Shirt",
    description: "Made from organic cotton with a relaxed fit and minimal detailing. The perfect foundation for any outfit.",
    price: 39.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Coffee Set",
    description: "Hand-thrown ceramic coffee dripper and matching mug. The perfect ritual for your morning brew.",
    price: 79.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Linen Bed Sheets",
    description: "Stonewashed pure linen for a luxuriously soft feel. Gets softer with each wash.",
    price: 159.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6",
    rating: 4.7,
    reviewCount: 67,
    inStock: true
  },
  {
    id: 5,
    name: "Wool Overshirt",
    description: "A versatile layer crafted from responsibly sourced wool. Works as both a shirt and light jacket.",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1543076659-9380cdf10613",
    rating: 4.6,
    reviewCount: 36,
    inStock: true
  },
  {
    id: 6,
    name: "Hand-Crafted Wooden Bowl",
    description: "Each bowl is unique, carved from a single piece of sustainably harvested maple.",
    price: 89.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1578602079807-0c2534df872f",
    rating: 4.9,
    reviewCount: 18,
    inStock: true
  },
  {
    id: 7,
    name: "Minimalist Wall Clock",
    description: "Brushed aluminum with simple markers. Battery-powered quartz movement.",
    price: 79.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    rating: 4.5,
    reviewCount: 29,
    inStock: true
  },
  {
    id: 8,
    name: "Organic Cotton Sweater",
    description: "Medium-weight knit perfect for transitional weather. Features a relaxed fit with dropped shoulders.",
    price: 119.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    rating: 4.7,
    reviewCount: 52,
    inStock: true,
    featured: true
  }
];

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      cart: [],
      wishlist: [],
      user: null,
      isLoggedIn: false,
      isCartOpen: false,
      isMenuOpen: false,
      
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
        
        // Auto-open cart when adding item
        set({ isCartOpen: true });
        
        // Auto-close cart after a delay
        setTimeout(() => {
          set({ isCartOpen: false });
        }, 3000);
      },
      
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.product.id !== productId) });
      },
      
      updateCartItemQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter(item => item.product.id !== productId) });
        } else {
          set({
            cart: cart.map(item => 
              item.product.id === productId 
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen, isMenuOpen: false })),
      
      toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen, isCartOpen: false })),
      
      toggleWishlist: (product) => {
        const { wishlist } = get();
        const isInWishlist = wishlist.some(item => item.id === product.id);
        
        if (isInWishlist) {
          set({ wishlist: wishlist.filter(item => item.id !== product.id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      login: async (email, password) => {
        // Mock login - in a real app, this would validate against a backend
        if (email === "user@example.com" && password === "password") {
          set({ 
            user: { 
              id: 1, 
              name: "John Doe", 
              email, 
              isAdmin: false 
            }, 
            isLoggedIn: true 
          });
          return true;
        } else if (email === "admin@example.com" && password === "admin") {
          set({ 
            user: { 
              id: 2, 
              name: "Admin User", 
              email, 
              isAdmin: true 
            }, 
            isLoggedIn: true 
          });
          return true;
        }
        return false;
      },
      
      register: async (name, email, password) => {
        // Mock registration - in a real app, this would create a user in the backend
        // For demonstration, we'll just create a new regular user
        set({
          user: {
            id: Math.floor(Math.random() * 1000) + 3, // Random ID starting from 3
            name,
            email,
            isAdmin: false
          },
          isLoggedIn: true
        });
        
        return true;
      },
      
      logout: () => set({ user: null, isLoggedIn: false }),
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({ 
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        isLoggedIn: state.isLoggedIn
      }),
    }
  )
);

export default useStore;
