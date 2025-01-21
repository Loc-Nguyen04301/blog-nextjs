const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp3$/,
      type: "asset/resource", // Uses Webpack 5's built-in asset handling
      generator: {
        filename: "static/media/[name].[hash][ext]", // Customize output path
      },
    });
    return config;
  },
  images: {
    domains: ["i0.wp.com", "i1-thethao.vnecdn.net", "res.cloudinary.com"],
  },
  reactStrictMode: true,
};

export default nextConfig;
