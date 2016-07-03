angular.module("NameThatMovie")
  .controller("AddQuestCtrl", function($scope,$firebaseArray,$firebaseAuth){

    //Connect to Firebase
    var ref = new Firebase("https://namethatmovie3.firebaseio.com/");

    $scope.authObj = $firebaseAuth(ref);
    var quests;

    $scope.authObj.$onAuth(function(authData) {
    if (authData) {
      var URL = "https://namethatmovie3.firebaseio.com/newQuestions";
      $scope.userID = authData.uid;
      var listRef = new Firebase(URL);
      quests = $firebaseArray(listRef);
      $scope.quests = quests;
      } else {
      console.log("Logged out");
      }
    });

    $scope.quests = quests;

    // Add to database
    $scope.addNewQuests = function() {
      $scope.quests.$add($scope.newQuest).then(function(ref) {
        $scope.newQuest = {};
        console.log("added Question");
      });
    }

  });
