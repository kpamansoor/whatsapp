cordova.define("com.modinify.openactivity.OpenActivity", function(require, exports, module) {
var exec = require('cordova/exec');

var OpenActivity = function() {
};

OpenActivity.open = function(name, type, num, callbackOk, callbackFail) {
//    exec(callbackOk, callbackFail, "OpenActivity", name, []);
exec(callbackOk, callbackFail, "OpenActivity", name, [type, num]);
};

module.exports = OpenActivity;


});
