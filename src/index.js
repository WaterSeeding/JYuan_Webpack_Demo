import "./style.css";

console.log("[当前环境]: ", process.env.NODE_ENV);

const app = document.createElement("div");
app.innerHTML =
  "<h1>Hello, Webpack Page!</h1><button id='loadButton'>加载模块</button>";

document.body.appendChild(app);

document.getElementById("loadButton").addEventListener("click", () => {
  import("./module.js") // 动态导入
    .then((module) => {
      // 使用导入的模块
      const result = module.default();
      alert(result + process.env.NODE_ENV);
    })
    .catch((err) => {
      console.error("Error loading module:", err);
    });
});

console.log("Hello, Webpack!");
