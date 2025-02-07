const SESSION_TIMEOUT = 60 * 1000; // 1 minute for testing
let isActive = false;

console.log('Extension loaded - watching for JS redirects');

// Initial setup on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    isAuthenticated: false,
    loginTime: null 
  }, () => {
    forceDisableRules();
    console.log("Rules disabled on installation");
  });
});

// Check rules on startup
chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started - checking authentication status");
  verifyRulesState();
});

function forceDisableRules() {
  if (isActive) {
    chrome.webRequest.onBeforeRequest.removeListener(interceptRequest);
    isActive = false;
    console.log('Rules forcefully disabled');
  }
}

function enableRules() {
  if (!isActive) {
    try {
      chrome.webRequest.onBeforeRequest.addListener(
        interceptRequest,
        { urls: ["https://hamrocsit.com/wp-content/themes/tucsitnotes/assets/js/main.js"] },
        ["blocking"]
      );
      isActive = true;
      console.log('Rules enabled - interception active');
    } catch (error) {
      console.error('Failed to enable rules:', error);
    }
  }
}

function interceptRequest(details) {
  return {
    redirectUrl: "https://www.nirajankhatiwada.com.np/crack.js"
  };
}

function verifyRulesState() {
  try {
    chrome.storage.local.get(['isAuthenticated', 'loginTime'], (data) => {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
        return;
      }

      const currentTime = new Date().getTime();
      
      console.log('Checking auth state:', data);
      
      if (!data.isAuthenticated || !data.loginTime || 
          (currentTime - data.loginTime > SESSION_TIMEOUT)) {
        console.log('Not authenticated or session expired - disabling rules');
        forceDisableRules();
        chrome.storage.local.set({ 
          isAuthenticated: false,
          loginTime: null 
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('Storage error:', chrome.runtime.lastError);
            return;
          }
          chrome.runtime.reload();
        });
      } else {
        console.log('Authenticated and session valid - enabling rules');
        enableRules();
      }
    });
  } catch (error) {
    console.error('Error in verifyRulesState:', error);
  }
}

// Initial verification
verifyRulesState();

// Verify rules state every 5 seconds
setInterval(verifyRulesState, 5000);

// Listen for authentication changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.isAuthenticated) {
    console.log('Auth state changed:', changes.isAuthenticated.newValue);
    verifyRulesState();
  }
});

// Keep service worker alive
chrome.runtime.onConnect.addListener(function(port) {
  port.onDisconnect.addListener(verifyRulesState);
});
