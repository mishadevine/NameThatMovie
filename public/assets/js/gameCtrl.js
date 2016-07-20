angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$rootScope,$firebaseArray,$routeParams,$timeout,$firebaseAuth){

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question0"
    var listRef = new Firebase(URL)
    questions = $firebaseArray(listRef)
    $scope.questions = questions
    $scope.authObj = $firebaseAuth(listRef)

    $scope.authObj.$onAuth(function(authData) { // connecting to the score section of the database
      if (authData) {
        console.log(authData)
        $scope.currentUser = authData
        $rootScope.showMenu = true
        var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/categories/score/" + $routeParams.catName
        $scope.userID = authData.uid
        var totalScore = new Firebase(URL)
        scores = $firebaseArray(totalScore)
        $scope.scores = scores
      } else {
        console.log("Logged out")
      }
    })

    $scope.authObj.$onAuth(function(authData) { // connecting to the recommendations section
      if (authData) { // of the database
        console.log("Logged in as:", authData.uid)
        $scope.currentUser = authData
        var URL = "https://namethatmovie3.firebaseio.com/users/" + authData.uid + "/recommendations/" + $routeParams.catName
        $scope.userID = authData.uid
        var ref = new Firebase(URL)
        recommendations = $firebaseArray(ref)
        $scope.recommendations = recommendations
        console.log($scope.recommendations)
      } else {
        console.log("Logged out")
      }
    })

    // $scope.recommendations = function(recommendation) {
    //   $scope.recommendations.$remove(recommendation).then(function(ref) {
    //     console.log("removed movie");
    //   });
    // }

    var counter = 0 // setting the counter to 0
    $scope.score = 0 // setting score to start out as 0

    var nextQuestion = function() {
      // increases our counter for question numbers
      ++counter
      //$timeout to allow time to pass before next question
      $timeout(function () {
        $scope.colorWrongOne = null // "hiding/resetting" the wrong answer's highlighted color
        $scope.colorRightOne = null // "hiding/resetting" the right answer's highlighted color
        $scope.activeAnswerIndex = null // "hiding/resetting" the favorites heart
        $scope.message = null // "hiding/resetting" the message that appears at the bottom
        var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question" + counter
        var listRef = new Firebase(URL)
        questions = $firebaseArray(listRef)
        $scope.questions = questions
      },4000)

      // saving user's score to database as well as resetting the score that is
      if (counter > 9) { // displayed with all questions and displaying a total final score at the end of the game
        $scope.endgameScore = $scope.score;
        $scope.score = {};
        $scope.endGame = "Your total score is " + $scope.endgameScore + "!"

        if ($scope.currentUser) {
          $scope.scores.$add($scope.endgameScore).then(function(scores) {
            $scope.endgameScore = {};
            console.log("added score")
          })
        }
      }
    }

    // checking to see if the answer user seleted is correct
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


        $scope.isShowing = function (index) { // if user is logged in show the favorites heart
          if ( $scope.currentUser )  return $scope.activeAnswerIndex === index
          console.log($scope.activeAnswerIndex)
        }

        angular.forEach($scope.questions, function(value, key) {
          if(value.Correct) { // if the user selects the wrong answer grab the correct answer
            console.log(key) // and assign the favorites heart to that answer
            $scope.activeAnswerIndex = key
            $scope.colorRightOne = value.$id
          }
          console.log(key, value)
        });

        $scope.add = function () { // adding the saved movie to the database
          $scope.recommendations.$add(questions[$scope.activeAnswerIndex].Answer).then(function(movies) {
            $scope.activeAnswerIndex = {};
            console.log("added movie")
          })
          console.log("hey i am working yay!")
        }

        console.log("TRY AGAIN", $scope.colorWrongOne)
        nextQuestion()
      }
    }

  });
