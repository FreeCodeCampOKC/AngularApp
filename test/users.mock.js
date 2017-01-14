var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var User = require('../server/users/users.model');


/* describe("Get all todos", function(){
         // Test will pass if we get all todos
        it("should return all todos", function(done){
            var TodoMock = sinon.mock(Todo);
            var expectedResult = {status: true, todo: []};
            TodoMock.expects('find').yields(null, expectedResult);
            Todo.find(function (err, result) {
                TodoMock.verify();
                TodoMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });

        // Test will pass if we fail to get a todo
        it("should return error", function(done){
            var TodoMock = sinon.mock(Todo);
            var expectedResult = {status: false, error: "Something went wrong"};
            TodoMock.expects('find').yields(expectedResult, null);
            Todo.find(function (err, result) {
                TodoMock.verify();
                TodoMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });*/