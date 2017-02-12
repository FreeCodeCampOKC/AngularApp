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