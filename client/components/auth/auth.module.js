'use strict';

angular.module('ecobitApp.auth', ['ecobitApp.constants', 'ecobitApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
