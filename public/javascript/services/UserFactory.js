(function() {
  'use strict';
  angular.module('app')
    .factory('UserFactory', UserFactory);

  function UserFactory($http, $q) {
    var o = {};
    o.status = {};

    o.register = function(user) {
      var q = $q.defer();
      $http.post('/api/users/register', user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      }, function(err){
        q.reject(err);
      });
      return q.promise;
    };

    o.login = function(user) {
      var q = $q.defer();
      $http.post('/api/users/login', user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      }, function(err){
        q.reject(err);
      });
      return q.promise;
    };

    o.logout = function() {
      removeToken();
      removeUser();
    };

    function setUser() {
      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
      o.status.username = user.username;
      o.status.name = user.name;
      o.status.lastName = user.lastName;
      o.status._id = user._id;
      o.status.email = user.email;
    }

    function removeUser() {
      o.status.username = null;
      o.status._id = null;
      o.status.email = null;
    }

    function getToken() {
      return localStorage.getItem('token');
    }

    function setToken(token) {
      return localStorage.setItem('token', token);
    }

    function removeToken() {
      return localStorage.removeItem('token');
    }

    function urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0:
          {
            break;
          }
        case 2:
          {
            output += '==';
            break;
          }
        case 3:
          {
            output += '=';
            break;
          }
        default:
          {
            throw 'Illegal base64url string!';
          }
      }
      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }

    if (getToken()) setUser();

    return o;
  }
})();
