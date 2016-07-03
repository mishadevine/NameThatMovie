angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$firebaseObject){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Questions"
    var listRef = new Firebase(URL);
    theGame = $firebaseArray(listRef);
    $scope.game = theGame;


    listRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })



  });
