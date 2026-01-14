/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ESLintPlugin = require("eslint-webpack-plugin");

const nextConfig = {
  webpack: (config, { dev }) => {
    config.cache = false;
    config.module.rules.push({
      test: /\.(mp4|mp3|mov|avi)$/,
      use: {
        loader: "file-loader",
        options: {
          outputPath: "static/media/",
          publicPath: "/_next/static/media/",
          name: "[name].[hash].[ext]",
        },
      },
    });
    if (dev) {
      config.plugins.push(
        new ESLintPlugin({
          extensions: ["js", "jsx", "ts", "tsx"],
          emitWarning: true, // Show warnings but allow development
        })
      );
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
};

module.exports = nextConfig;
