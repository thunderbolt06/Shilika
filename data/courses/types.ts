// Courses, workshops and masterclasses taught by Shilika Jain.
// Every program ships in three depths: a one-hour masterclass (slide deck),
// a three-day workshop, and a multi-module course with activities and quizzes.
// Copy follows docs/humanization-guide.md and docs/geo-guidelines.md.

export type Audience = 'students' | 'c-suite' | 'operators';

export const AUDIENCE_LABEL: Record<Audience, string> = {
  students: 'Students',
  'c-suite': 'C-suite',
  operators: 'Founders & operators',
};

export type QuizQuestion = {
  q: string;
  options: string[]; // 3 or 4 options
  answer: number; // index into options
  why: string; // one or two sentences explaining the right answer
};

export type Slide = {
  title: string; // slide headline as it appears on the deck
  point: string; // the one idea the slide lands, one or two sentences
  minutes: number; // time on the slide; a deck sums to 60
};

export type WorkshopSession = {
  time: string; // e.g. "09:30 to 11:00"
  title: string;
  detail: string; // what happens, one to three sentences
};

export type WorkshopDay = {
  day: 1 | 2 | 3;
  theme: string;
  sessions: WorkshopSession[]; // 4 sessions per day
  deliverable: string; // what each participant leaves the day holding
};

export type CourseModule = {
  title: string;
  deck: string; // name of the module's slide deck
  summary: string; // what the module teaches, two or three sentences
  activity: string; // the hands-on exercise, two or three sentences
  quiz: QuizQuestion[]; // 3 questions
};

export type Proof = { text: string; href?: string };

export type Program = {
  slug: string;
  title: string; // H1
  cardTitle: string; // short name for hub cards
  metaTitle: string; // <= 60 chars
  metaDescription: string; // <= 160 chars
  deck: string; // one-line standfirst under the H1
  answer: string; // ~50-word answer-first paragraph (AEO)
  kind: 'Workshop' | 'Masterclass' | 'Course' | 'Guest lecture' | 'Media training';
  primaryAudience: Audience;
  audiences: Audience[];
  bestFor: string; // one line for hub cards
  outcomes: string[]; // 5 or 6 "you will be able to" lines
  proof: Proof[]; // 3 to 5 on-record lines that show why Shilika teaches this
  quote?: { text: string; href: string; date: string }; // a paraphrased line from her X posts
  masterclass: { summary: string; slides: Slide[] }; // 12 to 15 slides, 60 minutes
  workshop: { summary: string; days: WorkshopDay[] }; // exactly 3 days
  course: {
    summary: string;
    cadence: string; // e.g. "6 weekly modules, 90 minutes live plus 2 hours of work"
    modules: CourseModule[]; // 6 modules
    capstone: string;
  };
  tailoring: Record<Audience, string>; // how the program changes per audience
  faqs: { q: string; a: string }[]; // 5 or 6
  related: { href: string; label: string }[]; // internal links only
  keywords: string[];
  about: string[]; // schema.org Thing names
  datePublished: string; // YYYY-MM-DD
  dateModified: string; // YYYY-MM-DD
};
