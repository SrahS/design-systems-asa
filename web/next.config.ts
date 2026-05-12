import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3001/:path*"
              : "/api/:path*",
        },
      ],
    };
  },
};

export default nextConfig;