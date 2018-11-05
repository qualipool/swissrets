const path = require('path')
const fs = require('fs-extra')
const exec = require('./lib/exec')

const destinationFolder = '_posts'
const cloneFolder = path.join(__dirname, '..', destinationFolder)
const indexFileSrc = path.join(cloneFolder, 'Home.md')
const indexFileDest = path.join(cloneFolder, '..', 'index.md')

const execConfig = {
  stdio: 'inherit',
  printCommand: true
}

const update = async () => {
  await fs.remove(cloneFolder)
  await exec(
    `git clone --depth=1 git@github.com:qualipool/swissrets.wiki.git ${cloneFolder}`,
    execConfig
    )
  await fs.remove(path.join(cloneFolder, '.git'))
  await fs.remove(indexFileDest)
  await fs.move(indexFileSrc, indexFileDest)
  await exec(`git add index.md`, execConfig)
  await exec(`git rm --cached ${destinationFolder}/*`, execConfig)
  await exec(`git add -A ${destinationFolder}/*`, execConfig)
  await exec('git commit -m "Updating posts from wiki pages"')
  await exec('git push origin', execConfig)
}

update()