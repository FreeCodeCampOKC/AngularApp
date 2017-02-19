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