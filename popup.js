const SESSION_TIMEOUT = 60 * 1000; // 1 minute for testing
//You Noob Why You Open ME
// Listen for session expiry message
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SESSION_EXPIRED') {
    logout();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  updateStatusDisplay();
});

function checkSession() {
  chrome.storage.local.get(['isAuthenticated', 'loginTime'], (data) => {
    if (data.isAuthenticated && data.loginTime) {
      const currentTime = new Date().getTime();
      if (currentTime - data.loginTime > SESSION_TIMEOUT) {
        logout();
      }
    }
  });
}

function updateStatusDisplay() {
  chrome.storage.local.get(['isAuthenticated', 'loginTime'], (data) => {
    const status = document.getElementById('status');
    if (data.isAuthenticated && data.loginTime) {
      const timeLeft = SESSION_TIMEOUT - (new Date().getTime() - data.loginTime);
      if (timeLeft > 0) {
        const secondsLeft = Math.round(timeLeft / 1000);
        status.textContent = `Active: ${secondsLeft} seconds remaining`;
        status.className = 'status success';
      } else {
        logout();
      }
    }
  });
}

function logout() {
  chrome.storage.local.set({ 
    isAuthenticated: false,
    loginTime: null 
  }, () => {
    document.getElementById('status').textContent = 'Session expired. Please login again.';
    document.getElementById('status').className = 'status error';
    chrome.runtime.reload(); // Ensure background script resets
  });
}

function showLoading(show) {
  const loader = document.querySelector('.loader');
  const btnText = document.querySelector('.btn-text');
  const loginBtn = document.getElementById('loginBtn');
  
  if (show) {
    loader.style.display = 'block';
    btnText.style.display = 'none';
    loginBtn.disabled = true;
  } else {
    loader.style.display = 'none';
    btnText.style.display = 'block';
    loginBtn.disabled = false;
  }
}

document.getElementById('loginBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const status = document.getElementById('status');

  if (!username || !password) {
    status.textContent = 'Please enter both username and password';
    status.className = 'status error';
    return;
  }

  showLoading(true);
  
  try {
    const response = await fetch('https://www.nirajankhatiwada.com.np/main.json');
    const authData = await response.json();

    if (username === authData.username && password === authData.password) {
      status.textContent = '✅ Login successful!';
      status.className = 'status success';
      
      chrome.storage.local.set({ 
        isAuthenticated: true,
        loginTime: new Date().getTime()
      }, () => {
        // Reload extension
        chrome.runtime.reload();
      });
    } else {
      status.textContent = '❌ Invalid credentials!';
      status.className = 'status error';
    }
  } catch (error) {
    status.textContent = '⚠️ Authentication failed!';
    status.className = 'status error';
  } finally {
    showLoading(false);
  }
});

// Add keyboard event listener for Enter key
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('loginBtn').click();
  }
});

// Update status more frequently (every second)
setInterval(updateStatusDisplay, 1000);
