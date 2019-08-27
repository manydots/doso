#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
//const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
//const symbols = require('log-symbols');
const exec = require('child_process').exec;
const config = require('../config.json');

module.exports = (projectName) => {
  //console.log(projectName)
  if (!fs.existsSync(projectName)) {
    inquirer.prompt([{
      name: 'type',
      message: '请选择项目类型(使用cmd或者低版本git)',
      type: 'list',
      choices: [
        "react",
        "vue",
        "jeq"
      ]
    }, {
      name: 'description',
      message: '请输入description'
    }, {
      name: 'author',
      message: '请输入author',
      // validate: function(val) {
      //   //console.log(val)
      //   if (val == '') {
      //     //return "非空";
      //   } else {
      //     //return val
      //   }
      // }
    }]).then((answers) => {
      //console.log(answers.type)
      if (!config || !config.template[answers.type]) {
        console.log(chalk.red(`\n ${answers.type} 该模板不存在!`))
        process.exit();
      }
      const spinner = ora('正在下载模板...');
      spinner.start();
      let gitUrl = config.template[answers.type].gitUrl;
      let branch = config.template[answers.type].branch;
      let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
      exec(cmdStr, function(err, stdout, stderr) {
        if (err) {
          spinner.fail();
          console.log(chalk.red(err));

        } else {
          spinner.succeed();
          const fileName = `${projectName}/package.json`;
          const meta = {
            name: projectName,
            description: answers.description,
            author: answers.author
          }

          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);

            inquirer.prompt([{
              name: 'install',
              message: '是否安装package.json资源',
              type: 'confirm',
            }, {
              name: 'cnpm',
              message: '是否使用cnpm',
              type: 'confirm',
              when: function(answers) {
                // 当install为true的时候才会提醒
                return answers.install
              }
            }]).then((req) => {
              //console.log(req);
              let npmType = req.cnpm && req.cnpm === true ? 'cnpm' : 'npm';
              if (req && req.install) {
                const spinners = ora(`${npmType}正在安装package.json资源...`);
                spinners.start();
                exec(`cd ${projectName} && ${npmType} install`, function(err, stdout, stderr) {
                  spinners.succeed();
                  console.log(chalk.green('项目初始化完成'));
                  process.exit();
                })
              }

            })

          }

        }
      })

    })
  } else {
    // 错误提示项目已存在，避免覆盖原有项目
    //做一些处理
    console.log(chalk.red('项目已存在'));
  }
}