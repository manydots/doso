#!/usr/bin/env node

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const chalk = require('chalk');
const package = require('../package.json');
module.exports = (options) => {
  //console.log(package.version)
  if (options) {
    exec(`npm view ${package.name} version`, function(err, stdout, stderr) {
      if (stdout) {
        if (package.version < stdout) {
          console.log('')
          console.log(`just新版本${chalk.cyan(stdout)}`);
        }
      }
    });
  }
}