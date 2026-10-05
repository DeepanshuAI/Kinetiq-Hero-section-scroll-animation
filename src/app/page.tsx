'use client';

import dynamic from 'next/dynamic';

const KinetiqHero = dynamic(
  () => import('@/components/hero/KinetiqHero'),
  { ssr: false }
);

const SelectedWork = dynamic(
  () => import('@/components/sections/SelectedWork'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <KinetiqHero />
      <SelectedWork />
    </main>
  );
}
