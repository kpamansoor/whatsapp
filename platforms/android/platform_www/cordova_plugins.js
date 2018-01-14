cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-admobpro.AdMob",
        "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
        "pluginId": "cordova-plugin-admobpro",
        "clobbers": [
            "window.AdMob"
        ]
    },
    {
        "id": "cordova-plugin-clipboard2.Clipboard",
        "file": "plugins/cordova-plugin-clipboard2/www/clipboard.js",
        "pluginId": "cordova-plugin-clipboard2",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    },
    {
        "id": "callsplugin.CallsPlugin",
        "file": "plugins/callsplugin/./www/CallsPlugin.js",
        "pluginId": "callsplugin",
        "clobbers": [
            "calls"
        ]
    },
    {
        "id": "cordova-plugin-android-permissions.Permissions",
        "file": "plugins/cordova-plugin-android-permissions/www/permissions.js",
        "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
            "cordova.plugins.permissions"
        ]
    },
    {
        "id": "com.modinify.openactivity.OpenActivity",
        "file": "plugins/com.modinify.openactivity/www/openactivity.js",
        "pluginId": "com.modinify.openactivity",
        "clobbers": [
            "OpenActivity"
        ]
    },
    {
        "id": "com-darryncampbell-cordova-plugin-intent.IntentShim",
        "file": "plugins/com-darryncampbell-cordova-plugin-intent/www/IntentShim.js",
        "pluginId": "com-darryncampbell-cordova-plugin-intent",
        "clobbers": [
            "intentShim"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.3",
    "cordova-plugin-extension": "1.5.2",
    "cordova-plugin-admobpro": "2.29.24",
    "cordova-plugin-clipboard2": "0.1.0",
    "callsplugin": "0.2",
    "cordova-plugin-android-permissions": "1.0.0",
    "com.modinify.openactivity": "0.0.1",
    "com-darryncampbell-cordova-plugin-intent": "0.0.16"
};
// BOTTOM OF METADATA
});