

module.exports = ['$window','$document','$templateCache', function($window,$document,$templateCache) {
    return {
        scope: false,
        restrict: 'EA',
        // templateUrl: 'com/directives/calendar/tpl/index.html',
        link: function(scope, element, attr) {
        	// //获取用户传入参数
         //   	console.log(scope.confg);
         //   	//在BODY末尾插入
         //   	$document.find('body').append($templateCache.get('com/directives/calendar/tpl/index.html'));
        }
    };
}];