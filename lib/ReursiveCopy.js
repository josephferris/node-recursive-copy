const fs = require('fs')
const { join } = require('path')
const colors = require('colors')

const RecursiveCopy = function (sourceDirectory, destinationDirectory) {
  const results = []
  const list = fs.readdirSync(sourceDirectory)
  const source = null
  const destination = null

  list.forEach(function (file) {
    source = sourceDirectory + '/' + file
    destination = join(destinationDirectory, '/', file)
    destination1 = destinationDirectory + '/' + file
    console.log(colors.cyan.bold('   -- Source directory:'), colors.cyan(source))
    var stat = fs.statSync(source)
    if (stat && stat.isDirectory()) {
      try {
        console.log('')
        console.log(colors.green.bold('   -- Creating directory:'), colors.green(destination))
        fs.mkdirSync(destination)
      } catch (e) {
        console.log(colors.yellow.bold('   -- Directory already exists:'), colors.yellow(destination))
      }
      results = results.concat(copy(source, destination))
    } else {
      try {
        console.log(colors.white.bold('   -- Copying file:'), destination)
        //fs.createReadestinationream(source).pipe(fs.createWriteStream(destination))
        fs.writeFileSync(destination, fs.readFileSync(source))
      } catch (e) {
        console.log(colors.red.bold('   -- Could\'t copy file:'), destination)
      }
      results.push(source)
    }
  })
  return results
}

module.exports = RecursiveCopy
