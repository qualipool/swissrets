const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')
const { exec, log } = require('../lib')

const xsddoc = async () => {
  const { CLASSPATH } = process.argv
  const locator = process.platform === 'win32'
    ? 'where'
    : 'which'

  const executable = await exec(`${locator} java`)
  const localClassPath = []

  if (CLASSPATH) {
    localClassPath.push(CLASSPATH)
  }

  const libClasses = await globby('lib/*.jar', { cwd: __dirname })
  localClassPath.push(...libClasses.map(file => path.resolve(__dirname, file)))
  const classpath = localClassPath.join(':')

  const outputDir = path.join(__dirname, '.tmp')
  await fs.remove(outputDir)
  await fs.ensureDir(outputDir)

  const head = `<a href="./" target="__top"><strong>Back to SwissRETS</strong></a>`

  const args = [
    `-h "${head}"`,
    '-t "SwissRETS"',
    '-v',
    `-o ${outputDir}`,
    path.join(__dirname, '..', '..', 'schema', 'schema.xsd')
  ].join(' ')

  // execute xsddoc
  await exec(`${executable} -classpath ${classpath} net.sf.xframe.xsddoc.Main ${args}`, {
    stdio: 'inherit',
    printCommand: true
  })

  // override stylesheet
  const styleFile = 'stylesheet.css'
  await fs.copy(
    path.join(__dirname, styleFile),
    path.join(outputDir, styleFile)
  )
}

xsddoc()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
