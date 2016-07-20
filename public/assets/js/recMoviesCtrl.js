angular.module("NameThatMovie")
  .controller("RecMoviesCtrl", function($scope,$firebaseArray,$firebaseAuth,$routeParams){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);
    var recommendations

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations/" + $routeParams.catName
      $scope.userID = authData.uid
      var listRef = new Firebase(URL)
      recommendations = $firebaseArray(listRef)
      $scope.recommendations = recommendations
      } else {
      console.log("Logged out");
      }
    });

    $scope.recommendations = recommendations


    // Remove from database
    $scope.removeMovie = function(recommendation) {
      $scope.recommendations.$remove(recommendation).then(function(listRef) {
        console.log("removed recommendation");
      });
    }

  });
