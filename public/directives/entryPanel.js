/**
 * votingApp Module
 *
 * Description
 */
angular.module('votingApp', []).directive('entryPanel', function () {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		template: `<div id="socialLoginPanel" ng-init="loginRegPanel=false" ng-show="loginRegPanel && !$root.auth">
				<div class="container">
					<hr>
					<h2 class="text-center" ng-click="loginRegPanel=false"><span class="glyphicon glyphicon-chevron-up"></span></h2>
					<div class="row" ng-init="form=true">
						<div class="col-sm-8">
						<form id="login-form" ng-show="!form" method="post" role="form" style="display: block;">
											<div class="form-group">
												<input type="text" ng-model="loginForm.username" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
											</div>
											<div class="form-group">
												<input type="password" ng-model="loginForm.password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
											</div>
											<!-- <div class="form-group text-center">
												<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
												<label for="remember"> Remember Me</label>
											</div> -->
											<span>{{ loginForm }}</span>
											<div class="form-group">
												<div class="row">
													<div class="col-sm-6 col-sm-offset-3">
														<input type="submit" ng-click="login(loginForm.username, loginForm.password)" tabindex="4" class="form-control btn btn-login" value="Log In">
													</div>
												</div>
											</div>
											<!-- <div class="form-group">
												<div class="row">
													<div class="col-lg-12">
														<div class="text-center">
															<a href="http://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
														</div>
													</div>
												</div>
											</div> -->
										</form>
							<form id="register-form" ng-show="form" action="" method="post" role="form">
																<div class="form-group">
																	<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
																</div>
																<div class="form-group">
																	<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
																</div>
																<div class="form-group">
																	<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
																</div>
																<div class="form-group">
																	<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
																</div>
																<div class="form-group">
																	<div class="row">
																		<div class="col-sm-6 col-sm-offset-3">
																			<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register btn-success" value="Register Now">
																		</div>
																	</div>
																</div>
															</form>
						</div>
					  <div class="col-sm-4 social-buttons">
					  	<a class="btn btn-block btn-social btn-facebook">
					  	            <span class="fa fa-facebook"></span> Sign in with Facebook
					  	          </a>
					  	<a class="btn btn-block btn-social btn-github">
					  	            <span class="fa fa-github"></span> Sign in with GitHub
					  	          </a>
					  	<a class="btn btn-block btn-social btn-google">
					  	            <span class="fa fa-google"></span> Sign in with Google
					  	          </a>
					  </div>
					</div>
				</div>
			</div>`
			// link: function($scope, iElm, iAttrs, controller) {

		// }
	};
});
