// Code goes here
(function() {
  
  var app = angular.module("githubViewer",[]);
  

var MainController = function(
  $scope,$http, $interval,
  $log, $anchorScroll, $location,github){
  
  
$scope.search =function(username){
  
  $log.info("Searching for user  "+username);
  github.getUser(username).then(onUserComplete,onError);
 if(countdownInterval){
   $interval.cancel(countdownInterval);
   $scope.countdown=null;
 }

}
  

var onUserComplete =function(data){
  $scope.user =data;
  github.getRepos($scope.user).then(onRepos,onError);
  

};

var onRepos = function(data){
  
  $scope.repos = data;
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
