const path = require('path')
const fs = require('fs-extra')
const { exec } = require('../lib')

// start configuration
const tempFolder = path.join(__dirname, '.tmp')
const sourceRepo = 'git@github.com:qualipool/swissrets.wiki.git'
const sourceFolderName = 'source'
const destFolderName = 'dest'
// end configuration

const loudExecConfig = {
  stdio: 'inherit',
  printCommand: true
}

const update = async () => {
  // change to temporary directory
  await fs.remove(tempFolder)
  await fs.ensureDir(tempFolder)

  // change to temp dir
  process.chdir(tempFolder)

  // clone repos
  await exec(`git clone --depth=1 ${sourceRepo} ${sourceFolderName}`, loudExecConfig)
  const sourceFolder = path.join(tempFolder, sourceFolderName)

  const destinationRepo = await exec(`git config --get remote.origin.url`)
  await exec(`git clone -b gh-pages ${destinationRepo} ${destFolderName}`, loudExecConfig)
  const destFolder = path.join(tempFolder, destFolderName)

  const indexFileSrc = path.join(sourceFolder, 'Home.md')
  const indexFileDest = path.join(destFolder, 'index.md')
  const postsFolder = path.join(destFolder, '_posts')

  // remove old posts folder and copy everything from source to destination
  await fs.remove(postsFolder)
  await fs.ensureDir(postsFolder)
  await fs.copy(indexFileSrc, indexFileDest)
  await fs.copy(sourceFolder, postsFolder, {
    filter: (source, dest) => !source.replace(sourceFolder, '').match('.git')
  })

  // // commit changes
  process.chdir(destFolder)
  await exec(`git add -A index.md _posts/*`, loudExecConfig)
  try {
    await exec('git commit -m "Updating posts from wiki pages"')
    await exec('git push origin', loudExecConfig)
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


