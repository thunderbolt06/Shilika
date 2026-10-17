import './ai-seo.css';

/**
 * Wraps every /services/ai-seo page. Chrome (nav, footer, cursor, scripts)
 * comes from app/services/layout.tsx; this layer only adds the shared AI SEO
 * stylesheet, whose rules are all scoped under `.aiseo` so they never leak
 * into other routes after a client-side navigation.
 */
export default function AiSeoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
