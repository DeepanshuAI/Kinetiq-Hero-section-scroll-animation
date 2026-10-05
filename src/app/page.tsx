'use client';

import dynamic from 'next/dynamic';

const KinetiqHero = dynamic(
  () => import('@/components/hero/KinetiqHero'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <KinetiqHero />
    </main>
  );
}
