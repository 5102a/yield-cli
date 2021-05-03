const package = require('../package.json')

module.exports = {
  entry:'index',
  extensions:package.extensions,
  outFileMap:{
    '.js':'.js',
    '.css':'.css',
    '.scss':'.css',
    '.sass':'.css',
  }
}