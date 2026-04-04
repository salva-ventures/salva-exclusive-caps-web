export interface Drop {
  id: string;
  slug: string;
  name: string;
  description: string;
  date: string;
  status: 'upcoming' | 'active' | 'sold-out';
  image: string;
  items: number;
}

export const drops: Drop[] = [
  {
    id: '1',
    slug: 'drop-001-origins',
    name: 'DROP 001 — ORIGINS',
    description: 'La colección inaugural. Piezas que definen la identidad visual de Salva Exclusive Caps. Diseño depurado, materiales premium, identidad sin compromiso.',
    date: '2024-03-15',
    status: 'active',
    image: 'https://picsum.photos/seed/drop1/1200/800',
    items: 4,
  },
  {
    id: '2',
    slug: 'drop-002-nocturna',
    name: 'DROP 002 — NOCTURNA',
    description: 'Una colección oscura e intensa. Inspirada en la noche y el movimiento urbano nocturno. Tonos profundos y siluetas poderosas.',
    date: '2024-06-01',
    status: 'upcoming',
    image: 'https://picsum.photos/seed/drop2/1200/800',
    items: 5,
  },
  {
    id: '3',
    slug: 'drop-003-archivo',
    name: 'DROP 003 — ARCHIVO',
    description: 'Edición especial de archivo. Reinterpretaciones de piezas icónicas de la marca con materiales de siguiente nivel.',
    date: '2024-09-15',
    status: 'upcoming',
    image: 'https://picsum.photos/seed/drop3/1200/800',
    items: 3,
  },
];
