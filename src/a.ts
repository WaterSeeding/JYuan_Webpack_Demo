import _ from "lodash";

import("./utils/m1").then((module) => {
  module.default();
});

import("./utils/m2").then((module) => {
  module.default();
});

import("./utils/m3").then((module) => {
  module.default();
});

console.log("some code in a.js");

const array: number[] = [1];
const other: any[] = _.concat(array, 2, [3], [[4]] as any);

// console.log("[other]:", other);

console.log(`[other]: ${other}!`);
