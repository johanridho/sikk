angular.module('sikk', ['ngRoute','firebase'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    })    
    .when('/cases/:id', {
        templateUrl: function(params){ return 'partials/case-detail.html'; },
        controller: 'CaseDetailController'
    })
    .when('/cases', {
        templateUrl: 'partials/cases.html',
        controller: 'CaseListController'
    })
    .when('/corruptors/:id', {
        templateUrl: function(params){ return 'partials/corruptor-detail.html'; },
        controller: 'CorruptorDetailController'
    })
    .when('/corruptors', {
        templateUrl: 'partials/corruptors.html',
        controller: 'CorruptorListController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])

.controller('HomeController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl", function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "cases");
    $scope.cases = $firebaseArray(ref);

    var ref2 = new Firebase(FirebaseUrl + "corruptors");
    $scope.corruptors = $firebaseArray(ref2);

    var ref3 = new Firebase(FirebaseUrl + "trivia");    
    var triviaArray = $firebaseArray(ref3);
    triviaArray.$loaded().then(function(){
        $scope.trivia = triviaArray.$getRecord(Math.floor(Math.random() * triviaArray.length));
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    
    $scope.incrementWatcher = function(data) {        
      data.watcher++;
      $scope.cases.$save(data);      
    }
}])

.controller('CaseDetailController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl",  function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
	var ref = new Firebase(FirebaseUrl + "cases");
    var caseArray = $firebaseArray(ref);
    $scope.currentProcess = 4;
	caseArray.$loaded().then(function(){
    	$scope.case = caseArray.$getRecord($routeParams.id);
    })
    .catch(function(error) {
	    console.log("Error:", error);
	});
    $scope.incrementWatcher = function(data) {        
      data.watcher++;
      caseArray.$save(data);      
    }
    $scope.incrementKemandekan = function(data) {        
      data.komplain_kemandekan++;
      caseArray.$save(data);      
    }
}])

.controller('CaseListController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl", function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "cases");
    $scope.cases = $firebaseArray(ref);

    $scope.incrementWatcher = function(data) {        
      data.watcher++;
      $scope.cases.$save(data);      
    }
}])

.controller('CorruptorDetailController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl",  function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "corruptors");
    var corruptorArray = $firebaseArray(ref);    
    corruptorArray.$loaded().then(function(){
        $scope.corruptor = corruptorArray.$getRecord($routeParams.id);
        if($scope.corruptor.value >= 10000000000){
            $scope.corruptorGrade = "Kakap";
        }else{
            $scope.corruptorGrade = "Teri";
        }
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
    $scope.incrementBrick = function() {
      $scope.corruptor.reactions.brick++;
      corruptorArray.$save($scope.corruptor);  
    }
    $scope.incrementFire = function() {
      $scope.corruptor.reactions.fire++;
      corruptorArray.$save($scope.corruptor);  
    }
    $scope.incrementHeart = function() {
      $scope.corruptor.reactions.heart++;
      corruptorArray.$save($scope.corruptor);  
    }
    $scope.incrementMouse = function() {
      $scope.corruptor.reactions.mouse++;
      corruptorArray.$save($scope.corruptor);  
    }
    $scope.incrementPoop = function() {
      $scope.corruptor.reactions.poop++;
      corruptorArray.$save($scope.corruptor);  
    }
    $scope.incrementSkull = function() {
      $scope.corruptor.reactions.skull++;
      corruptorArray.$save($scope.corruptor);  
    }
}])

.controller('CorruptorListController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl", function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
	var ref = new Firebase(FirebaseUrl + "corruptors");
    $scope.corruptors = $firebaseArray(ref);
}])

.constant('FirebaseUrl', 'https://shining-heat-6633.firebaseio.com/')

;