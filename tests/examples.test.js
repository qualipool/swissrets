const xmllint = require('xmllint')
const fs = require('fs')
const path = require('path')

const fn = () => {
  const result = xmllint.validateXML({
    xml: fs.readFileSync(path.join(process.cwd(), 'docs', 'example.xml'), 'utf8'),
    schema: fs.readFileSync(path.join(process.cwd(), 'schema', 'schema.xsd'), 'utf8')
  })
  console.log(result)
}

module.exports = fn
