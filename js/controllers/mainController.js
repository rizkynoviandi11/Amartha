app.controller('mainController', ['$scope', '$http', 
	function($scope, $http){
		$http.get('http://localhost:8080/api/users')
			.success(function(data){
				$scope.users = data;
				console.log($scope.users)
			})
			.error(function(data){
				console.log(data);
			});

		$scope.title = 'Home Page';
		$scope.message = 'Welcome to Home Page';
	}]);