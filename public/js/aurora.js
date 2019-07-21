import allFeatures from './features/0-all-features';
import addAuroraMenu, { addLink, addPage, handleHash } from './modules/aurora-menu';

function debug(msg) {
    console.log(msg);
}

function runAllFeatures(allFeatures) {
    allFeatures.forEach(entry => {
        if (entry.active) {
            console.log(`Running feature: ${entry.name}`);
            entry.setup();
        }
    });
}

var script = document.currentScript;
var cssUrl = script.src.replace("/js/aurora.dist.js","/css/aurora.dist.css");

//injectCssFile(cssUrl);
runAllFeatures(allFeatures);

const menuElm = addAuroraMenu();
addPage(menuElm, "aurora-settings", "Settings", () => import('./pages/settings'));
addLink(menuElm, "https://github.com/AaronLayton/skylords-project-aurora/issues/new", "Suggest a feature", "_blank");
addLink(menuElm, "https://github.com/AaronLayton/skylords-project-aurora/issues", "Feature backlog", "_blank");

handleHash(location.hash);