
module.exports = [ '$scope', '$state', function( $scope, $state){
	//需要绑定的数据源
	$scope.form =  '';
	$scope.to = '';

	$scope.calendar = '';

	//控件参数配置  请注意月份是0-11算起
	$scope.fromConfg = {
		default : new Date(),
		outFormat : 'yyyy年MM月dd日',
		maxDate: new Date(2016,10,5), 
		minDate: new Date(2016,9,10),

		// template: 'lib/calendar/test_index.html',

		onBackObj: function(obj){
			console.log(obj);
			$scope.fromCalendar = obj;
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

}];