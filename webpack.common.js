const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  console.log(
    "[当前环境]: ",
    argv.mode,
    isProduction ? "生产环境" : "开发环境"
  );

  return {
    // 指定Webpack模式，如：development、production、none。
    mode: isProduction ? "production" : "development",
    // 打包的入口文件
    entry: "./src/index.js",
    // 指定打包后的文件输出位置和文件名
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // 配置loader，用于处理不同类型的文件
    module: {
      rules: [
        {
          test: /\.css$/, // 匹配CSS文件
          use: ["style-loader", "css-loader"], // 使用的CSS加载器
        },
      ],
    },
    // 配置插件，用于执行各种任务，如：打包优化、资源管理。
    plugins: [
      new CleanWebpackPlugin(), // 清除dist文件夹内容
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      // 使用 DefinePlugin 插件定义环境变量
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isProduction
          ? JSON.stringify("PRODUCTION")
          : JSON.stringify("DEVELOPMENT"),
      }),
    ],
    // 配置优化选项，如代码分割、压缩
    optimization: {
      nodeEnv: false,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
