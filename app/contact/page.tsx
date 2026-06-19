import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Contact: Book a 30-min Web3 & AI PR Teardown',
  description:
    "Have a launch on the horizon? Send a note or book a 30-min intro call - I'll come prepped with a teardown of your current press footprint.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact: Book a 30-min Web3 & AI PR Teardown',
    description:
      "Have a launch on the horizon? Let's plot it. Book a 30-min intro call or send a note.",
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
};

// Snippet ported from the homepage #contact section (contact form + Calendly).
function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/contact-body.html'), 'utf8');
}

export default function Page() {
  return (
    <>
      <EditorialShell>
        <div dangerouslySetInnerHTML={{ __html: loadBody() }} />
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
