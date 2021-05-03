const path = require('path')
const fs = require('fs')
var sass = require('node-sass')

function transformSass(bundler) {
  const writable = fs.createWriteStream(bundler.outputPath)
  const sassContent = fs.readFileSync(bundler.entryPath).toString()
  const result = sass.renderSync({
    file: bundler.entryPath,
    data: sassContent,
    outputStyle: bundler.minify ? 'compressed' : bundler.style,
    outFile: bundler.outputPath,
  })
  writable.write(result.css, (err) => {
    if (err) throw err
  })
}

module.exports = transformSass
