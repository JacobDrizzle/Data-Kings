// popup.js
document.addEventListener("DOMContentLoaded", function () {
    const browsingDataList = document.getElementById("browsingDataList");
    const interactionList = document.getElementById("interactionList");
    const clearDataButton = document.getElementById("clearData");
    const togglePauseButton = document.getElementById("togglePause");

    // Load and display browsing data
    chrome.storage.local.get("browsingData", (result) => {
        const browsingData = result.browsingData || [];
        browsingData.forEach((entry) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${new Date(entry.timestamp).toLocaleString()}: ${entry.url}`;
            browsingDataList.appendChild(listItem);
        });
    });

    // Load and display interaction data
    chrome.storage.local.get("interactionData", (result) => {
        const interactionData = result.interactionData || [];
        interactionData.forEach((entry) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${new Date(entry.timestamp).toLocaleString()}: ${entry.eventType} on ${entry.targetTagName} ${entry.targetId ? "#" + entry.targetId : ""} ${entry.targetClasses ? "." + entry.targetClasses.split(" ").join(".") : ""} ${entry.key ? "Key: " + entry.key : ""} at ${entry.url}`;
            interactionList.appendChild(listItem);
        });
    });

    // Handle clear data button
    clearDataButton.addEventListener("click", () => {
        chrome.storage.local.remove(["browsingData", "interactionData"], () => {
            browsingDataList.innerHTML = "";
            interactionList.innerHTML = "";
            console.log("Data cleared");
        });
    });

    // Handle pause button
    togglePauseButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ type: 'togglePause' }, (response) => {
            if (response.isPaused) {
                togglePauseButton.textContent = 'Resume';
            } else {
                togglePauseButton.textContent = 'Pause';
            }
        });
    });

    // Set initial button state
    chrome.storage.local.get('isPaused', (result) => {
        if (result.isPaused) {
            togglePauseButton.textContent = 'Resume';
        } else {
            togglePauseButton.textContent = 'Pause';
        }
    });
});