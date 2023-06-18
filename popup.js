const SEPARATOR = '\n';

document.addEventListener('DOMContentLoaded', function () {
    loadBlocklist();
    document.getElementById('save').addEventListener('click', saveBlocklist);
});

function loadBlocklist() {
    chrome.storage.sync.get('blocklist', function (data) {
        if (data.blocklist) {
            document.getElementById('blocklist').value = data.blocklist.join(SEPARATOR);
        }
    });
}

function saveBlocklist() {
    console.log('Save button has been pressed'); // log button press
    const blocklist = document.getElementById('blocklist').value.split(SEPARATOR).map(s => s.trim()).filter(Boolean);
    chrome.storage.sync.set({ blocklist: blocklist }, function () {
        console.log('Blocklist is set to ', blocklist);
        document.getElementById('status').innerText = 'Updated. Reload tha page or scroll down to load new videos to take effect';
        setTimeout(function () { document.getElementById('status').innerText = ''; }, 3000);
    });
}
