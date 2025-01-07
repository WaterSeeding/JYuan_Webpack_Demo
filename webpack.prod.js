const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const commonModule = common(env, argv);
  return merge(commonModule, {
    devtool: "source-map",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false,
            },
          },
        }),
      ],
    },
  });
};
