describe('Poll factory', function() {
	var pollService;
	var $httpBackend;
	var $localStorage;
	var $rootScope;
	var $http;

	beforeEach(angular.mock.module('votingApp'));

	beforeEach(inject(function(_$rootScope_, _$localStorage_, _$http_, _pollService_, _$httpBackend_) {
		pollService = _pollService_;
		$httpBackend = _$httpBackend_;
		$localStorage = _$localStorage_;
		$http = _$http_;
		$rootScope = _$rootScope_;

		$http.defaults.headers.common.Authorization = 'token';

	}));

	it('pollService Injection test', function() {
		expect(pollService).toBeDefined();
		expect(pollService.addPoll).toBeDefined();
		expect(pollService.getPolls).toBeDefined();
	});

	it('given pollData when invoking addPoll function and provide token then should get successfull response', function() {
		var data = {
			'pollData': DataForPolls[0]
		};

		function checkHeaders(method, url, data, headers, params) {
			expect(headers.Authorization).toEqual('token');
			return [200, {msg: 'success'}];
		}

		$httpBackend.expectPOST('/api/addPoll', data).respond(checkHeaders);

		pollService.addPoll(DataForPolls[0]).then((response) => {
			expect(response.msg).toEqual('success');
		});

		$httpBackend.flush();

	});

	it('when invoking getPolls function then should get all polls from db, broadcast them and convert them', function() {
		function checkHeaders(method, url, data, headers, params) {
			return [200, {authencitated: false, polls: DataForPolls}];
		}


		$httpBackend.expectGET('/api/polls').respond(checkHeaders);

		pollService.getPolls();

		$rootScope.$on('polls', function (event, args) {
			expect(args).toBeDefined();
			expect(args.parsedData).toEqual(convertedDataForSpec.parsedData);
		})

		$httpBackend.flush();

	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

});