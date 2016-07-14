angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$routeParams,$timeout){

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question0";
    var listRef = new Firebase(URL);
    questions = $firebaseArray(listRef);
    $scope.questions = questions;

    var counter = 0;
    $scope.score = 0

    var nextQuestion = function() {
      //$timeout to allow time to pass before next question
      // increases our counter for question numbers
      $timeout(5000);
      ++counter;
      var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories/" + $routeParams.catName + "/Question" + counter;
      var listRef = new Firebase(URL);
      questions = $firebaseArray(listRef);
      $scope.questions = questions;
    }

    $scope.checkAnswer = function (answer) {
      console.log("check is this is right ", answer)
      if(answer.Correct){
        console.log("YOURE RIGHT!")
        $scope.message = "You are correct!";
        $scope.score = $scope.score + 10;
        // something to trigger ng-class to turn rightone green
        //find the current question and turn it red using the same method
        $scope.colorRightOne = answer.$id;
        nextQuestion();
      }else{
        $scope.message = "Try Again";
        $scope.colorWrongOne = answer.$id
        console.log("TRY AGAIN", $scope.colorWrongOne)
        // nextQuestion();
        //find $id of questions[??].Correct
        // so you can sent answer.Correct to colorRightOne
        // get for Auth and if they are logged in show heart
        // use $scope.colorRightOne or make a new $scope

      }
    }
  });
