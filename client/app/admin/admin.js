'use strict';

angular.module('ecobitApp.admin')
  .config(function($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/main/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    }).state('doctors', {
      url: '/doctors',
      templateUrl: 'app/admin/doctor/doctor.html',
      controller: 'DoctorController',
      controllerAs: 'ctrl',
      authenticate: 'admin'
    });
  });
