describe('Auth factory', function () {

	var AuthService;

	beforeEach(angular.mock.module('votingApp'));

	beforeEach(inject(function (_AuthService_) {
		AuthService = _AuthService_;
	}));

	it('AuthService Injection dummy test', function () {
		expect(AuthService).toBeDefined();
		expect(AuthService.login).toBeDefined();
		expect(AuthService.logout).toBeDefined();
	});

	it('given correct email and password when invoking login function then should', function(done) {

	});
});
