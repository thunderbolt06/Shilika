import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// Content-hash a /public asset into its URL. site.js ships from a stable,
// non-fingerprinted URL, so without this a returning visitor's browser keeps
// running whatever build it first cached. The hash changes whenever the file
// changes, minting a fresh URL that busts stale caches on every deploy.
export function assetUrl(publicRelPath: string): string {
  try {
    const file = path.join(process.cwd(), 'public', publicRelPath);
    const hash = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 10);
    return `/${publicRelPath}?v=${hash}`;
  } catch {
    return `/${publicRelPath}`;
  }
}
