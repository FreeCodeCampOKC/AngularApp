var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usersSchema  = new Schema({

});


var User = mongoose.model('User', usersSchema);


module.exports = User;