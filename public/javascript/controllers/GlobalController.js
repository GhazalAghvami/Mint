(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);

  function GlobalController(UserFactory, $state) {
    var vm = this;
    vm.isLogin = true;
    vm.user = {};
    vm.status = UserFactory.status;


    vm.logout = function() {
      $state.go('Home');
      UserFactory.logout();
    };

    vm.register = function() {
        $state.go('Profile');
      UserFactory.register(vm.user).then(function() {
      }, function(err){
        vm.registerError = "Username already exists in our database";
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function() {
        $state.go('Profile');
      }, function(err){
        vm.loginError = "Incorrect Username or Password";
        vm.user.password = "";
      });

    };


  }
})();
