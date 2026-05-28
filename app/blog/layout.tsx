import { BlogFooter, BlogHeader } from '@/components/blog/BlogChrome';
import './blog.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper text-ink">
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
