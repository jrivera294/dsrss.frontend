'use strict';

/**
 * @ngdoc function
 * @name dsrssApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dsrssApp
 */
angular.module('dsrssApp')
  .controller('MainCtrl', function ($scope,$location,djangoAuth) {
  	$scope.authenticated = false;
    $scope.username = '';

	$scope.logout = function(){
		djangoAuth.logout();
		djangoAuth.setUsername('');
		$location.path('/login');
	};

    djangoAuth.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
    });

    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
    });

    $scope.$on('djangoAuth.logged_in', function() {
      $scope.authenticated = true;
    });

  });
