'use client';

import Image from 'next/image';
import { useMemo } from 'react';

const heroImages = [
  '/products/barbas-hats-b-star/barbas-hats-b-star.jpg',
  '/products/barbas-hats-chrome-gold/barbas-hats-chrome-gold.jpg',
  '/products/barbas-hats-ct-galaxy-ct/barbas-hats-ct-galaxy-ct.jpg',
  '/products/barbas-hats-ct-rockstar/barbas-hats-ct-rockstar.jpg',
  '/products/dandy-hats-canelo-ca-tiffany/dandy-hats-canelo-ca-tiffany.jpg',
];

export default function HeroImageRotator() {
  const selectedImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    return heroImages[randomIndex];
  }, []);

  return (
    <Image
      src={selectedImage}
      alt="Gorra destacada de Salva Exclusive Caps"
      fill
      priority
      className="object-cover"
    />
  );
}
