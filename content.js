const DEBUG = false;

function logDebug(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

logDebug("Content script has been loaded");

chrome.storage.sync.get(['channelBlocklist', 'videoBlocklist'], (result) => {
    logDebug("Fetching blocklists: ", result);
    const channelBlocklist = result.channelBlocklist.map(item => item.toLowerCase()) || [];
    const videoBlocklist = result.videoBlocklist.map(item => item.toLowerCase()) || [];

    logDebug("Channel Blocklist: ", channelBlocklist);
    logDebug("Video Blocklist: ", videoBlocklist);

    // Block existing videos
    blockVideos(channelBlocklist, videoBlocklist);

    // Set up a MutationObserver to block future videos
    let observer = new MutationObserver(() => {
        blockVideos(channelBlocklist, videoBlocklist);
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
});

function blockVideos(channelBlocklist, videoBlocklist) {
    // List all videos
    let videos = document.querySelectorAll('ytd-grid-video-renderer,#dismissible');

    // For each video
    videos.forEach((video) => {
        // Fetch the title of the video
        let titleElement = video.querySelector('#video-title');
        let channelElement = video.querySelector("#channel-name");

        // Check if the title element exists
        if (titleElement) {
            let title = titleElement.innerText;
            logDebug('Video Title: ', title);  // log the title of each video

            let channelName = channelElement ? channelElement.innerText : "No channel found for video";
            logDebug('Channel Name: ', channelName);  // log the channel name of each video

            let blockTitle = videoBlocklist.some(blockItem => title.toLowerCase().includes(blockItem));
            let blockChannel = channelBlocklist.some(blockItem => channelName.toLowerCase().includes(blockItem));

            if (blockTitle || blockChannel) {
                console.log("Blocked: ", title, " from channel: ", channelName);  // log when a video is blocked
                video.remove();
            }
        } else {
            logDebug('No title found for video');  // log when no title is found
        }
    });
}

