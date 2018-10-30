const globby = require('globby')
const path = require('path')

const { exec, log } = require('./lib')

const schemaDefinitionUrl = 'http://www.w3.org/2009/XMLSchema/XMLSchema.xsd'
const cwd = path.join(__dirname, '..')
const exampleFilesGlob = './docs/examples/*.xml'
const schemaFile = path.join('schema', 'schema.xsd')

const lint = (schema, xml) => {
  log.info(`Linting ${xml}...`)
  return exec(`xmllint --noout --schema ${schema} ${xml}`, { printCommand: true })
    .then(result => {
      log.success(`${xml} is valid`)
      console.log('\n')
      return result
    })
    .catch(err => {
      if (!err.result.stderr) {
        throw err
      }
      err.result.stderr.split('\n').forEach(line => log.warn(line.split(' : ').join('\n') + '\n'))
      process.exitCode = 1
    })
}

const executeAllTests = async () => {
  // check if xmllint is installed
  log.title('Check if xmllint is installed')
  const xmllintLocation = await exec('which xmllint')
  log.success(`Using ${JSON.stringify( xmllintLocation.toString() )} for linting`)

  // lint the schama itself
  log.title('Linting schema')
  await lint(schemaDefinitionUrl, schemaFile)

  // linting examples
  const exampleFiles = await globby(exampleFilesGlob, { cwd })
  log.title(`Linting ${exampleFiles.length} example files`)
  exampleFiles.reduce((promise, exampleFile) => {
    return promise.then(() => lint(schemaFile, exampleFile))
  }, Promise.resolve())
}

try {
  executeAllTests()
} catch (e) {
  console.log(e)
}

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
