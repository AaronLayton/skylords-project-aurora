let settingsCache;

export function setOption(optionName, value) {
    if (!settingsCache) {
        settingsCache = getAllSettings();
    }

    settingsCache[optionName] = value;
    saveAllSettings(settingsCache);
}

export function getOption(optionName) {
    if (!settingsCache) {
        settingsCache = getAllSettings();
    }

    return settingsCache[optionName] === false ? false : true;
}

export function getAllSettings() {
    let settings = JSON.parse(localStorage.getItem("aurora-settings")) || {};

    return settings;
}

export function saveAllSettings(settings) {
    localStorage.setItem("aurora-settings", JSON.stringify(settings));
}