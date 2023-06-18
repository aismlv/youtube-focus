console.log("Content script has been loaded");

chrome.storage.sync.get(['channelBlocklist', 'videoBlocklist'], (result) => {
    console.log("Fetching blocklists: ", result);
    const channelBlocklist = result.channelBlocklist || [];
    const videoBlocklist = result.videoBlocklist || [];
    console.log("Channel Blocklist: ", channelBlocklist);
    console.log("Video Blocklist: ", videoBlocklist);

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
            console.log('Video Title: ', title);  // log the title of each video

            let channelName = channelElement ? channelElement.innerText : "No channel found for video";
            console.log('Channel Name: ', channelName);  // log the channel name of each video

            let blockTitle = videoBlocklist.some(blockItem => title.toLowerCase().includes(blockItem.toLowerCase()));
            let blockChannel = channelBlocklist.some(blockItem => channelName.toLowerCase().includes(blockItem.toLowerCase()));

            if (blockTitle || blockChannel) {
                console.log("Blocked: ", title, " from channel: ", channelName);  // log when a video is blocked
                video.remove();
            }
        } else {
            console.log('No title found for video');  // log when no title is found
        }
    });
}

