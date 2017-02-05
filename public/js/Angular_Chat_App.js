/*! Angular_Chat_App 0.0.1 */
(function () {
	angular.module('app', [
		'ui.router'
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


        }


})();
(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', mainCtrl);


    mainCtrl.$inject = ['$scope'];

    function mainCtrl($scope) {
        console.log("MainCtrl functional!");


    }









})();
// services/

console.log('this is service file is working');