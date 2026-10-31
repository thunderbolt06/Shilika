import type { Metadata } from 'next';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { PhotoBand } from '@/components/site/Media';
import {
  AUDIENCE_LABEL,
  BOOKING_URL,
  FORMATS,
  PROGRAMS,
  TEACHING_RECORD,
  coursePath,
  programsFor,
  type Audience,
} from '@/data/courses';
import { SITE_AUTHOR, SITE_PUBLISHER, articleNode } from '@/lib/article-schema';
import { ogImage } from '@/lib/i18n/og';
import '../blog/blog.css';
import './courses.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const CARD = ogImage('/speaker', SITE_URL);
const URL = `${SITE_URL}/courses`;

const TITLE = 'PR Workshops, Masterclasses & Courses by Shilika Jain';
const DESCRIPTION =
  'PR workshops, media training, guest lectures and courses for students, C-suite and founders, as a 1-hour masterclass, 3-day workshop or 6-module course.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website', images: [CARD] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [{ url: CARD.url, alt: CARD.alt }] },
};

const ANSWER =
  'Shilika Jain teaches public relations as workshops, masterclasses, guest lectures, media training and multi-module courses. There are eight programs for students, C-suite executives and founders. Each one comes in three depths: a one-hour masterclass built on a single slide deck, a three-day workshop with daily deliverables, and a six-module course with activities and quizzes.';

const SECTIONS: { audience: Audience; heading: string; lede: string }[] = [
  {
    audience: 'students',
    heading: 'PR workshops for students',
    lede: 'For universities, business schools and mass communication departments. One program explains how PR and newsrooms work, one is a hands-on lab where every session produces a portfolio piece, and one is a guest lecture on PR and corporate communications.',
  },
  {
    audience: 'c-suite',
    heading: 'Media training for C-suite executives',
    lede: 'For CEOs, CXOs and spokespeople who are about to face reporters, podcast hosts or a hard question on a panel. Message discipline, interview formats and crisis statements, rehearsed on camera.',
  },
  {
    audience: 'operators',
    heading: 'PR courses for founders and operators',
    lede: 'For founders, first marketing hires and accelerator cohorts who want to run their own press. Positioning, media outreach, press releases and storytelling, with versions for AI and Web3 founders and for teams launching across borders.',
  },
];

const FAQS = [
  {
    q: 'Does Shilika Jain run PR workshops for universities and colleges?',
    a: 'Yes. She has spoken to students at SJCC in Bengaluru and been invited to speak at an IIT event. The student programs run as guest lectures, three-day immersion workshops or semester-length courses with quizzes and a graded capstone.',
  },
  {
    q: 'What is the difference between the masterclass, the workshop and the course?',
    a: 'The masterclass is one hour and one slide deck. The workshop is three days of teaching and live exercises with a deliverable each day. The course is six modules, each with its own deck, an activity and a quiz, plus a capstone Shilika reviews.',
  },
  {
    q: 'Can the workshops run online?',
    a: 'The one-hour masterclass and the six-module course work well online. The three-day workshop works best in person, inside an accelerator, an offsite or a university immersion week.',
  },
  {
    q: 'How much does a PR workshop with Shilika Jain cost?',
    a: 'Pricing is quoted per cohort, based on format, group size and location. Student and non-profit sessions are often considered pro bono. A 30-minute call is enough to scope it.',
  },
  {
    q: 'Can a program be customised for our company or sector?',
    a: 'Yes. Every exercise can use your own company, roadmap and target outlets, and the case studies can be swapped for your sector. Founder cohorts usually work on their real launches.',
  },
  {
    q: 'Does Shilika also speak at conferences?',
    a: 'Yes. Keynotes, panels, fireside chats and podcasts are on the speaker page. This page covers the teaching formats: workshops, masterclasses, guest lectures and courses.',
  },
];

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': URL,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en',
        mainEntity: { '@id': `${URL}#programs` },
      },
      {
        '@type': 'ItemList',
        '@id': `${URL}#programs`,
        name: 'PR courses and workshops by Shilika Jain',
        numberOfItems: PROGRAMS.length,
        itemListElement: PROGRAMS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${coursePath(p)}`,
          item: {
            '@type': 'Course',
            '@id': `${SITE_URL}${coursePath(p)}#course`,
            name: p.title,
            description: p.answer,
            url: `${SITE_URL}${coursePath(p)}`,
            provider: { '@id': SITE_PUBLISHER['@id'] },
          },
        })),
      },
      SITE_AUTHOR,
      SITE_PUBLISHER,
      articleNode({
        url: URL,
        headline: TITLE,
        description: DESCRIPTION,
        datePublished: PROGRAMS.map((p) => p.datePublished).sort()[0],
        dateModified: PROGRAMS.map((p) => p.dateModified).sort().at(-1)!,
        about: `${URL}#programs`,
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Courses & workshops', item: URL },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${URL}#faq`,
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}

export default function CoursesHubPage() {
  const jsonLd = JSON.stringify(buildJsonLd());
  return (
    <>
      <script id="courses-hub-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <EditorialShell>
        <main className="blog-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Courses &amp; workshops · {PROGRAMS.length} programs
                </p>
                <h1 className="blog-index-title">
                  PR workshops, masterclasses <em>and courses</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>{ANSWER}</p>
              </div>
            </section>

            <PhotoBand
              id="library"
              eyebrow="Taught by an operator"
              title={
                <>
                  Lessons from live campaigns, <em>not a textbook</em>.
                </>
              }
              sub="Every module uses work Shilika ran: GAIA, Fluence, RARI Chain, MANTRA Chain, Web3Auth and APAC launches."
              sizes="(min-width: 1344px) 1280px, 100vw"
            />

            <section className="course-hub-section prose-shilika course-hub-prose" aria-labelledby="formats-h">
              <h2 id="formats-h">Three depths for every program</h2>
              <p>
                Pick the depth that fits the room. The same program can start as a one-hour masterclass and grow into
                a full course for the next cohort.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Format</th>
                      <th>Length</th>
                      <th>How it runs</th>
                      <th>Best for</th>
                      <th>Leaves people with</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FORMATS.map((f) => (
                      <tr key={f.id}>
                        <td><strong>{f.name}</strong></td>
                        <td>{f.length}</td>
                        <td>{f.shape}</td>
                        <td>{f.bestFor}</td>
                        <td>{f.takeaway}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {SECTIONS.map((s) => (
              <section key={s.audience} className="course-hub-section" aria-labelledby={`aud-${s.audience}`}>
                <h2 id={`aud-${s.audience}`}>{s.heading}</h2>
                <p className="course-hub-lede">{s.lede}</p>
                <div className="course-grid">
                  {programsFor(s.audience).map((p) => (
                    <a key={p.slug} href={coursePath(p)} className="course-card" data-magnet>
                      <span className="course-card-kind">
                        {p.kind}
                        {p.primaryAudience !== s.audience ? ` · adapts for ${AUDIENCE_LABEL[s.audience].toLowerCase()}` : ''}
                      </span>
                      <h3 className="course-card-title">{p.cardTitle}</h3>
                      <p className="course-card-blurb">{p.bestFor}</p>
                      <span className="course-card-cta">See the syllabus</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            <section className="course-hub-section prose-shilika course-hub-prose" aria-labelledby="record-h">
              <h2 id="record-h">Where has Shilika Jain taught and spoken?</h2>
              <p>
                Shilika has taught PR to accelerator founders, university students and Web3 builders since 2022. Each
                item links to her own post about it. She trained in public speaking through Toastmasters and has
                interviewed founders herself as a CryptoDaily UK contributor, so she teaches both sides of the
                interview.
              </p>
              <ul className="course-record">
                {TEACHING_RECORD.map((t) => (
                  <li key={t.href}>
                    <time>{t.date}</time>
                    <a href={t.href} target="_blank" rel="noopener">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Booking a keynote, panel or podcast instead? See the <a href="/speaker">speaker page</a>.
              </p>
            </section>

            <section className="course-hub-section prose-shilika course-hub-prose" aria-labelledby="faq-h">
              <h2 id="faq-h">Frequently asked questions</h2>
              {FAQS.map((f) => (
                <div className="glossary-faq-item" key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>

            <div className="post-cta">
              <p className="post-cta-kicker">
                <span className="post-cta-dot" /> Book a program
              </p>
              <h3>
                Bring a workshop to <em>your</em> cohort, class or team.
              </h3>
              <p>
                Share the audience, group size and dates. Shilika will suggest the program and depth, then tailor the
                decks, exercises and quizzes.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="post-cta-sticky" data-magnet>
                Book a 30-min scoping call
              </a>
            </div>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
