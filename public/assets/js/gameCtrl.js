angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$routeParams,$timeout,$firebaseAuth){

    //Connect to Firebase
    // var ref = new Firebase("https://namethatmovie3.firebaseio.com/");
    //
    // $scope.authObj = $firebaseAuth(ref);
    // var movies

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question0"
    var listRef = new Firebase(URL)
    questions = $firebaseArray(listRef)
    $scope.questions = questions

    var counter = 0
    $scope.score = 0

    var nextQuestion = function() {
      // increases our counter for question numbers
      ++counter
      //$timeout to allow time to pass before next question
      $timeout(function () {
        $scope.colorWrongOne = null
        $scope.colorRightOne = null
        $scope.activeAnswerIndex = null
        $scope.message = null
        var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question" + counter
        var listRef = new Firebase(URL)
        questions = $firebaseArray(listRef)
        $scope.questions = questions
      },2000)

      if (counter > 9) {
        $scope.endgameScore = $scope.score;
        $scope.score = {};
        $scope.endGame = "Your total score is " + $scope.endgameScore + "!"
      }
    }

    $scope.checkAnswer = function (answer,index) {
      console.log("check is this is right ", answer)

      if(answer.Correct){
        console.log("YOURE RIGHT!")
        $scope.message = "You are correct!"
        $scope.score = $scope.score + 10
        $scope.colorRightOne = answer.$id
        nextQuestion()
      }else{
        $scope.message = "You answered wrong. Click the heart to save the right answer to your recommendations list."
        $scope.colorWrongOne = answer.$id


        // $scope.authObj.$onAuth(function(authData) {
        // if (authData) {
        //   var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations";
        //   $scope.userID = authData.uid;
        //   var listRef = new Firebase(URL);
        //   movies = $firebaseArray(listRef);
        //   $scope.movies = movies;
        //   } else {
        //   console.log("Logged out");
        //   }
        // });


        $scope.isShowing = function (index) {
          return $scope.activeAnswerIndex === index
          console.log($scope.activeAnswerIndex)
        }

        angular.forEach($scope.questions, function(value, key) {
          if(value.Correct) {
            console.log(key)
            $scope.activeAnswerIndex = key
            $scope.colorRightOne = value.$id

          }
          console.log(key, value);
        });

        console.log("TRY AGAIN", $scope.colorWrongOne)
        nextQuestion()
      }
    }

    $scope.savFav = function () {
      console.log("Movie was saved")
    }

    // $scope.movies = movies;
    // Remove from database
    // $scope.removeMovie = function(movie) {
    //   $scope.movies.$remove(movie).then(function(ref) {
    //     console.log("removed movie");
    //   });
    // }
  });
