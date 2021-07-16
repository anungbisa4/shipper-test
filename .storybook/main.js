module.exports = {
  stories: [
    // Paths to the story files
    "./*.stories.mdx",
    "./*.stories.js",
  ],
  addons: [
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    {
     name: '@storybook/addon-postcss',
     options: {
       postcssLoaderOptions: {
         implementation: require('postcss'),
       },
     },
   },,
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        // Add the sass loader to process scss files
        "sass-loader",
      ],
    });

    return config;
  },
};
