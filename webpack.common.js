const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
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
    entry: {
      index: "./src/index.js",
      a: "./src/a.js",
      b: "./src/b.js",
      c: "./src/c.js",
    },
    // 指定打包后的文件输出位置和文件名
    output: {
      filename: "[name].bundle.js", // 使用入口名称作为文件名
      path: path.resolve(__dirname, "dist"),
      chunkFormat: false,
      clean: true,
    },
    // 配置loader，用于处理不同类型的文件
    module: {
      rules: [
        // {
        //   test: /\.css$/, // 匹配CSS文件
        //   use: ["style-loader", "css-loader"], // 使用的CSS加载器
        // },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    // 配置插件，用于执行各种任务，如：打包优化、资源管理。
    plugins: [
      new CleanWebpackPlugin(), // 清除dist文件夹内容
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        chunks: ["index"],
        inject: "body", // 将脚本注入到 body 中
        scriptLoading: "blocking", // 确保脚本在解析之前加载
      }),
      // 使用 DefinePlugin 插件定义环境变量
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isProduction
          ? JSON.stringify("PRODUCTION")
          : JSON.stringify("DEVELOPMENT"),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // 生成一个静态HTML文件
        reportFilename: "report.html", // 输出报告文件名
        openAnalyzer: false, // 不自动打开报告
      }),
    ],
    // 配置优化选项，如代码分割、压缩
    optimization: {
      nodeEnv: false,
      splitChunks: {
        //chunks: "all", // 适用于所有类型的块
        // minSize: 1024 * 20, // 生产chunk的最小大小（以字节为单位）
        // minChunks: 1, // 分割前必须共享模块的最小块数
        // maxAsyncRequests: 30, // 按需加载时的最大并行请求数
        // maxInitialRequests: 30, // 入口点的最大并行请求数
        // // 通过cacheGroups自定义分割策略
        // cacheGroups: { // 缓存组可以继承或覆盖splitChunks.*的任何选项
        //   // 创建一个 custom vendor chunk，其中包含与 RegExp 匹配的某些 node_modules 包
        //   vendor: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name: "vendors",
        //     chunks: "all",
        //   },
        // },
      },
    },
  };
};
