// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isPaused: false });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'interaction') {
        chrome.storage.local.get('isPaused', (result) => {
            if (!result.isPaused) {
                // Store interaction data if not paused
                chrome.storage.local.get('interactionData', (result) => {
                    const interactionData = result.interactionData || [];
                    interactionData.push(message.data);
                    chrome.storage.local.set({ interactionData });
                });
            }
        });
    } else if (message.type === 'togglePause') {
        chrome.storage.local.get('isPaused', (result) => {
            const newPauseState = !result.isPaused;
            chrome.storage.local.set({ isPaused: newPauseState }, () => {
                sendResponse({ isPaused: newPauseState });
            });
        });
        return true; // Keep the messaging channel open for sendResponse
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Track page load
        console.log('Page loaded:', tab.url);
        
        // Store browsing data
        chrome.storage.local.get('browsingData', (result) => {
            const browsingData = result.browsingData || [];
            browsingData.push({ url: tab.url, timestamp: Date.now() });
            chrome.storage.local.set({ browsingData });
        });
    }
});