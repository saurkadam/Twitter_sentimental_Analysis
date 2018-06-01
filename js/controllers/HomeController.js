
app.controller('HomeController', ['$rootScope','$scope','$http','$location', function($rootScope,$scope,$http,$location){
	
	$scope.pgNum = 0;
	$scope.data=[];
	$scope.neutral=false;
	$scope.bad=false;
	$scope.good=false;
	$scope.currentpage=1;
	$scope.totalpage = 0;
	$scope.pgNum = "";
	$scope.counter=1;
	$scope.isLoading = false;
	$scope.oldLikes = {
		"tweetId":"",
		"state":1,
		"topic":""
	};
	$scope.newLiked=[];


$scope.Signout=function(){
	$rootScope.token_var = null;
	$scope.$apply($location.path('/'));
}

$scope.keypress=function($event){
	if($event.keyCode == 13){
		$scope.searchText($scope.searchQuery);
	}
	

}

$scope.searchText = function(value2){
	$scope.isLoading=true;
	$scope.data = [];
	$scope.fakeData = {};
	$scope.topic=value2;

		$http({
		  method: 'GET',
		  url: 'https://afternoon-temple-62208.herokuapp.com/tweets?topic=' + $scope.topic,
		  headers: {'Content-Type': 'application/json', 'accessToken':$rootScope.token_var.access_token}
		}).then(function successCallback(response) {
			angular.forEach(response.data.tweets,function(var_data){
				$scope.data.push(var_data);
			});

						$scope.totalpage = response.data.pageCount;
						$scope.pgNum=$scope.data[$scope.data.length - 1];
						$scope.pgNum=$scope.pgNum["_id"]["$oid"];
						
		          		if($scope.data){

		          			$scope.filter(0);
		          		}
		          		//$scope.pgNum=$scope.data[length - 1].id; 
		  }, function errorCallback(response) {
		  		$scope.isLoading=false;
		  		alert('This tweet search was not found try different search');


		  });	




}


function Handlery(){
	var wrap = document.getElementById('wrap');
	// gets page content height
	var contentHeight = wrap.offsetHeight; //gets page height
	//gets vertical scroll position
	var yOffset = window.pageYOffset;
	var y = yOffset + window.innerHeight;
	if($scope.counter < $scope.totalpage){
		if(y >= contentHeight){
			$scope.counter++;
			$http({
			  method: 'GET',
			  url: 'https://afternoon-temple-62208.herokuapp.com/tweets?topic=' + $scope.topic,
			  headers: {'Content-Type': 'application/json', 'accessToken' : $rootScope.token_var.access_token, 'pageNumber': $scope.pgNum}
			}).then(function successCallback(response) {

				angular.forEach(response.data.tweets,function(var_data){
					$scope.data.push(var_data);
				});
							$scope.pgNum=$scope.data[$scope.data.length - 1];
							$scope.pgNum=$scope.pgNum["_id"]["$oid"];
							//$scope.pgNum = $scope.pgNum.id[0];

			          		if($scope.data){
			          			$scope.filter(0);
			          		}
			          		
			  }, function errorCallback(response) {
			  	localStorage.clear();
				$location.path("/");

			  });
		}

	}

}
window.onscroll = Handlery;
 
/*

 setInterval(function(){ */
 	 
/* 	var delta=_.isEqual($scope.oldLikes, $scope.newLikes);
 	if(delta){
 		$scope.newLikes=$scope.oldLikes;
 		alert("hello world");
 		// post request
 	}
  }, 30000);*/


$scope.likefunction=function(value_obj,value_like){
	if(value_like == true){
		$scope.oldLikes.state=1;
	}
	else{
		$scope.oldLikes.state=0;	
	}
	$scope.oldLikes.tweetId=value_obj["_id"]["$oid"];
	$scope.oldLikes.topic=value_obj["topic"];



			$http({
			    method: 'POST',
			    url: 'https://afternoon-temple-62208.herokuapp.com/favorite',
			    data: $.param({tweetId: $scope.oldLikes.tweetId,
			    state: $scope.oldLikes.state,
			    topic: $scope.oldLikes.topic
			    }),
			    headers: {'Content-Type': 'application/x-www-form-urlencoded',accessToken:$rootScope.token_var.access_token}
			}).then(function successCallback(response) {
  				console.log(response);
			}).then(function errorCallback(response){
				console.log(response);


			});




}

$scope.favorite=function(obj){
	var index=null;
	for(var i=0;i<$scope.newLiked.length;i++){
		if($scope.newLiked[i]["_id"]["$oid"] == obj["_id"]["$oid"]){
			index=i;
			break;
		}
	}
	  if(index != null){
	  	

	  		$scope.newLiked.splice(index, 1);
	  	
	  }
		else{
			if(obj["marked"] != true){
				$scope.newLiked.push(obj);
			}
	  		
	  	}

				
}


	$scope.filter=function(value){
	if(value == 0){
		if($scope.data){

			$scope.isLoading = false;	
			if($scope.good || $scope.bad || $scope.neutral){

					if($scope.good == true && $scope.bad != true && $scope.neutral != true){
						
						$scope.$apply($scope.fakeData = _.where($scope.data, {sentiment: "positive"}));
					}
					if($scope.bad == true && $scope.good != true && $scope.neutral != true){

						$scope.$apply($scope.fakeData = _.where($scope.data, {sentiment: "negative"}));
					}
					if($scope.neutral == true  && $scope.bad != true && $scope.good != true){

						$scope.$apply($scope.fakeData = _.where($scope.data, {sentiment: "neutral"}));
					}
					if($scope.good && $scope.bad && !$scope.neutral){

						var result = $scope.data.filter(function(v, i) {
	  						return (v["sentiment"] == "positive" || v["sentiment"] == "negative");
						})
						$scope.fakeData = result;
					}
					if($scope.bad && $scope.neutral && !$scope.good){

						var result = $scope.data.filter(function(v, i) {
	  						return (v["sentiment"] == "negative" || v["sentiment"] == "neutral");
						})
						$scope.$apply($scope.fakeData = result);
					}
					if($scope.good && $scope.neutral && !$scope.bad){

						var result = $scope.data.filter(function(v, i) {
	  						return (v["sentiment"] == "positive" || v["sentiment"] == "neutral");
						})
						$scope.$apply($scope.fakeData = result);
					}
					if($scope.good && $scope.neutral && $scope.bad){

						$scope.$apply($scope.fakeData=$scope.data);
					}


				}
			else{
				$scope.$apply($scope.fakeData=$scope.data);
			}

				
		}		
	}
	else if(value == 1){
						var result = $scope.data.filter(function(v, i) {
	  						return (v["marked"] == true);
						})
						$scope.$apply($scope.fakeData = result);
						if($scope.newLiked.length != 0){
							for(var i=0; i < $scope.newLiked.length; i++){
								result.push(obj);	
							}
						}
						$scope.$apply($scope.fakeData = result);
						
	}
}
}]);
