(function(module) {
try {
  module = angular.module('calendar-template');
} catch (e) {
  module = angular.module('calendar-template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar/index.html',
    '\n' +
    '<div id="calendar-share-warp">\n' +
    '	<!--遮罩层-->\n' +
    '	<div class="calendar-share-container" ng-class="{\'calendar-container-active\':template.templateShow}">\n' +
    '		 <!--内容层-->\n' +
    '		 <div class="calendar-container">\n' +
    '			<!--头部-->\n' +
    '			<div class="calendar-head">\n' +
    '				<div class="calendar-head-item">\n' +
    '				 	<span ng-click="template.reduceYear(1)">&lt;&nbsp;</span>\n' +
    '				 	<span class="green">{{template.year}}</span>\n' +
    '				 	<span ng-click="template.addYear(1)">&nbsp;&gt;</span>\n' +
    '				 </div>\n' +
    '				<div class="calendar-head-item">\n' +
    '					<span ng-click="template.reduceMonth(1)">&lt;&nbsp;</span>\n' +
    '				 	<span class="green">{{template.month}}</span>\n' +
    '				 	<span ng-click="template.addMonth(1)">&nbsp;&gt;</span>\n' +
    '				</div>		\n' +
    '			</div> 		\n' +
    '		\n' +
    '		\n' +
    '			<!--内容-->\n' +
    '			<div class="calendar-content">\n' +
    '				<div class="week-content">\n' +
    '					<span>一</span>\n' +
    '					<span>二</span>\n' +
    '					<span>三</span>\n' +
    '					<span>四</span>\n' +
    '					<span>五</span>\n' +
    '					<span>六</span>\n' +
    '					<span>日</span>\n' +
    '				</div>\n' +
    '				<div class="date-content">\n' +
    '					<span ng-repeat="(key, value) in template.date" ng-class="{\'grey\':value.monthFlag !== \'now\' && value.active\n' +
    '						  , \'active\':value.date === template.check && value.active\n' +
    '						  , \'overdue\': !value.active}" ng-click="template.checkDate(value)">\n' +
    '						{{value.value}}\n' +
    '					</span>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '			\n' +
    '			\n' +
    '			<!--底部-->\n' +
    '			<div class="calendar-footer">\n' +
    '				<div class="footer-button" ng-click="template.hide()"><span>取消</span></div>\n' +
    '				<div class="footer-button" ng-click="template.determine()"><span>确定</span></div>\n' +
    '			</div>\n' +
    '		 </div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();
