#!/usr/bin/env node


const program = require('commander');
const chalk = require('chalk');//终端输出时颜色样式输出工具

program
	.version(require('./package').version)
program
	.command('cwd')
	.description('now cwd')
	.alias('c')
	.action(() => {
		console.log(process.cwd())
	})
program
	.usage('<command> [options] 快速启动项目') //-h 打印的用户提示
program
	.command('init <name>')
	.description('Create a new project')
	.alias('i')
	.action((name) => {
		require('./cmd/init')(name);
		require('./cmd/check')(true);
	})
program
	.command('update')
	.description('update this tools')
	.alias('ud')
	.action((up) => {
		require('./cmd/update')(up);
	})
program
	.command('uninstall')
	.description('uninstall this tools')
	.alias('rm')
	.action(() => {
		require('./cmd/uninstall')();
	})

//添加一些有用的信息到help选项
program.on('--help', () => {
  //console.log('')
  //console.log(`Run ${chalk.cyan(`just <command> --help`)} for detailed usage of given command.`)
  //console.log('')
})
program.parse(process.argv)