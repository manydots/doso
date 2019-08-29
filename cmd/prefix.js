#!/usr/bin/env node

const exec = require('child_process').exec;

module.exports = (options) => {
	//console.log(options)
	exec(`npm config get prefix`, function(err, rsp, rsperr) {
		
		if (err) {
			process.exit();
		}
		console.log('npm包安装路径'+rsp)
		// if (rsp) {
		// 	exec(`cd ${rsp}`, function(err, rsp, rsperr) {
		// 		console.log(process.execPath)
		// 		console.log(err, rsp, rsperr)
		// 		console.log(fs.existsSync('npm'))
		// 		if (fs.existsSync('doso')) {
		// 			console.log(2222)
		// 		}
		// 	})
		// 	//console.log(33)
		// }

	})
}