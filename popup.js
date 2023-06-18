const SEPARATOR = '\n';

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
            document.getElementById('blocklist').value = data[blocklistType].join(SEPARATOR);
        } else {
            document.getElementById('blocklist').value = '';
        }
    });
}

function saveBlocklist() {
    console.log('Save button has been pressed'); // log button press
    const blocklistType = getSelectedBlocklist();
    const blocklist = document.getElementById('blocklist').value.split(SEPARATOR).map(s => s.trim()).filter(Boolean);
    let data = {};
    data[blocklistType] = blocklist;
    chrome.storage.sync.set(data, function () {
        console.log('Blocklist is set to ', blocklist);
        document.getElementById('status').innerText = 'Updated. Reload the page or scroll down to load new videos to take effect';
        setTimeout(function () { document.getElementById('status').innerText = ''; }, 3000);
    });
}
