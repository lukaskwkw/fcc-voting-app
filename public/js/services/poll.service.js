/**
 * votingApp Module
 *
 * Description
 */

angular.module('votingApp')
	.factory('pollService', function ($rootScope, $http) {

		var parsedData;

		function addPoll (pollData) {
			var req = {
				method: 'POST',
				url: '/api/addPoll',
				data: {pollData}
			}

			console.log('req:', req);

			return $http(req).then((response) => {
				console.log('tsttst', response.data.msg);

				return response.data;
			}).catch((err) => {
				console.log('err', JSON.stringify(err, 1, '\t'));
			})
		}

		function getPolls () {
			$http.get('/api/polls')
				.success(function (data) {

					parsedData = (function (polls) {
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
					$rootScope.$broadcast('polls', {
						success: true,
						parsedData
					});
					console.log(parsedData);
				})
				.error(function (data) {
					$rootScope.$broadcast('polls', {success: false});
					console.log('Error: ' + data);
				});
		}

		return {
			getPolls,
			addPoll
		};

	})
