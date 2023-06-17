console.log("Background script has been loaded");
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.blocklist) {
        console.log('Blocklist changed:', changes.blocklist.newValue);  // added log
    }
});
