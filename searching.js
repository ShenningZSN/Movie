$(document).ready(
	search()
);

function search() {
	$("#searchButton").click(function () {
        var input = document.getElementById("target").value;
        findMovieByKeyword(input, 1);
    });
}

function findMovieByKeyword(keyword, page) {

	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie?language=en-US&" + 
			 "query=" + keyword + 
			 "&page=" + page + 
			 "&include_adult=" + "false",
		data: { "api_key": "21c2f2edc4b87ed7ca1bab78ecee5012" },
		dataType: "json",
		success: function (result, status, xhr) {
			console.log(result["results"][0]);
			var resultHTML = $("#searchResult");
			resultHTML.empty();

			for (let i = 0; i < result["results"].length; i++) {
				var movieImage = "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];
				var movieTitle = result["results"][i]["title"];
				
				resultHTML.append(
				"<div class=\"movie\">" + 
					"<p>" + movieTitle + "</p>" + 
				    "<img src=\"" + movieImage + "\" >" + 
				"</div>");
			}
			
		},
		error: function (xhr, status, error) {
			$("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
		}
	});
}
