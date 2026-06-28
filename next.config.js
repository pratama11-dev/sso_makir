/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  env: {
    APPNAME: "boilerplatesakti",
    ANALYZE: "true",
  },

  images: {
    // domains: [],
  },

  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD",
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);