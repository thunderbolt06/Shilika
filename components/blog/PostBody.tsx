type Props = { html: string };

export function PostBody({ html }: Props) {
  return (
    <div
      className="prose-shilika max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
