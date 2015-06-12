'use strict';

/**
 * @ngdoc function
 * @name dsrssApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dsrssApp
 */
angular.module('dsrssApp')
  .controller('LoginCtrl', function ($scope,$location,djangoAuth) {
	$scope.user = {'username':'','password':''};

	$scope.login = function(){
		djangoAuth.login($scope.user.username, $scope.user.password)
        .then(function(){
        	// success case
        	$location.path('/list');
        },function(data){
        	// error case
        	$scope.errors = data;
        });
	};
  });
