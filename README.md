![icon](assets/icon.png)

# YouTube Focus

YouTube Focus is a Chrome extension that allows users to filter out videos on the YouTube homepage based on keywords. It allows to setup blocklists for both the titles and channel names.

## How it works

![popup](assets/popup-screenshot.png)

After adding the extension to your browser, click on its icon and select either Title blocklist or Channel blocklist from the dropdown menu. Enter the keywords that you want to filter out, each on a new line, then click "Save". The changes will take effect when you reload the page or scroll down to load new videos.

The blocked videos are logged in the console, so you can see what videos are being filtered out.

Apart from the homepage, the videos are also filtered out from the search results and channel pages, but in a less reliable way.

## Installation

To install the extension, follow these steps:

1. Download or clone this repository to your machine.
2. In Google Chrome, go to "Extensions."
3. Turn on the "Developer mode" toggle in the top right corner.
4. Click "Load unpacked," then select the directory where you saved the repository.

## Code Files

- `manifest.json`: The file describing the extension, permissions, and scripts.
- `background.js`: Responsible for listening to changes in storage, particularly the blocklist of keywords.
- `content.js`: Main script injected into the YouTube site to remove videos.
- `popup.html`: The HTML for the popup that appears when you click the extension icon.
- `popup.js`: The script for saving and loading the blocklist.
- `icon.png`: The icon image file for the extension

## Contribute

Please open an issue or make a pull request to suggest improvements or additions.
