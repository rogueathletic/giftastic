
var gifs = ["parkor fail", "wtf", "pogo fail", "bicycle fail", "kook slam", "cool", "weird", "random", "high five"];
function makeButtons(){    /*    */
	$('#buttonsView').empty();
	for (var i = 0; i < gifs.length; i++){
		var a = $('<button>') 
		a.addClass('gif-button'); 
		a.attr('data-name', gifs[i]); 
		a.text(gifs[i]);
		$( '#buttonsView' ).append (a);
	}
}
$( "#addgif" ).on( "click", function (){

	var gif = $( "#gif-input" ).val ().trim ();
	gifs.push ( gif );
	makeButtons ();
	return false; 
})


function displayGifs() {
	var gif = $( this ).attr( "data-name" );
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=6&api_key=dc6zaTOxFJmzC";

		$.ajax( {url: queryURL, method: "GET" } ).done( function ( response ) {
			console.log(response.data);
			var results = response.data;
			for ( var i = 0; i < results.length; i++ ) {
				  var gifDiv = $       ( '<div class=gifs>'                      );
			 	  var gifGif = $       ( '<img>'                                 );
					  gifGif.attr      ( 'src', 
									   results[i].images.fixed_height_still.url  );
					  gifGif.attr      ( 'title', "Rating: " + 
									 results[i].rating                           );
					  gifGif.attr      ( 'data-still', 
					                 results[i].images.fixed_height_still.url    );
					  gifGif.attr      ( 'data-state', 'still'                   );
					  gifGif.addClass  ( 'gif'                                   );
					  gifGif.attr      ( 'data-animate', 
					                  results[i].images.fixed_height.url         );
	
					gifDiv.prepend( gifGif )
				$( "#gifsView" ).prepend( gifDiv );
			}
		});
	

}
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});
$(document).on("click",".gif-button", displayGifs);
makeButtons();

