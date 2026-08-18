import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, hand-authored decorative illustrations only (no user-uploaded
    // SVGs) — safe to let next/image optimize them like any other asset.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
