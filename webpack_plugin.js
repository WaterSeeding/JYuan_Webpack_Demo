class MyPlugin {
  constructor(search, replace) {
    this.search = search; // 要搜索的字符
    this.replace = replace; // 替换成的字符
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("这是一个示例插件！");

      Object.keys(compilation.assets).forEach((filename) => {
        console.log("filename", filename);
        // 只处理 .tsx 文件
        if (filename.endsWith(".tsx")) {
          // 获取当前文件的内容
          const asset = compilation.assets[filename];
          const source = asset.source();

          // 替换字符
          const result = source.replace(
            new RegExp(this.search, "g"),
            this.replace
          );

          // 更新文件内容
          compilation.assets[filename] = {
            source: () => result,
            size: () => result.length,
          };
        }
      });

      callback();
    });
  }
}

module.exports = MyPlugin;
