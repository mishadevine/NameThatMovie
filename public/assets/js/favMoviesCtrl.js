angular.module("NameThatMovie")
  .controller("FavMoviesCtrl", function($scope,$firebaseArray,$firebaseAuth){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);
    var favMovies;

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/favmovies";
      $scope.userID = authData.uid;
      var listRef = new Firebase(URL);
      favMovies = $firebaseArray(listRef);
      $scope.favMovies = favMovies;
      } else {
      console.log("Logged out");
      }
    });

    $scope.favMovies = favMovie;

    // Add to database
    $scope.addMovie = function() {
      $scope.movies.$add($scope.newMovie).then(function(ref) {
        $scope.newMovie = {};
        console.log("added movie");
      });
    }

    // Remove from database
    $scope.removeMovie = function(movie) {
      $scope.movies.$remove(movie).then(function(ref) {
        console.log("removed movie");
      });
    }

    // Edit movie
    $scope.editMovie = function(movie) {
      $scope.newMovie = movie;
      console.log("editing movie")
    }

    //Update list and database
    $scope.updateMovie = function(movie) {
      $scope.movies.$save($scope.newMovie).then(function(ref) {
        $scope.newMovie = {};
        console.log("updated movie");
      });
    }

  });
