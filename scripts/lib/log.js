const chalk = require('chalk')

const log = {
  title: (...args) => console.info(chalk.green.bold(`\n${(args.join(' '))}`) + '\n'),
  success: (...args) => console.info(chalk.green('  [OK] '), ...args),
  failure: (...args) => console.error(chalk.red('[FAIL] '), ...args),
  warn: (...args) => console.error(chalk.yellow('[WARN] '), ...args),
  exec: (...args) => console.error(chalk.yellow('[EXEC] '), ...args),
  info: (...args) => console.info(chalk.blue('[INFO] '), ...args)
}

module.exports = log
