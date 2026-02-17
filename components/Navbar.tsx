
import React from 'react';
import { ShoppingBag, Heart, User, Search, Sparkles, LayoutDashboard } from 'lucide-react';
import { AppSection, UserProfile } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (s: AppSection) => void;
  cartCount: number;
  setIsCartOpen: (o: boolean) => void;
  user: UserProfile;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, cartCount, setIsCartOpen, user }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <button 
          onClick={() => setActiveSection(AppSection.HOME)}
          className="text-2xl font-display font-black tracking-tighter"
        >
          GENZEE.<span className="text-purple-500">FITS</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <button 
            onClick={() => setActiveSection(AppSection.SHOP)}
            className={`transition-colors uppercase ${activeSection === AppSection.SHOP ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveSection(AppSection.AI_LAB)}
            className={`transition-colors flex items-center gap-1 uppercase ${activeSection === AppSection.AI_LAB ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Sparkles size={14} /> Style Lab
          </button>
          <button 
            onClick={() => setActiveSection(AppSection.ADMIN)}
            className={`transition-colors uppercase ${activeSection === AppSection.ADMIN ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setActiveSection(AppSection.WISHLIST)}
          className={`p-2 rounded-full transition-colors relative ${activeSection === AppSection.WISHLIST ? 'text-purple-400 bg-white/5' : 'text-gray-400 hover:text-white'}`}
        >
          <Heart size={20} />
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="p-2 text-gray-400 hover:text-white transition-colors relative"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveSection(AppSection.PROFILE)}
          className={`hidden md:flex items-center gap-2 p-1.5 pl-4 rounded-full glass border border-white/10 hover:border-white/30 transition-all ${activeSection === AppSection.PROFILE ? 'border-purple-500/50' : ''}`}
        >
          <span className="text-xs font-bold">{user.name.split(' ')[0]}</span>
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">
            {user.name.charAt(0)}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
