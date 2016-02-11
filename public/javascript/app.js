(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
		$stateProvider
		.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html'
		})
		.state('Profile', {
	url: '/profile',
	templateUrl: '/templates/Profile.html'
});
		$urlRouterProvider.otherwise('/');
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);
	}
})();
