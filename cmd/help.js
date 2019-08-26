'use strict';

var chalk = require('chalk');
//console.log(just)
module.exports = function() {

  var help = `
  just 使用帮助:
    $ just init         初始化项目
    $ just help         显示套件帮助信息
`;
  process.stdout.write(chalk.green(help));
};