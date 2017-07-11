var styleAdd = document.createElement('link');
styleAdd.rel = "stylesheet";
styleAdd.href = chrome.extension.getURL('style.css');
document.body.prepend(styleAdd);
