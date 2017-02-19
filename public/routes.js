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