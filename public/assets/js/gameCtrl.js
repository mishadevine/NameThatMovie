angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$rootScope,$firebaseArray,$routeParams,$timeout,$firebaseAuth){

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question0"
    var listRef = new Firebase(URL)
    questions = $firebaseArray(listRef)
    $scope.questions = questions
    // $scope.movies = movies
    // $scope.score = score


    $scope.authObj = $firebaseAuth(listRef)

    $scope.authObj.$onAuth(function(authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid)
        $scope.currentUser = authData
        var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations"
        $scope.userID = authData.uid
        var ref = new Firebase(URL)
        movies = $firebaseArray(ref)
        $scope.movies = movies
      } else {
        console.log("Logged out")
      }
    })


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
      },4000)

      if (counter > 9) {
        $scope.endgameScore = $scope.score;
        $scope.score = {};
        $scope.endGame = "Your total score is " + $scope.endgameScore + "!"

        $scope.authObj.$onAuth(function(authData) {
          if (authData) {
            console.log("Logged in as:", authData.uid)
            $scope.currentUser = authData
            var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/categories/score"
            $scope.userID = authData.uid
            var totalScore = new Firebase(URL)
            scores = $firebaseArray(totalScore)
            $scope.scores = scores
            if ($scope.currentUser) {
              $scope.scores.$add($scope.endgameScore).then(function(scores) {
                $scope.endgameScore = {};
                console.log("added score")
              })
            }

          } else {
            console.log("Logged out")
          }
        })

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

        $scope.isShowing = function (index) {
          if ( $scope.currentUser )  return $scope.activeAnswerIndex === index
          console.log($scope.activeAnswerIndex)
        }

        $scope.addFav = function () {
          $scope.movies.$add($scope.newMovie).then(function(ref) {
            $scope.newMovie = {};
            console.log("added movie")
          })
        }

        angular.forEach($scope.questions, function(value, key) {
          if(value.Correct) {
            console.log(key)
            $scope.activeAnswerIndex = key
            $scope.colorRightOne = value.$id

          }
          console.log(key, value)
        });

        console.log("TRY AGAIN", $scope.colorWrongOne)
        nextQuestion()
      }
    }

    // $scope.movies = movies;
    // Remove from database
    // $scope.removeMovie = function(movie) {
    //   $scope.movies.$remove(movie).then(function(ref) {
    //     console.log("removed movie");
    //   });
    // }
  });
