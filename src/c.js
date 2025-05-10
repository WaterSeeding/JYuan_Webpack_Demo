import("./utils/m1").then((module) => {
  module.default();
});

import("./utils/m2").then((module) => {
  module.default();
});

console.log("some code in c.js");
