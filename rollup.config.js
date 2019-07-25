// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint').eslint
const uglify = require('rollup-plugin-uglify').uglify
const version = require('./package.json').version
// ---------------------------------------------------------------------------------------------------------------------
// Library banner
// ---------------------------------------------------------------------------------------------------------------------
const banner =
  '/*!\n' +
  ' * Ohibot Core Library v' +
  version +
  '\n' +
  ' * (c) 2018-present Luca Martini\n' +
  ' * Released under the MIT License.\n' +
  ' */'
// ---------------------------------------------------------------------------------------------------------------------
// Output files
// ---------------------------------------------------------------------------------------------------------------------
let output = [
  {
    file: 'dist/ohibotCore.umd.js',
    name: 'ohibot',
    format: 'umd',
    banner: banner
  }
]
/* BUILD: production */
if (process.env.BUILD === 'production') {
  output = output.concat([
    {
      file: 'dist/ohibotCore.cjs.js',
      format: 'cjs',
      banner: banner
    },
    {
      file: 'dist/ohibotCore.esm.js',
      format: 'esm',
      banner: banner
    }
  ])
}
/* BUILD: minify */
if (process.env.BUILD === 'minify') {
  output = [
    {
      file: 'dist/ohibotCore.umd.min.js',
      name: 'ohibot',
      format: 'umd',
      sourceMap: true,
      banner: banner
    }
  ]
}
// ---------------------------------------------------------------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------------------------------------------------------------
let plugins = [
  babel(),
  eslint({
    exclude: ['node_modules/**'],
    throwOnError: process.env.BUILD !== 'development',
    throwOnWarning: process.env.BUILD !== 'development'
  })
]
/* BUILD: minify */
if (process.env.BUILD === 'minify') {
  plugins = plugins.concat([uglify()])
}
// ---------------------------------------------------------------------------------------------------------------------
// Export config
// ---------------------------------------------------------------------------------------------------------------------
module.exports = {
  input: 'src/index.js',
  plugins,
  output,
  watch: {
    clearScreen: false
  }
}
