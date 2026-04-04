export const BRAND = {
  name: 'Salva Exclusive Caps',
  slogan: 'Identidad en cada gorra',
  shortName: 'SALVA',
  tagline: 'Salva Exclusive Caps: estilo, exclusividad y actitud en cada gorra.',
  subtitle: 'Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con costo extra.',
} as const;

export const CONTACT = {
  whatsapp: {
    number: '+528335340498',
    displayNumber: '+52 833 534 0498',
    defaultMessage: 'Hola, me interesa una gorra de Salva Exclusive Caps',
  },
  social: {
    instagram: 'salvaexclusive.caps',
    instagramUrl: 'https://instagram.com/salvaexclusive.caps',
    tiktok: 'lehisalva',
    tiktokUrl: 'https://tiktok.com/@lehisalva',
    facebook: 'Salva Exclusive Caps',
    facebookUrl: 'https://facebook.com/SalvaExclusiveCaps',
  },
  showroom: {
    city: 'Monterrey',
    address: 'Zona Tec, Col. Valle Primavera, Calle Valle Primavera 2992',
  },
} as const;

export const DELIVERY_INFO = {
  immediate: ['Tampico', 'Madero', 'Altamira', 'Monterrey'],
  national: true,
  international: true,
  hours: '24 horas',
} as const;

export const SEO = {
  default: {
    title: 'Salva Exclusive Caps — Gorras Premium México',
    description: 'Salva Exclusive Caps es una marca de venta de gorras exclusivas con entrega inmediata en Tampico, Madero, Altamira y Monterrey, además de envíos nacionales e internacionales.',
    keywords: ['gorras exclusivas', 'gorras premium', 'gorras en Tampico', 'gorras en Ciudad Madero', 'gorras en Altamira', 'gorras en Monterrey', 'compra de gorras en México'] as string[],
  },
};
