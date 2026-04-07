const fs = require("fs")

function readData(path) {
  const data = fs.readFileSync(path)
  return JSON.parse(data)
}

function writeData(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = { readData, writeData }