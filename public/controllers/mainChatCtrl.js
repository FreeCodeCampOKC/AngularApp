(function () {
    'use strict';

    angular.module('app').controller('mainChatCtrl', mainChatCtrl);


    mainChatCtrl.$inject = ['$scope','chat','$stateParams'];

    function mainChatCtrl($scope,chat,$stateParams) {
        console.log("mainChatCtrl functional!");
        console.log('stateparams = ',$stateParams);


    }









})();