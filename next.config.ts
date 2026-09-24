import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  agentRules: false,
};

export default nextConfig;

// Lets `next dev` access Cloudflare bindings locally
initOpenNextCloudflareForDev();
