#!/usr/bin/env node

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const ora = require('ora');
const chalk = require('chalk');
const package = require('../package.json');
const Tools = require('./tools');

module.exports = (options) => {
  //console.log(package.version)
  exec(`npm view ${package.name} version`, function(err, stdout, stderr) {


    if (stdout) {
      let latest = `just-${stdout}`;
      //console.log(Tools.versionCompare(package.version,stdout))
      if (Tools.versionCompare(package.version, stdout)) {

        console.log(`当前just版本${chalk.cyan(package.version)}`);

        inquirer.prompt([{
          name: 'update',
          message: `是否更新${chalk.cyan(latest)}`,
          type: 'confirm',
        }, {
          name: 'cnpm',
          message: '是否使用cnpm更新just',
          type: 'confirm',
          when: function(result) {
            // 当update为true的时候才会提醒
            return result.update
          }
        }]).then((req) => {
          
          let npmType = req.cnpm && req.cnpm === true ? 'cnpm' : 'npm';
          if (req && req.update) {
            const spinners = ora(`${npmType}正在更新${chalk.cyan(latest)}`);
            spinners.start();
            exec(`${npmType} install -g doso`, function(err, stdout, stderr) {
              if(err){
                process.exit();
              }
              spinners.succeed();
              console.log(`${chalk.cyan(latest)}更新完成`);
              process.exit();
            })

            // exec(`${npmType} uninstall -g doso && npm cache clean --force`, function(err, stdout, stderr) {
            //   //console.log(err,stdout, stderr)
            //   console.log(`${chalk.cyan('just')}清除cache完成`);
            //   //return;
            //   exec(`${npmType} install -g doso`, function(err, stdout, stderr) {
            //     spinners.succeed();
            //     console.log(`${chalk.cyan(latest)}更新完成`);
            //     process.exit();
            //   })

            // })

          };
        })
      } else {
        console.log(chalk.green(`just-${stdout}最新版`));
      }
    }
  });


}