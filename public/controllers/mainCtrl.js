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