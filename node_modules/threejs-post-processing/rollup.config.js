import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import string from "rollup-plugin-string";

// building more than one bundle
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'threejsPostProcessing',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve({
      browser: true
    }),
    string({
			include: ["**/*.frag", "**/*.vert"]
		})
  ]
}, {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve({
      browser: true
    }),
    string({
			include: ["**/*.frag", "**/*.vert"]
		})
  ]
}];
// module.exports = {
//   input: 'src/index.js',
//   output: {
//     file: 'dist/bundle.js',
//     format: 'iife',
//     name: 'threejsPostProcessing',
//   },
//   plugins: [
//     babel({
//       exclude: 'node_modules/**',
//     }),
//     commonjs(),
//     resolve({
//       browser: true
//     }),
//     string({
// 			include: ["**/*.frag", "**/*.vert"]
// 		})
//   ]
// };