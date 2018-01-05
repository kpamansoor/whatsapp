var exec = require('cordova/exec');

var OpenActivity = function() {
};

OpenActivity.open = function(name, callbackOk, callbackFail) {
    // exec(callbackOk, callbackFail, "OpenActivity", name, []);
    exec(callbackOk, callbackFail, "OpenActivity", name, [{ "c":"audio" }, { "n":"num"}]);
};

module.exports = OpenActivity;

