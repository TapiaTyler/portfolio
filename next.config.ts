import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve the repository's reviewed coding contract when starting development.
  agentRules: false,
  devIndicators: process.env.PORTFOLIO_PREVIEW_TEST === "1" ? false : undefined,
  // Preview tests use a separate dev build and lock from the user's running server.
  distDir:
    process.env.PORTFOLIO_PREVIEW_TEST === "1"
      ? ".next/preview-tests"
      : ".next",
};

export default nextConfig;
