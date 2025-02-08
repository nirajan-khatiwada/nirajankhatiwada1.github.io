const SESSION_TIMEOUT = 60 * 1000; // 1 minute for testing
let isActive = false;

console.log('Extension loaded - watching for JS redirects');

// Initial setup on installation
chrome.runtime.onInstalled.addListener(async () => {
  await forceDisableRules();
  console.log("Rules disabled on installation");
});

// Check rules on startup
chrome.runtime.onStartup.addListener(async () => {
  console.log("Browser started - checking authentication status");
  await verifyRulesState();
});

async function forceDisableRules() {
  try {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ["ruleset_1"]
    });
    isActive = false;
    console.log('Rules forcefully disabled');
  } catch (error) {
    console.error('Failed to force disable rules:', error);
  }
}

async function enableRules() {
  if (isActive) return;
  
  try {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ["ruleset_1"]
    });
    isActive = true;
    console.log('Rules enabled - interception active');
  } catch (error) {
    console.error('Failed to enable rules:', error);
  }
}

async function disableRules() {
  if (!isActive) return;
  
  try {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ["ruleset_1"]
    });
    isActive = false;
    console.log('Rules disabled - interception stopped');
  } catch (error) {
    console.error('Failed to disable rules:', error);
  }
}

async function verifyRulesState() {
  const data = await chrome.storage.local.get(['isAuthenticated', 'loginTime']);
  const currentTime = new Date().getTime();
  
  console.log('Checking auth state:', data);
  
  if (!data.isAuthenticated || !data.loginTime || 
      (currentTime - data.loginTime > SESSION_TIMEOUT)) {
    console.log('Not authenticated or session expired - disabling rules');
    await forceDisableRules();
    await chrome.storage.local.set({ 
      isAuthenticated: false,
      loginTime: null 
    });
  } else {
    console.log('Authenticated and session valid - enabling rules');
    await enableRules();
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
