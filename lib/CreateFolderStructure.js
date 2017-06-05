const colors = require('colors')
const path = require('path')
const mkdirp = require('mkdirp')
const { utils } = require('./DirectorySchema')

module.exports = function CreateFolderStructure(input, output) {
  const OUTPUT_PATH = output
  const OUTPUT_PATH_UTILS = utils

  // TODO: Create ouput directory for generated package files
  mkdirp(path.join(`${OUTPUT_PATH}`), function (err) {
    if (err) console.error(colors.red(err))
  })

  mkdirp(path.join(`${OUTPUT_PATH}`, `${OUTPUT_PATH_UTILS}`), function (err) {
    if (err) console.error(colors.red(err))
  })
}
