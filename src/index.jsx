import React from "react";
import { createRoot } from "react-dom/client";
import _ from "lodash";

const array = ["Hello"];
const arrays = _.concat(array, [", "], ["React with Webpack"], ["!"]);
const result = _.join(arrays, "");

const App= () => {
  return <h1>{result}</h1>;
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
