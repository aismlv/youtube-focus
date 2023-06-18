console.log("Content script has been loaded");

chrome.storage.sync.get('blocklist', (result) => {
    console.log("Fetching blocklist: ", result);
    const blocklist = result.blocklist || [];
    console.log("Blocklist: ", blocklist);

    // Block existing videos
    blockVideos(blocklist);

    // Set up a MutationObserver to block future videos
    let observer = new MutationObserver(() => {
        blockVideos(blocklist);
    });

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });
});

function blockVideos(blocklist) {
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

            let channelName = channelElement.innerText;
            console.log('Channel Name: ', channelName);  // log the channel name of each video

            // If the title matches any name in the blocklist
            blocklist.forEach(blockItem => {
                if (title.includes(blockItem.toLowerCase()) || channelName.includes(blockItem.toLowerCase())) {
                    console.log("Blocked video: ", title, "Blocklist item: ", blockItem);  // log when a video is blocked
                    video.remove();
                }
            });
        } else {
            console.log('No title found for video');  // log when no title is found
        }
    });
}
