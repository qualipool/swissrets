const globby = require('globby')
const path = require('path')

const cwd = path.join(__dirname, '..')
const testFilesGlob = './tests/**/*.test.js'
const exampleFilesGlob = './docs/examples/*.xml'
const schemaFile = path.join(cwd, 'schema', 'schema.xsd')

const serial = (tasks, fn) => tasks.reduce(
  (promise, task) => promise.then(previous => fn(task, previous)),
  Promise.resolve(null)
)

;(async () => {
  let exitCode = 0
  const testPaths = await globby(testFilesGlob, { cwd })

  const config = {
    cwd,
    exampleFiles: await globby(exampleFilesGlob, { cwd }),
    schemaFile,
    schemaDefinitionUrl: 'https://www.w3.org/2009/XMLSchema/XMLSchema.xsd'
  }

  // create tasks
  const tasks = testPaths.map(testPath => ({
    fn: require(path.join(process.cwd(), testPath)),
    testPath
  }))

  // run all tests from all files
  console.log('start')
  await tasks.reduce((promise, task) => {
    return promise.then(
      () => task.fn(config).catch(err => {
        console.error(err.toString())
        exitCode = 1
      })
    )
  }, Promise.resolve())

  console.log('end')
  process.exit(exitCode)
})()
