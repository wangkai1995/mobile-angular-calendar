require('./home/index.js');

angular.module('app',[
	'home',
	'ui.router',
	'directives',
	'mobile-calendar',
	'template',
	'calendar-template'
])

.config(function($urlRouterProvider) {

    $urlRouterProvider.when('','/home');

})

.controller('AppCtrl', require('./ctrl.js'));
