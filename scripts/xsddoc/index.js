const xsddoc = require('./xsddoc')
const { log } = require('../lib')

;(async () => {
  await xsddoc()
})()

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})
