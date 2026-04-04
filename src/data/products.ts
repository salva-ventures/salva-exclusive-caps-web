export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  colors: string[];
  images: string[];
  description: string;
  sizes: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'classic-black-structured',
    name: 'Classic Black Structured',
    price: 850,
    category: 'snapback',
    colors: ['negro', 'gris'],
    images: [
      'https://picsum.photos/seed/cap1a/800/800',
      'https://picsum.photos/seed/cap1b/800/800',
      'https://picsum.photos/seed/cap1c/800/800',
    ],
    description: 'Gorra estructurada de perfil alto con frente rígido. Confeccionada en lana premium con bordado al tono. Diseño minimalista y atemporal.',
    sizes: ['S/M', 'L/XL'],
    featured: true,
  },
  {
    id: '2',
    slug: 'red-logo-dad-hat',
    name: 'Red Logo Dad Hat',
    price: 750,
    category: 'dad-hat',
    colors: ['negro', 'rojo'],
    images: [
      'https://picsum.photos/seed/cap2a/800/800',
      'https://picsum.photos/seed/cap2b/800/800',
      'https://picsum.photos/seed/cap2c/800/800',
    ],
    description: 'Dad hat non-structured con logotipo bordado en rojo. Perfil bajo y ajuste cómodo. La pieza signature de Salva Exclusive Caps.',
    sizes: ['Ajustable'],
    featured: true,
  },
  {
    id: '3',
    slug: 'monochrome-fitted',
    name: 'Monochrome Fitted',
    price: 950,
    category: 'fitted',
    colors: ['negro'],
    images: [
      'https://picsum.photos/seed/cap3a/800/800',
      'https://picsum.photos/seed/cap3b/800/800',
      'https://picsum.photos/seed/cap3c/800/800',
    ],
    description: 'Gorra fitted 59FIFTY en negro total. Sin logos visibles, acabado premium. Para quien entiende el lujo discreto.',
    sizes: ['7', '7 1/8', '7 1/4', '7 3/8', '7 1/2'],
    featured: true,
  },
  {
    id: '4',
    slug: 'exclusive-trucker',
    name: 'Exclusive Trucker',
    price: 700,
    category: 'trucker',
    colors: ['negro', 'blanco'],
    images: [
      'https://picsum.photos/seed/cap4a/800/800',
      'https://picsum.photos/seed/cap4b/800/800',
    ],
    description: 'Trucker premium con panel frontal estructurado y malla trasera en negro. Parche de cuero en frente.',
    sizes: ['Ajustable'],
    featured: true,
  },
  {
    id: '5',
    slug: 'velvet-strapback',
    name: 'Velvet Strapback',
    price: 900,
    category: 'snapback',
    colors: ['negro', 'vino'],
    images: [
      'https://picsum.photos/seed/cap5a/800/800',
      'https://picsum.photos/seed/cap5b/800/800',
    ],
    description: 'Strapback de terciopelo con frente estructurado y bordado en hilo metálico. Exclusiva y elegante.',
    sizes: ['Ajustable'],
  },
  {
    id: '6',
    slug: 'military-olive',
    name: 'Military Olive',
    price: 800,
    category: 'dad-hat',
    colors: ['oliva', 'negro'],
    images: [
      'https://picsum.photos/seed/cap6a/800/800',
      'https://picsum.photos/seed/cap6b/800/800',
    ],
    description: 'Dad hat en color oliva militar con bordado minimalista. Versátil y atemporal.',
    sizes: ['Ajustable'],
  },
  {
    id: '7',
    slug: 'white-contrast-snapback',
    name: 'White Contrast Snapback',
    price: 850,
    category: 'snapback',
    colors: ['blanco', 'negro'],
    images: [
      'https://picsum.photos/seed/cap7a/800/800',
      'https://picsum.photos/seed/cap7b/800/800',
    ],
    description: 'Snapback en blanco con detalles en negro. Contraste poderoso y diseño editorial.',
    sizes: ['Ajustable'],
  },
  {
    id: '8',
    slug: 'limited-red-fitted',
    name: 'Limited Red Fitted',
    price: 1100,
    category: 'fitted',
    colors: ['rojo'],
    images: [
      'https://picsum.photos/seed/cap8a/800/800',
      'https://picsum.photos/seed/cap8b/800/800',
      'https://picsum.photos/seed/cap8c/800/800',
    ],
    description: 'Edición limitada en rojo profundo. Fitted con bordado exclusivo en negro. Solo 50 piezas.',
    sizes: ['7', '7 1/8', '7 1/4', '7 3/8'],
  },
  {
    id: '9',
    slug: 'corduroy-tan',
    name: 'Corduroy Tan',
    price: 880,
    category: 'dad-hat',
    colors: ['beis', 'café'],
    images: [
      'https://picsum.photos/seed/cap9a/800/800',
      'https://picsum.photos/seed/cap9b/800/800',
    ],
    description: 'Dad hat en pana color tan. Textura premium y acabado artesanal. Perfecta para el invierno.',
    sizes: ['Ajustable'],
  },
  {
    id: '10',
    slug: 'monogram-bucket',
    name: 'Monogram Bucket',
    price: 950,
    category: 'bucket',
    colors: ['negro', 'crema'],
    images: [
      'https://picsum.photos/seed/cap10a/800/800',
      'https://picsum.photos/seed/cap10b/800/800',
    ],
    description: 'Bucket hat con patrón de monograma all-over. Diseño exclusivo de temporada.',
    sizes: ['S/M', 'L/XL'],
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category);
