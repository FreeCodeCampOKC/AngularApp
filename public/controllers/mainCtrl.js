(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', mainCtrl);


    mainCtrl.$inject = ['$scope','chat','$state'];

    function mainCtrl($scope,chat,$state) {
        console.log("MainCtrl functional!");


        $scope.username = "";
        $scope.unit = "";

        $scope.names =[];

        $scope.addName = function(name){	
        	$scope.names.push(name);
        }	
        console.log('socket',chat);
    	

    	chat.on('connect',function(){
      		console.log('we are connected!!!!');
    	});

    	$scope.login = function(username,unit){
    		console.log('this is firing');
    		console.log('username and unit outside of chat emit', username+ ' '+unit);
    		var obj= {
    			username:username,
    			unit:unit
    		}
    		chat.emit('login',{data:obj})
    		$state.go('mainchat.generalchat',{data:obj});
    	}


    }









})();