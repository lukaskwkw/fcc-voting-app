/**
 * votingApp Module
 *
 * Description
 */

angular.module('votingApp', []);

function mainController ($scope, $http) {
	$scope.formData = {};
	$scope.loginForm = {};

	$scope.loginFunc = function (email, password) {
			var req = {
				method: 'POST',
				url: 'http://localhost:3000/api/auth',
				data: {
					email,
					password
				}
			}

			$http(req).then((response) => {
				console.log(response.data);
			})
		}
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
