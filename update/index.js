const path = require('path')
const fs = require('fs-extra')
const exec = require('./lib/exec')

const tempFolder = path.join(__dirname, '.tmp')

const update = async () => {
  await fs.remove(tempFolder)
  await exec('git clone git@github.com:qualipool/swissrets.wiki.git wiki')
}

update()