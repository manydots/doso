#!/usr/bin/env node

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const ora = require('ora');
const chalk = require('chalk');

module.exports = (options) => {

  inquirer.prompt([{
    name: 'uninstall',
    message: `确定卸载just吗`,
    type: 'confirm',
  }]).then((req) => {

    if (req && req.uninstall) {
      const spinners = ora(`正在卸载${chalk.cyan('just')}`);
      spinners.start();
      exec(`npm uninstall -g doso`, function(err, stdout, stderr) {
        spinners.succeed();
        console.log(`${chalk.cyan('just')}卸载完成`);
        process.exit();
      })
    };

  })
}