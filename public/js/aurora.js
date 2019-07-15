import allFeatures from './features/0-all-features';

function debug(msg) {
    console.log(msg);
}

function runAllFeatures(allFeatures) {
    Object.keys(allFeatures).forEach(key => {
        debug(`Running feature: ${key}`);
        allFeatures[key]();
    });
}

runAllFeatures(allFeatures);