export const BRAND = {
  name: 'Salva Exclusive Caps',
  slogan: 'Identidad en cada gorra',
  shortName: 'SALVA',
  tagline: 'Gorras exclusivas con estilo, actitud y presencia.',
  subtitle:
    'Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con costo extra.',
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
    title: 'Salva Exclusive Caps | Gorras exclusivas en México',
    description:
      'Catálogo de gorras exclusivas con entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con costo extra.',
    keywords: [
      'gorras exclusivas',
      'gorras premium',
      'gorras en México',
      'gorras en Tampico',
      'gorras en Ciudad Madero',
      'gorras en Altamira',
      'gorras en Monterrey',
      'Salva Exclusive Caps',
    ] as string[],
  },
} as const;
