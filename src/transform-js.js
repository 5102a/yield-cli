const path = require('path')
const fs = require('fs')
const uglifyJs = require('uglify-js')
const babel = require('@babel/core')

function transformJs(bundler) {
  let code = babel.transformFileSync(bundler.entryPath, {
    // minified: bundler.minify,
  }).code
  if (bundler.minify) {
    code = uglifyJs.minify(code).code
  }
  fs.writeFile(bundler.outputPath, code, (err) => {
    if (err) throw err
  })
}

module.exports = transformJs
