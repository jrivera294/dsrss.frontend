'use strict';

/**
 * @ngdoc function
 * @name dsrssApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the dsrssApp
 */
angular.module('dsrssApp').controller('ListCtrl', ['$sce','$scope', '$http', 'djangoAuth', 'x2js',
  function ($sce, $scope, $http, djangoAuth, x2js) {
  	$scope.categories = [];
    $scope.list = [];
    $scope.listLimit = 10;


    $scope.sendClick = function(advertisingId){
	    $http.get('http://localhost:8000/advertising/'+advertisingId+'/clickAdvertising/');
    }

    $scope.toggleShowContent = function(news){
    	if(news)
    		return false;
    	else
    		return true;
    }

    function fillList(){
	    for (var k = 0; k < $scope.categories.length; k++) {
	    	for (var j = 0; j < $scope.categories[k].sources.length; j++) {
			    $http.get($scope.categories[k].sources[j].rss_url).
		    	success((function(sourceId,categoryId){
		    		return function(data){
			    		var json = x2js.xml_str2json(data);
			    		var items = json.rss.channel.item;
			    		for (var i = 0; i < items.length; i++) {
			    			var news = {title:'',url:'',content:''};
			    			news.title = items[i].title.toString();
			    			news.url = items[i].link.toString();
			    			news.content = $sce.trustAsHtml(items[i].description.toString());
			    			news.date = Date.parse(items[i].pubDate);
							news.sourceId = sourceId;
							news.sourceName = json.rss.channel.title.toString();
							news.categoryId = categoryId;

							//Depende del formato, el url puede estar en enclosure._url o en link
							if(angular.isUndefined(items[i].enclosure))
								news.imgUrl = items[i].link;
							else								
								news.imgUrl = items[i].enclosure._url;

			    			news.showContent = false;

			    			$scope.list.push(news);
			    		}
		    		}
		    	})($scope.categories[k].sources[j].id,$scope.categories[k].id));
	    	}
	    }
    }

    $http.get('http://localhost:8000/currentUser')
	    .success(function(data) {
	      $scope.categories = data.categories;
	      console.log(data.username);
	      djangoAuth.setUsername(data.username);
	      fillList();
	    });

    $http.get('http://localhost:8000/advertising/getAdvertising/')
	    .success(function(data) {
	      $scope.advertising = data;
	      //console.log(data);
	    });

  }]);