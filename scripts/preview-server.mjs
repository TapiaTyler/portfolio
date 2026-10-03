import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
process.env.PORTFOLIO_PREVIEW_TEST = "1";
process.argv = [
  process.execPath,
  nextCli,
  "dev",
  "--hostname",
  "127.0.0.1",
  "--port",
  "3218",
];
await import(pathToFileURL(nextCli).href);
