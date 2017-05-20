var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });
var logInputs = function() {
        var fs = require('fs');

        fs.appendFile("log.txt", process.argv[2] + ":" + process.argv[3] + ", ", function(error, data) {
            if (error) {
                return console.log(error);
            }
            
            console.log("Inputs have been logged.")
        }); // closes fs appendFile function
}
logInputs();

var spotifySearch = function(songTitle) {
        var spotify = require('spotify');

        spotify.search({ type: 'track', query: songTitle }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            if (data.tracks.items[0]) {
                for (var i=0; i<data.tracks.items.length; i++) {
                    var artist = data.tracks.items[i].artists[0].name;
                    var title = data.tracks.items[i].name;
                    var previewLink = data.tracks.items[i].preview_url;
                    var album = data.tracks.items[i].album.name;

                    console.log("Title: " + title);
                    console.log("Artist: " + artist);
                    console.log("Album: " + album);
                    console.log("Preview Link: " + previewLink);
                    console.log("------------------------------------------------------------");
                }
            } else {
                console.log("Nothing found! But here's 'The Sign' by Ace of Base!");

                console.log("Title: The Sign");
                console.log("Artist: Ace of Base");
                console.log("Album: Happy Nation");
                console.log("Preview Link: https://p.scdn.co/mp3-preview/5ca0168d6b58e0f993b2b741af90ecc7c9b16893?cid=null");
            }
        });
} // closes spotifySearch function

var twitterSearch = function() {
    var keys = require('./keys.js');
    var Twitter = require('twitter');

    var client = new Twitter(keys.twitterKeys);
    
    var params = {q: 'node.js'};
    client.get('search/tweets', params, function(error, tweets, response) {
    if (error) {
        return console.log(error);
    }
    console.log(JSON.stringify(tweets,null,1)); 
    });

} // closes twitterSearch function

var omdbSearch = function(movie) {
    // Then run a request to the OMDB API with the movie specified
    request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&r=json`, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        var data = JSON.parse(body);

        // console.log(data);

        if (data.Title) {
            var title = data.Title;
            var year = data.Year;
            var rating = data.imdbRating;
            var country = data.Country;
            var language = data.Language;
            var plot = data.Plot;
            var actors = data.Actors;
            // var rottenUrl;

            console.log("Title: " + title);
            console.log("Year: " + year);
            console.log("IMDB Rating: " + rating);
            console.log("Country: " + country);
            console.log("Language: " + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);
            // console.log("RottenUrl: " + rottenUrl);
            console.log("----------------------------------");
        } else {
            console.log("Not found! But here's Mr. Nobody!")
            console.log("Title: Mr. Nobody");
            console.log("Year: 2009");
            console.log("IMDB Rating: 7.9");
            console.log("Country: USA");
            console.log("Language: English");
            console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
            console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham...");
            // console.log("RottenUrl: ");
            console.log("----------------------------------");
        }
    }
    });
} // closes ombdSearch function

switch(process.argv[2]) {
    case "my-tweets":
        twitterSearch();
        break;

    case "spotify-this-song":
        spotifySearch(process.argv[3]);
        break;

    case "movie-this":
        omdbSearch(process.argv[3]);
        break;

    case "do-what-it-says":
        var fs = require('fs');

        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
        
            var dataArr = data.split(",");
            
            if (!dataArr[0]) {
                return console.log("Invalid inputs on random.txt file!")
            } else if (dataArr[0] === "spotify-this-song") {
                spotifySearch(dataArr[1]);
            } else if (dataArr[0] === "movie-this") {
                omdbSearch(dataArr[1]);
            } else if (dataArr[0] === "my-tweets") {
                twitterSearch();
            }
        }); // closes fs readFile function
        break;
}