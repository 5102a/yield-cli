#!/usr/bin/env node

const { Command } = require('commander')
const cli = require('../src/cli')

const version = require('../package.json').version

const program = new Command()

program.version(version)

program
  .arguments('[input]')
  .option('-o, --output-file <filename>', 'output filename, default input filename')
  .option('-d, --output-dir <dir>', 'output dir, default dist')
  .option('-t, --target-type <type>', 'target file type, default javascript')
  .option('-m, --minify', 'output file minify, default no minify')
  .option('-n, --no-cache', 'clear output dir, default false')
  .option('-s, --style <outputType>', 'scss,sass output style, default nested, ','nested')
  .action(cli)

// const options = program.opts()

program.parse(process.argv)
