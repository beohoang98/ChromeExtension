var styleAdd = document.createElement('link');
styleAdd.rel = "stylesheet";
styleAdd.id = "link-css";
styleAdd.href = chrome.extension.getURL('style.css');
document.body.prepend(styleAdd);
