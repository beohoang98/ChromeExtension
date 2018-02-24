(function() {

    //create Panel
    let wrap = document.createElement("div");
    wrap.className = "getID-panel-wrap";
    let panel_head = document.createElement("div");
    panel_head.textContent = "Show ID";
    panel_head.className = "getID-panel-head";
    let panel_body = document.createElement("div");
    panel_body.className = "getID-panel-body";
    wrap.appendChild(panel_head);
    wrap.appendChild(panel_body);

    // create its event
    function moveable(e) {
        e = e || window.event;

        let $this = e.target.parentNode;
        let dx = $this.getAttribute("dx");
        let dy = $this.getAttribute("dy");
        $this.style.top = (e.clientY - dy) + "px";
        $this.style.left = (e.clientX - dx) + "px";
        // console.log(e.pageY);
        // console.log($this);
    }
    document.addEventListener("mousedown", (e)=>{
        let pos = wrap.getBoundingClientRect();
        wrap.setAttribute("dx", e.clientX - pos.x);
        wrap.setAttribute("dy", e.clientY - pos.y);
        // console.log("mouse: " + e.pageX + " "+ e.pageY);
        // console.log("wrap: " + pos.x + " "+ pos.y);
        panel_head.addEventListener("mousemove", moveable);
    });
    document.addEventListener("mouseup", ()=>{
        panel_head.removeEventListener("mousemove", moveable, false);
    });

    //drop event
    panel_body.ondrop = (e)=>{
        e.preventDefault();
        let iframe = document.createElement("iframe");
        iframe.src = "" + e.dataTransfer.getData();
        co
        panel_body.appendChild(iframe);
    };

    document.body.appendChild(wrap);
})();
