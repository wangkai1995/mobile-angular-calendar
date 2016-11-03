require('./home/index.js');

angular.module('app',[
	'home',
	'ui.router',
	'directives',
	'wk-calendar',
	'template',
	'calendar-template'
])

.config(function($urlRouterProvider) {

    $urlRouterProvider.when('','/home');

})

.controller('AppCtrl', require('./ctrl.js'));
