const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  console.log("[当前环境]: ", isProduction ? "生产环境" : "开发环境");

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: isProduction ? "source-map" : "inline-source-map", // 开发模式下使用内联源码映射
    module: {
      rules: [
        {
          test: /\.css$/, // 匹配CSS文件
          use: ["style-loader", "css-loader"], // 使用的加载器
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(), // 添加这个插件
      new HtmlWebpackPlugin({
        template: "./src/index.html", // 模板文件
      }),
    ],
    optimization: {
      minimize: isProduction, // 仅在生产模式下压缩代码
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
  };
};
