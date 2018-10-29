const xmllint = require('xmllint')
const fs = require('fs')
const path = require('path')

const prettyError = require('./lib')

const task = async config => {
  let numberOfErrors = 0
  const schema = fs.readFileSync(config.schemaFile, 'utf8')
  config.exampleFiles.forEach(file => {
    const basename = path.basename(file)
    console.log('Validating', basename, 'against schema')
    const xml = fs.readFileSync(path.join(config.cwd, file), 'utf8')
    const result = xmllint.validateXML({
      xml,
      schema
    })

    if (result.errors) {
      const errors = prettyError(result.errors, basename)
      numberOfErrors += errors.length
      errors.forEach(error => {
        console.log(error + '\n')
      })
    }
  })

  if (numberOfErrors > 0) {
    throw new Error('Tests failed')
  }
}

module.exports = task
