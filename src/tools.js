'use strict';

const fs = require('fs');

function isExistsFile(nodePaths) {
	// let isExistsFile = false;
	// return fs.exists(nodePaths, function(exists) {
	// 	//console.log(exists ? `${nodePaths},文件夹已存在` : `${nodePaths},文件夹不存在可以初始化`);
	// 	return exists;
	// });
	//return isExistsFile;
	try{
        fs.accessSync(nodePaths,fs.R_OK | fs.W_OK);
    }catch(e){
        return false;
    }
    return true;
}

module.exports = {
	isExistsFile: isExistsFile
}