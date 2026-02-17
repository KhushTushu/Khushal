
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Product } from '../types';
import { LayoutDashboard, TrendingUp, Users, Package, RefreshCcw } from 'lucide-react';

const MOCK_STATS = [
  { name: 'Mon', sales: 4000, traffic: 2400 },
  { name: 'Tue', sales: 3000, traffic: 1398 },
  { name: 'Wed', sales: 2000, traffic: 9800 },
  { name: 'Thu', sales: 2780, traffic: 3908 },
  { name: 'Fri', sales: 1890, traffic: 4800 },
  { name: 'Sat', sales: 2390, traffic: 3800 },
  { name: 'Sun', sales: 3490, traffic: 4300 },
];

const AdminPanel: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-display font-bold flex items-center gap-3">
          <LayoutDashboard className="text-purple-500" /> ADMIN PORTAL
        </h2>
        <button className="px-4 py-2 glass rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-colors">
          <RefreshCcw size={14} /> REFRESH DATA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Net Sales', value: '$45,230.00', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Active Sessions', value: '1,240', icon: Users, color: 'text-purple-400' },
          { label: 'Stock Items', value: '542', icon: Package, color: 'text-blue-400' },
          { label: 'Return Rate', value: '2.4%', icon: TrendingUp, color: 'text-pink-400' },
        ].map((stat, i) => (
          <div key={i} className="p-6 glass rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
              <stat.icon className={stat.color} size={20} />
            </div>
            <div className="text-2xl font-display font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 glass rounded-3xl space-y-6">
          <h3 className="font-bold text-xl">Revenue vs Traffic</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_STATS}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#a855f7" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="traffic" stroke="#ec4899" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 glass rounded-3xl space-y-6">
          <h3 className="font-bold text-xl">Inventory Health</h3>
          <div className="space-y-4">
            {products.slice(0, 5).map(p => (
              <div key={p.id} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold">{p.name}</span>
                  <span className="text-gray-400">85% Stocked</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
