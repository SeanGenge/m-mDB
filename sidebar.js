var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
//search
var movieGenre;
var movieList=[];
var trailerList=[];
var trailerName;
var ul = document.getElementById('dropdown-genre');
ul.onclick = function(event) {
     movieGenre =event.target.id
  fetchMovieData(movieGenre)
}
 function fetchMovieData(movieGenre) {
    console.log(movieGenre)
    var genreData= `https://api.themoviedb.org/3/movie/popular?&with_genres=${movieGenre}&api_key=de2ebda3ea81eee9df49ccea6ebadb2a`;
    fetch(genreData)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (dataW) {
        movieList=dataW;
        writeMovieData(dataW);
      });
    }
    function writeMovieData(dataW){
        console.log(dataW)
        $("#canvas").show()
        $("#card1img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[0].backdrop_path}`)
        $("#card1title").text(dataW.results[0].title)
        
        $("#card2img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[1].backdrop_path}`)
        $("#card2title").text(dataW.results[1].title)
        
        $("#card3img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[2].backdrop_path}`)
        $("#card3title").text(dataW.results[2].title)
        
        $("#card4img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[3].backdrop_path}`)
        $("#card4title").text(dataW.results[3].title)
        
        $("#card5img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[4].backdrop_path}`)
        $("#card5title").text(dataW.results[4].title)
        
        $("#card6img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[5].backdrop_path}`)
        $("#card6title").text(dataW.results[5].title)
        
        $("#card7img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[6].backdrop_path}`)
        $("#card7title").text(dataW.results[6].title)
        
        $("#card8img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[7].backdrop_path}`)
        $("#card8title").text(dataW.results[7].title)
        
        $("#card9img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[8].backdrop_path}`)
        $("#card9title").text(dataW.results[8].title)
        
        $("#card10img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[9].backdrop_path}`)
        $("#card10title").text(dataW.results[9].title)
        
        $("#card11img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[10].backdrop_path}`)
        $("#card11title").text(dataW.results[10].title)
        
        $("#card12img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[11].backdrop_path}`)
        $("#card12title").text(dataW.results[11].title)
        
        $("#card13img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[12].backdrop_path}`)
        $("#card13title").text(dataW.results[12].title)
        
        $("#card14img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[13].backdrop_path}`)
        $("#card14title").text(dataW.results[13].title)
        
        $("#card15img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[14].backdrop_path}`)
        $("#card15title").text(dataW.results[14].title)
        
        $("#card16img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[15].backdrop_path}`)
        $("#card16title").text(dataW.results[15].title)
        
        $("#card17img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[16].backdrop_path}`)
        $("#card17title").text(dataW.results[16].title)
        
        $("#card18img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[17].backdrop_path}`)
        $("#card18title").text(dataW.results[17].title)
        
        $("#card19img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[18].backdrop_path}`)
        $("#card19title").text(dataW.results[18].title)
        
        $("#card20img").attr("src",`https://image.tmdb.org/t/p/original${dataW.results[19].backdrop_path}`)
        $("#card20title").text(dataW.results[19].title)
       
        
    }
   


 $("#cross").click(function(){
  $("#movie-modal").hide()
 })

function getTrailerName (trailerList){
  for (i=0; i<trailerList.length; i++)
if(trailerList[i].type == "Trailer"){
  trailerName=trailerList[i].key
  }
  $("#iframe").attr("src", `https://www.youtube.com/embed${trailerName}`)
}

var div=document.getElementById('canvas');
div.onclick = function(e){
   var x=e.target.id
   var n=x.replace(/\D/g,'')-1
  
  $("#movie-modal").show()
  $("#modalImg").attr("src",`https://image.tmdb.org/t/p/w300${movieList.results[n].poster_path}`)
  $("#modalTitle").text(movieList.results[n].title)
  $("#modalYear").text("Release Date : " + movieList.results[n].release_date)
 $("#modalID").text("ID : " + movieList.results[n].id)
$("#modalDiscription").text("Discription: "+ movieList.results[n].overview)
$("#modalRating").text("Rating: "+movieList.results[n].vote_average)
}















