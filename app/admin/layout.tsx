export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { cursor: default !important; }
        a, button, [role="button"], summary, label[for], select { cursor: pointer !important; }
        :disabled { cursor: not-allowed !important; }
      `}</style>
      {children}
    </>
  );
}
