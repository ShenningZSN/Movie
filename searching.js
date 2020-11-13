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
			console.log(result["results"].length);
			var resultHTML = $("#searchResult");
			resultHTML.empty();
			for (let i = 0; i < result["results"].length; i++) {
				resultHTML.append("<li>" + result["results"][i]["title"] + "</li>");
			}
		},
		error: function (xhr, status, error) {
			$("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
		}
	});
}
