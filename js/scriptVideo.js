var vidBtn = document.getElementById("videoBtn");
var youtubeCont = document.getElementById("youtubeContainer");


vidBtn.addEventListener("click", startVideo);

function startVideo(){
    
    youtubeCont.classList.remove("hide");
    //hemas gifs container.add("hide");
    //sherleys jokes container.add("hide");
}

$(document).ready(function(){
    var key = "AIzaSyBbk_ozhKHH28nWJ1hU4vxNbwLqtsd9gIw";
    var playlistId = "PLlKT_xceHwURQUQ5LbA95KvpcQw57BRij";
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";

    var options = {
        part: "snippet",
        key: key,
        maxResults:12,
        playlistId: playlistId
    }

    loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        })
    }

function mainVid(id){
    $("#video").html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
}

function resultsLoop(data){
    $.each(data.items, function(i, item){
    var thumb = item.snippet.thumbnails.medium.url;
    var title = item.snippet.title;
    var description = item.snippet.description.substring(0,70);
    var vid = item.snippet.resourceId.videoId;

    $("main").append(`
    <article class= "item" data-key=${vid}>
    <img src="${thumb}" class="thumb">
    <div class="details">
      <h4>${title}</h4>
      <p>${description}</p>
    </div>
  </article>
    `);
    });
}

$("main").on("click","article", function(){
    var id = $(this).attr("data-key");
    mainVid(id);
});




});