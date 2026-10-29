import type { Metadata } from 'next';
import { Deck } from './deck';

export const metadata: Metadata = {
  title: 'AI PR - Pitch',
  description:
    'Digital PR for AI startups: organic-first earned media, founder profiling and regional + global outlet access, executed personally by Shilika Jain.',
  robots: { index: false, follow: false },
};

export default async function AiPrPitchPage({
  searchParams,
}: {
  searchParams: Promise<{ print?: string }>;
}) {
  const { print } = await searchParams;
  return <Deck print={print === '1'} />;
}
