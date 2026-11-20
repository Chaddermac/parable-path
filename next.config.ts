import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/holiday/card/*": ["./public/holiday/globes/*.png"],
  },
  async redirects() {
    return [
      { source: "/holiday", destination: "/holidayedition", permanent: true },
      { source: "/holiday/results/:path*", destination: "/holidayedition/results/:path*", permanent: true },
    ];
  },
};
export default nextConfig;
