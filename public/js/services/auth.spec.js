describe('Auth factory', function () {

	var AuthService;
	var $httpBackend;
	var $localStorage;
	var $http;

	beforeEach(angular.mock.module('votingApp'));

	beforeEach(inject(function (_$http_, _$localStorage_, _AuthService_, _$httpBackend_) {
		AuthService = _AuthService_;
		$httpBackend = _$httpBackend_;
		$http = _$http_;
		$localStorage = _$localStorage_;
	}));

	it('AuthService Injection test', function () {
		expect(AuthService).toBeDefined();
		expect(AuthService.login).toBeDefined();
		expect(AuthService.logout).toBeDefined();
	});

	it('given correct email and password when invoking login function then should get the token from back-end api', function() {
		$httpBackend.expectPOST('/api/auth', {
		            "email": "tomek22@poczta.pl",
		            "password": "tomekpass"
		        }).respond({
				token: 'JWT ' + 'token',
				success: true,
				msg: 'Successful logged'
			});
		AuthService.login('tomek22@poczta.pl', 'tomekpass').then((response)=>{
			expect($localStorage.loggedUser.email).toEqual('tomek22@poczta.pl');
			expect($localStorage.loggedUser.token).toEqual('JWT token');
			expect($http.defaults.headers.common.Authorization).toEqual($localStorage.loggedUser.token);
			expect(response).toBeTruthy();
		});
		$httpBackend.flush();

	});

	it('given incorrect email or password when invoking login function then should respond with falsy success', function() {
		$httpBackend.expectPOST('/api/auth', {
		            "email": "tomek22@poczta.pl",
		            "password": "zlehaslo"
		        }).respond({
				success: false,
				msg: 'Password mismatching'
			});
		AuthService.login('tomek22@poczta.pl', 'zlehaslo').then((response)=>{
			expect(response.success).toBeFalsy();
			expect(response.msg).toEqual('Password mismatching');
		});
		$httpBackend.flush();
	});


	afterEach(function() {
	    $httpBackend.verifyNoOutstandingExpectation();
	    $httpBackend.verifyNoOutstandingRequest();
	});


});
