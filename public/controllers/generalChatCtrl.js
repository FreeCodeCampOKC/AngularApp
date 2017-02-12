(function () {
    'use strict';

    angular.module('app').controller('generalChatCtrl', generalChatCtrl);


    generalChatCtrl.$inject = ['$scope','chat','$stateParams'];

    function generalChatCtrl($scope,chat,$stateParams) {
        console.log("generalChatCtrl functional!");
        console.log('stateparams = ',$stateParams);


    }









})();