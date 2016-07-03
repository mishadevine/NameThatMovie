angular.module("NameThatMovie",["firebase","ngRoute","ngMessages"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "parts/home.html",
      controller: "MasterCtrl",
    }).when("/game", {
      templateUrl: "parts/game.html",
      controller: "GameCtrl",
    }).when("/login", {
      templateUrl: "parts/login.html",
      controller: "MasterCtrl",
    }).when("/signup", {
      templateUrl: "parts/signup.html",
      controller: "MasterCtrl",
    }).when("/profile", {
      templateUrl: "parts/profile.html",
      controller: "MasterCtrl",
    }).when("/favMovies", {
      templateUrl: "parts/favMovies.html",
      controller: "FavMoviesCtrl",
    }).when("/addQuest", {
      templateUrl: "parts/addQuest.html",
      controller: "AddQuestCtrl",
    })
    .otherwise("/");
  }])
  .controller("MasterCtrl", function($scope,$firebaseAuth,$firebaseObject,$firebaseArray,$location) {

    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);

    // Redirect to the game page
    $scope.signupPage = function() {
      $location.path("/signup");
    }

    // Redirect to the login page
    $scope.loginPage = function() {
      $location.path("/login");
    }

    // Redirect to the game page
    $scope.game = function() {
      $location.path("/game");
    }

    // Redirect to the recommendations page
    $scope.recPage = function() {
      $location.path("/recMovies");
    }

    // Redirect to the favorite movies page
    $scope.favMoviesPage = function() {
      $location.path("/favMovies");
    }

    // Redirect to the page that users can add questions
    $scope.addQuestPage = function() {
      $location.path("/addQuest");
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
