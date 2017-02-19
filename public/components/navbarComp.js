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