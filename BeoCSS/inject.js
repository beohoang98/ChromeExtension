(async function() {
    let domain = document.domain;
    let manifest;

    await fetch(chrome.extension.getURL("inject.json"))
    .then(res=>{
        return res.json();
    }).then(json=>{
        manifest = json;
        console.log("BeoCSS: Hello "+domain);
    });

    if (manifest.hasOwnProperty(domain)) {
        let style_add = document.createElement("link");
        style_add.rel = "stylesheet";
        style_add.id = "beocss-css";
        style_add.href = chrome.extension.getURL("content/"+manifest[domain]["css"]);

        let script_add = document.createElement("script");
        script_add.src = chrome.extension.getURL("content/"+manifest[domain]["js"]);

        document.body.prepend(style_add);
        document.body.prepend(script_add);
    }
})();
