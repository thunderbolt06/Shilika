import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { Photo } from '@/components/site/Media';
import {
  AUDIENCE_LABEL,
  BOOKING_URL,
  FORMATS,
  PROGRAMS,
  TEACHING_RECORD,
  coursePath,
  getProgram,
  type Audience,
  type Program,
} from '@/data/courses';
import { SITE_AUTHOR, SITE_PUBLISHER, articleNode } from '@/lib/article-schema';
import { ogImage } from '@/lib/i18n/og';
import '../../blog/blog.css';
import '../courses.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const CARD = ogImage('/speaker', SITE_URL);
const AUDIENCES: Audience[] = ['students', 'c-suite', 'operators'];

export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) return {};
  const url = `${SITE_URL}${coursePath(p)}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: { title: p.metaTitle, description: p.metaDescription, url, type: 'website', images: [CARD] },
    twitter: {
      card: 'summary_large_image',
      title: p.metaTitle,
      description: p.metaDescription,
      images: [{ url: CARD.url, alt: CARD.alt }],
    },
  };
}

const EDU_ROLE: Record<Audience, string> = {
  students: 'student',
  'c-suite': 'executive',
  operators: 'founder',
};

function buildJsonLd(p: Program) {
  const url = `${SITE_URL}${coursePath(p)}`;
  const instructor = { '@id': SITE_AUTHOR['@id'] };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': `${url}#course`,
        name: p.title,
        description: p.answer,
        url,
        inLanguage: 'en',
        provider: { '@id': SITE_PUBLISHER['@id'] },
        creator: instructor,
        about: p.about.map((name) => ({ '@type': 'Thing', name })),
        keywords: p.keywords.join(', '),
        teaches: p.outcomes,
        audience: p.audiences.map((a) => ({
          '@type': 'EducationalAudience',
          educationalRole: EDU_ROLE[a],
          audienceType: AUDIENCE_LABEL[a],
        })),
        offers: { '@type': 'Offer', category: 'Paid', url },
        syllabusSections: p.course.modules.map((m) => ({
          '@type': 'Syllabus',
          name: m.title,
          description: m.summary,
        })),
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            name: `${p.cardTitle}: ${FORMATS[0].name}`,
            description: p.masterclass.summary,
            courseMode: ['Onsite', 'Online'],
            courseWorkload: 'PT1H',
            instructor,
          },
          {
            '@type': 'CourseInstance',
            name: `${p.cardTitle}: ${FORMATS[1].name}`,
            description: p.workshop.summary,
            courseMode: 'Onsite',
            courseWorkload: 'PT18H',
            instructor,
          },
          {
            '@type': 'CourseInstance',
            name: `${p.cardTitle}: ${FORMATS[2].name}`,
            description: `${p.course.summary} ${p.course.cadence}`,
            courseMode: ['Online', 'Blended'],
            courseSchedule: { '@type': 'Schedule', repeatFrequency: 'P1W', repeatCount: p.course.modules.length },
            instructor,
          },
        ],
      },
      { ...SITE_AUTHOR, jobTitle: 'PR consultant and trainer' },
      SITE_PUBLISHER,
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: p.title,
        description: p.metaDescription,
        inLanguage: 'en',
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        mainEntity: { '@id': `${url}#course` },
        isPartOf: { '@id': `${SITE_URL}/courses` },
      },
      articleNode({
        url,
        headline: p.title,
        description: p.metaDescription,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
        about: `${url}#course`,
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Courses & workshops', item: `${SITE_URL}/courses` },
          { '@type': 'ListItem', position: 3, name: p.cardTitle, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: p.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default async function CoursePage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) notFound();

  const jsonLd = JSON.stringify(buildJsonLd(p));
  const modified = new Date(`${p.dateModified}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const siblings = PROGRAMS.filter((o) => o.slug !== p.slug);

  return (
    <>
      <script id={`course-${p.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <EditorialShell>
        <main className="post-page">
          <article className="post-main">
            <header className="post-head">
              <p className="post-kicker">
                <span className="post-kicker-num">{p.kind}</span>
                <a href="/courses">All courses &amp; workshops</a>
                <span>·</span>
                <span>For {AUDIENCE_LABEL[p.primaryAudience].toLowerCase()}</span>
              </p>
              <h1 className="post-title">{p.title}</h1>
              <p className="post-deck">{p.deck}</p>
              <div className="post-meta-row">
                <div className="post-meta-author">
                  <Photo id="stage-b" crop="sq" sizes="44px" alt="" />
                  <div>
                    <p className="post-meta-author-name">
                      Taught by <a href="/about">Shilika Jain</a>
                    </p>
                    <p className="post-meta-author-meta">Updated {modified}</p>
                  </div>
                </div>
              </div>
            </header>

            <div className="post-body-wrap">
              <div className="prose-shilika">
                <div className="glossary-answer">
                  <p className="glossary-answer-label">In short</p>
                  <p>{p.answer}</p>
                </div>

                <nav aria-label="Formats on this page">
                  <ul className="course-jump">
                    <li><a href="#masterclass">1-hour masterclass</a></li>
                    <li><a href="#workshop">3-day workshop</a></li>
                    <li><a href="#course">6-module course</a></li>
                    <li><a href="#audiences">Audiences</a></li>
                    <li><a href="#faq-heading">FAQ</a></li>
                  </ul>
                </nav>

                <h2 id="formats">Which format fits: masterclass, workshop or course?</h2>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Format</th>
                        <th>Length</th>
                        <th>Best for</th>
                        <th>Participants leave with</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href="#masterclass">{FORMATS[0].name}</a></td>
                        <td>{FORMATS[0].length}</td>
                        <td>{FORMATS[0].bestFor}</td>
                        <td>A {p.masterclass.slides.length}-slide framework and a one-page plan.</td>
                      </tr>
                      <tr>
                        <td><a href="#workshop">{FORMATS[1].name}</a></td>
                        <td>{FORMATS[1].length}</td>
                        <td>{FORMATS[1].bestFor}</td>
                        <td>{p.workshop.days[2]?.deliverable}</td>
                      </tr>
                      <tr>
                        <td><a href="#course">{FORMATS[2].name}</a></td>
                        <td>{FORMATS[2].length}</td>
                        <td>{FORMATS[2].bestFor}</td>
                        <td>{p.course.capstone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="outcomes">What will participants be able to do?</h2>
                <ul>
                  {p.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>

                <h2 id="why">Why learn this from Shilika Jain?</h2>
                <ul>
                  {p.proof.map((pr) => (
                    <li key={pr.text}>{pr.href ? <a href={pr.href}>{pr.text}</a> : pr.text}</li>
                  ))}
                </ul>
                {p.quote && (
                  <blockquote>
                    <p>{p.quote.text}</p>
                    <p>
                      <a href={p.quote.href} target="_blank" rel="noopener">
                        Paraphrased from Shilika Jain's post on X, {p.quote.date}
                      </a>
                    </p>
                  </blockquote>
                )}

                <p className="course-format-label">Format 1 · 60 minutes</p>
                <h2 id="masterclass">One-hour masterclass: the slide-by-slide outline</h2>
                <p>{p.masterclass.summary}</p>
                <ol className="course-slides">
                  {p.masterclass.slides.map((s) => (
                    <li key={s.title}>
                      <strong>
                        {s.title}
                        <span className="course-min">{s.minutes} min</span>
                      </strong>
                      {s.point}
                    </li>
                  ))}
                </ol>

                <p className="course-format-label">Format 2 · 3 days</p>
                <h2 id="workshop">Three-day workshop: the day-by-day agenda</h2>
                <p>{p.workshop.summary}</p>
                {p.workshop.days.map((d) => (
                  <section key={d.day} aria-labelledby={`day-${d.day}`}>
                    <h3 id={`day-${d.day}`}>
                      Day {d.day}: {d.theme}
                    </h3>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Session</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.sessions.map((s) => (
                            <tr key={s.title}>
                              <td style={{ whiteSpace: 'nowrap' }}>{s.time}</td>
                              <td>
                                <strong>{s.title}.</strong> {s.detail}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="course-deliverable">
                      <strong>End of day {d.day}:</strong> {d.deliverable}
                    </p>
                  </section>
                ))}

                <p className="course-format-label">Format 3 · {p.course.modules.length} modules</p>
                <h2 id="course">Six-module course: decks, activities and quizzes</h2>
                <p>{p.course.summary}</p>
                <p>
                  <strong>Cadence:</strong> {p.course.cadence}
                </p>
                {p.course.modules.map((m, mi) => (
                  <section className="course-module" key={m.title} aria-labelledby={`module-${mi + 1}`}>
                    <h3 id={`module-${mi + 1}`}>{m.title}</h3>
                    <p className="course-module-deck">{m.deck}</p>
                    <p>{m.summary}</p>
                    <p>
                      <strong>Activity:</strong> {m.activity}
                    </p>
                    <div className="course-quiz">
                      <p>
                        <strong>Quiz</strong>
                      </p>
                      {m.quiz.map((q, qi) => (
                        <div key={q.q}>
                          <p className="course-quiz-q">
                            {qi + 1}. {q.q}
                          </p>
                          <ul className="course-options">
                            {q.options.map((o, oi) => (
                              <li key={o}>
                                <span className="course-opt">{String.fromCharCode(65 + oi)}.</span> {o}
                              </li>
                            ))}
                          </ul>
                          <details>
                            <summary>Show answer</summary>
                            <p>
                              <strong>
                                {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                              </strong>{' '}
                              {q.why}
                            </p>
                          </details>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
                <p className="course-capstone">
                  <strong>Capstone:</strong> {p.course.capstone}
                </p>

                <h2 id="audiences">How does it change for students, C-suite and operators?</h2>
                <div className="course-tailor">
                  {AUDIENCES.map((a) => (
                    <div key={a}>
                      <h3>For {AUDIENCE_LABEL[a].toLowerCase()}</h3>
                      <p>{p.tailoring[a]}</p>
                    </div>
                  ))}
                </div>

                <section aria-labelledby="faq-heading">
                  <h2 id="faq-heading">Frequently asked questions</h2>
                  {p.faqs.map((f) => (
                    <div className="glossary-faq-item" key={f.q}>
                      <h3>{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </section>

                <h2 id="record">Where has Shilika taught and spoken?</h2>
                <ul>
                  {TEACHING_RECORD.slice(0, 6).map((t) => (
                    <li key={t.href}>
                      {t.date}:{' '}
                      <a href={t.href} target="_blank" rel="noopener">
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>

                <section aria-labelledby="related-heading">
                  <h2 id="related-heading">Related reading and other programs</h2>
                  <ul>
                    {p.related.map((r) => (
                      <li key={r.href}>
                        <a href={r.href}>{r.label}</a>
                      </li>
                    ))}
                    {siblings
                      .filter((s) => !p.related.some((r) => r.href === coursePath(s)))
                      .slice(0, 3)
                      .map((s) => (
                        <li key={s.slug}>
                          <a href={coursePath(s)}>{s.cardTitle}</a>
                        </li>
                      ))}
                  </ul>
                </section>

                <p className="glossary-meta">
                  Program designed and taught by <a href="/about">Shilika Jain</a>, APAC PR and partnerships lead at
                  Myosin and former APAC lead at CoinMarketCap. Last updated {modified}.
                </p>
              </div>

              <div className="post-cta">
                <p className="post-cta-kicker">
                  <span className="post-cta-dot" /> Book this program
                </p>
                <h3>
                  Run it for <em>your</em> cohort, class or team.
                </h3>
                <p>
                  Pick a format, share the group size and dates, and Shilika will tailor the decks, exercises and
                  quizzes. Pricing is quoted per cohort. Student and non-profit sessions are often considered pro
                  bono.
                </p>
                <a href={BOOKING_URL} target="_blank" rel="noopener" className="post-cta-sticky" data-magnet>
                  Book a 30-min scoping call
                </a>
              </div>
            </div>
          </article>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
