angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$firebaseObject){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");
    $firebaseObject(ref)
    var questions;

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Categories"
    var listRef = new Firebase(URL);
    questions = $firebaseArray(listRef);
    $scope.questions = questions;

    $scope.correct = function(correct) {
      console.log("correct answer");
    }

    $scope.wrong = function(wrong) {
      console.log("wrong answer");
    }
  });
