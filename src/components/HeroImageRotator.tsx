'use client';

import Image from 'next/image';
import { useMemo } from 'react';

const heroImages = [
  '/products/31-hats-el-mago-magic-club/1.jpg',
  '/products/31-hats-el-mago-total-black/1.jpg',
  '/products/barbas-hats-b-star/1.jpg',
  '/products/barbas-hats-chrome-gold/1.jpg',
  '/products/barbas-hats-ct-galaxy-ct/1.jpg',
  '/products/barbas-hats-ct-rockstar/1.jpg',
  '/products/dandy-hats-canelo-ca-tiffany/1.jpg',
  '/products/dandy-hats-junior-h/1.jpg',
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