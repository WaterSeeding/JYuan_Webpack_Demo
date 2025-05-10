const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  const commonModule = common(env, argv);
  return merge(commonModule, {
    devtool: "inline-source-map", // 开发模式下使用内联源码映射
  });
};
