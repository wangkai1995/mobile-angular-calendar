(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('lib/calendar/index.html',
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
    '			</div> 		 \n' +
    '\n' +
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
    '			    \n' +
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

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('com/directives/calendar/tpl/index.html',
    '<!--  -->\n' +
    '<!-- \n' +
    '<div class="calendar-share-container">\n' +
    '	 <div class="calendar-container">\n' +
    '	 	\n' +
    '	 </div>\n' +
    '</div> -->');
}]);
})();

(function(module) {
try {
  module = angular.module('template');
} catch (e) {
  module = angular.module('template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index/home/home/tpl/index.html',
    '<div class="warp">\n' +
    '	<div class="heads">\n' +
    '		<ul>\n' +
    '			<li>推荐</li>\n' +
    '			<li>电器</li>\n' +
    '			<li>零食</li>\n' +
    '			<li>游戏</li>\n' +
    '		</ul>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="content">\n' +
    '		  <!-- <img src="http://pic.guijj.com/c/227_6.jpg" alt=""> -->\n' +
    '		  <img src="./logo.jpg" alt="君子剑">\n' +
    '		  <div class="from">\n' +
    '		  		<div class="time">\n' +
    '		  			<p>请输入出发日期&nbsp;:&nbsp;</p>\n' +
    '		  		</div>\n' +
    '		  		<input type="text" ng-model="form" calendar="fromConfg">\n' +
    '		  </div>\n' +
    '\n' +
    '		  <div class="from">\n' +
    '		  		<div class="time">\n' +
    '		  			<p>请输入返回日期&nbsp;:&nbsp;</p>\n' +
    '		  		</div>\n' +
    '		  		<input type="text" ng-model="to" calendar="toConfg">\n' +
    '		  </div>\n' +
    '	</div>\n' +
    '\n' +
    '	<div class="footer">\n' +
    '		<ul>\n' +
    '			<li ng-click="fromClick()">calendar方法-出发日期</li>\n' +
    '			<li ng-click="toClick()">calendar方法-返程日期</li>\n' +
    '		</ul>\n' +
    '	</div>\n' +
    '</div>');
}]);
})();
