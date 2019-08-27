'use strict';

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

module.exports = {
    versionCompare: versionCompare,
};