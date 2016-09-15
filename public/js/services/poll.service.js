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


			return $http(req).then((response) => {

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

					$rootScope.$broadcast('polls', {
						success: true,
						parsedData
					});
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
