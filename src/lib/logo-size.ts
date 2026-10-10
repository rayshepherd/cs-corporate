import fs from "node:fs";
import path from "node:path";

/**
 * Reads a logo's natural proportions from the file in /public at build time:
 * the viewBox of an SVG, or the pixel size of a PNG. Used to size every logo by area,
 * so a wide wordmark and a round badge look equally weighted side by side.
 */
export function logoSize(src: string): { w: number; h: number } {
  try {
    const file = path.join(process.cwd(), "public", src);
    if (src.endsWith(".svg")) {
      const svg = fs.readFileSync(file, "utf8");
      const vb = svg.match(/viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
      if (vb) return { w: Number(vb[1]), h: Number(vb[2]) };
    } else if (src.endsWith(".png")) {
      const buf = fs.readFileSync(file);
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    }
  } catch {
    // fall through to a neutral wordmark shape
  }
  return { w: 3, h: 1 };
}
