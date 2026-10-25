// Plain server-rendered JSON-LD. next/script with strategy="beforeInteractive" ships
// the payload through a `__next_s` JS push instead of a <script type="application/ld+json">
// tag, so crawlers that don't execute JavaScript never see the markup.
export function JsonLdScript({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
