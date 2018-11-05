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

const update = async () => {
  await exec(`git checkout -b gh-pages origin/gh-pages`)

  await fs.remove(cloneFolder)
  await exec(
    `git clone --depth=1 git@github.com:qualipool/swissrets.wiki.git ${cloneFolder}`,
    execConfig
    )
  await fs.remove(path.join(cloneFolder, '.git'))

  // move index to root
  await fs.remove(indexFileDest)
  await fs.move(indexFileSrc, indexFileDest)

  // commit changes
  await exec(`git add index.md`, execConfig)
  await exec(`git rm -r --cached ${destinationFolder}`, execConfig) // suppress submodule warning
  await exec(`git add -A ${destinationFolder}/*`, execConfig)
  try {
    await exec('git commit -m "Updating posts from wiki pages"')
    await exec('git push origin', execConfig)
  } catch (e) {
    // if no changes it exites here
    console.log(e.result.stdout)
  }
}

update()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  console.error(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
