/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, options) => {
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
    return config;
  },
  images: {
    domains: ["i0.wp.com", "i1-thethao.vnecdn.net", "res.cloudinary.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
