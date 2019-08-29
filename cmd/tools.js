'use strict';
const fs = require('fs');

function versionCompare(curr, promote) {
    let currVer = curr || '0.0.0';
    let promoteVer = promote || '0.0.0';
    if (currVer === promoteVer) return false;
    let currVerArr = currVer.split('.');
    let promoteVerArr = promoteVer.split('.');
    let len = Math.max(currVerArr.length, promoteVerArr.length);
    let proVal, curVal;
    for (var i = 0; i < len; i++) {
        proVal = ~~promoteVerArr[i];
        curVal = ~~currVerArr[i];
        if (proVal < curVal) {
            return false;
        } else if (proVal > curVal) {
            return true;
        }
    }
    return false;
};

function createFiles(fileName, data, callback) {
    console.log(fileName, data, fs.existsSync(fileName))
    console.log(JSON.stringify(data))
    if (typeof data == 'object') {
        data = JSON.stringify(data)
    }

    if (!fs.existsSync(fileName)) {
        fs.writeFile(fileName, data, function(err) {
            console.log(err)
        })
    } else {
        console.log(`${fileName}文件已存在!`)
    }
}

module.exports = {
    versionCompare: versionCompare,
    createFiles: createFiles
};