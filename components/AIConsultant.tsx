
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, ArrowRight } from 'lucide-react';
import { Message, Product } from '../types';
import { getFashionAdvice, getOutfitRecommendations } from '../services/geminiService';

interface AIConsultantProps {
  products: Product[];
  onAddToCart: (p: Product, s: string, c: string) => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ products, onAddToCart }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Yo! I'm your GENZEE AI Stylist. Want an outfit for a festival, a date, or just vibe-checking some trends? Talk to me." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Get Advice
    const advice = await getFashionAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: advice }]);

    // Get Outfit Recs if prompt looks like a request for outfits
    if (userMsg.toLowerCase().includes('outfit') || userMsg.toLowerCase().includes('wear') || userMsg.toLowerCase().includes('style')) {
      const outfitRecs = await getOutfitRecommendations(userMsg, products);
      setRecs(outfitRecs);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh] glass rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Sparkles className="text-purple-500" /> STYLE LAB AI
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Powered by Gemini-3-Flash</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-gray-400">ONLINE</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Chat Side */}
        <div className="flex-1 flex flex-col border-r border-white/5">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-purple-600' : 'bg-white/10'}`}>
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-purple-500 text-white rounded-tr-none' : 'glass border-white/5 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Loader2 size={14} className="animate-spin" />
                </div>
                <div className="glass p-4 rounded-2xl rounded-tl-none animate-pulse">
                  Styling your vibe...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask for fashion advice..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-16 focus:outline-none focus:border-purple-500/50 transition-colors"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Side */}
        <div className="w-full md:w-80 bg-white/5 p-6 overflow-y-auto space-y-6">
          <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Suggested Fits</h3>
          {recs.length > 0 ? (
            recs.map((rec, idx) => (
              <div key={idx} className="glass p-4 rounded-2xl border border-purple-500/20 space-y-3">
                <h4 className="font-bold text-purple-400">{rec.title}</h4>
                <p className="text-xs text-gray-400 italic">"{rec.reason}"</p>
                <div className="space-y-2">
                  {rec.items.map((itemName: string, i: number) => {
                    const product = products.find(p => p.name.includes(itemName));
                    return (
                      <div key={i} className="flex items-center justify-between text-xs bg-black/40 p-2 rounded-lg">
                        <span className="truncate flex-1 pr-2">{itemName}</span>
                        {product ? (
                          <button 
                            onClick={() => onAddToCart(product, product.sizes[0], product.colors[0])}
                            className="text-purple-400 hover:text-purple-300 font-bold"
                          >
                            + Add
                          </button>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-4">
              <Sparkles size={32} className="mx-auto text-gray-700" />
              <p className="text-xs text-gray-500">Ask me for "outfit ideas" to see visual pairings here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
