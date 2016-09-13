describe('Auth factory', function () {

	var AuthService;

	beforeEach(angular.mock.module('votingApp'));

	beforeEach(inject(function (_AuthService_) {
		AuthService = _AuthService_;
	}));

	it('dummy test 2+2', function () {
		expect(AuthService).toBeDefined();
		expect(AuthService.login).toBeDefined();
		expect(AuthService.logout).toBeDefined();
	});
});
