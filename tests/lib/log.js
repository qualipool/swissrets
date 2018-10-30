const chalk = require('chalk')

const log = {
  title: (...args) => console.info(chalk.black.bgGreen.bold(`\n ${(args.join(' '))} `) + '\n'),
  success: (...args) => console.info(chalk.green('  [OK] '), ...args),
  failure: (...args) => console.error(chalk.red('[FAIL] '), ...args),
  warn: (...args) => console.error(chalk.redBright('[WARN] '), ...args),
  info: (...args) => console.info(chalk.blue('[INFO] '), ...args)
}

module.exports = log
