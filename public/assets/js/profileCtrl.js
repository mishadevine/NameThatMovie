angular.module("NameThatMovie")
  .controller("ProfileCtrl", function($scope,$firebaseArray,$firebaseAuth,currentAuth){
    // //Connect to Firebase
    // var ref = new Firebase("https://name-that-movie.firebaseio.com/");
    //
    // $scope.authObj = $firebaseAuth(ref);
    // var items;
    //
    // $scope.authObj.$onAuth(function(authData) {
    // if (authData) {
    //   var URL = "https://name-that-movie.firebaseio.com/users/" + authData.uid + "/items";
    //   $scope.userID = authData.uid;
    //   var listRef = new Firebase(URL);
    //   items = $firebaseArray(listRef);
    //   $scope.items = items;
    //   // console.log("LIST ONE", $scope.items);
    //   } else {
    //   console.log("Logged out");
    //   }
    // });
    //
    // $scope.items = items;
    // // console.log("LIST ONE", $scope.items);
    //
    // // Add to database
    // $scope.addItem = function() {
    //   $scope.items.$add($scope.newItem).then(function(ref) {
    //     $scope.newItem = {};
    //     console.log("added item");
    //   });
    // }
    //
    // // Remove from database
    // $scope.removeItem = function(item) {
    //   $scope.items.$remove(item).then(function(ref) {
    //     console.log("removed item");
    //   });
    // }
    //
    // // Edit item
    // $scope.editItem = function(item) {
    //   $scope.newItem = item;
    //   console.log("editing item")
    // }
    //
    // //Update list and database
    // $scope.updateItem = function(item) {
    //   $scope.items.$save($scope.newItem).then(function(ref) {
    //     $scope.newItem = {};
    //     console.log("updated item");
    //   });
    // }

})
