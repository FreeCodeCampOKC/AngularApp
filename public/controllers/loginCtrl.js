(function () {
    'use strict';

    angular.module('app').controller('loginCtrl', loginCtrl);


    loginCtrl.$inject = ['$scope','chat','$state'];

    function loginCtrl($scope,chat,$state) {
        console.log("loginCtrl functional!");


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

    	$scope.login = function(username,imagesrc){
    		console.log('this is firing');
    		var obj= {
    			username:username,
    			imagesrc:imagesrc,
    			channel:'#General'
    		}
    		chat.emit('login',{data:obj})
    		$state.go('mainchat.generalchat',{data:obj});
    	}


    }









})();