
import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, size: string, color: string) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="group relative flex flex-col bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.trending && (
            <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 uppercase">
              Trending
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-4 right-4 p-2 rounded-full glass transition-all ${isWishlisted ? 'text-pink-500' : 'text-white hover:bg-white/20'}`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-y-3">
          <div className="flex gap-1">
            {product.sizes.map(size => (
              <button 
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'glass border-white/20 text-white'}`}
              >
                {size}
              </button>
            ))}
          </div>
          <button 
            onClick={() => onAddToCart(product, selectedSize, selectedColor)}
            className="w-full py-3 bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-600 active:scale-95 transition-all"
          >
            <ShoppingBag size={16} /> QUICK ADD
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-gray-500 text-[10px] font-normal">({product.reviews})</span>
          </div>
        </div>
        <h3 className="text-lg font-bold leading-tight mb-2 flex-1">{product.name}</h3>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-display font-bold">${product.price.toFixed(2)}</span>
          <div className="flex gap-1">
             {product.colors.map(color => (
               <div 
                 key={color} 
                 className={`w-3 h-3 rounded-full border ${selectedColor === color ? 'border-white scale-125' : 'border-transparent opacity-60'}`}
                 style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                 title={color}
               />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
