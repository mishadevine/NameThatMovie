angular.module("NameThatMovie")
  .controller("RecMoviesCtrl", function($scope,$firebaseArray,$firebaseAuth){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);
    var movies;

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations";
      $scope.userID = authData.uid;
      var listRef = new Firebase(URL);
      movies = $firebaseArray(listRef);
      $scope.movies = movies;
      } else {
      console.log("Logged out");
      }
    });

    $scope.movies = movies;


    // Remove from database
    $scope.removeMovie = function(movie) {
      $scope.movies.$remove(movie).then(function(ref) {
        console.log("removed movie");
      });
    }

  });
