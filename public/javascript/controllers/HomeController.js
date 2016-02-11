(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController($state, UserFactory, $stateParams, HomeFactory) {
    var vm = this;
    vm.status = UserFactory.status;
    
  }
})();
