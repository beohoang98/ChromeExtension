var styleAdd = document.createElement('link');
styleAdd.rel = "stylesheet";
styleAdd.id = "link-css";
styleAdd.href = chrome.extension.getURL('style.css');
document.body.prepend(styleAdd);
var urlBG = chrome.extension.getURL("background.jpg");
// urlBG = "background.png";
document.body.style.backgroundImage = "url(\"" + urlBG + "\")";

//smooth scroll
document.querySelector("#globalContainer").onmousewheel = smoothWheel;

function smoothWheel(event) {
    event.preventDefault();

    var delta = event.wheelDelta / 120 || -event.detail / 3;

    window.scrollBy({
        top: -delta*400,
        left: 0,
        behavior: "smooth"
    })
}
