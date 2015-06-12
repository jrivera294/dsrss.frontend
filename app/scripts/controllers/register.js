'use strict';

/**
 * @ngdoc function
 * @name dsrssApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the dsrssApp
 */
angular.module('dsrssApp')
  .controller('RegisterCtrl', function ($scope,$location,$interval,djangoAuth) {
  		$scope.newUser = {'username':'','password1':'','password2':'','email':''};
  		$scope.sucess = false;
		$scope.register = function(){
			$scope.errors = [];
			djangoAuth.register($scope.newUser.username,$scope.newUser.password1,$scope.newUser.password2,$scope.newUser.email)
				.then(function(){
					$scope.sucess = true;
					$interval(function(){
						$location.path('/login');
					},3000);
				},function(data){
					console.log('error con :'+$scope.newUser);
					$scope.errors = data;
				});
		};
	});
