'use strict';

class NavbarController {
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

}

angular.module('ecobitApp')
  .controller('NavbarController', NavbarController);
