import type { Metadata } from 'next';
import { Deck } from './deck';

export const metadata: Metadata = {
  title: 'Web3 PR — Pitch',
  description:
    'Digital PR for Web3 projects: organic-first earned media, founder profiling, token launch comms and APAC regional access, executed personally by Shilika Jain.',
  robots: { index: false, follow: false },
};

export default async function Web3PrPitchPage({
  searchParams,
}: {
  searchParams: Promise<{ print?: string }>;
}) {
  const { print } = await searchParams;
  return <Deck print={print === '1'} />;
}
