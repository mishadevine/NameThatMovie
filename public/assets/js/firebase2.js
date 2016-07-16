angular.module("NameThatMovie",["firebase","ngRoute","ngMessages"])
  .config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "parts/notSignedIn/home.html",
      controller: "MasterCtrl",
    }).when("/game", {
      templateUrl: "parts/notSignedIn/game.html",
    }).when("/categories/:catName", {
      templateUrl: "parts/categories/categories.html",
      controller: "GameCtrl",
    }).when("/login", {
      templateUrl: "parts/notSignedIn/login.html",
      controller: "MasterCtrl",
    }).when("/signup", {
      templateUrl: "parts/notSignedIn/signup.html",
      controller: "MasterCtrl",
    }).when("/profile", {
      templateUrl: "parts/signedIn/profile.html",
      controller: "MasterCtrl",
    }).when("/recMovies", {
      templateUrl: "parts/signedIn/recMovies.html",
      controller: "gameCtrl",
    }).when("/favMovies", {
      templateUrl: "parts/signedIn/favMovies.html",
      controller: "FavMoviesCtrl",
    }).when("/addQuest", {
      templateUrl: "parts/signedIn/addQuest.html",
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

    // Redirect to the kids category page
    $scope.kids = function() {
      $location.path("/kids");
    }

    // Redirect to the comedy category page
    $scope.comedy = function() {
      $location.path("/comedy");
    }

    // Redirect to the kids category page
    $scope.adultCom = function() {
      $location.path("/adultComedy");
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
      console.log('FIRE!!')
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
          //Adding user to database
          var usersRef = new Firebase("https://namethatmovie3.firebaseio.com/users/" + authData.uid);
          var obj = $firebaseObject(usersRef)
            if(obj.score = 0){
              obj.gameScore = {};
              obj.$save().then(function(usersRef) {
                ref.key() === obj.$id;
              });
            }

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
