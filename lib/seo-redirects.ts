/**
 * SEO 30d D10 (13 Nov 2026): permanent redirects from the SAFE tier of
 * data/seo-30d/redirect-map.csv (0-5 GSC impressions, 90 days to 10 Nov).
 * Each old URL points at the page that already owns its topic.
 * One list, used by next.config.ts redirects(), the sitemap, the /pages and
 * /playbook indexes and the blog post list, so a redirected URL is never
 * linked or listed. No path aliases here: next.config.ts imports this file.
 */
export const SEO_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: '/pages/b2b-tech-pr-agency', destination: '/playbook/b2b-tech-pr-guide-2026' },
  { source: '/pages/web3-pr-agency-usa', destination: '/playbook/best-web3-pr-agency-usa-2026' },
  { source: '/blog/fractional-pr-vs-crypto-pr-agency-cost-benefit', destination: '/playbook/fractional-vs-agency' },
  { source: '/pages/crypto-pr-agency-singapore', destination: '/playbook/best-crypto-pr-agency-singapore-2026' },
  { source: '/pages/crypto-pr-agency-vietnam', destination: '/playbook/crypto-pr-vietnam-2026' },
  { source: '/pages/affordable-crypto-pr-agency', destination: '/playbook/crypto-pr-small-budget-2026' },
  { source: '/pages/apac-crypto-pr-agency', destination: '/services/apac-pr' },
  { source: '/pages/crypto-presale-marketing-agency', destination: '/playbook/crypto-presale-launchpad-marketing-2026' },
  { source: '/pages/enterprise-ai-pr-agency', destination: '/playbook/enterprise-ai-pr-2026' },
  { source: '/pages/fractional-pr-consultant-web3', destination: '/playbook/best-fractional-pr-consultant-web3-2026' },
  { source: '/pages/japan-crypto-pr-agency', destination: '/playbook/crypto-pr-japan-2026' },
  { source: '/pages/tge-pr-agency', destination: '/services/token-launch-pr' },
  { source: '/pages/token-launch-pr-agency', destination: '/services/token-launch-pr' },
  { source: '/pages/web3-pr-agency-uae', destination: '/playbook/crypto-pr-dubai-mena-2026' },
  { source: '/playbook/how-to-choose-web3-pr-agency-checklist-2026', destination: '/playbook/crypto-pr-agency-comparison-2026' },
  { source: '/playbook/web3-marketing-agency-guide-2026', destination: '/playbook/top-crypto-marketing-agencies-2026' },
  { source: '/pages/crypto-pr-agency-dubai', destination: '/playbook/crypto-pr-dubai-mena-2026' },
  { source: '/pages/crypto-pr-consultant', destination: '/services/web3-pr-campaigns' },
  { source: '/pages/cybersecurity-pr-agency', destination: '/services/cybersecurity-pr' },
  { source: '/pages/india-crypto-pr-agency', destination: '/playbook/best-web3-pr-agency-india-2026' },
  { source: '/pages/layer2-pr-agency', destination: '/blog/l1-l2-blockchain-pr-narrative-differentiation-playbook' },
  { source: '/pages/mena-crypto-pr-agency', destination: '/playbook/crypto-pr-dubai-mena-2026' },
  { source: '/pages/apac-token-launch-pr', destination: '/services/token-launch-pr' },
  { source: '/pages/best-crypto-pr-agency', destination: '/playbook/best-web3-pr-agencies-2026' },
  { source: '/pages/crypto-pr-agency-small-budget', destination: '/playbook/crypto-pr-small-budget-2026' },
  { source: '/pages/crypto-publicist', destination: '/playbook/crypto-publicist-vs-agency-2026' },
  { source: '/pages/crypto-token-launch-marketing-agency', destination: '/playbook/best-token-launch-marketing-agencies-2026' },
  { source: '/pages/cybersecurity-pr-agency-usa', destination: '/services/cybersecurity-pr' },
  { source: '/pages/healthcare-ai-pr-agency', destination: '/services/ai-startup-pr' },
  { source: '/pages/b2b-saas-pr-agency', destination: '/playbook/best-b2b-saas-pr-agencies-2026' },
  { source: '/pages/blockchain-gaming-pr-agency', destination: '/playbook/blockchain-gaming-pr-2026' },
  { source: '/pages/crypto-press-release-service', destination: '/playbook/best-crypto-press-release-services-2026' },
  { source: '/pages/pr-agency-for-tech-startups', destination: '/playbook/pr-for-tech-startups-guide-2026' },
];

export const REDIRECTED_PATHS: ReadonlySet<string> = new Set(SEO_REDIRECTS.map((r) => r.source));

export function isRedirectedPath(path: string): boolean {
  return REDIRECTED_PATHS.has(path);
}
