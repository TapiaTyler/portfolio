import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const source = "node_modules/@fontsource/cormorant-garamond";
const output = "public/fonts/chronicle";
await mkdir(output, { recursive: true });
const files = [];
for (const weight of [500, 600, 700]) {
  const filename = `cormorant-garamond-latin-${weight}-normal.woff2`;
  await copyFile(`${source}/files/${filename}`, `${output}/${filename}`);
  const bytes = await readFile(`${output}/${filename}`);
  files.push({
    file: filename,
    weight,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  });
}
await copyFile(`${source}/LICENSE`, `${output}/LICENSE.txt`);
await writeFile(
  `${output}/manifest.json`,
  JSON.stringify({ source: "@fontsource/cormorant-garamond", files }, null, 2) +
    "\n",
);
