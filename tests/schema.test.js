const xmllint = require('xmllint')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const pretty = require('./lib/prettyError')

const task = async config => {
  // download the schema definition
  console.log(config)
  console.log('Downloading schema definition from', config.schemaDefinitionUrl)
  const schema = await fetch(config.schemaDefinitionUrl)
    .then(response => response.text())

  console.log('Validatting schema against definition')
  const xml = fs.readFileSync(config.schemaFile, 'utf8')

  const result = xmllint.validateXML({
    xml,
    schema
  })

  if (result.errors) {
    const basename = path.basename(config.schemaFile)
    const errors = pretty(result.errors, basename)
    errors.forEach(error => {
      console.log(error + '\n')
    })
    throw new Error('Schema linting failed')
  }

}
module.exports = task
