const path = require('path')
const fs = require('fs')

function transformFile(bundler) {
  const readable = fs.createReadStream(bundler.entryPath)
  const writable = fs.createWriteStream(bundler.outputPath)
  readable.pipe(writable)
}

module.exports = transformFile