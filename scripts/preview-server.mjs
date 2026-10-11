import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
process.env.PORTFOLIO_PREVIEW_TEST = "1";
// CI serves a production build of the preview routes (made beforehand with
// PORTFOLIO_PREVIEW_BUILD=1): no on-demand compilation, so timing is stable.
// Locally, `next dev` keeps the edit-and-rerun loop fast.
const mode = process.env.PORTFOLIO_PREVIEW_BUILD === "1" ? "start" : "dev";
process.argv = [
  process.execPath,
  nextCli,
  mode,
  "--hostname",
  "127.0.0.1",
  "--port",
  "3218",
];
await import(pathToFileURL(nextCli).href);
