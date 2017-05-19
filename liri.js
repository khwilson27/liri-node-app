var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });

switch(process.argv[2]) {
    case "my-tweets":
        break;
    case "spotify-this-song":

        var spotify = require('spotify');

        spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            if (data.tracks.items[0]) {
                var artist = data.tracks.items[0].artists[0].name;
                var title = data.tracks.items[0].name;
                var previewLink = data.tracks.items[0].preview_url;
                var album = data.tracks.items[0].album.name;

                console.log("Title: " + title);
                console.log("Artist: " + artist);
                console.log("Album: " + album);
                console.log("Preview Link: " + previewLink);
            } else {
                console.log("Nothing found!");

                console.log("Title: The Sign");
                console.log("Artist: Ace of Base");
                console.log("Album: Happy Nation");
                console.log("Preview Link: " + previewLink);
            }
        
        });
    
        break;

    case "movie-this":
        // http://www.omdbapi.com/?apikey=[yourkey]&
        break;
    case "do-what-it-says":
        break;
}   