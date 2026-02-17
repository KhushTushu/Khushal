
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cyberpunk Utility Gilet',
    price: 89.00,
    category: 'Men',
    image: 'https://picsum.photos/seed/fits1/600/800',
    description: 'High-tech water-resistant utility vest with multiple tactical pockets and reflective accents.',
    trending: true,
    colors: ['Black', 'Neon Green', 'Slate'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Y2K Gradient Mesh Top',
    price: 45.00,
    category: 'Women',
    image: 'https://picsum.photos/seed/fits2/600/800',
    description: 'Sheer breathable mesh long-sleeve with vibrant sunset gradient print. Perfect for layering.',
    trending: true,
    colors: ['Sunset', 'Arctic Blue', 'Midnight'],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    name: 'Neon Sol Platform Boots',
    price: 155.00,
    category: 'Footwear',
    image: 'https://picsum.photos/seed/fits3/600/800',
    description: 'Ultra-chunky sole boots with glowing translucent details and vegan leather finish.',
    trending: true,
    colors: ['White/Lime', 'All Black', 'Pink Glow'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Liquid Silver Cargoes',
    price: 110.00,
    category: 'Women',
    image: 'https://picsum.photos/seed/fits4/600/800',
    description: 'Reflective metallic finish cargo pants with adjustable bungee cords and oversized fit.',
    trending: false,
    colors: ['Silver', 'Chrome Gold'],
    sizes: ['24', '26', '28', '30'],
    rating: 4.5,
    reviews: 42
  },
  {
    id: '5',
    name: 'Techno Beanie',
    price: 25.00,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/fits5/600/800',
    description: 'Ribbed knit beanie with embroidered cyber sigilism art and heavy gauge yarn.',
    trending: false,
    colors: ['Charcoal', 'Acid Yellow', 'Crimson'],
    sizes: ['OS'],
    rating: 4.6,
    reviews: 210
  },
  {
    id: '6',
    name: 'Pixel Distorted Tee',
    price: 38.00,
    category: 'Men',
    image: 'https://picsum.photos/seed/fits6/600/800',
    description: 'Heavyweight cotton boxy tee featuring glitch-art inspired screen print.',
    trending: true,
    colors: ['Vintage Black', 'Off White'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 167
  }
];
