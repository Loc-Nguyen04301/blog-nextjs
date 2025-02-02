/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ESLintPlugin = require("eslint-webpack-plugin");

const nextConfig = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.mp3$/,
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
    domains: ["i0.wp.com", "i1-thethao.vnecdn.net", "res.cloudinary.com"],
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
};

module.exports = nextConfig;
