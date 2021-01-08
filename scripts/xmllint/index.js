const xmllint = require('xmllint')
const fs = require('fs')
const path = require('path')
const schemaPath = path.join(__dirname, '..', '..', 'schema', 'schema.xsd')
const glob = require('glob')
const { log } = require('../lib')
// process.setMaxListeners(100);

fs.readFile(schemaPath, {}, (err, schema) => {
  if (err) {
    log.failure(err)
    process.exit(1)
  }
  const shouldPassPath = path.join(__dirname, '..', '..', 'examples')
  glob(path.join(shouldPassPath, '*.xml'), function (er, files) {
    files.forEach((file) => {
      fs.readFile(file, {}, (err, xml) => {
        if (err) {
          log.failure(err)
        } else {
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
        }
      })
    })
  })

  const shouldFailsPath = path.join(__dirname, 'should-fail')
  glob(path.join(shouldFailsPath, '*.xml'), function (er, files) {
    files.forEach((file) => {
      fs.readFile(file, {}, (err, xml) => {
        if (err) {
          log.failure(err)
        } else {
          const result = xmllint.validateXML({
            xml,
            schema
          })

          if (!result.errors) {
            log.failure(`❌ file should have failed but it did not: ${file}`)
            process.exit(1)
          } else {
            log.success(`✅ errors found and expected for this file: ${file}`)
            result.errors.forEach((singleError) => {
              log.info(singleError)
            })
          }
        }
      })
    })
  })
})
