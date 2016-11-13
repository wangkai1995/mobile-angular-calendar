//******注意******//
//月份是从0-11计算

/*
 *
 * angular 1.X   calendar 0.0.0 
 *
 * 2016.10.23  china ShenZheng 
 *
 * wangkai 
 *
*/

module.exports = ['$window','$document','$timeout','$templateCache','$compile','$filter', function($window,$document,$timeout,$templateCache,$compile,$filter) {
    return {
        scope: false,
        restrict: 'EA',
        link: function(scope, element, attr) {
             
    /****************    参数设置   ****************/
            //空函数
            var neep = function(){};
            //用来识别不同的calendar对象   
            //这个值很重要 使用在同一个页面socpe下使用多个控件
            var module = attr.calendar;
            //获取用户配置
            var userConfg = scope[module];
            //星期转数字 数字转星期
            var weekOrNumber  = {
               'Monday' : 1,
               'Tuesday' : 2,
               'Wednesday' : 3,
               'Thursday' : 4,
               'Friday' : 5,
               'Saturday' : 6,
               'Sunday' : 7
            };
            var numberOrWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

            
            //实例化插件对象
            var calendar = {};
            calendar[module] = {};

            //设置参数
            calendar[module].confg = {
              //默认日期
              default:  angular.isDefined(userConfg.default)? userConfg.default : new Date(),
              //最大日期
              maxDate: angular.isDefined(userConfg.maxDate)? userConfg.maxDate : null,
              //最小日期
              minDate: angular.isDefined(userConfg.minDate)? userConfg.minDate : null,
              //输出格式化
              outFormat : angular.isDefined(userConfg.outFormat)? userConfg.outFormat : 'yyyy-MM-dd',
              //年份是否可调 默认可调
              changeYear: angular.isDefined(userConfg.changeYear)? userConfg.changeYear : true,
              //月份是否可调 默认可调
              changeMonth: angular.isDefined(userConfg.changeMonth )? userConfg.changeMonth : true,
              //点击元素是否立即改变 默认改变
              clickDateFlag: angular.isDefined(userConfg.clickDateFlag)? userConfg.clickDateFlag : true,
              //选择元素之后是否关闭 默认关闭 
              clickDateHide: angular.isDefined(userConfg.clickDateHide)? userConfg.clickDateHide : true,

              //显示的html模板
              //可以是$templateCache缓存 或者html字符串
              template : angular.isDefined(userConfg.template)? $templateCache.get(userConfg.template)? $templateCache.get(userConfg.template) :
                         userConfg.template : $templateCache.get('calendar/index.html')
            };

            //设置事件回调
            calendar[module].callback = {
              //初始化回调
              onInit: userConfg.onInit? userConfg.onInit : neep,
              //返回calendar对象回调 发生在init最后
              onBackObj: userConfg.onBackObj? userConfg.onBackObj : neep,
              //模板显示回调
              onShow: userConfg.onShow? userConfg.onShow : neep,
              //模板关闭回调
              onHide: userConfg.onHide? userConfg.onHide : neep,
              //点击元素回调 回传选中日期
              onClickDate: userConfg.onClickDate? userConfg.onClickDate : neep,
              //日期改变回调 回传改变日期
              onChangeDate: userConfg.onChangeDate? userConfg.onChangeDate : neep
            };

            //输出源module的scope下标;
            calendar[module].module = attr.ngModel;

            //设置模板数据和操作
            scope.template = {
                //显示模板
                templateShow : false,
                //选中的元素
                check: '',
                //年：月：日期数组
                year : '',
                month: '',
                date : []
            };

    /***********    对外提供的方法    ***************/
            calendar[module].method = {};
            calendar[module].method.flag = module;

            //显示模板
            calendar[module].method.show = function(){
                module = this.flag;
                templateShow(calendar[module].callback.onShow);
                initTemplateEvent();
            };

            //关闭模板
            calendar[module].method.hide = function(){
                module = this.flag;
                templateHide();
            };

            //手动设置日期
            calendar[module].method.setDate = function(date , outflag){
                module = this.flag;
                if( validDate(date) ){
                    if( validDateActive(date) ){
                        calendar[module].confg.default = date;
                        scope.template.check = date;
                        calendar[module].callback.onChangeDate(date);
                        initDate();
                        if(outflag){
                          outModule();
                        }
                    }
                }
                initTemplateEvent();
            };

            //重置配置
            calendar[module].method.resetConfg = function(confg){
               module = this.flag;
               calendar[module].confg.default = angular.isDefined(confg.default)? confg.default : calendar[module].confg.default;
               calendar[module].confg.maxDate = angular.isDefined(confg.maxDate)? confg.maxDate : calendar[module].confg.maxDate;
               calendar[module].confg.minDate = angular.isDefined(confg.minDate)? confg.minDate : calendar[module].confg.minDate;
               calendar[module].confg.outFormat = angular.isDefined(confg.outFormat)? confg.outFormat : calendar[module].confg.outFormat;
               calendar[module].confg.changeYear = angular.isDefined(confg.changeYear)? confg.changeYear : calendar[module].confg.changeYear;
               calendar[module].confg.changeMonth = angular.isDefined(confg.changeMonth)? confg.changeMonth : calendar[module].confg.changeMonth;
               calendar[module].confg.clickDateFlag = angular.isDefined(confg.clickDateFlag)? confg.clickDateFlag : calendar[module].confg.clickDateFlag;
               calendar[module].confg.clickDateHide = angular.isDefined(confg.clickDateHide)? confg.clickDateHide : calendar[module].confg.clickDateHide;
               initDate();
               initTemplateEvent();
            };

    /*************   内部使用的一些函数   *****************/


              //判断是否是Date类型
              var validDate = function(obj){
                 if(obj instanceof Date){
                    return true;
                 }else{
                  setError('不是时间类型');
                 }
              };

              //抛出错误信息
              var setError = function(message){
                  throw new Error(message);
              };

              //获取设定月份
              //@date 当前时间戳
              //@number为正向上加月份，为负向下减月份
              //返回 设置月份的时间戳
              var getConfgMonth = function(date,number){
                  if(validDate(date)){
                      var year = date.getFullYear(),
                          month = date.getMonth()+number,
                          day = date.getDate();
                    return new Date(year,month,day);
                  }
              };

              //获取设定天
              //@date 当前时间戳
              //@number为日期
              //返回 设置日期的时间戳
              var getConfgDay = function(date,number){
                  if( validDate(date) ){
                    if(number !== 0 && number > 0 && number <31){
                        var year = date.getFullYear(),
                            month = date.getMonth(),
                            day = number;
                            return new Date(year,month,day);
                    }else{
                        setError('设置的日期有错误，不能小于等于0 不能大于31');
                    }
                  }
              };

              //获取输入月有多少天
              var getMonthIsDay = function(date){
                var day = 0;
                if( validDate(date) ){
                   var year = date.getFullYear(),
                       month = date.getMonth()+1;
                   day = new Date(year,month,0).getDate();
      
                }
                return day;
              };

              //获取星期
              var getWeek = function(date){
                  var week = '';
                  if( validDate(date) ){
                       switch( date.getDay() ){
                         case 1:
                              week = 'Monday';break;
                         case 2:
                              week = 'Tuesday';break;
                         case 3:
                              week = 'Wednesday';break;
                         case 4:
                              week = 'Thursday';break;
                         case 5:
                              week = 'Friday';break;
                         case 6:
                              week = 'Saturday';break;
                         case 0:
                              week = 'Sunday';break;
                       }            
                    return week;
                  }    
              };

              //选择日期
              var checkDate = function(obj){
                calendar[module].callback.onClickDate(obj);
                if(obj.active){
                    if(calendar[module].confg.clickDateFlag){
                        calendar[module].confg.default = obj.date;
                        calendar[module].check = obj.date;
                        outModule();
                        calendar[module].callback.onChangeDate(obj);
                        if(calendar[module].confg.clickDateHide){
                          templateHide();
                        }
                    }else{
                      scope.template.check = obj.date;
                    }
                }
              };

              //确定按钮
              var determine = function(){
                  calendar[module].confg.default = scope.template.check;
                  outModule();
                  calendar[module].callback.onChangeDate(scope.template.check);
                    if(calendar[module].confg.clickDateHide){
                      templateHide();
                    }
              };

              //年份加
              var addYear = function(number){
                 if(number < 0){
                     number = -number;
                  }else if(number === 0){
                    number = 1;
                  }
                 if(calendar[module].confg.changeYear){
                    var year = calendar[module].confg.default.getFullYear(),
                        month = calendar[module].confg.default.getMonth(),
                        day = calendar[module].confg.default.getDate();

                      calendar[module].confg.default = new Date(year+number,month,day);
                      initDate();
                  } 
              };

              //年份减
              var reduceYear = function(number){
                  if(number < 0){
                     number = -number;
                  }else if(number === 0){
                    number = 1;
                  }
                  if(calendar[module].confg.changeYear){
                    var year = calendar[module].confg.default.getFullYear(),
                        month = calendar[module].confg.default.getMonth(),
                        day = calendar[module].confg.default.getDate();

                      calendar[module].confg.default = new Date(year-number,month,day);
                      initDate();
                  }
              };

              //月份加
              var addMonth = function(number){
                 if(number < 0){
                     number = -number;
                  }else if(number === 0){
                    number = 1;
                  }
                 if(calendar[module].confg.changeMonth){
                    var year = calendar[module].confg.default.getFullYear(),
                        month = calendar[module].confg.default.getMonth(),
                        day = calendar[module].confg.default.getDate();

                      calendar[module].confg.default = new Date(year,month+number,day);
                      initDate();
                  }
              };

              //月份减
              var reduceMonth = function(number){
                  if(number < 0){
                    number = -number;
                  }else if(number === 0){
                    number = 1;
                  }
                 if(calendar[module].confg.changeMonth){
                    var year = calendar[module].confg.default.getFullYear(),
                        month = calendar[module].confg.default.getMonth(),
                        day = calendar[module].confg.default.getDate();

                      calendar[module].confg.default = new Date(year,month-number,day);
                      initDate();
                  }
              };

              //日期格式化输出到绑定的input.value中
              var outModule = function(){
                var value = $filter('date')(calendar[module].confg.default, calendar[module].confg.outFormat);
                    scope[calendar[module].module] = value;
              };

              //显示模板
              var templateShow = function(on_show){
                  //在BODY后面插入HTML
                  var html = $compile(calendar[module].confg.template)(scope);
                  $document.find('body').append(html);
                  //延迟一下显示 方便动态效果
                  $timeout(function(){
                    scope.template.templateShow = true;
                    on_show();
                  },100);
              };

              //关闭模板
              var templateHide = function(){
                  var html = angular.element( $document.find('body')[0].lastChild );
                  scope.template.templateShow = false;
                  $timeout(function(){
                    if( html[0].id.indexOf('calendar-share-warp') !== -1){
                       angular.element(html).remove();
                    }else{
                       html = document.getElementById('calendar-share-warp');
                       angular.element(html).remove();
                    }
                     calendar[module].callback.onHide();
                  },200);
              };

              //检测日期是否可用
              //@@如果存在最小天数，则不能小于最小天数 否则不可用
              //@@如果存在最大天数，则不能超过最大天数 否则不可用
              var validDateActive = function(date){
                 if(calendar[module].confg.minDate && validDate(calendar[module].confg.minDate) ){
                    if(date < calendar[module].confg.minDate){
                      return false;
                    }
                 }
                 if(calendar[module].confg.maxDate && validDate(calendar[module].confg.maxDate) ){
                    if(date > calendar[module].confg.maxDate){
                      return false;
                    }
                 }

                 return true;
              };

              //向前补上个月的天数
              var setBeforeDate = function(date, year, month){
                 var beforeMonthDayNumber = getMonthIsDay(getConfgMonth(calendar[module].confg.default,-1)),
                     oneDay_week = weekOrNumber[ getWeek( getConfgDay(calendar[module].confg.default,1) ) ];
                   //向前补上个月的天数
                    for(var i = oneDay_week-1,j = 0; i>0; i--,j++){
                       var buff = {};
                       buff.monthFlag = "before";
                       buff.week = numberOrWeek[i-1];
                       if(i === oneDay_week ){
                        buff.value = beforeMonthDayNumber;
                        buff.date = new Date(year,month-2,beforeMonthDayNumber-j);
                       }else{
                         buff.value = beforeMonthDayNumber-j;
                         buff.date = new Date(year,month-2,beforeMonthDayNumber-j);
                       }
                       //检测是否可用
                       buff.active =  validDateActive(buff.date);
                       date.push(buff);
                    }
                    //上个月的数据是反的 所以需要翻转一下
                    date.reverse();

                    return date;
              };

              //计算这个月的天数
              var setNowDate = function(date, year, month){
                var monthDayNumber = getMonthIsDay(calendar[module].confg.default),
                    oneDay_week = weekOrNumber[ getWeek( getConfgDay(calendar[module].confg.default,1) ) ];
                  //计算这个月
                  var count = oneDay_week; //星期的转换计数器
                  var now = calendar[module].confg.default.getDate(); //获取当天
                  for(var i =0; i<monthDayNumber; i++){
                    var buff = {};
                    if(i === 0){
                    }else{
                       count++;
                      if(count > 7){
                        count = 1;
                      }
                    }
                    buff.monthFlag = 'now';
                    buff.week = numberOrWeek[count];
                    buff.value = i+1;
                    buff.date = new Date(year,month-1,i+1);
                    if(i+1 === now){
                      buff.now = true;
                      scope.template.check = buff.date;
                    }
                    //检测是否可用
                    buff.active =  validDateActive(buff.date);
                    date.push(buff);
                  }

                  return date;
              };

              //向后补下个月的天数
              var setAtterDate = function(date, year ,month){
                 //向后补下个月的天数
                  var atterMonth = getConfgMonth(calendar[module].confg.default,1),
                      atterDay_week = weekOrNumber[ getWeek( getConfgDay(atterMonth,1) )  ],
                      len = date.length;
                  for(var i = len,j = 0; i<42 ;i++,j++){
                       var buff = {};
                         if(i !== len){
                            atterDay_week++;
                            if(atterDay_week > 7){
                              atterDay_week = 1;
                            } 
                         }
                      buff.monthFlag = 'atter';
                      buff.week = numberOrWeek[atterDay_week];
                      buff.value = j+1;
                      buff.date = new Date(year,month,j+1);
                      //检测是否可用
                      buff.active =  validDateActive(buff.date);
                      date.push(buff);
                  }
                  return date;
              };

              //时间初始化
              var initDate = function(){
                  var date = [],
                      year = calendar[module].confg.default.getFullYear(),
                      month = calendar[module].confg.default.getMonth()+1;

                      date = setBeforeDate(date ,year ,month);
                      date = setNowDate(date ,year ,month);
                      date = setAtterDate(date, year ,month);
                      
                      scope.template.year = year;
                      scope.template.month = month;
                      scope.template.date = date;
              };

              //配置模板事件 每次切换module都要重新配置
              var initTemplateEvent = function(){
                    scope.template.hide = templateHide;
                    scope.template.checkDate = checkDate;
                    scope.template.determine = determine;
                    scope.template.addYear = addYear;
                    scope.template.reduceYear = reduceYear;
                    scope.template.addMonth = addMonth;
                    scope.template.reduceMonth = reduceMonth;
              };

              //初始化
              var init = function(on_init,on_backobj){
                  //赋值初始化时间
                  outModule();
                  //给当前input设置绑定事件 显示日历模板
                  element[0].setAttribute('readonly',true);
                  element[0].className = 'user-select-off';

                  element[0].onclick = function(event){
                    //启动对应的配置
                    module =  angular.element(event.target)[0].getAttribute('calendar');
                    on_init();
                    initDate();
                    templateShow(calendar[module].callback.onShow);
                    //配置模板事件
                    initTemplateEvent();
                  };
                  //返回对应的calendar对象方法
                  on_backobj(calendar[module].method);
              };

    /**************    运行     *************/
          
        init(calendar[module].callback.onInit , calendar[module].callback.onBackObj);
            
      }

    };

}];

