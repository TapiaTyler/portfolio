import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

// Production build of the preview-test routes into .next/preview-tests (see
// src/lib/dev-tools.ts). Never used for deployment.
const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
process.env.PORTFOLIO_PREVIEW_TEST = "1";
process.env.PORTFOLIO_PREVIEW_BUILD = "1";
process.argv = [process.execPath, nextCli, "build"];
await import(pathToFileURL(nextCli).href);
