angular.module("NameThatMovie")
  .controller("RecMoviesCtrl", function($scope,$firebaseArray,$firebaseAuth,$routeParams){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations"
      $scope.userID = authData.uid
      var listRef = new Firebase(URL)
      recommendations = $firebaseArray(listRef)
      $scope.recommendations = recommendations
      console.log($scope.recommendations)
      } else {
      console.log("Logged out");
      }
    });

    // $scope.recommendations = recommendations


    // Remove from database
    $scope.removeMovie = function(recommendation) {
      $scope.recommendations.$remove(recommendation).then(function(listRef) {
        console.log("removed recommendation");
      });
    }

  });
