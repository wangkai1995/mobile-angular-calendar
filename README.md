# mobile-angular-calendar
基于HTML5 CSS3 的angular calendar  directive控件

##简介
####这是一个应用在web app的calendar控件，基于angular.js编写，动画过渡效果依赖于css3。压缩过后目前只有9K大小,支持自定义HTML模板.

###[Demo](http://qxu1606630086.my3w.com/).

##关于控件
####目前由于是第一个版本，暂时未打包成 `npm module` JS以及html模板打包在calendar-template.js中，压缩过的版本在.min.js中，目前依赖的CSS由于比较小，并且支持用户自定义HTML模板 所以暂时未压缩CSS文件，依赖的CSS文件在com.calendar.css中 如果需要使用默认HTML模板则必须加载这个CSS
####自定义修改需要下载全部文件`npm i`加载依赖工具使用gulp watch运行

##使用以及配置
####支持单独view中存在2个实例，但是要注意，配置的对象和绑定的ng-module基于当前`$scope属性读取`， 但是要注意不能是`$scope`的属性下的子属性
####例子

`html template`
```html
<p>请输入出发日期</p>
<input type="text" ng-model="form" calendar='fromConfg'/>
<p>请输入返回日期</p>
<input type="text" ng-model="to" calendar='toConfg'/>
```

`controller`
```javascript
//需要绑定的数据源
	$scope.form =  '';
	$scope.to = '';
//控件参数配置   
	$scope.fromConfg = {
		default : new Date(),
		outFormat : 'yyyy年MM月dd日',
		maxDate: new Date(2016,10,5),    `请注意月份是0-11算起`
		minDate: new Date(2016,9,10),

		// template: 'lib/calendar/test_index.html',  
		***	
		    自定义的html模板 只支持字符串格式
			  自定义模板有两种方式 
			  在下面单独说明
		***

		onBackObj: function(obj){
			console.log(obj);        
			$scope.fromCalendar = obj;    `这个回调返回calendar实例`
		},
		onChangeDate:function(date){
			console.log(date);
		}
	};

	$scope.toConfg = {
		default : new Date(2016,7,2),
		outFormat : 'MM月dd日',
		maxDate: new Date(2016,11,5),
		minDate: new Date(2016,4,10),

		onBackObj: function(obj){
			console.log(obj);
			$scope.toCalendar = obj;
		},
		onChangeDate:function(date){
			console.log(date);
		}
	};
  
  //calendar实例方法使用
  	$scope.fromClick = function(){
		$scope.fromCalendar.setDate(new Date(2016,9,15) , true);
		$scope.fromCalendar.resetConfg({
			maxDate: null,
			minDate: null,
			changeYear: false
		});
		$scope.fromCalendar.show();
	};

	$scope.toClick = function(){
		$scope.toCalendar.resetConfg({
			clickDateFlag: false,
			clickDateHide: false
		});
		$scope.toCalendar.show();
	};
  ```
  
##配置参数
  ```javascript
  calendar.confg = {
    default:            `//初始化默认时间 (Date()类型, 默认当天)`
    maxDate:            `//最大日期 (Date()类型, 默认无限制)`
    minDate:            `//最小日期 (Date()类型, 默认无限制)`
    outFormat:          `//输出格式化 (string()类型, 格式遵循 yyyy-MM-dd 可以自定义比如 MM月dd日,yyyy年MM月dd日 yyyy:MM:dd)`
    changeYear:         `//年份是否可调 (boolean类型, 默认可调)`
    changeMonth:        `//月份是否可调 (boolean类型, 默认可调)`
    clickDateFlag:      `//点击元素是否立即改变 (boolean类型，默认true改变)`
    clickDateHide:      `//选择元素之后是否隐藏控件 (boolean类型，默认true关闭)`

    template：          `//显示的html模板,可以是$templateCache缓存 或者html字符串`
  }
 ```
 
##回调
 ```javascript
 calendar.callback = {
   //初始化回调
    onInit:
    //返回calendar对象实例   回调发生在init最后
    onBackObj
    //模板显示回调
    onShow:
    //模板关闭回调
    onHide: 
    //点击元素回调 回传选中日期
    onClickDate:
    //日期改变回调 回传改变日期
    onChangeDate: 
 }
 ```
 
 
##calendar实例方法
 ```javascript
 calendar.method.show();       `//显示控件`
 calendar.method.hide();       `//隐藏控件`
 calendar.method.setDate(date,outflag);    `//手动设置日期 (date = 设置的日期(Date) ;outflag = 是否输出到对应绑定的ng-module中(boolean))`
 calendar.method.resetConfg(confg);        `//重置配置 confg参数为上面配置对象calendar.confg一致 ***!特别注意HTML模板template属性不支持重定义***`
```

##关于自定义html模板
目前支持两种定义方式
***
	1: 从$templateCache缓存服务中读取
	(使用这种方式calendar.confg.template = $templateCache的缓存下标key例如
	$templateCache.put('calendar_html',xxx)中的calendar_html)

	2: html代码
	(例如'<div>calendar-html</div>'这种方式);  
***

一个例子 说明自定义方式用法
```html
<!--容器-->
<div id="calendar-share-warp">
	<!--遮罩层-->
	<div  class="calendar-share-container" 
		  ng-class="{'calendar-container-active':template.templateShow}"
	>
		<!--
			动画过渡显示关闭的方式依赖于 calendar-container-active 样式
			template.templateShow属性会在显示的时候设置为true 关闭的时候为false
			依靠这个状态值来动态的赋予calendar-container-active 利用CSS3的
			transition: all .1s linear;
			-moz-transition: all .1s linear; 
			-webkit-transition: all .1s linear; 
			-o-transition: all .1s linear;
			属性达到动画过渡效果
		-->
		 <!--内容层-->
		 <div class="calendar-container">
			<!--头部-->
			<div class="calendar-head">
				<div class="calendar-head-item">
				 	<span ng-click="template.reduceYear(1)">&lt;&nbsp;</span>
				 	<span class="green">{{template.year}}</span>
				 	<span ng-click="template.addYear(1)">&nbsp;&gt;</span>
				 </div>
				<div class="calendar-head-item">
					<span ng-click="template.reduceMonth(1)">&lt;&nbsp;</span>
				 	<span class="green">{{template.month}}</span>
				 	<span ng-click="template.addMonth(1)">&nbsp;&gt;</span>
				</div>	
				<!--
					年份显示={{template.year}}
					月份显示={{template.month}}
					对应的年操作方法 template.reduceYear(num) template.addYear(num)
					对应的月操作方法 template.reduceMonth(num) template.addMonth(num)
				-->	
			</div> 		
			<!--内容-->
			<div class="calendar-content">
				<div class="week-content">
					<span>一</span>
					<span>二</span>
					<span>三</span>
					<span>四</span>
					<span>五</span>
					<span>六</span>
					<span>日</span>
					<!-- 关于星期 这个值是写死的 排列方式是 1234567依次排开 而不是7123456方式-->
				</div>
				<div class="date-content">
					<span ng-repeat="(key, value) in template.date" 
						  ng-class="{'grey':value.monthFlag !== 'now' && value.active
						  , 'active':value.date === template.check && value.active
						  , 'overdue': !value.active}"
					      ng-click="template.checkDate(value)"
					>
						{{value.value}}
					<!--
						日期的值保存在template.date数组中 长度固定为42
						template.check = 当前选中的日期 
						template.date.active 在设置了最小日期和最大日期时生效，当超过了范围为false
						template.date.monthFlag == now     表示当前这个月
						template.date.monthFlag  == before 表示上个月
						template.date.monthFlag  == atter  表示下个月
						template.checkDate(template.date[Key])方法选中选中日期
					-->	
					</span>
				</div>
			</div>
			<!--底部-->
			<div class="calendar-footer">
				<div class="footer-button" ng-click="template.hide()"><span>取消</span></div>
				<div class="footer-button" ng-click="template.determine()"><span>确定</span></div>
				<!--
					template.hide()方法关闭模板
					template.determine() 确定选中日期
				-->
			</div>
		 </div>
	</div>
</div>
```