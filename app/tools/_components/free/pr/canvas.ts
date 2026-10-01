/** Canvas helpers for the image tools. Browser only: call from effects or handlers. */

/** Draw with repeated halving for big downscales, which keeps edges crisp. */
export function drawHQ(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
) {
  let source: CanvasImageSource = src;
  let cx = sx;
  let cy = sy;
  let cw = sw;
  let ch = sh;
  while (cw / 2 >= dw && ch / 2 >= dh) {
    const nw = Math.max(1, Math.round(cw / 2));
    const nh = Math.max(1, Math.round(ch / 2));
    const c = document.createElement('canvas');
    c.width = nw;
    c.height = nh;
    const x = c.getContext('2d');
    if (!x) break;
    x.imageSmoothingEnabled = true;
    x.imageSmoothingQuality = 'high';
    x.drawImage(source, cx, cy, cw, ch, 0, 0, nw, nh);
    source = c;
    cx = 0;
    cy = 0;
    cw = nw;
    ch = nh;
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, cx, cy, cw, ch, dx, dy, dw, dh);
}
