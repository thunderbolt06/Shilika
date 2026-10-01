import type { ComponentType } from 'react';
import UtmBuilder from './everyday/UtmBuilder';
import SerpChecker from './everyday/SerpChecker';
import HeadlineAnalyzer from './everyday/HeadlineAnalyzer';
import CharacterCounter from './everyday/CharacterCounter';
import QrCodeGenerator from './everyday/QrCodeGenerator';
import HashtagGenerator from './everyday/HashtagGenerator';
import BioCaptionGenerator from './everyday/BioCaptionGenerator';
import SubjectLineTester from './everyday/SubjectLineTester';
import SchemaGenerator from './seo/SchemaGenerator';
import LlmsTxtGenerator from './seo/LlmsTxtGenerator';
import RobotsSitemapGenerator from './seo/RobotsSitemapGenerator';
import OgPreview from './seo/OgPreview';
import KeywordDensity from './seo/KeywordDensity';
import AiCitabilityChecker from './seo/AiCitabilityChecker';
import ReadabilityChecker from './seo/ReadabilityChecker';
import RoiRoasCalculator from './calculators/RoiRoasCalculator';
import AdMetricsCalculator from './calculators/AdMetricsCalculator';
import LtvCacCalculator from './calculators/LtvCacCalculator';
import AbTestCalculator from './calculators/AbTestCalculator';
import AdBudgetPlanner from './calculators/AdBudgetPlanner';
import BreakEvenCalculator from './calculators/BreakEvenCalculator';
import PressReleaseGenerator from './pr/PressReleaseGenerator';
import PitchEmailBuilder from './pr/PitchEmailBuilder';
import MediaKitBuilder from './pr/MediaKitBuilder';
import BrandBioWriter from './pr/BrandBioWriter';
import ContentCalendar from './pr/ContentCalendar';
import ImageResizer from './pr/ImageResizer';
import ImageCompressor from './pr/ImageCompressor';

// Server-side map. The page renders only the matching client component, and
// Next ships just that component's chunk, so each page stays small.
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  'utm-builder': UtmBuilder,
  'meta-title-description-checker': SerpChecker,
  'headline-analyzer': HeadlineAnalyzer,
  'character-counter': CharacterCounter,
  'qr-code-generator': QrCodeGenerator,
  'hashtag-generator': HashtagGenerator,
  'bio-and-caption-generator': BioCaptionGenerator,
  'email-subject-line-tester': SubjectLineTester,
  'schema-markup-generator': SchemaGenerator,
  'llms-txt-generator': LlmsTxtGenerator,
  'robots-txt-sitemap-generator': RobotsSitemapGenerator,
  'open-graph-preview': OgPreview,
  'keyword-density-checker': KeywordDensity,
  'ai-citability-checker': AiCitabilityChecker,
  'readability-checker': ReadabilityChecker,
  'roi-roas-calculator': RoiRoasCalculator,
  'cpm-cpc-ctr-calculator': AdMetricsCalculator,
  'ltv-cac-calculator': LtvCacCalculator,
  'ab-test-significance-calculator': AbTestCalculator,
  'ad-budget-planner': AdBudgetPlanner,
  'break-even-calculator': BreakEvenCalculator,
  'press-release-generator': PressReleaseGenerator,
  'journalist-pitch-email-builder': PitchEmailBuilder,
  'media-kit-builder': MediaKitBuilder,
  'personal-brand-bio-writer': BrandBioWriter,
  'content-calendar-template': ContentCalendar,
  'social-image-resizer': ImageResizer,
  'image-compressor-converter': ImageCompressor,
};
