angular.module('home', [
	'ui.router',
	'directives',
	'template',
	'calendar-template'
])

.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
    .state('home', require('./home/route.js'));
})

//plane search controller
.controller('HomeCtrl', require('./home/ctrl.js'));

