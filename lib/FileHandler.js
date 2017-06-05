const path = require('path')
const fs = require('fs')
const colors = require('colors')
const mkdirp = require('mkdirp')
const cp = require('child_process')
const spawn = require('child_process').spawn
const RecursiveCopy = require('./ReursiveCopy')

// Setting constant for base path
const BASE_PATH = process.cwd()

module.exports = function FileHandler(input, output) {
  // Setting constants for:
  // input and output directories
  const OUTPUT_PATH = output
  const INPUT_PATH = input

  // Logging input and output paths
  console.log('')
  console.log(colors.green.bold('   -- Input Path:  '), INPUT_PATH)
  console.log(colors.green.bold('   -- Output Path: '), OUTPUT_PATH)
  console.log('')

  fromPackage(INPUT_PATH, /\**.*$/, function (filename) {
    var packages = []
    let PackageBase = path.parse(filename)
    let base_file = PackageBase.base
    let file_path = PackageBase.dir
    // Pushing file to packages array
    packages.push(base_file)
  })

  function fromPackage(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
      console.log(colors.red.bold('   -- Please provide input and output directories: No directory provided.'), colors.white(startPath))
      return
    }

    let files = fs.readdirSync(startPath)
    try {
      for (var i = 0; i < files.length; i++) {
        var packages = []
        packages.push(files)

        var filename = path.join(startPath, files[i])
        var stat = fs.lstatSync(filename)
        // Looking for mule-deploy.properties file
        if (stat.isFile() && filename === 'mule-deploy.properties') {
          return false
        }
        else if (stat.isDirectory()) {
          RecursiveCopy(filename, path.join(`${BASE_PATH}`, `${OUTPUT_PATH}`))
        }
        else if (filter.test(filename))
          callback(filename)
      }
    }
    finally {
    }
  }
}
