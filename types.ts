
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Footwear';
  image: string;
  description: string;
  trending?: boolean;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface UserProfile {
  name: string;
  email: string;
  preferences: string[];
  sizePreference: string;
  loyaltyPoints: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AppSection {
  HOME = 'home',
  SHOP = 'shop',
  WISHLIST = 'wishlist',
  CART = 'cart',
  AI_LAB = 'ai_lab',
  PROFILE = 'profile',
  ADMIN = 'admin'
}
