var Twit = require('twit')
var io = require('../app').io;
// var TWEETS_BUFFER_SIZE = 5;

var T = new Twit({
    consumer_key:         'API Key',
    consumer_secret:      'API Secret',
    access_token:         'Token Access',
    access_token_secret:  'Token Access Secret'
})


var findTweets = function() {
	console.log("Listening for tweets from San Francisco...");
	var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });

	// var tweetsBuffer = [];

	io.sockets.on('connection', function (socket) {
		stream.on('tweet', function(tweet) {
			if (tweet.geo == null) {
				return ;
			}

			//Create message containing tweet + username + profile pic + geo
			var msg = {};
			msg.text = tweet.text;
			msg.geo = tweet.geo.coordinates;
			msg.user = {
				name: tweet.user.name, 
				image: tweet.user.profile_image_url
			};

			socket.volatile.emit('tweets', msg);

			// //push msg into buffer
			// tweetsBuffer.push(msg);

			// //send buffer only if full
			// if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
			// 	socket.volatile.emit('tweets', tweetsBuffer);
			// 	tweetsBuffer = [];
			// }
		});
	});
};


findTweets();