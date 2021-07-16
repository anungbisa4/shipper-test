const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withOptimizeImage = require('next-optimized-images')
const runtimeCaching = require('next-pwa/cache')
const path = require('path')
// const withOffline = require("next-offline");

const nextConfig = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "-dlingo-secret-1234";
  },
  images: {
    domains: [],
  },
  env: {
    baseUrl: process.env.NODE_BASE_URL,
  },
  trailingSlash: false,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
  webpack(config, option) {
    config.experiments = {};
    config.resolve.alias["@"] = path.join(__dirname, ".");
    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};

module.exports = withPlugins(
  [
    withOptimizeImage,
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: "public",
          register: process.env.NODE_ENV !== "development",
          swSrc: "service-worker.js",
        },
      },
    ],
  ],
  nextConfig
);