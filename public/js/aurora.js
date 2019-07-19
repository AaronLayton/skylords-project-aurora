import allFeatures from './features/0-all-features';

function debug(msg) {
    console.log(msg);
}

function runAllFeatures(allFeatures) {
    allFeatures.forEach(entry => {
        console.log(`Running feature: ${entry.name}`);
        entry.setup();
    });
}

var script = document.currentScript;
var cssUrl = script.src.replace("/js/aurora.dist.js","/css/aurora.dist.css");

//injectCssFile(cssUrl);
setTimeout(() => {
    runAllFeatures(allFeatures);
}, 2000);
