appControllers.controller('TweetCtrl', ['$scope', 'socket',
	function TweetCtrl ($scope, socket) {
		
		$scope.tweets = [];
		$scope.btnIsDisabled = false;
		$scope.btnText = "Find Tweets From San Francisco"

		$scope.findTweets = function findTweets() {
			$scope.btnText = "Brace Yourselves, Tweets are coming...";
			$scope.btnIsDisabled = true;

			socket.on('tweets', function (data) {
			    $scope.tweets = $scope.tweets.concat(data);
			});
		}
	}
]);
