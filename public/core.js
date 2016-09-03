/**
 * votingApp Module
 *
 * Description
 */


angular.module('votingApp', ['ngStorage']);

function mainController ($localStorage, $rootScope, $scope, $http, authService) {
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


		// when landing on the page, get all todos and show them
	$http.get('/api/polls')
		.success(function (data) {

			var parsedData = (function (polls) {
				var categories = [];

				polls.forEach(function (elem) {
					if (categories.indexOf(elem.category) === -1)
						categories.push(elem.category);
				});

				return categories.map(function (categoryElem) {
					var filtredData = polls.filter(function (dataElem) {
						return dataElem.category === categoryElem;
					})

					return {
						category: categoryElem,
						polls: filtredData
					}

				})
			})(data.polls);

			console.log(data.authencitated);
			$scope.parsedData = parsedData;
			console.log(parsedData);
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});


}
