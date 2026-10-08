import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";

const root = "public/media/themes/chronicle";
const manifestPath =
  "docs/design-reference/chronicle-assets/asset-manifest.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const variants = [
  ["scenic-portrait", "scenic-portrait", 50, "4:2:0"],
  ["sakura-corner", "sakura-corner-mobile", 65, "4:4:4"],
  ["crystal-corner", "crystal-corner-mobile", 65, "4:4:4"],
  ["project-frame-active", "project-frame-active-compact", 65, "4:4:4"],
  ["project-frame", "project-frame-compact", 65, "4:4:4"],
  ["glass-button", "glass-button", 65, "4:4:4"],
  ["chapter-rail-cap-top", "chapter-rail-cap-top", 65, "4:4:4"],
];

// Encode the established delivery crop, preserving dimensions and slice geometry.
// Full chroma detail protects fine gold/pink edges on transparent interface art.
for (const [name, stem, quality, chromaSubsampling] of variants) {
  const file = `${stem}.avif`;
  await sharp(`${root}/${stem}.webp`)
    .avif({ quality, effort: 6, chromaSubsampling })
    .toFile(`${root}/${file}`);
  const { width, height, hasAlpha } = await sharp(`${root}/${file}`).metadata();
  const { size } = await stat(`${root}/${file}`);
  const sourceBytes = (await stat(`${root}/${stem}.webp`)).size;
  if (size >= sourceBytes) throw new Error(`${file} does not improve delivery`);
  const entry = manifest.find((asset) => asset.name === name);
  if (!entry) throw new Error(`Missing provenance: ${name}`);
  const delivery = {
    file,
    dimensions: [width, height],
    hasAlpha,
    bytes: size,
    source: `${stem}.webp`,
    encoding: { quality, effort: 6, chromaSubsampling },
    fallback: `${stem}.webp`,
    note: "AVIF-first CSS image-set with WebP format fallback; unchanged crop and source slices.",
  };
  entry.formatDelivery = [
    ...(entry.formatDelivery ?? []).filter((variant) => variant.file !== file),
    delivery,
  ];
  console.log(`${file}: ${size} bytes (WebP ${sourceBytes})`);
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
