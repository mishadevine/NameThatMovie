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
  // .factory("Auth",["$firebaseAuth",
  //   function($firebaseAuth) {
  //     return $firebaseAuth();
  //   }
  // ])
  .controller("MasterCtrl", function($scope,$firebaseAuth,$firebaseObject,$firebaseArray,$location) {
    // var auth = $firebaseAuth();
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);

    // Redirect to the game page when clicked
    $scope.signupPage = function() {
      $location.path("/signup");
    }

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
      $scope.authObj.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        console.log("User " + userData.uid + " created successfully!");
        return $scope.authObj.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        });
      }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $location.path('/profile');

        //Adding user to database
          var usersRef = new Firebase("https://namethatmovie3.firebaseio.com/users/" + authData.uid);
          var obj = $firebaseObject(usersRef);
          obj.userInformation = { firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password };
          obj.$save().then(function(usersRef) {
          ref.key() === obj.$id;
          });
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    }

    // Logging in through Facebook
    $scope.fbLogin = function() {
      $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('/profile');
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    }

    // Logging in with email and password
    $scope.login = function() {
      $scope.authObj.$authWithPassword({
        email: $scope.login.email,
        password: $scope.login.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('/profile');;
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
