// Code goes here
(function() {
  
  var app = angular.module("githubViewer",[]);
  

var MainController = function(
  $scope,$http, $interval,
  $log, $anchorScroll, $location){
  
  
$scope.search =function(username){
  
  $log.info("Searching for user  "+username);
  $http.get("https://api.github.com/users/" +username)  
 .then(onUserComplete,onError);
 if(countdownInterval){
   $interval.cancel(countdownInterval);
   $scope.countdown=null;
 }

}
  

var onUserComplete =function(response){
  $scope.user =response.data;
  $http.get($scope.user.repos_url)
  .then(onRepos,onError);

};

var onRepos = function(response){
  
  $scope.repos = response.data;
  $location.hash("userDetails");
  $anchorScroll();
};

var onError =function(reason){
  $scope.error ="could not fetch the user";
};


var decrementCountdown=function(){
  
  $scope.countdown -=1;
  
  if($scope.countdown){
    $scope.search($scope.username);
  }
  
};

var countdownInterval =null;

var startCountdown=function(){
  countdownInterval=$interval(decrementCountdown,1000,$scope.countdown);
};

 $scope.username = "angular";
 $scope.message="Git hub viewer!";
 $scope.repoSortOrder=" -stargazers_count ";
 $scope.countdown = 5;
 startCountdown();

};

app.controller("MainController",MainController);

}());
