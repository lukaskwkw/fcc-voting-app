/**
 * votingApp Module
 *
 * Description
 */

(function () {

'use strict';

angular.module('votingApp')
	.factory('AuthService', function ($rootScope, $http, $localStorage) {

		function login (email, password) {
			var req = {
				method: 'POST',
				url: 'http://localhost:3000/api/auth',
				data: {
					email,
					password
				}
			}

			$http(req).then((response) => {
				if (response.data.success) {
					$rootScope.auth = true;
					$localStorage.loggedUser = {
						email,
						token: response.data.token
					}
					$http.defaults.headers.common.Authorization = response.data.token
				}
				console.log(response.data);
			})
		}

		function logout () {
			delete $localStorage.loggedUser;
			$http.defaults.headers.common.Authorization = '';
			$rootScope.auth = false;
		}

		return {
			login,
			logout
		}

	})

})()
