(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', mainCtrl);


    mainCtrl.$inject = ['$scope'];

    function mainCtrl($scope) {
        console.log("MainCtrl functional!");


        $scope.names =[];

        $scope.addName = function(name){	
        	$scope.names.push(name);
        }


    }









})();