const CreateFolderStructure = require('./lib/CreateFolderStructure')
const FileHandler = require('./lib/FileHandler')
const RecursiveCopy = require('./lib/ReursiveCopy')

const input = process.argv[2]
const output = process.argv[3]

function NodeRecursiveCopy(input, output) {
  CreateFolderStructure(input, output)
  FileHandler(input, output)
}

NodeRecursiveCopy(input, output)
