/**
 * votingApp Module
 *
 * Description
 */


angular.module('votingApp', ['ngStorage']);

function mainController ($localStorage, $rootScope, $scope, $http, authService, pollService) {
	$scope.formData = {};
	$scope.loginForm = {};

	// $scope.auth = false;
	$rootScope.auth = false;

	if ($localStorage.loggedUser) {
		$http.defaults.headers.common.Authorization = $localStorage.loggedUser.token;
		$rootScope.auth = true;
	}

	$scope.login = authService.login;
	$scope.logout = authService.logout;

	pollService.getPolls();

	$scope.options = [ {opt: ''} ];

	$scope.cat = $scope.options[0];

	$scope.addPoll = function () {
		var pollData = {
			question: $scope.question,
			category: $scope.cat.category,
			choices: $scope.options.map(function (elem) {

				return {
					text: elem.opt,
					votes: []
				}
			})

		}
		console.log(pollData);

		pollService.addPoll(pollData);
	}

	$scope.$on('polls', function (event, args) {
		if (!args.success)
			return console.log('Failed to retrive polls from database');

		$scope.parsedData = args.parsedData;

	})


}
