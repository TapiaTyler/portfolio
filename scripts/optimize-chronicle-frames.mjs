import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";

// Resize the established delivery crop, retaining its transparent padding and
// nine-slice geometry. Original PNGs and desktop WebPs remain unchanged.
const root = "public/media/themes/chronicle";
const manifestPath =
  "docs/design-reference/chronicle-assets/asset-manifest.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
for (const name of [
  "project-frame",
  "project-frame-active",
  "panel-frame",
  "chapter-divider",
]) {
  const file = `${name}-compact.webp`;
  await sharp(`${root}/${name}.webp`)
    .resize({ width: 720 })
    .webp({ quality: 82, alphaQuality: 92, effort: 6 })
    .toFile(`${root}/${file}`);
  const { width, height } = await sharp(`${root}/${file}`).metadata();
  const { size } = await stat(`${root}/${file}`);
  const entry = manifest.find((asset) => asset.name === name);
  if (!entry) throw new Error(`Missing frame provenance: ${name}`);
  entry.responsiveDelivery = [
    {
      file,
      dimensions: [width, height],
      bytes: size,
      use:
        name === "chapter-divider"
          ? "Chapter separators at viewports up to 900px"
          : "Panel/project/evidence borders and theme picker at viewports up to 900px",
      encoding: { quality: 82, alphaQuality: 92, effort: 6 },
      source: `${name}.webp`,
      note:
        name === "chapter-divider"
          ? "60% of desktop source dimensions; displayed separator dimensions stay unchanged."
          : "60% of desktop source dimensions; CSS border-image slices scale by 0.6, rendered border widths stay unchanged.",
    },
  ];
  console.log(`${file}: ${width} × ${height}, ${size} bytes`);
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
