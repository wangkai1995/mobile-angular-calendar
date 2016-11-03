# mobile-angular-calendar
基于HTML5 CSS3 的angular calendar  directive控件

##简介
####这是一个应用在web app的calendar控件，基于angular.js编写，动画过渡效果依赖于css3。压缩过后目前只有9K大小，暂不支持自定义HTML模板，稍后将在下个版本解决这个问题。


##关于控件
####目前由于是第一个版本，暂时未打包成 `npm module` JS以及html模板打包在calendar-template.js中，压缩过的版本在.min.js中，目前依赖的CSS由于比较小，并且马上会更新自定义的HTML模板 所有暂时未压缩CSS文件，依赖的CSS文件在com.calendar.css中
####DEMO目前需要下载全部文件`npm i`加载依赖工具使用gulp运行

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

		onBackObj: function(obj){
			console.log(obj);        
			$scope.calendar = obj;    `这个回调返回calendar实例`
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
		},
		onChangeDate:function(date){
			console.log(date);
		}
	};
  
  //calendar实例方法使用
  $scope.testClick = function(){
		$scope.calendar.setDate(new Date(2016,9,15) , true);
		$scope.calendar.resetConfg({
			maxDate: null,
			minDate: null,
			changeYear: false
		});
		$scope.calendar.show();
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
 calendar.method.resetConfg(confg);        `//重置配置 confg参数为上面配置对象calendar.confg一致`
```
