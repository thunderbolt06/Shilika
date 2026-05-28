'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const article = document.querySelector('.post-body-grid') as HTMLElement | null;
      if (!article) return;
      const start = article.offsetTop - 120;
      const end = article.offsetTop + article.offsetHeight - window.innerHeight;
      const y = window.scrollY;
      const ratio = (y - start) / Math.max(1, end - start);
      setPct(Math.max(0, Math.min(1, ratio)) * 100);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="post-progress" aria-hidden>
      <div className="post-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
