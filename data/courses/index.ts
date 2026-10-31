import type { Audience, Program } from './types';
import { founderPrCourse } from './founder-pr-course';
import { publicRelationsWorkshopForStudents } from './public-relations-workshop-for-students';
import { practicalPrWorkshopForStudents } from './practical-pr-workshop-for-students';
import { mediaTrainingForExecutives } from './media-training-for-executives';
import { internationalPrMasterclass } from './international-pr-masterclass';
import { prWorkshopForAiFounders } from './pr-workshop-for-ai-founders';
import { prGuestSpeaker } from './pr-guest-speaker';
import { prWorkshopForWeb3Founders } from './pr-workshop-for-web3-founders';

export * from './types';
export * from './shared';

// Hub order: students first, then executives, then founders and operators.
export const PROGRAMS: Program[] = [
  publicRelationsWorkshopForStudents,
  practicalPrWorkshopForStudents,
  prGuestSpeaker,
  mediaTrainingForExecutives,
  founderPrCourse,
  prWorkshopForAiFounders,
  prWorkshopForWeb3Founders,
  internationalPrMasterclass,
];

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

// Every program adapts to all three audiences, so the hub lists a hand-picked set per
// audience: programs built for it first, then the ones that adapt best.
const HUB_PICKS: Record<Audience, string[]> = {
  students: [
    'public-relations-workshop-for-students',
    'practical-pr-workshop-for-students',
    'pr-guest-speaker',
    'founder-pr-course',
  ],
  'c-suite': [
    'media-training-for-executives',
    'pr-guest-speaker',
    'international-pr-masterclass',
    'founder-pr-course',
  ],
  operators: [
    'founder-pr-course',
    'pr-workshop-for-ai-founders',
    'pr-workshop-for-web3-founders',
    'international-pr-masterclass',
    'media-training-for-executives',
  ],
};

export function programsFor(audience: Audience): Program[] {
  return HUB_PICKS[audience].map((slug) => getProgram(slug)).filter((p): p is Program => Boolean(p));
}

export const coursePath = (p: Pick<Program, 'slug'>) => `/courses/${p.slug}`;
