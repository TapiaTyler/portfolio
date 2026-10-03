import { statSync } from "node:fs";
import path from "node:path";
import type { Project } from "./schema";

/** Build-only filesystem validation; remote URLs are format-checked by the schema. */
export function validateAssetFiles(
  projects: readonly Project[],
  assetRoot: string,
) {
  for (const project of projects) {
    for (const media of project.media) {
      const sources =
        media.type === "video" ? [media.src, media.poster] : [media.src];
      for (const source of sources) {
        if (!source.startsWith("/")) continue;
        const resolved = path.resolve(assetRoot, source.slice(1));
        const relative = path.relative(path.resolve(assetRoot), resolved);
        if (relative.startsWith("..") || path.isAbsolute(relative)) {
          throw new Error(`${project.slug}: asset escapes its root: ${source}`);
        }
        try {
          if (!statSync(resolved).isFile())
            throw new Error("Asset is not a file");
        } catch {
          throw new Error(`${project.slug}: missing asset file: ${source}`);
        }
      }
    }
  }
}
