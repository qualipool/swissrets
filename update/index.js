const path = require('path')
const fs = require('fs-extra')
const exec = require('./lib/exec')

const cloneFolder = path.join(__dirname, '..', '_posts')
const indexFileSrc = path.join(cloneFolder, 'Home.md')
const indexFileDest = path.join(cloneFolder, '..', 'index.md')

const update = async () => {
  await fs.remove(cloneFolder)
  await exec(
    `git clone git@github.com:qualipool/swissrets.wiki.git ${cloneFolder}`,
    { stdio: 'inherit' }
    )
  await fs.remove(indexFileDest)
  await fs.move(indexFileSrc, indexFileDest)
  await exec('git add -A', { stdio: 'inherit' })
  await exec('git commit -m "Updating posts from wiki pages"')
  await exec('git push origin', { stdio: 'inherit' })
}

update()