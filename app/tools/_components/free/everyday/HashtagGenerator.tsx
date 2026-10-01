'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, useToolResult, Verdict } from '../kit';
import './everyday.css';

type Bank = { label: string; broad: string; mid: string; niche: string };

// Curated banks. Broad = huge reach, high competition. Mid and niche = smaller, more relevant audiences.
const BANKS: Record<string, Bank> = {
  ai: {
    label: 'AI',
    broad: 'AI ArtificialIntelligence Tech Technology Innovation MachineLearning Startups Future',
    mid: 'GenerativeAI AITools LLM AIStartup DeepLearning AIAgents FutureOfWork AIForBusiness OpenSource',
    niche: 'AgenticAI AIProductivity BuildInPublic AIFounders PromptEngineering ResponsibleAI AIEngineering RAG',
  },
  web3: {
    label: 'Web3 / crypto',
    broad: 'Crypto Web3 Blockchain Bitcoin Ethereum Cryptocurrency DeFi NFT',
    mid: 'CryptoNews Altcoins Solana Layer2 Tokenomics DAO OnChain CryptoCommunity Airdrop',
    niche: 'RWA ZKProofs Restaking DePIN Web3Builders CryptoFounders TokenLaunch Web3Marketing',
  },
  startups: {
    label: 'Startups',
    broad: 'Startup Startups Entrepreneur Business Entrepreneurship Founder Innovation SmallBusiness',
    mid: 'StartupLife Founders VentureCapital Fundraising SeedFunding StartupTips GrowthHacking ProductMarketFit Bootstrapping',
    niche: 'FounderLed BuildInPublic PreSeed StartupLessons SoloFounder FounderJourney YCombinator StartupGrowth',
  },
  saas: {
    label: 'SaaS / B2B',
    broad: 'SaaS B2B Tech Software Business Marketing Sales Cloud',
    mid: 'B2BMarketing SaaSMarketing ProductLed DemandGen RevOps SaaSGrowth B2BSales CustomerSuccess ABM',
    niche: 'PLG SaaSFounders ChurnReduction PipelineGeneration B2BSaaS GTMStrategy SalesEnablement MRR',
  },
  marketing: {
    label: 'Marketing',
    broad: 'Marketing DigitalMarketing SocialMedia Branding ContentMarketing SEO Business Advertising',
    mid: 'MarketingStrategy ContentStrategy SocialMediaMarketing EmailMarketing BrandStrategy MarketingTips GrowthMarketing Copywriting PerformanceMarketing',
    niche: 'GEO AISearch MarketingOps CommunityLed FractionalCMO B2BContent DistributionStrategy BrandVoice',
  },
  pr: {
    label: 'PR & media',
    broad: 'PR PublicRelations Media Communications Marketing News Journalism Branding',
    mid: 'PRTips MediaRelations Storytelling ThoughtLeadership PressRelease CrisisCommunications PRStrategy Reputation EarnedMedia',
    niche: 'FounderPR StartupPR TechPR CryptoPR PRForStartups MediaTraining PitchingTips AIVisibility',
  },
  fintech: {
    label: 'Fintech',
    broad: 'Fintech Finance Banking Payments Money Investing Tech Innovation',
    mid: 'DigitalBanking OpenBanking Insurtech Regtech EmbeddedFinance Neobank PaymentsInnovation WealthTech FinancialInclusion',
    niche: 'Stablecoins BaaS CrossBorderPayments FintechStartup Lendtech FintechFounders RealTimePayments CardIssuing',
  },
  cyber: {
    label: 'Cybersecurity',
    broad: 'Cybersecurity InfoSec Security Tech Privacy DataProtection Hacking IT',
    mid: 'CyberAttack ZeroTrust ThreatIntelligence CloudSecurity Ransomware DataPrivacy SecOps AppSec CISO',
    niche: 'SOC2 DevSecOps IdentitySecurity AISecurity SecurityAwareness ThreatHunting OffensiveSecurity CyberStartup',
  },
  ecommerce: {
    label: 'Ecommerce',
    broad: 'Ecommerce OnlineShopping SmallBusiness Shopify Retail Business Marketing ShopSmall',
    mid: 'DTC EcommerceMarketing OnlineStore ShopifyStore EcommerceTips ProductPhotography Dropshipping SupportSmallBusiness DTCBrand',
    niche: 'EcomFounders ConversionRate RetentionMarketing ShopifyPlus AmazonFBA ClientelingTips UGCCreator SocialCommerce',
  },
  creator: {
    label: 'Creator / personal brand',
    broad: 'PersonalBrand ContentCreator Creator Branding Motivation Leadership Success Entrepreneur',
    mid: 'PersonalBranding CreatorEconomy LinkedInTips ThoughtLeadership ContentCreation CreatorTips Storytelling FounderBrand Writing',
    niche: 'GhostWriting LinkedInCreator CreatorBusiness AudienceBuilding NewsletterGrowth WritingOnline FounderStory BuildInPublic',
  },
  travel: {
    label: 'Travel',
    broad: 'Travel Travelgram Wanderlust Adventure TravelPhotography Explore Vacation Nature',
    mid: 'TravelBlogger SoloTravel TravelTips Backpacking DigitalNomad TravelGuide HiddenGems SlowTravel BudgetTravel',
    niche: 'NomadLife WorkAndTravel RemoteWorkLife TravelHacks OffTheBeatenPath WeekendGetaway CityBreak TravelItinerary',
  },
  fitness: {
    label: 'Fitness',
    broad: 'Fitness Gym Workout Health FitnessMotivation Training Wellness Fit',
    mid: 'StrengthTraining HomeWorkout FitnessJourney PersonalTrainer HealthyLifestyle Running Mobility Nutrition FitnessTips',
    niche: 'Hyrox ZoneTwo ProgressiveOverload FunctionalFitness HybridAthlete WorkoutForBeginners FitOver40 RunClub',
  },
  food: {
    label: 'Food',
    broad: 'Food Foodie Foodstagram Recipe Cooking Yummy Delicious HomeCooking',
    mid: 'EasyRecipes HealthyFood FoodBlogger MealPrep PlantBased FoodPhotography Baking Vegan QuickMeals',
    niche: 'OnePotMeals HighProtein SourdoughBaking WeeknightDinner GutHealth FoodStartup BatchCooking SeasonalEating',
  },
};

const PLATFORMS: { id: string; label: string; rec: number; max: number; note: string }[] = [
  { id: 'instagram', label: 'Instagram', rec: 5, max: 30, note: '3 to 5 recommended, 30 allowed' },
  { id: 'linkedin', label: 'LinkedIn', rec: 5, max: 10, note: '3 to 5 recommended' },
  { id: 'x', label: 'X', rec: 2, max: 5, note: '1 to 2 recommended' },
  { id: 'tiktok', label: 'TikTok', rec: 5, max: 10, note: '3 to 5 recommended' },
  { id: 'youtube', label: 'YouTube', rec: 5, max: 15, note: '3 to 5 recommended, over 15 are ignored' },
];

const BANNED = new Set(
  'followforfollow follow4follow f4f like4like l4l likeforlike likeforlikes likes4likes tagsforlikes followme followback teamfollowback spam4spam instafollow followforfollowback likeforfollow like4follow comment4comment sub4sub'.split(
    ' ',
  ),
);

function camel(phrase: string) {
  return phrase
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (/^[A-Z0-9]+$/.test(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
}

function keywordTags(input: string): string[] {
  const phrases = input
    .split(/[,\n;]+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 6);
  const out: string[] = [];
  const add = (t: string) => {
    if (t && t.length <= 40 && !out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  };
  const bases = phrases.map(camel).filter(Boolean);
  for (const b of bases) add(b);
  for (let i = 0; i < bases.length; i++) {
    for (let j = i + 1; j < bases.length; j++) {
      if ((bases[i] + bases[j]).length <= 28) add(bases[i] + bases[j]);
    }
  }
  for (const b of bases) {
    add(`${b}Tips`);
    add(`${b}2026`);
  }
  for (const p of phrases) {
    const ws = p.split(/\s+/).filter((w) => w.length > 2);
    if (ws.length > 1) for (const w of ws) add(camel(w));
  }
  return out.filter((t) => !BANNED.has(t.toLowerCase())).slice(0, 16);
}

function rng(seed: number) {
  let a = seed + 0x6d2b79f5;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], seed: number): T[] {
  if (!seed) return arr;
  const r = rng(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const split = (s: string) => s.split(/\s+/).filter((t) => t && !BANNED.has(t.toLowerCase()));

export default function HashtagGenerator() {
  const id = useId();
  const [keywords, setKeywords] = useState('AI agents, product launch');
  const [niche, setNiche] = useState('ai');
  const [platform, setPlatform] = useState('linkedin');
  const [seed, setSeed] = useState(0);
  const [picked, setPicked] = useState<string[] | null>(null);

  const plat = PLATFORMS.find((p) => p.id === platform)!;
  const bank = BANKS[niche];

  const groups = useMemo(() => {
    const kw = keywordTags(keywords);
    const seen = new Set(kw.map((t) => t.toLowerCase()));
    const broad = shuffle(split(bank.broad), seed).filter((t) => !seen.has(t.toLowerCase()));
    broad.forEach((t) => seen.add(t.toLowerCase()));
    const nicheTags = shuffle([...split(bank.mid), ...split(bank.niche)], seed).filter((t) => !seen.has(t.toLowerCase()));
    return { broad, niche: nicheTags, kw: shuffle(kw, seed) };
  }, [keywords, bank, seed]);

  const defaults = useMemo(() => {
    const out: string[] = [];
    const n = plat.rec;
    if (n >= 3 && groups.broad[0]) out.push(groups.broad[0]);
    let i = 0;
    while (out.length < n && (i < groups.kw.length || i < groups.niche.length)) {
      if (groups.niche[i] && out.length < n) out.push(groups.niche[i]);
      if (groups.kw[i] && out.length < n) out.push(groups.kw[i]);
      i++;
    }
    return out;
  }, [groups, plat.rec]);

  const selected = picked ?? defaults;
  const selectedText = selected.map((t) => `#${t}`).join(' ');

  function reset<T>(fn: (v: T) => void) {
    return (v: T) => {
      fn(v);
      setPicked(null);
    };
  }

  function toggle(tag: string) {
    const cur = picked ?? defaults;
    if (cur.includes(tag)) setPicked(cur.filter((t) => t !== tag));
    else if (cur.length < plat.max) setPicked([...cur, tag]);
  }

  const count = selected.length;
  const level: 'good' | 'warn' | 'bad' = count === 0 ? 'bad' : count > plat.rec ? 'warn' : 'good';

  const result = count
    ? [
        `Hashtags for ${plat.label} (${bank.label}):`,
        selectedText,
        '',
        `Broad: ${groups.broad.map((t) => '#' + t).join(' ')}`,
        `Niche: ${groups.niche.map((t) => '#' + t).join(' ')}`,
        groups.kw.length ? `From your keywords: ${groups.kw.map((t) => '#' + t).join(' ')}` : null,
      ]
        .filter((l) => l !== null)
        .join('\n')
    : '';
  useToolResult(result);

  const sections: { title: string; tags: string[]; hint: string }[] = [
    { title: 'Broad', tags: groups.broad, hint: 'Big reach, heavy competition. Use one at most.' },
    { title: 'Niche', tags: groups.niche, hint: 'Smaller, more relevant audiences. Your best bets.' },
    { title: 'From your keywords', tags: groups.kw, hint: 'Check each one on the platform before you use it.' },
  ];

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-field">
          <label htmlFor={`${id}-kw`}>Topic or keywords</label>
          <input id={`${id}-kw`} value={keywords} onChange={(e) => reset(setKeywords)(e.target.value)} placeholder="AI agents, product launch" />
        </div>
        <p className="ft-hint ev-hint-tight">Separate topics with commas.</p>
        <div className="ft-row">
          <div className="ft-field">
            <label htmlFor={`${id}-niche`}>Niche</label>
            <select id={`${id}-niche`} value={niche} onChange={(e) => reset(setNiche)(e.target.value)}>
              {Object.entries(BANKS).map(([k, b]) => (
                <option key={k} value={k}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-plat`}>Platform</label>
            <select id={`${id}-plat`} value={platform} onChange={(e) => reset(setPlatform)(e.target.value)}>
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="ft-hint">{plat.label}: {plat.note}.</p>

        <div className="ev-selected" aria-live="polite">
          <div className="ev-selected-top">
            <p className="ft-label">Selected</p>
            <Verdict level={level}>
              {count} / {plat.rec} recommended
            </Verdict>
          </div>
          {count ? <p className="ev-selected-tags">{selectedText}</p> : <p className="ft-empty">Tap hashtags to add them.</p>}
          {count >= plat.max ? (
            <p className="ft-hint">That is the cap for {plat.label}. Remove one to add another.</p>
          ) : count > plat.rec ? (
            <p className="ft-hint">More than {plat.rec} can look spammy on {plat.label}.</p>
          ) : null}
          <div className="ft-actions">
            <CopyButton text={selectedText} label={`Copy selected (${count})`} className="tool-btn tool-btn-primary" />
            <button
              type="button"
              className="tool-btn tool-btn-small"
              onClick={() => {
                setSeed((s) => s + 1 + Math.floor(Math.random() * 1000));
                setPicked(null);
              }}
            >
              Shuffle
            </button>
            <button type="button" className="tool-btn tool-btn-small" onClick={() => setPicked([])} disabled={!count}>
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="ft-card">
        {sections.map((s) =>
          s.tags.length ? (
            <div key={s.title} className="ev-tag-group">
              <p className="ft-label">{s.title}</p>
              <div className="ft-chips" role="group" aria-label={`${s.title} hashtags`}>
                {s.tags.map((t) => (
                  <button key={t} type="button" className="ft-chip" aria-pressed={selected.includes(t)} onClick={() => toggle(t)}>
                    #{t}
                  </button>
                ))}
              </div>
              <p className="ft-hint ev-mt-s">{s.hint}</p>
            </div>
          ) : null,
        )}
        <p className="ft-hint">Spammy tags like #followforfollow and #like4like are always left out.</p>
      </div>
    </div>
  );
}
