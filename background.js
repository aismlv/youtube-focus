const DEBUG = false;

function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

logDebug("Background script has been loaded");
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.blocklist) {
        logDebug('Blocklist changed:', changes.blocklist.newValue);  // added log
    }
});
