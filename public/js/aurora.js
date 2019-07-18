import allFeatures from './features/0-all-features';

function debug(msg) {
    console.log(msg);
}

function injectCssFile(url) {
    var linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', url);
    document.head.appendChild(linkElement);
}

function runAllFeatures(allFeatures) {
    Object.keys(allFeatures).forEach(key => {
        debug(`Running feature: ${key}`);
        allFeatures[key]();
    });
}

var script = document.currentScript;
var cssUrl = script.src.replace("/js/aurora.dist.js","/css/aurora.dist.css");

//injectCssFile(cssUrl);
setTimeout(() => {
    runAllFeatures(allFeatures);
}, 2000);
