$(function() {
	$("#searchButton").on("click", function() {
		var keyword_input = $("#target").val()
		if (keyword_input == "" || keyword_input == null) {
			alert("Please enter a valid keyword!");
			return;
		}
		findMovieByKeyword(keyword_input, 2);
	});
		
		
	
	// unfinished!!
	// $("button.movie-delete-button").on("click", function(){
	// 	console.log("click button!!");
	// 	$(this).closest("div.movie-block").remove();
	// })

});



const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
const API_KEY = "21c2f2edc4b87ed7ca1bab78ecee5012";

function findMovieByKeyword(keyword, page) {
	$.ajax({
		url: MOVIE_SEARCH_URL + 
			"language=" + "en-US" +
			"&query=" + keyword + 
			"&page=" + page + 
			"&include_adult=" + "false",
		type: "GET", 
		data: { "api_key":  API_KEY},
		dataType: "json",
		timeout: 1000,
		success: successCallback,
		error: errorCallback
	});	
}


function successCallback(result, status, xhr) {
	var resultHTML = $("#search-result");
	resultHTML.empty();
	console.log(result);

	var blocks = getResultBlocks(result["results"]);
	
	
	var options = {
		dataSource: blocks,
		pageSize: 5,
		callback: function (response, pagination) {
		  var dataHtml = '';
		  $.each(response, function (index, item) {
			dataHtml += item ;
		  });
  
		  resultHTML.prev().html(dataHtml);
		}
	};
	resultHTML.pagination(options);
}

function errorCallback(error, status, xhr) {
	$("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
}

function getResultBlocks(result) {
	var res = [];
	$.each(result, function(){
		var movieImage = this["poster_path"] === null ? 
						"failed-Image.png" : 
						MOVIE_IMAGE_URL + this["poster_path"];
		
		var movieTitle = this["title"];
		var movieDescription = this["overview"];

		var block = `
		<div class='movie-block clearfix'>
			<img class="movie-poster float-left" src=${movieImage}>
			<h3 class="movie-title"> ${movieTitle} </h3> 
			<button type="button" class="btn btn-warning movie-delete-button"> Remove </button>
			<p class="movie-description"> ${movieDescription} </p>
		</div>`;
		
		res.push(block);
	});
	return res;
}


