angular.module("NameThatMovie",["firebase","ngRoute","ngMessages"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      controller: "MasterCtrl",
      templateUrl: "parts/home.html",
    }).when("/profile", {
      controller: "ProfileCtrl",
      templateUrl: "parts/profile.html",
    })
    .otherwise("/");
  }])
  .factory("Auth",["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ])
  .controller("MasterCtrl", function($scope,Auth,$firebaseAuth,$firebaseObject,$firebaseArray,$location) {
    var ref = new Firebase("https://name-that-movie.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    // var auth = $firebaseAuth();


    // Creating a user
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      $scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
        $scope.message = "User created with uid: " + firebaseUser.uid;
      }).catch(function(error) {
        $scope.error = error;
      }).then(function(firebaseUser) {
          console.log("Logged in as:", firebaseUser.uid);
          $location.path("/profile");

        //Adding user to database
          var ref = firebase.database("https://name-that-movie.firebaseio.com/users/").ref();
          $scope.data = $firebaseObject(ref)
          $scope.data.userInformation = { firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password };
          $scope.data.$save().then(function(ref) {
          ref.key() === $scope.data.$id;
          console.log("added record with id " + id);
          $scope.data.$indexFor(id); // returns location in the array
          });
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    }

    // Logging in through Facebook
    $scope.fbLogin = function() {
      $scope.authObj.$signInWithPopup("facebook").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path("/profile");
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }

    // Logging in with email and password
    $scope.login = function() {
      $scope.authObj.$signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path("/profile");
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }

    // Login and Sign up form validation
    $scope.validateEmail = function() {
      return loginForm.email.$touched && loginForm.email.$invalid || signupForm.email.$touched && signupForm.email.$invalid
    }

    $scope.validatePasswordLength = function() {
      return loginForm.password.$touched || signupForm.password.$touched
    }

  });
