$( document ).ready(function() {
	makeButtons(gifs);
	console.log( "ready!" );
	// $("#buttonsView").hide()
});

var gifs = ["Ricky Bobby", "Camping", "Hiking", "Adventure", "Epic", "Awesome", "Road Cycling", "outsideisfree", "high five"];





function makeButtons(arr) { /*    */
	
	for (var i = 0; i < arr.length; i++) {
		var a = $('<button>')
		a.addClass('gif-button');
		a.attr('data-name', arr[i]);
		a.text(arr[i]);
		$('#buttonsView').prepend(a);
	
	} return true
}
$("#addgif").on("click", function () {
	// $("#buttonsView").show()
	var gif = $("#gif-input").val().trim();
	console.log('gif:', gif)
	if(gif.length === 0){
		$(this).require()
		return false;
		
	}
	$(gif).show()
	
	//gifs.push(gif);
	makeButtons([gif]);
	
	return false;
	
})

var oneClick
function displayGifs() {
	var gif = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=20&api_key=dc6zaTOxFJmzC";
// 
if ( oneClick == gif ) {
	alert('make a new button to see more gifs!');
	$(this).remove()
	
	return;
}

oneClick = gif 
// 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		console.log(response.data);
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $('<div class=gifs>');
			var gifGif = $('<img>');
			gifGif.attr('src',
				results[i].images.fixed_height_still.url);
			gifGif.attr('title', "Rating: " +
				results[i].rating);
			gifGif.attr('data-still',
				results[i].images.fixed_height_still.url);
			gifGif.attr('data-state', 'still');
			gifGif.addClass('gif');
			gifGif.attr('data-animate',
				results[i].images.fixed_height.url);

			gifDiv.prepend(gifGif)
			$("#gifsView").prepend(gifDiv);
			
			
		}
	});


}
$(document).on('click', '.gif', function () {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	};
});
$(document).on("click", ".gif-button", displayGifs);

$("#addgif").click(
    function(){
        $("#gif-input").val('');
    });
