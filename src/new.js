#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
//const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const exec = require('child_process').exec;

program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .action((name) => {
        if (!fs.existsSync(name)) {
            inquirer.prompt([{
                name: 'description',
                message: '请输入项目描述',
                type: 'list',
                choices: [
                    "Apple",
                    "Pear",
                    "Banana"
                ],
                validate: function(val) {
                    //console.log(val)
                    if (val == '') {
                        return "非空";
                    } else {
                        return val
                    }
                    if ((/\S/g).test(val)) {
                        //return val;

                    }

                }
            }, {
                name: 'author',
                message: '请输入作者名称'
            }]).then((answers) => {
                const spinner = ora('正在下载模板...');
                spinner.start();
                let gitUrl = 'https://github.com/manydots/jeq.git';
                let branch = 'master';
                let cmdStr = `git clone ${gitUrl} ${name} && cd ${name} && git checkout ${branch}`;
                exec(cmdStr, function(err, stdout, stderr) {
                    if (err) {
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                    } else {
                        spinner.succeed();
                        const fileName = `${name}/package.json`;
                        if (fs.existsSync(fileName)) {
                            const spinners = ora('项目资源安装中...');
                            spinners.start();
                            exec(`cd ${name} && npm install`, function(err, stdout, stderr) {
                                spinners.succeed();
                                console.log(symbols.success, chalk.green('项目初始化完成'));
                                process.exit();
                            })
                        }

                    }
                })

            })
        } else {
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red('项目已存在'));
        }
    })
program.parse(process.argv);