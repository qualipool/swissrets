const { spawn } = require('child_process')

const whiteSpace = /\s+/

const buffersToString = (buffers, trim) => {
  const str = Buffer.concat(buffers).toString()
  return trim
    ? str.trim()
    : str
}

const getResult = ({ stdout, stderr, command, args, trim, resolveTo, ...rest }) => resolveTo === 'string'
  ? buffersToString(stdout, trim)
  : {
      ...rest,
      command: `${command} ${args.join(' ')}`,
      stdout: buffersToString(stdout, trim),
      stderr: buffersToString(stderr, trim)
    }

const error = bareResult => {
  const err = new Error(`Process exited with code ${bareResult.code}`)
  err.result = getResult({
    ...bareResult,
    resolveTo: 'object'
  })
  return err
}

const exec = (command, options = {}) => {
  const mergedOptions = {
    // use all env vars by default
    env: process.env,

    // use node cwd by default
    cwd: process.cwd(),

    // print the command before executing it
    printCommand: false,

    // remove not visible characters from start and end of out put
    trimOutput: true,

    // swallow output by default
    stdio: 'pipe',

    // important for windows
    shell: true,

    // 'string' resolves stdout
    // 'object' resolves to an object containing stdout, stderr, command, code and signal
    resolveTo: 'string',

    // custom logger
    log: (...args) => console.log(...args),

    // allow overriding everything
    ...options
  }
  const {
    trimOutput: trim,
    printCommand,
    resolveTo,
    log,
    ...spawnOptions
  } = mergedOptions

  command = command.trim()
  const args = []

  if (printCommand) {
    log('>', command)
  }

  const hasArgs = command.match(whiteSpace)
  if (hasArgs) {
    args.push(command.substring(hasArgs.index).trim())
    command = command.substring(0, hasArgs.index)
  }

  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, spawnOptions)
    const stdout = []
    const stderr = []
    if (proc.stdout) {
      proc.stdout.on('data', buffer => stdout.push(buffer))
    }
    if (proc.stderr) {
      proc.stderr.on('data', buffer => stderr.push(buffer))
    }
    proc
      .on('error', err => stderr.push(err.toString()))
      .on('close', (code, signal) => {
        const bareResult = { command, args, stdout, stderr, code, signal, trim, resolveTo }
        if (code === 0) {
          resolve(getResult(bareResult))
        } else {
          reject(error(bareResult))
        }
      })
  })
}

module.exports = exec
