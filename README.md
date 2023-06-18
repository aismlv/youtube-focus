# YouTube Sift - A Chrome Extension

This is a Chrome extension that allows users to filter out YouTube videos based on keywords. It filters videos both by title and channel name.

The code is mostly generated interacting with ChatGPT.

## How it works

After adding the extension to your browser, click on its icon and you'll see a text area. Enter the keywords that you want to filter out, each on a new line, then click "Save". The changes will take effect when you reload the page or scroll down to load new videos.

## Installation

To install the extension, follow these steps:

1. Download or clone this repository to your machine.
2. In Google Chrome, go to "Extensions."
3. Turn on the "Developer mode" toggle in the top right corner.
4. Click "Load unpacked," then navigate to the directory where you saved the repository files and select it.

## Code Files

- `manifest.json`: The file that describes the extension, its permissions, and scripts.
- `background.js`: Responsible for listening to changes in storage, particularly the blocklist of keywords.
- `content.js`: Main script that's injected into the YouTube site to remove videos.
- `popup.html`: The HTML for the popup that appears when you click the extension icon.
- `popup.js`: The script for saving and loading the blocklist.
- `icon.png`: The icon image file for the extension, generated by Bing powered by DALL∙E

## Contribute

Suggestions and contributions are always welcome. Please open an issue or make a pull request to suggest improvements or additions.