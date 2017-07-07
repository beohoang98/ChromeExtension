var tag = "tits-boobs";
var rating = "";

function renderImage(imageData) {
    var target = document.querySelector('#image');
    if (imageData) {
        //target.src = imageData.webformatURL;
        target.src = imageData.fixed_height_downsampled_url;
        //target.src = imageData.image_mp4_url;
    }
    else {
        target.alt = "Error, try again";
    }
}

async function loadUrlImage() {
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=18e85701759c46a6b49d2741cdaf6624&rating='+rating+'&tag='+tag;
    //let url = 'https://pixabay.com/api/?key=5829126-2dcd4464bf861de56955eb269&q=cat';
    let result = await fetch(url);
    let jsonResult = await result.json();
    //var num = Math.floor(Math.random()*(jsonResult.totalHits));
    //return jsonResult.hits[num];
    return jsonResult.data;
}

document.addEventListener("DOMContentLoaded", async()=>{
    document.querySelector('#image-wrap').style.height="";
    document.querySelector('#status').textContent = "loading ...";
    var data = await loadUrlImage();
    document.querySelector('#status').textContent = "";
    document.querySelector('#image-wrap').style.height="300px";
    renderImage(data);
});
