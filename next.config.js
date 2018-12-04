module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 1000000,
            fallback: "file-loader",
            publicPath: "/_next/",
            outputPath: "static/images/",
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'global',
          },
        },
      ],
    });

    return config;
  },
};
