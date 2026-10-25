// JSON-LD goes into the HTML as a raw <script> body, so a "</script>" inside any string (a post title,
// an author bio) would end the tag early. "<" is the same character to a JSON parser.
export function jsonLdString(data: unknown): string {
  return (typeof data === 'string' ? data : JSON.stringify(data)).replace(/</g, '\\u003c');
}
