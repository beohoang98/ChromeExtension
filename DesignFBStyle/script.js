var styleAdd = document.createElement('link');
styleAdd.rel = "stylesheet";
styleAdd.id = "link-css";
styleAdd.href = chrome.extension.getURL('style.css');
document.body.prepend(styleAdd);
var urlBG = chrome.extension.getURL("background.jpg");
// urlBG = "background.png";
document.body.style.backgroundImage = "url(\"" + urlBG + "\")";
document.querySelector("html").style.backgroundImage = "url(\"" + urlBG + "\")";
