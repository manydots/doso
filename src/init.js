'use strict';

const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');
const cwd = process.cwd();
const config = require('./config.json');
const chalk = require('chalk');
const Tools = require('./tools');



module.exports = () => {
  co(function*() {
    // 处理console输入
    let tplName, projectName, gitUrl, nodePath;
    tplName = yield prompt(config.description.tplText);
    projectName = yield prompt(config.description.projectText);
    if (!config.template[tplName]) {
      console.log(chalk.red(`\n ${config.template[tplName]} Template does not support!`))
      process.exit();
    }
    //create文件路径
    let nodePaths = `${cwd.split(':')[0]}:\\${projectName}`;
    //console.log(nodePaths);

    //copy文件位置
    nodePath = '../' + config.template[tplName].path;
    


    if (!Tools.isExistsFile(nodePaths)) {
      fs.ensureDir(nodePaths)
        .then((files) => {
          //console.log(`\n cd ${nodePaths}`)
          fs.copy(nodePath, nodePaths)
            .then(() => {
              //console.log(files)
              console.log(chalk.cyan('[jsut-copy] 文件copy成功'));
              exec(`cd ${nodePaths}`, (error, stdout, stderr) => {
                if (error) {
                  console.log(error)
                  process.exit()
                }
                console.log(chalk.green('√ Generation completed!'))
                console.log(`cd ${nodePaths} && npm install`)
                process.exit()
              })
              //console.log(`\n cd ${nodePaths}`)
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(err => {
          console.error(err)
        })

    } else {
      console.log(chalk.red(`\n ${nodePaths},文件夹已存在`));
      process.exit();
    }



    // exec(cmdStr, (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(error)
    //     process.exit()
    //   }
    //   console.log(chalk.green('\n √ Generation completed!'))
    //   console.log(`\n cd ${projectName} && npm install \n`)
    //   process.exit()
    // })


  }).catch(onerror);

  function onerror(err) {
    process.exit();
    //console.error(err.stack);
  };


}