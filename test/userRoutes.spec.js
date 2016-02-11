"use strict";

var should = require('should');
var request = require('supertest');
var app = require('../server');
var mongoose = require('mongoose');
var User = mongoose.model('User');

describe('User Routes', function(){
  describe('Register', function(){
    it('Should return a status code of 500 when there is no username', function(done){
      request(app)
      .post('/api/users/register')
      .expect(500)
      .end(done);
    });
    it('Should return a status of 200 and a JWT', function(done){
      var u = {
        name: 'name',
        lastName: 'lastName',
        email: 'email@test.com',
        username: 'test',
        password: 'secret'
      };
      request(app)
      .post('/api/users/register')
      .send(u)
      .expect(200)
      .expect(function(res){
        should.exist(res.body);
      })
      .end(done);
    });
    it('Should have created a user', function(done){
      User.findOne({'username': 'test'}, function(err, user) {
        should.not.exist(err);
        should.exist(user._id);
        user.name.should.equal('name');
        user.lastName.should.equal('lastname');
        user.email.should.equal('email@test.com');
        user.username.should.equal('test');
        user.passwordHash.should.not.equal('secret'); //needs to be hashed
        done();
      });
    });
  });
  describe('Login', function(){

    })
  });
