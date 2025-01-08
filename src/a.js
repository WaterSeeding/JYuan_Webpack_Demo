import _ from "lodash";

import("./utils/m1").then((module) => {
  module.default();
});

import("./utils/m2").then((module) => {
  module.default();
});

console.log("some code in a.js");

const array = [1];
let other = _.concat(array, 2, [3], [[4]]);

// console.log("[other]:", other);

console.log(`[other]: ${other}!`);
