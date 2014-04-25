var Twit = require('twit');
var io = require('../app').io;
var TWEETS_BUFFER_SIZE = 3;
var nbOpenSockets = 0;
var isFirstConnectionToTwitter = true;

var T = new Twit({
    consumer_key:         'API Key',
    consumer_secret:      'API Secret',
    access_token:         'Token Access',
    access_token_secret:  'Token Access Secret'
});

console.log("Listening for tweets from San Francisco...");
var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });
var tweetsBuffer = [];

io.sockets.on('connection', function(socket) {
	console.log('Client connected !');
	if (nbOpenSockets <= 0) {
		nbOpenSockets = 0;
		console.log('First active client. Start streaming from Twitter');
		stream.start();
	}

	nbOpenSockets++;

	socket.on('disconnect', function() {
		console.log('Client disconnected !');
		nbOpenSockets--;

		if (nbOpenSockets <= 0) {
			nbOpenSockets = 0;
			console.log("No active client. Stop streaming from Twitter");
			stream.stop();
		}
	});
});

stream.on('connect', function(request) {
	console.log('Connected to Twitter API');

	if (isFirstConnectionToTwitter) {
		isFirstConnectionToTwitter = false;
		stream.stop();
	}
});

stream.on('disconnect', function(message) {
	console.log('Disconnected from Twitter API. Message: ' + message);
});

stream.on('reconnect', function (request, response, connectInterval) {
  	console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
})

stream.on('tweet', function(tweet) {
	if (tweet.place == null) {
		return ;
	}

	//Create message containing tweet + username + profile pic
	var msg = {};
	msg.text = tweet.text;
	msg.location = tweet.place.full_name;
	msg.user = {
		name: tweet.user.name, 
		image: tweet.user.profile_image_url
	};


	//push msg into buffer
	tweetsBuffer.push(msg);

	//send buffer only if full
	if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
		//broadcast tweets
		io.sockets.emit('tweets', tweetsBuffer);
		tweetsBuffer = [];
	}
});
