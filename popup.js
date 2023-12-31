const SEPARATOR = '\n';
const DEBUG = false;

function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadBlocklist();
    document.getElementById('save').addEventListener('click', saveBlocklist);
    document.getElementById('blocklistSelect').addEventListener('change', loadBlocklist);
});

function getSelectedBlocklist() {
    return document.getElementById('blocklistSelect').value;
}

function loadBlocklist() {
    let blocklistType = getSelectedBlocklist();
    chrome.storage.sync.get(blocklistType, function (data) {
        if (data[blocklistType]) {
            // Sort the blocklist alphabetically
            const sortedBlocklist = data[blocklistType].sort();
            document.getElementById('blocklist').value = sortedBlocklist.join(SEPARATOR);
        } else {
            document.getElementById('blocklist').value = '';
        }
    });
}

function saveBlocklist() {
    logDebug('Save button has been pressed'); // log button press
    const blocklistType = getSelectedBlocklist();
    const blocklist = document.getElementById('blocklist').value.split(SEPARATOR).map(s => s.trim()).filter(Boolean);
    // Sort the blocklist alphabetically
    const sortedBlocklist = blocklist.sort();
    let data = {};
    data[blocklistType] = sortedBlocklist;
    chrome.storage.sync.set(data, function () {
        logDebug('Blocklist is set to ', sortedBlocklist);
        document.getElementById('status').innerText = 'Updated. Reload the page or scroll down to load new videos to take effect';
        setTimeout(function () { document.getElementById('status').innerText = ''; }, 3000);
    });
}
