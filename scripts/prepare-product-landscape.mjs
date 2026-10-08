import sharp from "sharp";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";

const source =
  "docs/design-reference/product/assets/misty-sunrise-valley-source.png";
const destination = "public/media/themes/product";
await mkdir(destination, { recursive: true });
const metadata = await sharp(source).metadata();
const variants = [];
for (const width of [960, 1600, 2172]) {
  for (const format of ["avif", "webp"]) {
    const output = `${destination}/misty-valley-${width}.${format}`;
    const image = sharp(source).resize({ width, withoutEnlargement: true });
    if (format === "avif")
      await image
        .avif({ quality: 65, effort: 6, chromaSubsampling: "4:4:4" })
        .toFile(output);
    else await image.webp({ quality: 86, effort: 6 }).toFile(output);
    variants.push({ path: output, width, bytes: (await stat(output)).size });
  }
}
const fallback = `${destination}/misty-valley-1600.jpg`;
await sharp(source)
  .resize({ width: 1600 })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(fallback);
variants.push({
  path: fallback,
  width: 1600,
  bytes: (await stat(fallback)).size,
});
await writeFile(
  `${destination}/PROVENANCE.json`,
  JSON.stringify(
    {
      source,
      originalFilename: "Misty Sunrise Valley with Railway and River.png",
      origin:
        "Generated with ChatGPT and supplied by the portfolio owner for Product on 2026-10-08.",
      usage:
        "Decorative landscape only; not a project screenshot, personal photograph, or verified location.",
      sourceSha256: createHash("sha256")
        .update(await readFile(source))
        .digest("hex"),
      width: metadata.width,
      height: metadata.height,
      generator: "scripts/prepare-product-landscape.mjs",
      encoding: {
        avif: { quality: 65, chromaSubsampling: "4:4:4" },
        webp: { quality: 86 },
        jpeg: { quality: 90 },
      },
      delivery:
        "Hero picture: responsive AVIF first, WebP second, JPEG fallback; footer CSS image-set.",
      variants,
    },
    null,
    2,
  ) + "\n",
);
console.log(JSON.stringify(variants, null, 2));
