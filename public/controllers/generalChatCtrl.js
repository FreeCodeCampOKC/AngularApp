(function () {
    'use strict';

    angular.module('app').controller('generalChatCtrl', generalChatCtrl);


    generalChatCtrl.$inject = ['$scope','chat','$stateParams','$rootScope'];

    function generalChatCtrl($scope,chat,$stateParams,$rootScope) {
        console.log("generalChatCtrl is functional!");
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    		event.preventDefault();
    		if(toState == 'login'){
    			chat.emit('leave');
    		}
		})


        
        $scope.profileimage = $stateParams.data.imagesrc;
        $scope.generalmessage = [];

        $scope.message = '';

        
        chat.on('newchat', function(data){
        	console.log('new chat recieved',data);
        	let length = $scope.generalmessage.length;
        	if(length >30){
        		if($scope.generalmessage[length-1].username == data.username){
        			let popped = $scope.generalmessage.pop();
        			popped.text += "\n New message"+data.msg;
        			$scope.generalmessage.push(popped);
        		}
        		$scope.generalmessage = $scope.generalmessage.pop();
        		$scope.generalmessage.push(data);
        	}
        	else{
        		if(length > 0 && $scope.generalmessage[length-1].username == data.username){
        			console.log('there was a duplicate user on the last item');
        			let popped = $scope.generalmessage.pop();
        			console.log('popped',popped);
        			popped.msg += ' '+data.msg;
        			$scope.generalmessage.push(popped);
        		}else{
        			$scope.generalmessage.push(data);
        		}
        		
        	}

        })

        chat.on('private',function(data){
        	console.log('recieved private message: ',data);ß
        	alert('you have recieved a private message from '+data.username+' The message is: '+data.message);
        })

        function sendMsg(txt){
        	let username = $stateParams.data.username;
        	let length = $scope.generalmessage.length;

        	let data= {
        		username: username,
        		txt:txt,
        		date: new Date(),
        	}

        	chat.emit('chat',data);
        	if(length >30){
        		$scope.generalmessage = $scope.generalmessage.pop();
        		$scope.generalmessage.push(data);
        	}
        	else{
        		$scope.generalmessage.push(data);
        	}
        	$scope.message= '';

        }



    }









})();