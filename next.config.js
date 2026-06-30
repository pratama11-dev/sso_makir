/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  turbopack: {},

  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD",
  },

  images: {},
};

module.exports = withBundleAnalyzer(nextConfig);