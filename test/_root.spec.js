"use strict";

process.env.NODE_ENV = "test";
var server = require('../server');
var async = require('async');
var mongoose =  require('mongoose');
var User = mongoose.model('User');

before(function(done){ //before anything else run this function and wipe out mongoose
async.parallel([
function(cb){
  User.collection.remove(cb);
}
//,function(cb){
//Whatever.collection.remove(cb);
//this removes your collections
//}
], function(res) {
  done();
});
});
