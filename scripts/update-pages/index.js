const path = require('path')
const chalk = require('chalk')
const globby = require('globby')
const fs = require('fs-extra')
const { exec, log } = require('../lib')

// start configuration
const tempFolder = path.join(__dirname, '.tmp')
const sourceRepo = 'https://github.com/qualipool/swissrets.wiki.git'
const sourceFolderName = 'source'
const destinationFolderName = 'dest'
// end configuration

const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const loudExecConfig = {
  stdio: 'inherit',
  printCommand: true
}

const addToken = (url, token) => url
  .replace(/^git/, token)
  .replace(/^https:\/\/github/, `https://${token}@github`)

// sanitized git-clone for not showing access tokens
const clone = async (repoUrl, folder, branch, token) => {
  log.info(`Cloning ${chalk.cyan(repoUrl)} into ${chalk.cyan(folder)}`)

  // use authentication
  if (token) {
    log.info(`Using token`)
    repoUrl = addToken(repoUrl, token)
  }

  // catch errors and remove sensisitve information
  return exec(`git clone -b ${branch} ${repoUrl} ${folder}`)
    .catch(err => {
      log.warn(err.result.stderr)
      return Promise.reject(new Error(err.message))
    })
}

// sanitized git-push for not showing access tokens
const push = async (repoUrl, token) => {
  log.info(`Pushing changes to ${chalk.cyan(repoUrl)}`)

  // use authentication
  if (token) {
    log.info(`Using token`)
    repoUrl = addToken(repoUrl, token)
  }

  // catch errors and remove sensisitve information
  return exec(`git push ${repoUrl}`)
    .catch(err => {
      log.warn(err.result.stderr)
      return Promise.reject(new Error(err.message))
    })
}

const update = async () => {
  const token = process.env.GITHUB_ACCESS_TOKEN

  // change to temporary directory
  await fs.remove(tempFolder)
  await fs.ensureDir(tempFolder)

  // change to temp dir
  process.chdir(tempFolder)

  // download repo
  await clone(sourceRepo, sourceFolderName, 'master', token)
  const sourceFolder = path.join(tempFolder, sourceFolderName)

  const destinationRepo = await exec(`git config --get remote.origin.url`)
  await clone(destinationRepo, destinationFolderName, 'gh-pages')
  const destinationFolder = path.join(tempFolder, destinationFolderName)

  const indexFileSrc = path.join(destinationFolder, 'Home.md')
  const indexFileDest = path.join(destinationFolder, 'index.md')

  // copy everything from source to destination
  const sourceFiles = await globby('*.md', { cwd: sourceFolder }) || []
  const copyInstructions = sourceFiles.map(src => ({
    from: path.join(sourceFolder, src),
    to: path.join(destinationFolder, src)
  }))
  const replaceRegex = new RegExp(
    sourceFiles
      .map(src => src.replace('.md', ''))
      .map(src => `[${src}](${src})`)
      .map(escapeRegExp)
      .join('|'),
    'gi'
  )

  copyInstructions.forEach(instruction => {
    const src = fs.readFileSync(instruction.from, 'utf8')
    const dest = src.replace(replaceRegex, (match) => {
      return match.replace(')', '.html)')
    })
    fs.writeFileSync(instruction.to, dest)
  })

  // rename Home to index
  await fs.remove(indexFileDest)
  await fs.move(indexFileSrc, indexFileDest)

  // commit changes
  process.chdir(destinationFolder)
  await exec(`git add -A *.md`, loudExecConfig)
  const commitCommand = 'git commit -m "Updating posts from wiki pages"'
  try {
    await exec(commitCommand, loudExecConfig)
    await push(destinationRepo, token)
  } catch (error) {
    if (!error.result || !error.result.command.match(commitCommand)) {
      throw error
    }
    // don't fail, because if there was nothing to commit, it's ok to end up here
    log.info('no changes found, from wiki')
  }
}

update()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
