export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  type: string;
  colors: string[];
  images: string[];
  description: string;
  featured?: boolean;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'classic-black-structured',
    sku: 'SEC-001',
    name: 'Classic Black Structured',
    type: 'Snapback',
    colors: ['Negro', 'Gris'],
    images: [
      '/images/products/sec-001-1.jpg',
      '/images/products/sec-001-2.jpg',
    ],
    description: 'Gorra estructurada de perfil alto con frente rígido. Confeccionada en material premium con bordado al tono. Diseño minimalista y atemporal.',
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    slug: 'red-logo-dad-hat',
    sku: 'SEC-002',
    name: 'Red Logo Dad Hat',
    type: 'Dad Hat',
    colors: ['Negro', 'Rojo'],
    images: [
      '/images/products/sec-002-1.jpg',
      '/images/products/sec-002-2.jpg',
    ],
    description: 'Dad hat non-structured con logotipo bordado en rojo. Perfil bajo y ajuste cómodo. La pieza signature de Salva Exclusive Caps.',
    featured: true,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    slug: 'monochrome-fitted',
    sku: 'SEC-003',
    name: 'Monochrome Fitted',
    type: 'Fitted',
    colors: ['Negro'],
    images: [
      '/images/products/sec-003-1.jpg',
      '/images/products/sec-003-2.jpg',
    ],
    description: 'Gorra fitted en negro total. Sin logos visibles, acabado premium. Para quien entiende el lujo discreto.',
    featured: true,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    slug: 'exclusive-trucker',
    sku: 'SEC-004',
    name: 'Exclusive Trucker',
    type: 'Trucker',
    colors: ['Negro', 'Blanco'],
    images: [
      '/images/products/sec-004-1.jpg',
      '/images/products/sec-004-2.jpg',
    ],
    description: 'Trucker premium con panel frontal estructurado y malla trasera en negro. Parche de cuero en frente.',
    featured: true,
    createdAt: '2024-02-05',
  },
  {
    id: '5',
    slug: 'velvet-strapback',
    sku: 'SEC-005',
    name: 'Velvet Strapback',
    type: 'Snapback',
    colors: ['Negro', 'Vino'],
    images: [
      '/images/products/sec-005-1.jpg',
    ],
    description: 'Strapback de terciopelo con frente estructurado y bordado en hilo metálico. Exclusiva y elegante.',
    createdAt: '2024-02-10',
  },
  {
    id: '6',
    slug: 'military-olive',
    sku: 'SEC-006',
    name: 'Military Olive',
    type: 'Dad Hat',
    colors: ['Oliva', 'Negro'],
    images: [
      '/images/products/sec-006-1.jpg',
    ],
    description: 'Dad hat en color oliva militar con bordado minimalista. Versátil y atemporal.',
    createdAt: '2024-02-12',
  },
  {
    id: '7',
    slug: 'white-contrast-snapback',
    sku: 'SEC-007',
    name: 'White Contrast Snapback',
    type: 'Snapback',
    colors: ['Blanco', 'Negro'],
    images: [
      '/images/products/sec-007-1.jpg',
    ],
    description: 'Snapback en blanco con detalles en negro. Contraste poderoso y diseño editorial.',
    createdAt: '2024-02-15',
  },
  {
    id: '8',
    slug: 'limited-red-fitted',
    sku: 'SEC-008',
    name: 'Limited Red Fitted',
    type: 'Fitted',
    colors: ['Rojo'],
    images: [
      '/images/products/sec-008-1.jpg',
      '/images/products/sec-008-2.jpg',
    ],
    description: 'Edición limitada en rojo profundo. Fitted con bordado exclusivo en negro. Solo 50 piezas.',
    createdAt: '2024-02-20',
  },
  {
    id: '9',
    slug: 'corduroy-tan',
    sku: 'SEC-009',
    name: 'Corduroy Tan',
    type: 'Dad Hat',
    colors: ['Beige', 'Café'],
    images: [
      '/images/products/sec-009-1.jpg',
    ],
    description: 'Dad hat en pana color tan. Textura premium y acabado artesanal. Perfecta para el invierno.',
    createdAt: '2024-03-01',
  },
  {
    id: '10',
    slug: 'monogram-bucket',
    sku: 'SEC-010',
    name: 'Monogram Bucket',
    type: 'Bucket',
    colors: ['Negro', 'Crema'],
    images: [
      '/images/products/sec-010-1.jpg',
    ],
    description: 'Bucket hat con patrón de monograma all-over. Diseño exclusivo de temporada.',
    createdAt: '2024-03-05',
  },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByType = (type: string) => products.filter(p => p.type === type);
export const getAllTypes = () => Array.from(new Set(products.map(p => p.type)));
export const getAllColors = () => Array.from(new Set(products.flatMap(p => p.colors)));
