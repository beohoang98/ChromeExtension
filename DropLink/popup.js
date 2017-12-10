var isActive = "no";
var checkbox = document.getElementById("check");

var getting = chrome.storage.local.get("isActive", function(res){
	isActive = res['isActive'];
	document.querySelector("label").innerHTML = isActive;

	if (isActive === "yes") {
	checkbox.setAttribute("checked", "true");
	} else {
		checkbox.removeAttribute("checked");
	}
});

/////


/////
checkbox.addEventListener("click", function() {
	if (isActive === "yes") isActive = "no";
	else isActive = "yes";

	chrome.storage.local.set({
		"isActive":isActive
	});
	document.querySelector("label").innerHTML = isActive;

	chrome.tabs.executeScript({
  		file: "toggle.js",
  		allFrames: true
	});
});