import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const root = "public/media";
const css = (
  await Promise.all(
    ["editorial.css", "chronicle.css", "chronicle-header.css"].map((file) =>
      readFile(`src/styles/${file}`, "utf8"),
    ),
  )
).join("\n");
const images = [];
for (const theme of ["editorial", "chronicle"]) {
  const folder = `${root}/themes/${theme}`;
  for (const file of (await readdir(folder))
    .filter((file) => file.endsWith(".webp"))
    .sort()) {
    const source = `${folder}/${file}`;
    const metadata = await sharp(source).metadata();
    const quality = metadata.hasAlpha ? 65 : 50;
    const chromaSubsampling = metadata.hasAlpha ? "4:4:4" : "4:2:0";
    const output = source.replace(/\.webp$/, ".avif");
    await sharp(source)
      .avif({ quality, effort: 6, chromaSubsampling })
      .toFile(output);
    const webpBytes = (await stat(source)).size;
    const avifBytes = (await stat(output)).size;
    if (avifBytes >= webpBytes)
      throw new Error(
        `${output} exceeds its WebP fallback; review before using it`,
      );
    const url = source.replace(/^public/, "");
    images.push({
      source: url,
      avif: output.replace(/^public/, ""),
      width: metadata.width,
      height: metadata.height,
      hasAlpha: metadata.hasAlpha,
      webpBytes,
      avifBytes,
      encoding: { quality, chromaSubsampling, effort: 6 },
      runtimeReference: css.includes(url),
      delivery: "CSS image-set: AVIF first, WebP fallback",
    });
    console.log(`${theme}/${file}: ${webpBytes} → ${avifBytes} bytes`);
  }
}
// Preserve source screenshots and historical captures. The shared optimizer
// negotiates AVIF/WebP/original PNG instead of maintaining duplicate srcsets.
for (const project of (
  await readdir(`${root}/projects`, { withFileTypes: true })
).filter((entry) => entry.isDirectory())) {
  for (const file of (await readdir(`${root}/projects/${project.name}`))
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .sort()) {
    const source = path.posix.join("/media/projects", project.name, file);
    const metadata = await sharp(`public${source}`).metadata();
    images.push({
      source,
      width: metadata.width,
      height: metadata.height,
      sourceBytes: (await stat(`public${source}`)).size,
      delivery:
        "Next image optimizer: AVIF / WebP / original via Accept; retained evidence source",
    });
  }
}
await writeFile(
  "docs/IMAGE-DELIVERY-MANIFEST.json",
  JSON.stringify(
    { generator: "scripts/optimize-theme-images.mjs", images },
    null,
    2,
  ) + "\n",
);
