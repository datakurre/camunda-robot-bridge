import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true
  }),
  resolve(),
  commonjs(),
  typescript(),
];

export default [
  {
    input: "src/index.ts",
    output: {
      file: "index.js",
      format: "cjs"
    },
    plugins,
  },
];
