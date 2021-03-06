'use strict';

/**
 * @ngdoc function
 * @name dsrssApp.controller:UserconfigCtrl
 * @description
 * # UserconfigCtrl
 * Controller of the dsrssApp
 */
angular.module('dsrssApp')
  .controller('UserconfigCtrl', function ($scope,$http) {

    $scope.setCategory = function(category){
    	if(category.suscrito === false){
 			$http.post('http://localhost:8000/categories/'+category.id+'/addSubscriber/', {}).
			success(function() {
				console.log('Add category sucess');
				category.suscrito = true;
			}).
			error(function(/*data, status, headers, config*/) {
				console.log('Add category error');
			});
    	}else{
 			$http.post('http://localhost:8000/categories/'+category.id+'/removeSubscriber/', {}).
			success(function() {
				console.log('Remove category sucess');
				category.suscrito = false;
			}).
			error(function(data/*data, status, headers, config*/) {
				console.log('Remove category error');
				console.log(data);
			});
    	}
    };

    $scope.setMailSubs = function(){
    	if($scope.mailSubs === false){
 			$http.patch('http://localhost:8000/userProfile/'+$scope.user.id+'/', {mailFlag:true}).
			success(function() {
				console.log('Suscribir email success');
				$scope.mailSubs = true;
			}).
			error(function(/*data, status, headers, config*/) {
				console.log('Suscribir email failed');
			});
    	}else{
 			$http.patch('http://localhost:8000/userProfile/'+$scope.user.id+'/', {mailFlag:false}).
			success(function() {
				console.log('Desuscribir email success');
				$scope.mailSubs = false;
			}).
			error(function(/*data, status, headers, config*/) {
				console.log('Desuscribir email failed');
			});
    	}
    };

    $http.get('http://localhost:8000/categories/')
	    .success(function(data) {
			$scope.categories = data;
			$scope.user = null;

	  	    $http.get('http://localhost:8000/currentUser')
			    .success(function(data) {
			    $scope.user = data;
				for (var i = 0; i < $scope.categories.length; i++){
					for (var j = 0; j < $scope.user.categories.length; j++) {
						if($scope.user.categories[j].name === $scope.categories[i].name){
							$scope.categories[i].suscrito = true;
							break;
						}
					}
					if($scope.categories[i].suscrito !== true){
						$scope.categories[i].suscrito = false;
					}
				}

			    });
	    });
  	    $http.get('http://localhost:8000/getProfile')
	    .success(function(data) {
	    	$scope.mailSubs = data.mailFlag;
	    });
	//$scope.mailSubs=true;
  });
