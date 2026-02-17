
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string, s: string, c: string) => void;
  onUpdateQuantity: (id: string, s: string, c: string, q: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity }) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/5 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <ShoppingBag size={20} /> YOUR BAG ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.selectedSize} / {item.selectedColor}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-3 glass rounded-lg p-1 px-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-1 hover:text-purple-400"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-1 hover:text-purple-400"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-500">
                <ShoppingBag size={32} />
              </div>
              <h3 className="font-bold text-lg">Your bag is empty</h3>
              <p className="text-gray-500 text-sm">Add some fire fits to get started.</p>
              <button onClick={onClose} className="px-6 py-2 bg-purple-500 rounded-full text-sm font-bold">Shop Now</button>
            </div>
          )}
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Shipping</span>
            <span className="text-purple-400 font-bold uppercase tracking-widest text-[10px]">Free</span>
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-display font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-purple-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
