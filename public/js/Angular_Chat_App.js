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
              .state('main', {  
                  url: "/login",
                  templateUrl:"views/login.html",
                  controller:"mainCtrl"
              })
              .state('mainchat', { 
                  abstract:true, 
                  url: "/mainchat",
                  params: {
                    data: null
                  },
                  templateUrl:"views/main-chat.html",
                  controller:"mainChatCtrl"
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


    generalChatCtrl.$inject = ['$scope','chat','$stateParams'];

    function generalChatCtrl($scope,chat,$stateParams) {
        console.log("generalChatCtrl functional!");
        console.log('stateparams = ',$stateParams);


    }









})();
(function () {
    'use strict';

    angular.module('app').controller('mainChatCtrl', mainChatCtrl);


    mainChatCtrl.$inject = ['$scope','chat','$stateParams'];

    function mainChatCtrl($scope,chat,$stateParams) {
        console.log("mainChatCtrl functional!");
        console.log('stateparams = ',$stateParams);


    }









})();
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
(function () {
    'use strict';

    angular.module('app').component('navbarComp', {

    bindings: {},

    // Inline template which is binded to message variable
    // in the component controller
    templateUrl:'views/navbar.html',

    // The controller that handles our component logic
    controller: function () {
        console.log('navbarComp is loading');
        this.message = "Main Navbar Component"
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