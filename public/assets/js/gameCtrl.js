angular.module("NameThatMovie")
  .controller("GameCtrl", function($scope,$firebaseArray,$firebaseObject){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    var URL = "https://namethatmovie3.firebaseio.com/questionsANDanswers/Questions/Question0"
    var listRef = new Firebase(URL);
    theGame = $firebaseArray(listRef);


    listRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })


  });
