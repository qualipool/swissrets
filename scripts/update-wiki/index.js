const path = require('path')
const fs = require('fs-extra')
const exec = require('../lib/exec')

const destinationFolder = '_posts'
const cloneFolder = path.join(__dirname, '.tmp', destinationFolder)
const indexFileSrc = path.join(cloneFolder, 'Home.md')
const indexFileDest = path.join(cloneFolder, '..', 'index.md')

const execConfig = {
  stdio: 'inherit',
  printCommand: true
}

const fetchWiki = async () => {
  await fs.remove(cloneFolder)
  await exec(
    `git clone --depth=1 git@github.com:qualipool/swissrets.wiki.git ${cloneFolder}`,
    execConfig
  )
  await fs.remove(path.join(cloneFolder, '.git'))

  // move index to root
  await fs.remove(indexFileDest)
  await fs.move(indexFileSrc, indexFileDest)
}

fetchWiki()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  console.error(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
