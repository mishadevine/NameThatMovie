angular.module("NameThatMovie",["firebase","ngRoute","ngMessages"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      controller: "MasterCtrl",
      templateUrl: "parts/home.html",
    }).when("/game", {
      controller: "MasterCtrl",
      templateUrl: "parts/game.html",
    }).when("/login", {
      controller: "MasterCtrl",
      templateUrl: "parts/login.html",
    }).when("/signup", {
      controller: "MasterCtrl",
      templateUrl: "parts/signup.html",
    }).when("/profile", {
      controller: "MasterCtrl",
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
    var auth = $firebaseAuth();

    // Redirect to the login page when clicked
    $scope.loginPage = function() {
      $location.path("/login");
    }

    // Redirect to the game page when clicked
    $scope.game = function() {
      $location.path("/game");
    }

    // Creating a user
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
        $scope.message = "User created with uid: " + firebaseUser.uid;
      }).catch(function(error) {
        $scope.error = error;
      }).then(function(firebaseUser) {
          console.log("Logged in as:", firebaseUser.uid);
          $location.path("/profile");

        //Adding user to database
          var ref = firebase.database().ref();
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
      auth.$signInWithPopup("facebook").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path("/profile");
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }

    // Logging in with email and password
    $scope.login = function() {
      auth.$signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        $location.path("/profile");
      })
      .catch(function(error) {
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
