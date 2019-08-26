'use strict';

const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const config = require('./config.json');
const chalk = require('chalk');
const tplText = 'Template name (you can input one like react, vue, angular): ';
const projectText = 'Project name: ';

module.exports = () => {
  co(function*() {
    // 处理用户输入
    let tplName, projectName, gitUrl, branch;
    tplName = yield prompt(tplText);
    projectName = yield prompt(projectText);
    if (!config.template[tplName]) {
      console.log(chalk.red(`\n ${config.template[tplName]} Template does not support!`))
      process.exit()
    }

    //console.log(config.template);

    gitUrl = config.template[tplName].url
    branch = config.template[tplName].branch

    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`
    console.log(cmdStr)
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  }).catch(onerror);

  function onerror(err) {
    console.error(err.stack);
  };

}