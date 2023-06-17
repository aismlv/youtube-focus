document.addEventListener('DOMContentLoaded', function () {
    loadBlocklist();
    document.getElementById('save').addEventListener('click', saveBlocklist);
});

function loadBlocklist() {
    chrome.storage.sync.get('blocklist', function (data) {
        if (data.blocklist) {
            document.getElementById('blocklist').value = data.blocklist.join(', ');
        }
    });
}

function saveBlocklist() {
    console.log('Save button has been pressed'); // log button press
    const blocklist = document.getElementById('blocklist').value.split(',').map(s => s.trim());
    chrome.storage.sync.set({ blocklist: blocklist }, function () {
        console.log('Blocklist is set to ', blocklist);
    });
}
