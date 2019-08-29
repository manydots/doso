#!/usr/bin/env node


const program = require('commander');
const chalk = require('chalk'); //终端输出时颜色样式输出工具

program
	.version(require('./package').version, '-v, --version')
program
	.command('cwd')
	.description('now cwd')
	.alias('c')
	.action(() => {
		console.log(process.cwd())
	})
program
	.command('init <name>')
	.description('create a new project')
	.alias('i')
	.action((name) => {
		//require('./cmd/check')(true);
		require('./cmd/init')(name);
	})
program
	.command('update')
	.description('update this tools')
	.alias('up')
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
program
	.command('prefix')
	.description('npm config get prefix')
	.alias('pf')
	.action(() => {
		require('./cmd/prefix')(true);
	})

//添加一些有用的信息到help选项
//program.on('--help', () => {
//console.log('')
//console.log(`Run ${chalk.cyan(`just <command> --help`)} for detailed usage of given command.`)
//console.log('')
//})
program.on('command:*', function(env) {
	console.log(`unknown command: ${chalk.red(env.join(''))}\n${chalk.cyan('See -h or --help for help.')}`);
	process.exit(1);
});

// program
// 	.command('*')
// 	.action(function(env) {
// 		console.log(`unknown command: ${chalk.red(env)}\n${chalk.cyan('See -h or --help for help.')}`);
// 	});
program.parse(process.argv)