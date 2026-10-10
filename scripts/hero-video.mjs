#!/usr/bin/env node
/**
 * Builds the hero background loop from the edit list in scripts/hero-video.json.
 *
 *   node scripts/hero-video.mjs <folder-with-source-clips> [edit-list.json]
 *
 * Source clips are looked up as <folder>/<clip>.mp4 (or .mov). Each cut is trimmed, fitted
 * to 16:9, converted to black and white, and joined with hard cuts. Grain is added live by the
 * site (see HeroVideo) because baked-in grain makes the file 5-10x larger. The loop
 * seam fades through white so the restart is invisible on the white page.
 *
 * Writes public/media/hero.mp4, hero.webm and hero-poster.jpg. Requires ffmpeg on the PATH.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [srcDir, listArg] = process.argv.slice(2);
if (!srcDir) {
  console.error("usage: node scripts/hero-video.mjs <folder-with-source-clips> [edit-list.json]");
  process.exit(1);
}
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const list = JSON.parse(readFileSync(listArg || path.join(root, "scripts", "hero-video.json"), "utf8"));
const look = {
  width: 960, fps: 25, contrast: 1.2, brightness: 0.02, grain: 0, loopFade: 0.6,
  denoise: 6, crf: 32, webmCrf: 48,
  ...list.look,
};
const W = look.width;
const H = Math.round((W * 9) / 16 / 2) * 2;

const ff = (args) => execFileSync("ffmpeg", ["-nostdin", "-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

function findClip(name) {
  for (const ext of [".mp4", ".mov", ".MP4", ".MOV", ""]) {
    const p = path.join(srcDir, name + ext);
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  throw new Error(`Source clip "${name}" not found in ${srcDir}`);
}

const inputs = [];
const chains = [];
list.cuts.forEach((c, i) => {
  if (!(c.end > c.start)) throw new Error(`Cut ${i + 1}: end must be after start`);
  inputs.push("-ss", String(c.start), "-t", String(c.end - c.start), "-i", findClip(c.clip));
  chains.push(
    `[${i}:v]fps=${look.fps},scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},` +
      `setsar=1,format=yuv420p,setpts=PTS-STARTPTS[c${i}]`,
  );
});

const total = list.cuts.reduce((s, c) => s + (c.end - c.start), 0);
const fade = look.loopFade;
const graph =
  chains.join(";") +
  ";" +
  list.cuts.map((_, i) => `[c${i}]`).join("") +
  `concat=n=${list.cuts.length}:v=1:a=0,` +
  // black and white with a little punch
  `hue=s=0,eq=contrast=${look.contrast}:brightness=${look.brightness},` +
  // clean up sensor noise from low-light footage; it costs bytes and the site adds its own grain
  (look.denoise > 0 ? `hqdn3d=${look.denoise}:${look.denoise}:${look.denoise * 1.5}:${look.denoise * 1.5},` : "") +
  // optional baked-in grain (large files; the site adds live grain on top instead)
  (look.grain > 0 ? `noise=c0s=${look.grain}:c0f=t+u,` : "") +
  `fade=t=in:st=0:d=${fade}:color=white,fade=t=out:st=${(total - fade).toFixed(2)}:d=${fade}:color=white,` +
  `format=yuv420p[v]`;

const out = path.join(root, "public", "media");
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), "hero-"));
try {
  console.log(`Building ${list.cuts.length} cuts, ${total.toFixed(1)} s, ${W}x${H}…`);
  ff([...inputs, "-filter_complex", graph, "-map", "[v]", "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", String(look.crf), "-profile:v", "high",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.join(tmp, "hero.mp4")]);
  ff(["-i", path.join(tmp, "hero.mp4"), "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(look.webmCrf),
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", path.join(tmp, "hero.webm")]);
  // Poster: a frame two seconds in (past the white fade)
  ff(["-ss", "2", "-i", path.join(tmp, "hero.mp4"), "-frames:v", "1", "-q:v", "5", path.join(tmp, "hero-poster.jpg")]);
  for (const f of ["hero.mp4", "hero.webm", "hero-poster.jpg"]) {
    copyFileSync(path.join(tmp, f), path.join(out, f));
    console.log(`${f}  ${(statSync(path.join(out, f)).size / 1024 / 1024).toFixed(2)} MB`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
