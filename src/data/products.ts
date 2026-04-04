export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  collab: string | null;
  tipo: string;
  colors: string[];
  shortDescription: string;
  images: string[];
  featured?: boolean;
  sortOrder: number;
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'barbas-hats-ct-rockstar',
    sku: 'SEC-001',
    name: 'Barbas Hats x CT | Rockstar',
    brand: 'Barbas Hats',
    collab: 'CT',
    tipo: 'Colaboraciones',
    colors: ['negro', 'blanco'],
    shortDescription:
      'Diseño con presencia clara y estética urbana. Proyecta identidad fuerte para uso diario o salida especial. Una pieza confiable dentro de la línea colaborativa.',
    images: ['/products/barbas-hats-ct-rockstar/1.jpg'],
    featured: true,
    sortOrder: 1,
    relatedSlugs: ['barbas-hats-chrome-gold', 'barbas-hats-ct-galaxy-ct', 'el-barbas-hats-skate-or-die'],
  },
  {
    id: '2',
    slug: 'barbas-hats-chrome-gold',
    sku: 'SEC-002',
    name: 'Barbas Hats | Chrome Gold',
    brand: 'Barbas Hats',
    collab: null,
    tipo: 'Detalles metálicos',
    colors: ['negro', 'dorado'],
    shortDescription:
      'Acabado visual limpio con acento dorado protagonista. Mantiene un balance serio entre estilo urbano y presencia premium. Ideal para elevar cualquier combinación.',
    images: ['/products/barbas-hats-chrome-gold/1.jpg'],
    featured: true,
    sortOrder: 2,
    relatedSlugs: ['barbas-hats-ct-rockstar', 'barbas-hats-ct-galaxy-ct', 'dandy-hats-canelo-ca-tiffany'],
  },
  {
    id: '3',
    slug: '31-hats-el-mago-total-black',
    sku: 'SEC-003',
    name: '31 Hats x El Mago | Total Black',
    brand: '31 Hats',
    collab: 'El Mago',
    tipo: 'Diseño full black',
    colors: ['negro'],
    shortDescription:
      'Lectura monocromática con enfoque sobrio y contundente. Su perfil negro completo encaja con una estética urbana refinada. Diseñada para uso versátil sin perder carácter.',
    images: ['/products/31-hats-el-mago-total-black/1.jpg'],
    featured: true,
    sortOrder: 3,
    relatedSlugs: ['31-hats-el-mago-magic-club', '31-hats-new-york-flames', 'muratravis-innedit-flvwe-negro'],
  },
  {
    id: '4',
    slug: 'gallo-fino-tito-double-p-la-people',
    sku: 'SEC-004',
    name: 'Gallo Fino x Tito Double P | La People',
    brand: 'Gallo Fino',
    collab: 'Tito Double P',
    tipo: 'Colaboraciones',
    colors: ['negro', 'rojo'],
    shortDescription:
      'Propuesta colaborativa con identidad directa y urbana. Integra elementos visuales que comunican actitud sin exceso. Una silueta sólida para quienes buscan diferenciación real.',
    images: ['/products/gallo-fino-tito-double-p-la-people/1.jpg'],
    featured: true,
    sortOrder: 4,
    relatedSlugs: ['dandy-hats-lost-hills-lost-dandy', 'dandy-hats-junior-h', 'rude-awakenings-la-ultima-cena'],
  },
  {
    id: '5',
    slug: 'dandy-hats-lost-hills-lost-dandy',
    sku: 'SEC-005',
    name: 'Dandy Hats x Lost Hills | Lost Dandy',
    brand: 'Dandy Hats',
    collab: 'Lost Hills',
    tipo: 'Colaboraciones',
    colors: ['negro', 'blanco'],
    shortDescription:
      'Colaboración enfocada en estilo urbano contemporáneo. Presenta una identidad visual firme y fácil de combinar. Construye presencia sin sacrificar limpieza estética.',
    images: ['/products/dandy-hats-lost-hills-lost-dandy/1.jpg'],
    featured: true,
    sortOrder: 5,
    relatedSlugs: ['dandy-hats-junior-h', 'dandy-hats-canelo-ca-tiffany', 'dandy-hats-la-plaid'],
  },
  {
    id: '6',
    slug: '31-hats-new-york-flames',
    sku: 'SEC-006',
    name: '31 Hats | New York Flames',
    brand: '31 Hats',
    collab: null,
    tipo: 'Acentos de color',
    colors: ['negro', 'rojo', 'azul'],
    shortDescription:
      'Diseño con contraste dinámico y referencia urbana marcada. Sus acentos de color aportan energía visual controlada. Mantiene un perfil confiable para uso constante.',
    images: ['/products/31-hats-new-york-flames/1.jpg'],
    featured: true,
    sortOrder: 6,
    relatedSlugs: ['31-hats-el-mago-magic-club', '31-hats-ny-crystal', 'gallo-fino-tito-double-p-la-people'],
  },
  {
    id: '7',
    slug: 'barbas-hats-ct-galaxy-ct',
    sku: 'SEC-007',
    name: 'Barbas Hats x CT | Galaxy CT',
    brand: 'Barbas Hats',
    collab: 'CT',
    tipo: 'Edición especial',
    colors: ['negro', 'azul', 'plateado'],
    shortDescription:
      'Concepto gráfico con lectura nocturna y detalle brillante. Conserva una línea premium con enfoque urbano actual. Hecha para destacar con criterio y personalidad.',
    images: ['/products/barbas-hats-ct-galaxy-ct/1.jpg'],
    featured: true,
    sortOrder: 7,
    relatedSlugs: ['barbas-hats-ct-rockstar', 'barbas-hats-chrome-gold', '31-hats-ny-crystal'],
  },
  {
    id: '8',
    slug: 'innedit-anymore-muratravis-electric',
    sku: 'SEC-008',
    name: 'Innedit x Anymore | Muratravis Electric',
    brand: 'Innedit',
    collab: 'Anymore',
    tipo: 'Edición especial',
    colors: ['negro', 'turquesa', 'plateado'],
    shortDescription:
      'Estética experimental con una ejecución visual precisa. La combinación de tonos transmite fuerza y modernidad urbana. Funciona como pieza central en cualquier outfit.',
    images: ['/products/innedit-anymore-muratravis-electric/1.jpg'],
    featured: true,
    sortOrder: 8,
    relatedSlugs: ['muratravis-innedit-flvwe-negro', '31-hats-ny-crystal', 'rude-awakenings-la-ultima-cena'],
  },
  {
    id: '9',
    slug: '31-hats-el-mago-magic-club',
    sku: 'SEC-009',
    name: '31 Hats x El Mago | Magic Club',
    brand: '31 Hats',
    collab: 'El Mago',
    tipo: 'Bordado gráfico',
    colors: ['negro', 'blanco', 'rojo'],
    shortDescription:
      'Gráfico bordado con lenguaje visual definido y urbano. Mantiene presencia frontal clara sin perder sobriedad. Una opción confiable para rotación diaria.',
    images: ['/products/31-hats-el-mago-magic-club/1.jpg'],
    featured: true,
    sortOrder: 9,
    relatedSlugs: ['31-hats-el-mago-total-black', '31-hats-new-york-flames', '31-hats-ny-crystal'],
  },
  {
    id: '10',
    slug: 'dandy-hats-junior-h',
    sku: 'SEC-010',
    name: 'Dandy Hats x Junior H',
    brand: 'Dandy Hats',
    collab: 'Junior H',
    tipo: 'Colaboraciones',
    colors: ['negro', 'gris'],
    shortDescription:
      'Colaboración con presencia sólida y enfoque urbano elegante. Su lectura visual es directa y equilibrada. Pensada para quienes priorizan estilo con identidad propia.',
    images: ['/products/dandy-hats-junior-h/1.jpg'],
    featured: true,
    sortOrder: 10,
    relatedSlugs: ['dandy-hats-lost-hills-lost-dandy', 'dandy-hats-canelo-ca-tiffany', 'dandy-hats-la-plaid'],
  },
  {
    id: '11',
    slug: 'dandy-hats-canelo-ca-tiffany',
    sku: 'SEC-011',
    name: 'Dandy Hats x Canelo | CA Tiffany',
    brand: 'Dandy Hats',
    collab: 'Canelo',
    tipo: 'Acentos de color',
    colors: ['negro', 'turquesa', 'blanco'],
    shortDescription:
      'Paleta con acento turquesa que aporta carácter inmediato. Conserva una base urbana seria y bien definida. Es una pieza versátil para elevar el look sin exceso.',
    images: ['/products/dandy-hats-canelo-ca-tiffany/1.jpg'],
    featured: true,
    sortOrder: 11,
    relatedSlugs: ['dandy-hats-junior-h', 'dandy-hats-la-plaid', 'barbas-hats-chrome-gold'],
  },
  {
    id: '12',
    slug: 'muratravis-innedit-flvwe-negro',
    sku: 'SEC-012',
    name: 'Muratravis Innedit Flvwe Negro',
    brand: 'Muratravis',
    collab: 'Innedit',
    tipo: 'Diseño full black',
    colors: ['negro', 'plateado'],
    shortDescription:
      'Versión oscura con estética limpia y contundente. Integra detalles que refuerzan una identidad urbana madura. Se adapta con facilidad a estilos de alto contraste.',
    images: ['/products/muratravis-innedit-flvwe-negro/1.jpg'],
    featured: true,
    sortOrder: 12,
    relatedSlugs: ['innedit-anymore-muratravis-electric', '31-hats-el-mago-total-black', 'rude-awakenings-la-ultima-cena'],
  },
  {
    id: '13',
    slug: 'el-barbas-hats-skate-or-die',
    sku: 'SEC-013',
    name: 'El Barbas Hats | Skate Or Die',
    brand: 'El Barbas Hats',
    collab: null,
    tipo: 'Bordado gráfico',
    colors: ['negro', 'blanco', 'rojo'],
    shortDescription:
      'Gráfico frontal con actitud urbana marcada y lectura clara. Ofrece presencia visual fuerte sin perder equilibrio. Ideal para quienes buscan una propuesta con personalidad.',
    images: ['/products/el-barbas-hats-skate-or-die/1.jpg'],
    featured: true,
    sortOrder: 13,
    relatedSlugs: ['barbas-hats-ct-rockstar', '31-hats-el-mago-magic-club', 'gallo-fino-tito-double-p-la-people'],
  },
  {
    id: '14',
    slug: 'dandy-hats-la-plaid',
    sku: 'SEC-014',
    name: 'Dandy Hats | LA Plaid',
    brand: 'Dandy Hats',
    collab: null,
    tipo: 'Acentos de color',
    colors: ['negro', 'gris', 'blanco'],
    shortDescription:
      'Diseño con acentos equilibrados y enfoque metropolitano. Proyecta una imagen pulida para uso diario y nocturno. Combina bien con estilos urbanos de base neutra.',
    images: ['/products/dandy-hats-la-plaid/1.jpg'],
    featured: true,
    sortOrder: 14,
    relatedSlugs: ['dandy-hats-junior-h', 'dandy-hats-canelo-ca-tiffany', '31-hats-ny-crystal'],
  },
  {
    id: '15',
    slug: '31-hats-ny-crystal',
    sku: 'SEC-015',
    name: '31 Hats | Ny Crystal',
    brand: '31 Hats',
    collab: null,
    tipo: 'Detalles metálicos',
    colors: ['negro', 'plateado', 'azul'],
    shortDescription:
      'Detalle brillante integrado con una base urbana sobria. Logra una presencia premium sin perder funcionalidad diaria. Una pieza sólida para rotación frecuente.',
    images: ['/products/31-hats-ny-crystal/1.jpg'],
    featured: true,
    sortOrder: 15,
    relatedSlugs: ['31-hats-new-york-flames', 'barbas-hats-ct-galaxy-ct', 'innedit-anymore-muratravis-electric'],
  },
  {
    id: '16',
    slug: 'rude-awakenings-la-ultima-cena',
    sku: 'SEC-016',
    name: 'Rude Awakenings | La Última Cena',
    brand: 'Rude Awakenings',
    collab: null,
    tipo: 'Edición especial',
    colors: ['negro', 'blanco', 'dorado'],
    shortDescription:
      'Edición de alto impacto visual con narrativa urbana clara. Su composición proyecta presencia seria y distintiva. Diseñada para quienes buscan un statement auténtico.',
    images: ['/products/rude-awakenings-la-ultima-cena/1.jpg'],
    featured: true,
    sortOrder: 16,
    relatedSlugs: ['innedit-anymore-muratravis-electric', 'muratravis-innedit-flvwe-negro', 'gallo-fino-tito-double-p-la-people'],
  },
  {
  id: '17',
  slug: 'barbas-hats-b-star',
  sku: 'SEC-017',
  name: 'Barbas Hats | B Star',
  brand: 'Barbas Hats',
  collab: null,
  tipo: 'Detalles metálicos',
  colors: ['azul marino', 'rojo', 'plateado'],
  shortDescription:
    'Diseño premium con base azul marino, bordado rojo de alto contraste y estrella metálica al frente. Proyecta una presencia fuerte, limpia y distintiva dentro de la línea Barbas Hats.',
  images: ['/products/barbas-hats-b-star/1.jpg'],
  featured: true,
  sortOrder: 17,
  relatedSlugs: ['barbas-hats-ct-rockstar', 'barbas-hats-chrome-gold', 'barbas-hats-ct-galaxy-ct'],
}
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByType = (tipo: string) => products.filter(p => p.tipo === tipo);
export const getAllTypes = () => Array.from(new Set(products.map(p => p.tipo)));
export const getAllColors = () => Array.from(new Set(products.flatMap(p => p.colors)));
