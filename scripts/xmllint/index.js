const xmllint = require('xmllint')
const fs = require('fs')
const path = require('path')
const schemaPath = path.join(__dirname, '..', '..', 'schema', 'schema.xsd')
const glob = require('glob')
const { log } = require('../lib')

const schema = fs.readFileSync(schemaPath, {})
const shouldPassPath = path.join(__dirname, '..', '..', 'examples')
const shouldPassFiles = glob.sync(path.join(shouldPassPath, '*.xml'))
const shouldFailPath = path.join(__dirname, 'should-fail')
const shouldFailFiles = glob.sync(path.join(shouldFailPath, '*.xml'))

log.title(`Checking that Example files are Valid: ${shouldPassFiles.length}`)
shouldPassFiles.forEach((file) => {
  const xml = fs.readFileSync(file, {})
  const result = xmllint.validateXML({
    xml,
    schema
  })
  if (!result.errors) {
    log.success(`✅ Example XML passes: ${file}`)
  } else {
    log.failure(
      `❌ There are validation errors in example file: ${file}`
    )
    result.errors.forEach((singleError) => {
      log.failure(singleError)
    })
    process.exit(1)
  }
})

log.title(`Checking that non-valid "should-fail" xmls are detected as invalid: ${shouldFailFiles.length}`)
shouldFailFiles.forEach((file) => {
  const xml = fs.readFileSync(file, {})
  const result = xmllint.validateXML({
    xml,
    schema
  })
  if (!result.errors) {
    log.failure(`❌ File should have failed but it did not: ${file}`)
    process.exit(1)
  } else {
    log.success(`✅ Errors found and expected for this file: ${file}`)
    result.errors.forEach((singleError) => {
      log.info(singleError)
    })
  }
})
