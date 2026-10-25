import '../globals.css';
import '../media.css';
import RootShell from '@/components/site/RootShell';
import TalkPopup from '@/components/site/TalkPopup';

export { metadata, viewport } from '@/lib/site-metadata';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="en">
      {children}
      <TalkPopup />
    </RootShell>
  );
}
