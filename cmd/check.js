#!/usr/bin/env node

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const chalk = require('chalk');
const package = require('../package.json');
const Tools = require('./tools');
module.exports = (options) => {
  //console.log(package.version)
  if (options) {
    exec(`npm view ${package.name} version`, function(err, stdout, stderr) {
      if (stdout) {
        if (Tools.versionCompare(package.version,stdout)) {
          console.log(`\njust存在新版本${chalk.cyan(stdout)}执行${chalk.cyan('just update')}更新`);
        }
      }
    });
  }
}