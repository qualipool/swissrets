const globby = require('globby')
const path = require('path')

;(async () => {
  const testPaths = await globby('./tests/**/*.test.js')

  // run all tests
  testPaths.forEach(testPath => {
    const fn = require(path.join(process.cwd(), testPath))
    fn()
  })
})()
