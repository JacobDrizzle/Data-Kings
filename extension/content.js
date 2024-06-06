// content.js

function sendInteractionData(eventType, additionalData) {
    chrome.storage.local.get('isPaused', (result) => {
        if (!result.isPaused) {
            chrome.runtime.sendMessage({
                type: 'interaction',
                data: {
                    timestamp: Date.now(),
                    eventType: eventType,
                    url: window.location.href,
                    ...additionalData
                }
            });
        }
    });
}

// Track click events
document.addEventListener('click', (event) => {
    sendInteractionData('click', {
        targetTagName: event.target.tagName,
        targetId: event.target.id,
        targetClasses: event.target.className,
        x: event.clientX,
        y: event.clientY
    });
});

// Track keypress events
document.addEventListener('keypress', (event) => {
    sendInteractionData('keypress', {
        key: event.key,
        targetTagName: event.target.tagName,
        targetId: event.target.id,
        targetClasses: event.target.className
    });
});

// Track mouse hover events
document.addEventListener('mouseover', (event) => {
    sendInteractionData('mouseover', {
        targetTagName: event.target.tagName,
        targetId: event.target.id,
        targetClasses: event.target.className,
        x: event.clientX,
        y: event.clientY
    });
});

// Track scroll events
document.addEventListener('scroll', () => {
    sendInteractionData('scroll', {
        scrollX: window.scrollX,
        scrollY: window.scrollY
    });
});

// Track form submissions
document.addEventListener('submit', (event) => {
    sendInteractionData('submit', {
        targetTagName: event.target.tagName,
        targetId: event.target.id,
        targetClasses: event.target.className
    });
});