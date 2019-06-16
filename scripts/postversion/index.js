const { log } = require('../lib')
const path = require('path')
const fs = require('fs-extra')
const { exec } = require('../lib')
const { version } = require('../../package.json')

const rootDir = path.join(__dirname, '..', '..')
const outputDir = path.join(rootDir, 'docs', 'dist', `v${version}`)
const inputFile = path.join(rootDir, 'schema', 'schema.xsd')
const outputFile = path.join(outputDir, path.basename(inputFile))

const execConfig = {
  printCommand: true,
  stdio: 'inherit'
}

;(async () => {
  log.info(`Copying schema file to ${outputFile}`)

  if (fs.existsSync(outputFile)) {
    throw new Error(`Dist file already exists for ${version}`)
  }

  await fs.ensureDir(outputDir)
  await fs.copy(inputFile, outputFile)

  await exec(`git add -A`, execConfig)
  await exec(`git commit -am "Add dist file"`, execConfig)
  await exec(`git tag -fa v${version} -m "v${version}"`, execConfig)
  await exec(`git push origin`, execConfig)
  await exec(`git push origin --tags`, execConfig)

  log.success('Distribution version file pushed')
})()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
