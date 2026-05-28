'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; text: string; level: number };

type Props = { items: TocItem[] };

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: [0, 1] },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="post-toc" aria-label="Table of contents">
      <p className="post-toc-kicker">
        <span className="post-toc-dot" aria-hidden />
        On this page
      </p>
      <ol className="post-toc-list">
        {items.map((it) => (
          <li
            key={it.id}
            className={`post-toc-item lvl-${it.level} ${activeId === it.id ? 'is-active' : ''}`}
          >
            <a href={`#${it.id}`}>
              <span className="post-toc-bar" aria-hidden />
              <span className="post-toc-text">{it.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
