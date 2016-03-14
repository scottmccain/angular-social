'use strict';
 
 var controller = function($scope, $state /* LoginService */) {
    
    console.log('loaded controller');
    
    $scope.login = function() {
        // send login request to server and navigate to token manager  
        //this.username == the user input name

        //var loginInformation = {username:'yokiblak', password:'baddassprogrammer'};
        //LoginService.login(loginInformation);

    };
    
    $scope.register = function() {
      // navigate to register using $state  
    };
};

module.exports = controller;