#!/usr/bin/env bash
# Builds the hero background loop from two source clips: a DJ set, then a band.
#
#   scripts/make-hero-video.sh dj.mp4 band.mp4 [dj_start] [band_start] [seconds_each]
#
#   dj_start / band_start  where to cut each clip from, in seconds (default 0)
#   seconds_each           length taken from each clip (default 6)
#
# Look: black and white, pixelated (blocks of BLOCK px), posterized to LEVELS grey tones.
# The DJ clip crossfades into the band; the loop seam fades through white so the
# restart is invisible on the white page.
#
# Writes public/media/hero.mp4, hero.webm and hero-poster.jpg.
# Tune with env vars: BLOCK=8 LEVELS=6 FPS=24 WIDTH=1280 XFADE=1
set -euo pipefail

DJ="${1:?usage: make-hero-video.sh dj.mp4 band.mp4 [dj_start] [band_start] [seconds_each]}"
BAND="${2:?second clip (band) required}"
DJ_START="${3:-0}"
BAND_START="${4:-0}"
SEG="${5:-6}"

BLOCK="${BLOCK:-8}"      # pixel block size in output pixels
LEVELS="${LEVELS:-6}"    # grey tones after posterizing
FPS="${FPS:-24}"
WIDTH="${WIDTH:-1280}"   # output width (16:9)
XFADE="${XFADE:-1}"      # crossfade seconds
HEIGHT=$(( WIDTH * 9 / 16 ))
SMALL_W=$(( WIDTH / BLOCK ))
SMALL_H=$(( HEIGHT / BLOCK ))

OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT_DIR"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Step per grey level for posterizing: 255/(LEVELS-1)
STEP=$(( 255 / (LEVELS - 1) ))

# One filter for both clips: cut, fill 16:9, grey, shrink, posterize, enlarge with hard pixel edges
look() {
  echo "fps=${FPS},scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT},format=gray,scale=${SMALL_W}:${SMALL_H}:flags=area,lut=y='trunc(val/${STEP}+0.5)*${STEP}',scale=${WIDTH}:${HEIGHT}:flags=neighbor,setsar=1,format=yuv420p"
}

TOTAL=$(awk "BEGIN{print 2*${SEG}-${XFADE}}")
FADE_OUT_AT=$(awk "BEGIN{print ${TOTAL}-${XFADE}}")
OFFSET=$(awk "BEGIN{print ${SEG}-${XFADE}}")

ffmpeg -hide_banner -loglevel error -y \
  -ss "$DJ_START" -t "$SEG" -i "$DJ" \
  -ss "$BAND_START" -t "$SEG" -i "$BAND" \
  -filter_complex "\
[0:v]$(look),settb=AVTB,setpts=PTS-STARTPTS[a];\
[1:v]$(look),settb=AVTB,setpts=PTS-STARTPTS[b];\
[a][b]xfade=transition=fade:duration=${XFADE}:offset=${OFFSET}[ab];\
[ab]fade=t=in:st=0:d=${XFADE}:color=white,fade=t=out:st=${FADE_OUT_AT}:d=${XFADE}:color=white[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -profile:v high \
  -movflags +faststart "$TMP/hero.mp4"

ffmpeg -hide_banner -loglevel error -y -i "$TMP/hero.mp4" \
  -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good "$TMP/hero.webm"

# Poster: a frame from the middle of the DJ part, shown before the video loads
POSTER_AT=$(awk "BEGIN{print ${SEG}/2}")
ffmpeg -hide_banner -loglevel error -y -ss "$POSTER_AT" -i "$TMP/hero.mp4" -frames:v 1 -q:v 4 "$TMP/hero-poster.jpg"

mv "$TMP/hero.mp4" "$TMP/hero.webm" "$TMP/hero-poster.jpg" "$OUT_DIR/"
ls -lh "$OUT_DIR"/hero*
