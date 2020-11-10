import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
 
//Til þess að hjálpa okkur
//const config = {
  //input: 'src/index.js',
  //output: {
    //dir: 'output',
    //format: 'esm'
  //},
  //plugins: [babel({ babelHelpers: 'bundled' })]
//};
 
//export default config;
//Nokkrir mikilvægir hlutir ^

module.exports = {
    input: './src/index.js',
    output: {
      file: './dist/bundle.js', 
      format: 'iife', 
      sourcemap: true,
    },
    plugins: [
      babel({
        babelHelpers: 'bundled', 
        exclude: 'node_modules/**',
        sourceMaps: true,
        presets: [
          [
            '@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 2, 
              targets: '> 0.25%, not dead',
            }
          ]
        ]
      }),
      resolve(),
      commonjs()
    ]
  };