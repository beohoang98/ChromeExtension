var syncUrl = "http://localhost/SaveLink/";

var styleAdd = document.createElement('link');
styleAdd.rel = "stylesheet";
styleAdd.id = "droplink-css";
styleAdd.href = chrome.extension.getURL('style.css');
document.body.prepend(styleAdd);

var droplink_snippet = document.createElement("div");
droplink_snippet.id = "droplink-snippet";
var droplink_div = document.createElement("div");
droplink_div.id = "droplink-wrap";
var droplink_inner = document.createElement("div");
droplink_inner.className = "wrap";
var text = document.createElement("input");
text.setAttribute("type","text");
var show_link = document.createElement("div");
show_link.style.display = "none";
show_link.className = "show-link";

//---------ADD-----------------
// droplink_div.style.display = "none";
document.body.appendChild(droplink_div);
document.body.appendChild(droplink_snippet);
droplink_div.appendChild(show_link);
droplink_div.appendChild(droplink_inner);
droplink_inner.appendChild(text);
syncData();

// droplink_div.onclick = function() {
// 	alert(this.querySelector("textarea").value);
// }

/////
function mouseUp() {
    window.removeEventListener("mousemove", divMove, true);
}
function mouseDown(e) {
  	window.addEventListener("mousemove", divMove, true);
}
function divMove(e) {
  var div = document.getElementById("droplink-wrap");
  div.style.top = e.clientY - 50 + "px";
  div.style.left = e.clientX - 50 + "px";
}
//
// make it move---------
droplink_inner.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);
//----------------------

//when click it---------
droplink_div.onclick = function() {
	let show_div = document.querySelector("#droplink-wrap .show-link");
	if (show_div.style.display == "none") {
		show_div.style.display = "block";
	}
	else {
		show_div.style.display = "none";
	}
};
//-----------------------

//sync data--------------
function syncData() {
	fetch(syncUrl + "data.txt")
		.then(function(res) {
			return res.text();
		})
		.then(function(text) {
			let listURL = text.split("\n");
			let show_div = document.querySelector("#droplink-wrap .show-link");
			show_div.innerHTML = "";
			let p;
			listURL.forEach(function(url) {
				p = document.createElement("a");
				p.innerHTML = url;
				p.setAttribute("href", url);
				p.setAttribute("target", "_blank");

				show_div.appendChild(p.cloneNode(true));
			});
		});
}
//-----------------------


text.onkeydown= function(e) {
	e.preventDefault();
}

text.addEventListener("input", function() {
	let url = this.value;
	this.value = "";

	if (checkUrl(url)){
		fetch(syncUrl+"save.php?url="+url)
		.then(function(res) {
			return res.json();
		})
		.then(function(res) {
			console.log(res.response);
			syncData();
		});
	} 
	else {
		url = "this is not an url link";
	}

	var tab = createTab(url);
	document.getElementById("droplink-snippet").appendChild(tab);
});

dropTabNum = 0;
function createTab(url) {
	var tab = document.createElement("div");

	++dropTabNum;
	tab.className = "droplink-tab";
	tab.id = "tab-"+dropTabNum;

	url = url.replace(/$(http):\/\//gi, "https://");

	fetch(url).then((res)=>{
		return res.text();
	}).then((html)=>{
		let thisTab = document.getElementById("tab-"+dropTabNum);
		let theTitle = html.match(/<title>(.*)<\/title>/);

		setTimeout(()=>{
			thisTab.parentNode.removeChild(thisTab);
		}, 4000);

		if (theTitle) {
			let favicon = document.createElement("img");
			favicon.className = "site-favicon";
			favicon.src = "https://www.google.com/s2/favicons?size=128&domain="+url;
			
			let title = document.createElement("div");
			title.className = "site-name";
			title.innerHTML = theTitle[1];

			thisTab.appendChild(favicon);
			thisTab.appendChild(title);
		}
		else
			thisTab.innerHTML = url;
	});
	
	return tab;
}
function checkUrl(url) {
	let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	return url.match(regex);
}