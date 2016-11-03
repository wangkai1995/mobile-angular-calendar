
module.exports = [ '$scope', '$state', function( $scope, $state){
	//需要绑定的数据源
	$scope.form =  '';
	$scope.to = '';

	$scope.calendar = '';

	//控件参数配置
	$scope.fromConfg = {
		default : new Date(),
		outFormat : 'yyyy年MM月dd日',
		maxDate: new Date(2016,10,5),
		minDate: new Date(2016,9,10),

		onBackObj: function(obj){
			console.log(obj);
			$scope.calendar = obj;
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



	$scope.testClick = function(){
		$scope.calendar.setDate(new Date(2016,9,15) , true);
		$scope.calendar.resetConfg({
			maxDate: null,
			minDate: null,
			changeYear: false
		});
		$scope.calendar.show();
	};

}];