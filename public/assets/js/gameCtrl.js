angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$firebaseObject){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");
    $firebaseObject(ref)
    var questions;

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Questions"
    var listRef = new Firebase(URL);
    questions = $firebaseArray(listRef);
    $scope.questions = questions;


    listRef.limitToFirst(1).on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })



  });
