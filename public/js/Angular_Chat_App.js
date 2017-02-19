/*! Angular_Chat_App 0.0.1 */
(function () {
	angular.module('app', [
		'ui.router',
		'ngMaterial',
		'btford.socket-io'
	]);



})();
(function () {
    'use strict';

    angular
        .module('app')
        .config(router);

        router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        function router($stateProvider, $urlRouterProvider,$locationProvider) {
            console.log("inside router");

            $urlRouterProvider.otherwise("/login");
            
            $locationProvider.html5Mode({
                 enabled: true
            });
            
            $stateProvider
              .state('login', {  
                  url: "/login",
                  templateUrl:"views/login.html",
                  controller:"loginCtrl"
              })
              .state('mainchat', { 
                  abstract:true, 
                  url: "/mainchat",
                  params: {
                    data: null
                  },
                  templateUrl:"views/mainChat.html",
                  controller:"mainCtrl"
              })       
              .state('mainchat.generalchat', {
                  url:'/generalChat',
                  templateUrl:"views/generalchat.html",
                  controller:"generalChatCtrl"
              })



        }
})();
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
(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', mainCtrl);


    mainCtrl.$inject = ['$scope','chat','$stateParams'];

    function mainCtrl($scope,chat,$stateParams) {
        console.log("mainCtrl functional!");
        console.log('stateparams for main ctrl= ',$stateParams);
        $scope.channel = $stateParams.data.channel;



        $scope.thischat = '';

        $scope.submitChat = function(msg){
            console.log('submit chat was submitted with',msg);
            let data ={
                username:$stateParams.data.username,
                profileimage:$stateParams.data.imagesrc,
                date: new Date(),
                msg:msg
            }
            $scope.thischat = '';

            chat.emit('chat',data);

        }



    }









})();
(function () {
    'use strict';

    angular.module('app').component('navbarComp', {

    bindings: {},

    // Inline template which is binded to message variable
    // in the component controller
    templateUrl:'views/navbar.html',

    // The controller that handles our component logic
    controller: function ($stateParams,chat) {
        console.log('navbar stateParams', $stateParams);
        let user = $stateParams.data;
        this.profileimage = user.imagesrc;
        this.username = user.username;
        console.log('navbarComp is loading');
        console.log('this username is', this.username);
        this.message = "Main Navbar Component"
        this.presence = [];
        let self = this;

        chat.on('connect',function(){
            console.log('we are connected!!!!');
        });

        getUsers();
        function getUsers(){
            chat.emit('presence');
        }
        

        chat.on('presence-return', function(data){
            console.log('presence data',data);
            self.presence = data.list;   
        })


    } 





    });


})();
(function () {
    'use strict';

    angular.module('app').factory('chat', chatFactory);

    chatFactory.$inject =['socketFactory'];

    function chatFactory(socketFactory) {
        console.log("Chat factory is functional!");

       var myIoSocket = io.connect('http://localhost:3000');

  	   var chat = socketFactory({
       	ioSocket: myIoSocket
       });

       return chat;


	}
})
();