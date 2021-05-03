const path = require('path')
const fs = require('fs')

const defaultConfig = require('./defaultConfig.js')

const transformJs = require('./transform-js.js')
const transformScss = require('./transform-scss.js')
const transformSass = require('./transform-sass.js')
const transformFile = require('./transform-file.js')

class Bundler {
  constructor() {
    const args = Array.from(arguments)
    // console.log(args)
    this.cwd = process.cwd()
    this.options = args
    this.entryPath = this.normalizeEntry(args[0])
    this.file = path.basename(this.entryPath)
    this.extname = path.extname(this.entryPath)
    this.filename = path.basename(this.file, this.extname)
    this.outputExtname = path.extname(args[1].outputFile || this.entryPath)
    this.targetType = this.normalizeTargetType(args[1].targetType)
    this.outputDir = this.normalizeDir(args[1].outputDir)
    this.outputPath = this.normalizeOutput(args[1].outputFile)
    this.minify = args[1].minify
    this.cache = args[1].cache
    this.style = args[1].style
  }
  normalizeTargetType(targetType) {
    if (targetType === undefined) {
      return defaultConfig.outFileMap[this.extname] || this.outputExtname
    } else {
      return '.' + targetType
    }
  }
  normalizeDir(outputDir) {
    if (outputDir === undefined) {
      return path.resolve(this.cwd, 'dist')
    } else {
      return path.resolve(this.cwd, outputDir)
    }
  }
  normalizeOutput(outputFile) {
    if (outputFile === undefined) {
      return path.resolve(
        this.cwd,
        this.outputDir,
        this.filename + this.targetType
      )
    } else {
      return path.resolve(
        this.cwd,
        this.outputDir,
        outputFile.replace(/(\.[A-Za-z]*$)/g, '') + this.targetType
      )
    }
  }
  normalizeEntry(entry) {
    if (entry === undefined) {
      return this.resolveInputFile(defaultConfig.entry)
    } else {
      return this.resolveInputFile(entry)
    }
  }
  resolveInputFile(inputPath) {
    const curPath = path.resolve(this.cwd, inputPath)
    // 路径不存在
    if (!fs.existsSync(curPath)) {
      const ext = path.extname(inputPath)
      if (ext === '') {
        for (let ext of defaultConfig.extensions) {
          const curPath = path.resolve(this.cwd, inputPath + ext)
          if (fs.existsSync(curPath)) return curPath
        }
      }
      throw new Error('input path does not exist')
    }
    return curPath
  }
  resolveOutputFile(outputFile) {
    const curPath = path.resolve(this.cwd, 'dist', outputFile)
    if (fs.existsSync(curPath)) return curPath
  }
}

function deleteCache(path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach(function (file, index) {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        deleteCache(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

function transform(bundler) {
  if (bundler.cache === false) {
    deleteCache(bundler.outputDir)
  }
  if (fs.existsSync(bundler.outputDir) === false) {
    fs.mkdirSync(bundler.outputDir)
  }
  switch (bundler.extname) {
    case '.js':
      transformJs(bundler)
      break
    case '.scss':
      transformScss(bundler)
      break
    case '.sass':
      transformSass(bundler)
      break
    default:
      transformFile(bundler)
      break
  }
}

function cli(...args) {
  const bundler = new Bundler(...args)
  // console.log(bundler)
  transform(bundler)
}

module.exports = cli
